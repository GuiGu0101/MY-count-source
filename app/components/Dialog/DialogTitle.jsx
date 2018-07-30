/**
 * Created by guigu on 2017/7/2.
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class DialogTitle extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const {children} = this.props;
        return (
            <div className="dialog-title">{children}</div>
        );
    }
}