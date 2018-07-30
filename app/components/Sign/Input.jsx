/**
 * Created by guigu on 2017/8/16.
 */
import React, { PropTypes, Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Input extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {
      text: '',
      match: [],
      users: []
    };
  }

  componentWillMount() {
    this.state.users = this.props.users;
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.state.users = nextProps.users;
  }

  matchCode(code) {
    const match = [];
    const { users } = this.state;
    users.map(user => {
      if (user.code.indexOf(code) !== -1 && !user.signed) {
        match.push({
          code: user.code,
          name: user.real_name,
          mobile: user.mobile,
          active: false
        });
      } else if (user.mobile.indexOf(code) !== -1 && !user.signed) {
        match.push({
          code: user.code,
          name: user.real_name,
          mobile: user.mobile,
          active: false
        });
      }
    });
    return match;
  }

  downActiveCode() {
    const { match } = this.state;
    let hasActive = false;
    for (let i = 0; i < match.length; i++) {
      if (match[i].active && i !== match.length - 1) {
        hasActive = true;
        match[i].active = false;
        match[i + 1].active = true;
        break;
      }
    }
    if (!hasActive) {
      match[0].active = true;
      match[match.length - 1].active = false;
    }
    this.setState({
      match: [...match]
    });
  }

  upActiveCode() {
    const { match } = this.state;
    let hasActive = false;
    for (let i = 0; i < match.length; i++) {
      if (match[i].active && i !== 0) {
        hasActive = true;
        match[i].active = false;
        match[i - 1].active = true;
        break;
      }
    }
    if (!hasActive) {
      match[match.length - 1].active = true;
      match[0].active = false;
    }
    this.setState({
      match: [...match]
    });
  }

  handleChange(e) {
    console.log(e.target.value);
    const match = this.matchCode(e.target.value);
    this.setState({
      text: e.target.value,
      match
    });
  }

  matchClickHandle(code) {
    this.props.submitSign(code);
  }

  submitSign() {
    let code = '';
    const { match } = this.state;
    if (match.length === 0) {
      alert('号码不存在');
    } else {
      for (let i = 0; i < match.length; i++) {
        if (match[i].active) {
          code = match[i].code;
          break;
        }
      }
      if (!code) {
        code = match[0].code;
      }
      this.props.submitSign(code);
    }
  }

  handleSubmit(e) {
    console.log(e.which);
    if (e.which === 40) {
      this.downActiveCode();
    } else if (e.which === 38) {
      this.upActiveCode();
    } else if (e.which === 13) {
      this.submitSign();
    }
  }

  render() {
    return (
      <div className="sign">
        <input
          className="new-todo"
          type="text"
          placeholder="请输入签到序号"
          autoFocus="true"
          value={this.state.text}
          // onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)}
        />
        <div className="auto-complete">
          {this.state.match.map(user => (
            <div
              className={'auto-complete-item ' + (user.active ? 'active' : '')}
              key={user.code}
              onClick={this.matchClickHandle.bind(this, user.code)}
            >
              {user.code} {user.name} {user.mobile}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
