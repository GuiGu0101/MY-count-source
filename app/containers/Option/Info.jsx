/**
 * Created by guigu on 2017/8/17.
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as groupCallBack from '../../actions/CallBack/group';
import 'info.scss';
export default class Info extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: null
        };
    }

    componentWillMount() {
        groupCallBack.info().then(res => {
            if (typeof res.json === 'function') {
                return res.json();
            }
            return res;
        }).then(data => {
            console.log(data);
            this.setState({
                data
            });
        });
    }

    componentDidMount() {
    }

    static renderGroup(map) {
        const group = [];
        for (const key in map) {
            group.push(
                <div key={'group_' + key} className="g_info_group">
                    <div className="g_info_title">{key}组</div>
                    <div className="g_info_users">
                        {
                            map[key].map(user => (
                                <div className="g_info_user" key={user.code}>
                                    <div className="g_info_user_no">{user.code}</div>
                                    <div className="g_info_user_name">{user.name}</div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            );
        }
        return group;
    }

    render() {
        const data = this.state.data;
        return (
            <div className="main_BG">
                <div className="group_info_title">分组情况</div>
                <div className="group_info_table">
                    {
                        data && Info.renderGroup(data.group)
                    }
                </div>
            </div>
        );
    }
}