define("app/fetch/promiseMiddleware",function(e,n,t){"use strict";function r(e,n){var t={};for(var r in e)n.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}function o(){return function(e){return function(n){var t=n.promise,o=n.type,u=r(n,["promise","type"]);if(!t)return e(n);var s=o+"_SUCCESS",f=o+"_REQUEST",p=o+"_FAILURE";return e(i({},u,{type:f})),t.then(function(e){return"function"==typeof e.json?e.json():e}).then(function(n){return e(!n||"undefined"!=typeof n.code&&0!==Number(n.code)?i({},u,{json:n,type:p}):i({},u,{json:n,type:s})),!0}).then(void 0,function(n){console.log(n,typeof n);var t=void 0;return t="number"==typeof n.code?n:{message:String(n),code:-1},e(i({},u,{json:t,type:p})),!1})}}}Object.defineProperty(n,"__esModule",{value:!0});var i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e};n["default"]=o,e("node_modules/es6-promise/dist/es6-promise").polyfill(),t.exports=n["default"]});