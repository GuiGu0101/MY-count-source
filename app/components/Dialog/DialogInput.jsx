/**
 * Created by guigu on 2017/7/2.
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default class DialogInput extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUpdate(nextProps, nextState) {
        if (typeof nextProps.defaultValue !== 'undefined') {
            nextState.value = nextProps.defaultValue;
            nextState.showClear = nextProps.defaultValue;
        }
    }

    renderButtons(action) {
        const {label, ...others} = action;

        return (
            <a href="javascript:" {...others} className="dl-input-btn">{label}</a>
        );
    }

    focus() {
        this.refs.inputDom.focus();
        console.log(this.refs.inputDom)
    }

    state = {
        showClear: !!this.props.defaultValue,
        value: this.props.defaultValue || '',
    };

    inputChange(event) {
        const value = event.target.value;
        const {onChange} = this.props;
        let state;
        if (value) {
            state = {
                showClear: true,
                value: value
            };
        } else {
            state = {
                value: value
            };
        }
        this.setState(state);
        onChange && onChange(event);
    }

    clearInput() {
        const {onChange} = this.props;
        this.setState({
            showClear: false,
            value: ''
        });
        onChange && onChange({target: {value: ''}});
    }


    render() {
        const {placeholder, button, desc, warn, readOnly, type} = this.props;
        let cellClassName = 'dialog-input-cell';
        if (warn) {
            cellClassName += ' warn';
        }
        return (
            <div className={cellClassName}>
                <div className="dialog-input">
                    <div className="dl-input-body">
                        <input ref="inputDom" className="qtui-input" value={this.state.value} placeholder={placeholder}
                               autoFocus="true"
                               onChange={this.inputChange.bind(this)}
                               readOnly={readOnly} type={type || 'text'}/>
                        <span className="qtui-icon-clear"
                              style={{display: this.state.showClear ? 'block' : 'none'}}
                              onClick={this.clearInput.bind(this)}/>
                    </div>
                    {button && this.renderButtons(button)}
                </div>
                {
                    desc &&
                    <div className="dialog-input-desc">
                        {desc}
                    </div>
                }

            </div>
        );
    }
}