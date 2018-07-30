/**
 * promise中间件, 让action返回promise,把action与reducer联系起来
 * author: younthxg@gmail.com
 */
require('es6-promise').polyfill();

export default function promiseMiddleware() {
    return next => action => {
        // rest是action对象剩下的变量集合
        const {promise, type, ...rest} = action;
        // 非promise直接返回
        if (!promise) return next(action);
        // promise对下各种状态类型
        const SUCCESS = type + '_SUCCESS';
        const REQUEST = type + '_REQUEST';
        const FAILURE = type + '_FAILURE';
        // 开始请求
        next({...rest, type: REQUEST});

        return promise
            .then(res => {
                if (typeof res.json === 'function') {
                    return res.json();
                }
                return res;
            })
            .then(json => {
                // success 结果包裹在json中
                // console.log(json && (typeof json.code === 'undefined' || Number(json.code) === 0));
                if (json && (typeof json.code === 'undefined' || Number(json.code) === 0)) {
                    next({...rest, json, type: SUCCESS});
                } else {
                    // error_no 不等于当失败处理
                    next({...rest, json, type: FAILURE});
                }
                return true;
            })
            .then(undefined, error => {
                // error
                console.log(error, typeof error);
                let json;
                if (typeof error.code === 'number') {
                    json = error;
                } else {
                    json = {
                        message: String(error),
                        code: -1
                    };
                }
                next({...rest, json, type: FAILURE});
                return false;
            });
    };
}
