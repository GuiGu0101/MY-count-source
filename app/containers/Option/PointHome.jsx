/**
 * Created by guigu on 2017/8/13.
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {Link, hashHistory} from 'react-router';
import DoGroup from '../../components/DoGroup/index';

export default class Group extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            type: ''
        };
    }

    componentWillMount() {
        this.state.type = this.props.params.type;
        console.log(this.state);
    }
    componentWillUpdate(nextProps, nextState){
        nextState.type = nextProps.params.type;
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="main_BG">
                <div className="main-nav">
                    <Link to='option/point/team'>团队</Link>
                    <Link to='option/point/single'>个人</Link>
                </div>
            </div>
        );

    }
}