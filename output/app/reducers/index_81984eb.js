define("app/reducers/index",function(e,d,u){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(d,"__esModule",{value:!0});var l=e("node_modules/redux/lib/index"),r=e("app/reducers/globalVal"),n=a(r),o=e("app/reducers/baseInfo"),t=a(o),s=l.combineReducers({globalVal:n["default"],baseInfo:t["default"]});d["default"]=s,u.exports=d["default"]});