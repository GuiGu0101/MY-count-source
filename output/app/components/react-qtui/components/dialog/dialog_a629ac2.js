define("app/components/react-qtui/components/dialog/dialog",function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=e("node_modules/babel-runtime/helpers/defineProperty"),n=l(o),u=e("node_modules/babel-runtime/helpers/extends"),d=l(u),s=e("node_modules/babel-runtime/helpers/objectWithoutProperties"),i=l(s),r=e("node_modules/babel-runtime/core-js/object/get-prototype-of"),c=l(r),p=e("node_modules/babel-runtime/helpers/classCallCheck"),m=l(p),f=e("node_modules/babel-runtime/helpers/createClass"),_=l(f),b=e("node_modules/babel-runtime/helpers/possibleConstructorReturn"),h=l(b),y=e("node_modules/babel-runtime/helpers/inherits"),v=l(y),g=e("node_modules/react/react"),q=l(g),k=e("node_modules/prop-types/index"),E=l(k),N=e("node_modules/classnames/index"),j=l(N),x=e("app/components/react-qtui/components/mask/index"),C=l(x),D=function(t){function a(e){m["default"](this,a);var t=h["default"](this,(a.__proto__||c["default"](a)).call(this,e));return t.state={isAndroid:""},t}return v["default"](a,t),_["default"](a,[{key:"renderButtons",value:function(){return this.props.buttons.map(function(e,t){var a=e.type,l=e.label,o=i["default"](e,["type","label"]),n=j["default"]({"qtui-dialog__btn":!0,"qtui-dialog__btn_default":"default"===a,"qtui-dialog__btn_primary":"primary"===a});return q["default"].createElement("a",d["default"]({key:t,href:"javascript:;"},o,{className:n}),l)})}},{key:"componentDidMount",value:function(){var t=e("app/components/react-qtui/utils/mobile_detect"),a=t.isAndroid;this.setState({isAndroid:a})}},{key:"render",value:function(){var e=this.props,t=e.title,a=e.show,l=e.className,o=e.children,u=(e.buttons,e.type),s=e.autoDectect,r=i["default"](e,["title","show","className","children","buttons","type","autoDectect"]),c=u?u:"ios",p=j["default"]("qtui-dialog",n["default"]({"qtui-skin_android":"android"===c||!u&&s&&this.state.isAndroid},l,l));return q["default"].createElement("div",{style:{display:a?"block":"none"}},q["default"].createElement(C["default"],null),q["default"].createElement("div",d["default"]({className:p},r),t?q["default"].createElement("div",{className:"qtui-dialog__hd"},q["default"].createElement("strong",{className:"qtui-dialog__title"},t)):!1,q["default"].createElement("div",{className:"qtui-dialog__bd"},o),q["default"].createElement("div",{className:"qtui-dialog__ft"},this.renderButtons())))}}]),a}(g.Component);D.propTypes={buttons:E["default"].array,show:E["default"].bool,title:E["default"].string,autoDectect:E["default"].bool,type:E["default"].string},D.defaultProps={buttons:[],show:!1,title:"",type:"",autoDectect:!0},t["default"]=D,a.exports=t["default"]});