// 相当于layout
import React, {PropTypes, Component} from 'react';
import * as PureRenderMixin from 'react-addons-pure-render-mixin';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import * as globalActions from '../actions/globalVal';

import {Toast, Toptips} from '../components/react-qtui';

const mapStateToProps = state => {
    return {baseInfo: state.baseInfo, globalVal: state.globalVal};
};
const mapDispatchToProps = dispatch => {
    return {
        globalAction: bindActionCreators(globalActions, dispatch),
    };
};

// React & Redux 绑定
@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            baseInfoDone: true,
        };
    }

    componentWillMount(){
        let {globalAction} = this.props;
        globalAction.getBaseInfo().then(() => this.setState({baseInfoDone: true}));

    }

    render() {
        const {globalVal, globalAction} = this.props;
        const {showSuccess, showLoading, showError} = globalVal;
        if (showSuccess.show) {
            setTimeout(() => {
                globalAction.hideSuccess();
            }, 1500);
        }
        if (showError.show) {
            setTimeout(() => {
                globalAction.hideError();
            }, 1500);
        }
        if (!this.state.baseInfoDone) {
            return (<Toast icon="loading" show>应用加载中</Toast>);
        }
        return (
            <div>
                {this.props.children}
                <Toast icon="success-no-circle" show={showSuccess.show}>{showSuccess.text}</Toast>
                <Toast icon="loading" show={showLoading}/>
                <Toptips type="warn" show={showError.show}>{showError.text}</Toptips>
            </div>
        );
    }

    componentDidMount() {
        // 只会执行一次，合适公共数据请求
        // console.log('layout Didmount');
    }

    // 路由切换时会触发
    componentDidUpdate() {
        // 记录路由切换完成、组件都渲染完成之后，页面的hash（包含了路由信息）
        window.webappLocationFrom = location.hash;
    }
}

export default App;