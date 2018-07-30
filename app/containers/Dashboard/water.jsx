/**
 * Created by guigu on 2017/8/13.
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as dashboardCallBack from '../../actions/CallBack/dashboard';

import 'dashborad.scss'

export default class Dashboard extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            users: []
        }
    }

    timer = 0;

    getDashData() {
        const p = dashboardCallBack.getDashData();
        p.then(res => {
            if (typeof res.json === 'function') {
                return res.json();
            }
            return res;
        }).then(data => {
            this.setState({
                users: data.users
            })
        });
    }

    runDashDataTimer() {
        if (this.timer === 0) {
            this.getDashData();
        }
        this.timer = setTimeout(() => {
            this.getDashData();
            this.runDashDataTimer();
        }, 10000);

    }

    componentWillMount() {
        this.runDashDataTimer();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }


    render() {
        const {users} = this.state;
        return (
            <div className="main_BG">
                <div className="dash-title">重庆魅友家3周年庆-积分榜</div>
                <div className="jf-table">
                    <div className="jf-line header">
                        <div>签到号</div>
                        <div>昵称</div>
                        <div>陆上积分</div>
                        <div>水上积分</div>
                        <div>总积分</div>
                    </div>
                    {
                        users.map((user, index) => (
                            <div className="jf-line" key={index}>
                                <div>{user.no}</div>
                                <div>{user.qq_name}</div>
                                <div>{user.land}</div>
                                <div>{user.water}</div>
                                <div>{user.total}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}