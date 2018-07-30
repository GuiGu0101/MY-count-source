/**
 * Created by guigu on 2017/8/16.
 */
import React, { PropTypes, Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import {
  CellsTitle,
  Cells,
  CellsTips,
  Cell,
  Form,
  FormCell,
  CellHeader,
  CellBody,
  CellFooter,
  CellDesc,
  Select,
  Input,
  Label,
  ButtonArea,
  Button
} from '../../components/react-qtui';
import * as groupCallBack from '../../actions/CallBack/group';

const mapStateToProps = state => {
  return {
    baseInfo: state.baseInfo
  };
};

// React & Redux 绑定
@connect(mapStateToProps)
export default class SinglePoint extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {
      point: '',
      userCode: '',
      gameId: 0,
      games: []
    };
  }

  formatGame(games) {
    const list = [];
    games.map(game => {
      if (game.type === 'single') {
        list.push(game);
      }
    });
    const gameId = list.length > 0 ? list[0].id : 0;
    this.setState({ games: list, gameId });
  }

  componentWillMount() {
    const { games } = this.props.baseInfo;
    this.formatGame(games);
  }

  componentWillReceiveProps(nextProps) {
    const { games } = nextProps.baseInfo;
    this.formatGame(games);
  }

  componentDidMount() {}

  submit() {
    const { point, userCode } = this.state;
    let { gameId } = this.state;
    if (point === '' || userCode === '') {
      alert('有未填写的内容');
      return false;
    } else {
      if (gameId === 0) {
        gameId = this.state.games[0].id;
      }
      groupCallBack
        .submitSinglePoint({
          point: point,
          code: userCode,
          game_id: gameId
        })
        .then(res => {
          if (typeof res.json === 'function') {
            return res.json();
          }
          return res;
        })
        .then(data => {
          console.log(data);
          if (data.status !== 1) {
            alert(data.message);
          } else {
            alert('游戏积分登记成功');
            this.setState({
              point: '',
              userCode: ''
            });
          }
        });
      return true;
    }
  }
  getGameDesc() {
    const { gameId, games } = this.state;
    let curr = null;
    for (let index = 0; index < games.length; index++) {
      const element = games[index];
      if (element.id === gameId) {
        curr = element;
        break;
      }
    }
    return curr ? curr.game_desc : '';
  }

  render() {
    const { user, games } = this.state;
    console.log(games);
    return (
      <div>
        <div
          style={{ textAlign: 'center', color: '#00ACDC', fontSize: '24px' }}
        >
          游戏名次登记
        </div>
        <CellsTitle>游戏</CellsTitle>
        <Form>
          <FormCell select selectPos="after">
            <CellBody>
              <Select
                ref="gameSelect"
                onChange={e => this.setState({ gameId: e.target.value })}
                value={this.state.gameId}
              >
                {games.map(game => (
                  <option value={game.id} key={game.id}>
                    {game.name}
                  </option>
                ))}
              </Select>
            </CellBody>
          </FormCell>
        </Form>
        <CellsTips>{this.getGameDesc()}</CellsTips>
        <CellsTitle>魅友信息</CellsTitle>
        <Form>
          <FormCell>
            <CellHeader>
              <Label>签到序号</Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                placeholder="输入签到序号，例如A001"
                onChange={e => this.setState({ userCode: e.target.value })}
                value={this.state.userCode}
              />
            </CellBody>
          </FormCell>
          <FormCell>
            <CellHeader>
              <Label>积分值</Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                placeholder="输入获得的积分值"
                onChange={e => this.setState({ point: e.target.value })}
                value={this.state.point}
              />
            </CellBody>
          </FormCell>
        </Form>
        <ButtonArea>
          <Button onClick={this.submit.bind(this)}>确认登记</Button>
        </ButtonArea>
      </div>
    );
  }
}
