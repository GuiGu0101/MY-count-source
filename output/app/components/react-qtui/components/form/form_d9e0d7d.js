define("app/components/react-qtui/components/form/form",function(e,t,o){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=e("node_modules/babel-runtime/helpers/extends"),s=l(r),u=e("node_modules/babel-runtime/helpers/defineProperty"),d=l(u),n=e("node_modules/babel-runtime/helpers/objectWithoutProperties"),a=l(n),i=e("node_modules/babel-runtime/core-js/object/get-prototype-of"),c=l(i),m=e("node_modules/babel-runtime/helpers/classCallCheck"),p=l(m),f=e("node_modules/babel-runtime/helpers/createClass"),b=l(f),_=e("node_modules/babel-runtime/helpers/possibleConstructorReturn"),h=l(_),x=e("node_modules/babel-runtime/helpers/inherits"),k=l(x),y=e("node_modules/react/react"),q=l(y),v=e("node_modules/prop-types/index"),C=l(v),j=e("node_modules/classnames/index"),P=l(j),N=function(e){function t(){return p["default"](this,t),h["default"](this,(t.__proto__||c["default"](t)).apply(this,arguments))}return k["default"](t,e),b["default"](t,[{key:"render",value:function(){var e=this.props,t=e.children,o=e.className,l=e.radio,r=e.checkbox,u=a["default"](e,["children","className","radio","checkbox"]),n=P["default"](d["default"]({"qtui-cells":!0,"qtui-cells_form":!l&&!r,"qtui-cells_radio":l,"qtui-cells_checkbox":r},o,o));return q["default"].createElement("div",s["default"]({className:n},u),t)}}]),t}(y.Component);N.propTypes={radio:C["default"].bool,checkbox:C["default"].bool},N.defaultProps={radio:!1,checkbox:!1},t["default"]=N,o.exports=t["default"]});