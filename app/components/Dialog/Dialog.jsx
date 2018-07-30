/**
 * Created by guigu on 2017/7/2.
 */
import React, {PropTypes, Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Dialog} from '../react-qtui';

import DialogTitle from './DialogTitle';
import DialogInput from './DialogInput';

import 'dialog.scss';

export default class DialogT extends Component {


    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        const {title, show, buttons, children, ...others} = this.props;
        return (
            <Dialog buttons={buttons} show={show} className="dialog" autoDectect>
                {title && <DialogTitle>{title}</DialogTitle>}
                {children}
            </Dialog>
        );
    }
}