// 路由配置
import React, { PropTypes, Component } from 'react';
import * as PureRenderMixin from 'react-addons-pure-render-mixin';
import { Router, Route, IndexRoute } from 'react-router';

import {checkQTClient, redirectToLogin, checkFlowAuth } from './util/authService';

// App 入口
import App from './containers/App';

// Home 首页
import Home from './containers/Home';

import Sign from './containers/Sign';
import Dashboard from './containers/Dashboard';
import DashboardWater from './containers/Dashboard/water';
import Option from './containers/Option';


import Error from './containers/Error';

// 404
import NotFound from './containers/404';

// 配置 router
export default class RouteMap extends Component {

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.updateHandle = this.updateHandle.bind(this);
        this.state = {
            a: 1
        };
    }

    updateHandle() {
    }

    componentDidMount(){

    }

    render() {
        return (
            <Router history={this.props.history} onUpdate={this.updateHandle}>
                {/* 先加载app组件 */}
                <Route path="/" component={App} onEnter={checkQTClient}>
                    <IndexRoute component={Home} onEnter={checkQTClient}/>
                    <Route path="home" component={Home} onEnter={checkQTClient}/>

                    <Route path="sign">
                        <IndexRoute component={Sign}/>
                    </Route>
                    <Route path="dashboard" component={Dashboard}/>
                    <Route path="dashboard/water/:land" component={DashboardWater}/>
                    <Route path="option">
                        <Route path="point/team" component={Option.TeamPoint}/>
                        <Route path="point/single" component={Option.SinglePoint}/>
                        <Route path="point" component={Option.PointHome}/>
                        <Route path="groups/info" component={Option.Info}/>
                    </Route>
                    <Route path="error">
                        <IndexRoute component={Error.Common}/>
                        <Route path="not/proxy" component={Error.DontProxy} />
                        <Route path="common/:code" component={Error.Common} />
                        <Route path="not-qt-client" component={Error.NotQTClient} />
                    </Route>

                    {/* 404 */}
                    <Route path="*" component={NotFound}/>
                    <Route path="/404" component={NotFound}/>
                </Route>
            </Router>
        );
    }
}
