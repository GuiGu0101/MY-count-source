/**
 * Created by guigu on 2017/7/18.
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {hashHistory} from 'react-router';
import {Msg} from '../../components/react-qtui';
import * as ERROR_CODE from '../../constants/errorCode';

export default class Common extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.getErrorMsg = this.getErrorMsg.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    getErrorMsg() {
        const code = this.props.params.code;
        let msg;
        if (code < 0) {
            msg = ERROR_CODE['CODE_I_' + Math.abs(code)];
        } else {
            msg = ERROR_CODE['CODE_' + code];
        }
        return msg || '系统错误，请稍后重试';
    }

    static getButtons() {
        if (window.history.length > 1) {
            return [{
                type: 'warn',
                label: '返回',
                onClick: hashHistory ? hashHistory.goBack : false
            }];
        } else {
            return [];
        }
    }

    render() {
        return (
            <div>
                <Msg
                    type="warn"
                    title="遇到错误"
                    description={this.getErrorMsg()}
                    buttons={Common.getButtons()}
                />
            </div>
        );
    }
}