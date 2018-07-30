'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Footer of `Cell`
 *
 */
var CellDesc = function CellDesc(props) {
    var className = props.className,
        children = props.children,
        primary = props.primary,
        error = props.error,
        others = (0, _objectWithoutProperties3.default)(props, ['className', 'children', 'primary', 'error']);

    var cls = (0, _classnames2.default)((0, _defineProperty3.default)({
        'qtui-cell__desc': true,
        'qtui-cell_primary': primary,
        'error': error
    }, className, className));

    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: cls }, others),
        children
    );
};

CellDesc.propTypes = {
    /**
     * if cell body is the primary block
     *
     */
    primary: _propTypes2.default.bool,
    /**
     * if cell body is the primary block
     *
     */
    error: _propTypes2.default.bool
};

CellDesc.defaultProps = {
    primary: false,
    error: false
};

exports.default = CellDesc;
module.exports = exports['default'];