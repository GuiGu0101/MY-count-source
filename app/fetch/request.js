/**
 * 请求封装：get post jsonp
 * 利用 fetch API 低版本浏览器通过es6-promise
 * jsonp在跨域的情况下才使用，正常不建议打开注释
 */
import 'whatwg-fetch';
import 'es6-promise';
import qt from '../../static/lib/qt_jssdk';
// import fetchJsonp from 'fetch-jsonp'

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
    let result = '';
    for (let item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }
    if (result) {
        result = result.slice(1);
    }
    return result;
}

const rqMethod = {
    get: function (url, params) {
        let cInfo = qt.getClientInfo();
        console.log(cInfo);
        // 处理get 参数
        let data = obj2params(params);
        if (data) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + data;
        }

        return fetch(url, {
            // credentials: 'include', // 请求默认带 cookie
            headers: {
                'Accept': 'application/json, text/plain, */*'
            },
            mode: 'cors'
        });
    },
    post: function (url, paramsObj) {
        let cInfo = qt.getClientInfo();
        console.log(cInfo);
        return fetch(url, {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded'// 默认表单提交
            },
            body: obj2params(paramsObj),
            mode: 'cors'
        });
    }
};
function transUrl(url) {
    if (url.indexOf('/') === 0) {
        if (url.indexOf('//') === 0) {
            return window.location.protocol + url;
        } else {
            return window.location.origin + url;
        }
    } else {
        if (url.indexOf('://') !== -1) {
            return url;
        } else {
            return window.location.origin + window.location.pathname + url;
        }
    }
}
const clientInfo = qt.getClientInfo();
if (clientInfo.type !== 'not QT client') {
    rqMethod.get = function (url, params) {
        return new Promise(function (resolve, reject) {
            qt.ajax({
                url: transUrl(url),
                type: 'get',
                data: params,
                success: function (data) {
                    resolve(data.result);
                },
                fail: function (error) {
                    if (error.statusCode === 0) {
                        error.statusCode = 501000;
                    }
                    reject({
                        code: error.statusCode,
                        message: error.errMsg
                    });
                }
            });
        });
    };
    rqMethod.post = function (url, params) {
        return new Promise(function (resolve, reject) {
            qt.ajax({
                url: transUrl(url),
                type: 'post',
                data: params,
                success: function (data) {
                    resolve(data.result);
                },
                fail: function (error) {
                    if (error.statusCode === 0) {
                        error.statusCode = 501000;
                    }
                    reject({
                        code: error.statusCode,
                        message: error.errMsg
                    });
                }
            });
        });
    };
}

export function get(url, params) {

    return rqMethod.get(url, params);
}

// 普通post请求
export function post(url, paramsObj) {
    return rqMethod.post(url, paramsObj);
}

// jsonp保持与fetch一致的API
// export function getJsonp (url, data) {
//     data = obj2params(data);
//     if (data) {
//         url += (url.indexOf('?') === -1 ? '?' : '&') + data;
//     }
//     let result = fetchJsonp(url, {
//         // jsonpCallback: 'jsoncallback',
//         timeout: 3000
//     });
//     return result;
// }