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
export default class TeamPoint extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {
      groupA: '',
      groupB: '',
      groupC: '',
      groupD: '',
      gameId: 0,
      games: []
    };
  }

  formatGame(games) {
    const team = [];
    games.map(game => {
      if (game.type === 'team') {
        team.push(game);
      }
    });
    const gameId = team.length > 0 ? team[0].id : 0;
    this.setState({
      games: team,
      gameId
    });
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
    const { groupA, groupB, groupC, groupD } = this.state;
    let { gameId } = this.state;
    if (groupA === '' || groupB === '' || groupC === '' || groupD === '') {
      alert('有未填写的名次');
      return false;
    } else {
      if (gameId === 0) {
        gameId = this.state.games[0].id;
      }
      groupCallBack
        .submitTeamPoint({
          group_a: groupA,
          group_b: groupB,
          group_c: groupC,
          group_d: groupD,
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
            alert('游戏名次登记成功');
            this.setState({
              groupA: '',
              groupB: '',
              groupC: '',
              groupD: '',
              gameId: 0
            });
          }
        });
      return true;
    }
  }
  getGameDesc() {
    const { gameId, games } = this.state;
    let curr = null;
    console.log(gameId, games);
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
        <CellsTitle>各组分值</CellsTitle>
        <Form>
          <FormCell>
            <CellHeader>
              <Label>A组</Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                placeholder="输入获得的积分值"
                onChange={e => this.setState({ groupA: e.target.value })}
                value={this.state.groupA}
              />
            </CellBody>
          </FormCell>
          <FormCell>
            <CellHeader>
              <Label>B组</Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                placeholder="输入获得的积分值"
                onChange={e => this.setState({ groupB: e.target.value })}
                value={this.state.groupB}
              />
            </CellBody>
          </FormCell>
          <FormCell>
            <CellHeader>
              <Label>C组</Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                placeholder="输入获得的积分值"
                onChange={e => this.setState({ groupC: e.target.value })}
                value={this.state.groupC}
              />
            </CellBody>
          </FormCell>
          <FormCell>
            <CellHeader>
              <Label>D组</Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                placeholder="输入获得的积分值"
                onChange={e => this.setState({ groupD: e.target.value })}
                value={this.state.groupD}
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
