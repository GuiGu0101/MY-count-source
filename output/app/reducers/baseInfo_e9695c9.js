define("app/reducers/baseInfo",function(e,r,t){"use strict";function n(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function s(e,r){switch(void 0===e&&(e=f),console.info(r),r.type){case u.GET_BASEINFO_USER_SUCCESS:var t=r.json;return a({},e,{users:t.users,games:t.games});default:return e}}Object.defineProperty(r,"__esModule",{value:!0});var a=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e};r["default"]=s;var o=e("app/constants/types"),u=n(o),f={games:[],users:[]};t.exports=r["default"]});