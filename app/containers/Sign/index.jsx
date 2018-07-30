/**
 * Created by guigu on 2017/8/13.
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import SignInput from '../../components/Sign/Input';
import Success from '../../components/Sign/Success';
import * as signCallBack from '../../actions/CallBack/sign';
import 'sign.scss';

const mapStateToProps = state => {
    return {
        baseInfo: state.baseInfo,
    };
};

// React & Redux 绑定
@connect(mapStateToProps)
export default class Sign extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            success: null
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentWillMount() {
        console.log(this.props.baseInfo);

    }

    componentDidMount() {
        console.log(this.props.baseInfo);
        window.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount(){
        console.log('unmount');
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e) {
        console.log(e);
        if (this.state.success && e.which === 13) {
            this.setState({success: null});
        }
    }

    signed(code) {
        const {users} = this.props.baseInfo;
        for (let i = 0; i < users.length; i++) {
            if (users[i].code === code) {
                users[i].signed = true;
                break;
            }
        }
    }

    submitSign(code) {
        let success = null;
        console.log(code);
        signCallBack.login({
            code
        }).then(res => {
            if (typeof res.json === 'function') {
                return res.json();
            }
            return res;
        }).then(data => {
            console.log(data);
            if (data.status !== 1) {
                alert('该号码已签到');
            } else {
                success = data.user;
            }
            this.signed(code);
            this.setState({
                success
            });
        });

    }


    render() {
        return (
            <div className="main_BG sign_main">
                <div className="title">重庆魅友家4周年签到系统</div>
                {!this.state.success ?
                    <SignInput users={this.props.baseInfo.users} submitSign={this.submitSign.bind(this)}/> :
                    <Success user={this.state.success}/>
                }
                {this.state.success &&
                <a href="javascript:;" className="next" onClick={e => this.setState({success: null})}>下一个</a>}
            </div>
        );
    }
}