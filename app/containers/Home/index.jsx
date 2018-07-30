/*
 * @file Home组件, 展示首页
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, hashHistory} from 'react-router';
import {get, post} from '../../fetch/request';


import '../../components/qtui/qtui.less';

import Utils from '../../util/util.js';
import localStorage from '../../util/localStorage.js';

import './title.less';
import './index.less';

import * as globalActions from '../../actions/globalVal';
import {ButtonArea, Button, Toast} from '../../components/react-qtui';

const mapStateToProps = state => {
    return {
        baseInfo: state.baseInfo,
        globalVal: state.globalVal,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        globalAction: bindActionCreators(globalActions, dispatch),
    };
};

// React & Redux 绑定
@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {

    static propTypes = {
        globalAction: PropTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount() {
        // Utils.setTitleBar({titleText: 'MY+'});
    }

    componentWillUnmount() {
        // 组件销毁时候，记录 location.key
        Home.locationKey = this.props.location.key;
    }

    componentDidMount() {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div className="main_BG">
                <h1>重庆魅友家4周年庆</h1>
                <div className="main-nav">
                    <Link to='sign'>签到</Link>
                    <Link to='/option/groups/info'>分组</Link>
                    <Link to='/option/point'>计分</Link>
                </div>
            </div>
        );
    }
}
