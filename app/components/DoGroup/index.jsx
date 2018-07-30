/**
 * Created by guigu on 2017/8/14.
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    CellsTitle,
    Cells,
    Cell,
    Form,
    FormCell,
    CellHeader,
    CellBody,
    CellFooter,
    Select,
    ButtonArea,
    Button
} from '../react-qtui';
import {Dialog, DialogInput} from '../Dialog';
import * as groupCallBack from '../../actions/CallBack/group';

export default class DoGroup extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            type: '',
            color: '#333',
            typeName: '',
            user: [],
            addUserData: {
                name: '',
                errMsg: '',
                isInner: false
            },
            group: '1'
        };
    }

    componentWillMount() {
        this.state.type = this.props.type;
        if (this.props.type === 'land') {
            this.state.typeName = '陆地活动';
            this.state.color = '#a76c0a';
        } else {
            this.state.typeName = '水上活动';
            this.state.color = '#00ACDC';
        }
    }

    componentDidMount() {
    }

    hideDialog() {
        console.log('hide');
        this.setState({
            showAddFiled: false,
            addUserData: {
                name: '',
                errMsg: '',
            },
            errorMsgs: []
        });
    }

    doAddFiled() {
        const {addUserData, user} = this.state;
        if (addUserData.name === '') {
            this.setState({
                addUserData: {
                    ...this.state.addUserData,
                    errMsg: '编号不能为空'
                }
            }, ()=>this.refs.dialogInput.focus());
        } else {
            if (user.indexOf(addUserData.name) === -1) {
                user.push(addUserData.name);
                this.setState({
                    addUserData: {
                        name: '',
                        errMsg: '',
                    },
                    user: [...user]
                }, ()=>this.refs.dialogInput.focus());
            } else {
                this.setState({
                    addUserData: {
                        ...this.state.addUserData,
                        errMsg: '编号已存在'
                    }
                }, ()=>this.refs.dialogInput.focus());
            }
        }
    }

    addFiled = {
        inputChange(event) {
            this.setState({
                addUserData: {
                    ...this.state.addUserData,
                    name: event.target.value,
                    errMsg: ''
                }
            });
        },

        buttons: [
            {
                type: 'default',
                label: '结束',
                onClick: this.hideDialog.bind(this)
            },
            {
                type: 'primary',
                label: '下一个',
                onClick: this.doAddFiled.bind(this)
            }
        ]
    };

    submit() {
        const {group, user, type} = this.state;
        groupCallBack.doGroup({
            type,
            group,
            users: user
        }).then(res => {
            if (typeof res.json === 'function') {
                return res.json();
            }
            return res;
        }).then(data => {
            console.log(data);
            if (data.status !== 1) {
                alert(data.message ? data.message : '分组失败，请重试');
            } else {
                let str = '以下魅友已被编入' + (data.type === 'water' ? '水上' : '陆地') + '第' + data.group + '组：\r\n' + data.user.join(',');
                if (data.nu_user.length > 0) {
                    str += '\r\n以下魅友已被分配在其他组：\r\n' + data.nu_user.join(',');
                }
                if (data.no_sign.length > 0) {
                    str += '\r\n以下魅友还未签到：\r\n' + data.no_sign.join(',');
                }
                alert(str);
                this.setState({
                    user: []
                });
            }
        });
    }

    render() {
        const {typeName, color, user, addUserData, showAddFiled} = this.state;
        return (
            <div>
                <div
                    style={{textAlign: 'center', color: color, fontSize: '24px'}}>{typeName}</div>
                <CellsTitle>组别</CellsTitle>
                <Form>
                    <FormCell select selectPos="after">
                        <CellBody>
                            <Select onChange={e => this.setState({group: e.target.value})}>
                                <option value="1">第一组</option>
                                <option value="2">第二组</option>
                                <option value="3">第三组</option>
                                <option value="4">第四组</option>
                            </Select>
                        </CellBody>
                    </FormCell>
                </Form>
                <CellsTitle>成员名单</CellsTitle>
                <Cells>
                    {
                        user.map((item, index) => (
                            <Cell key={index}>
                                <CellBody>{item}</CellBody>
                            </Cell>
                        ))
                    }

                </Cells>
                <ButtonArea>
                    <Button
                        type="default"
                        onClick={e => this.setState({showAddFiled: true}, ()=>this.refs.dialogInput.focus())}>
                        添加成员
                    </Button>
                    <Button
                        onClick={this.submit.bind(this)}>
                        确认分组
                    </Button>
                </ButtonArea>
                <Dialog title="输入魅友编号" show={showAddFiled} buttons={this.addFiled.buttons}>
                    <DialogInput ref="dialogInput" placeholder="编号，例如01" defaultValue={addUserData.name}
                                 warn={!!addUserData.errMsg} type="number"
                                 desc={addUserData.errMsg} onChange={this.addFiled.inputChange.bind(this)}/>
                </Dialog>
            </div>
        );
    }
}