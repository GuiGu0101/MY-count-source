/**
 * Created by guigu on 2017/8/13.
 */
import React, { PropTypes, Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link, hashHistory } from 'react-router';

import '../../containers/Sign/sign.scss';

export default class Success extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }

  componentWillMount() {
    const { user } = this.props;
    if (parseInt(user.no) < 10) {
      user.no = '0' + user.no;
    }
  }

  componentDidMount() {}

  render() {
    const { user } = this.props;
    return (
      <div className="sign-result">
        <div className="sr-no">{user.no}</div>
        <div className="sr-detail">
          <div>
            <div>手机</div>
            <div>{user.profile.mobile}</div>
          </div>
          <div>
            <div>姓名</div>
            <div>{user.profile.real_name}</div>
          </div>
          <div>
          <div>分组序号</div>
            <div>{user.profile.code}</div>
          </div>
        </div>
      </div>
    );
  }
}
