/**
 * Created by guigu on 2017/8/13.
 */
import React, {PropTypes, Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class Group extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }


    render() {
        return (
            <div></div>
        )
    }
}