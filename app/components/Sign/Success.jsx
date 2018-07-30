/**
 * Created by guigu on 2017/8/13.
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link, hashHistory} from 'react-router';

import 'sign.scss'

export default class Success extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="main_BG sign_main">
                <div className="title">重庆魅友家3周年签到系统</div>
                <div className="sign-result">
                    <div className="sr-no">01</div>
                    <div className="sr-detail">
                        <div>
                            <div>手机</div>
                            <div>18602321901</div>
                        </div>
                        <div>
                            <div>论坛昵称</div>
                            <div>QT鬼谷</div>
                        </div>
                        <div>
                            <div>群昵称</div>
                            <div>江北阿兴</div>
                        </div>
                    </div>
                </div>
                <a href="javascript:;" className="next">下一个</a>
            </div>
        )
    }
}