'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

var _index = require('./components/button/index');

var _index2 = require('./components/cell/index');

var _index3 = require('./components/mask/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./components/form/index');

var _index6 = require('./components/label/index');

var _index7 = _interopRequireDefault(_index6);

var _index8 = require('./components/toast/index');

var _index9 = _interopRequireDefault(_index8);

var _index10 = require('./components/dialog/index');

var _index11 = _interopRequireDefault(_index10);

var _index12 = require('./components/icon/index');

var _index13 = _interopRequireDefault(_index12);

var _toptips = require('./components/toptips');

var _toptips2 = _interopRequireDefault(_toptips);

var _loadmore = require('./components/loadmore');

var _loadmore2 = _interopRequireDefault(_loadmore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//0.4.x components
exports.default = {
    version: _version2.default,

    Button: _index.Button,
    ButtonArea: _index.ButtonArea,
    PreviewButton: _index.PreviewButton,
    Cells: _index2.Cells,
    CellsTitle: _index2.CellsTitle,
    CellsTips: _index2.CellsTips,
    Cell: _index2.Cell,
    CellHeader: _index2.CellHeader,
    CellBody: _index2.CellBody,
    CellFooter: _index2.CellFooter,
    CellDesc: _index2.CellDesc,
    Mask: _index4.default,
    Form: _index5.Form,
    FormCell: _index5.FormCell,
    TextArea: _index5.TextArea,
    Input: _index5.Input,
    Switch: _index5.Switch,
    Radio: _index5.Radio,
    Slider: _index5.Slider,
    Checkbox: _index5.Checkbox,
    Select: _index5.Select,
    Uploader: _index5.Uploader,
    VCode: _index5.VCode,
    Agreement: _index5.Agreement,
    Preview: _index5.Preview,
    PreviewHeader: _index5.PreviewHeader,
    PreviewBody: _index5.PreviewBody,
    PreviewFooter: _index5.PreviewFooter,
    PreviewItem: _index5.PreviewItem,
    Label: _index7.default,
    Toast: _index9.default,
    Dialog: _index11.default,
    Icon: _index13.default,
    Toptips: _toptips2.default,
    LoadMore: _loadmore2.default
}; /**
    * Created by jf on 15/10/27.
    */

module.exports = exports['default'];