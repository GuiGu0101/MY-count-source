// auth 信息
import qt from '../../static/lib/qt_jssdk';

const ClientInfo = qt.getClientInfo();
//已经登录则不进入
console.log(ClientInfo);
export function checkQTClient(nextState, replace) {

    // const checkStatus = nextState.location.pathname !== '/error/not-qt-client'
    //     && ClientInfo.type !== 'ios' && ClientInfo.type !== 'android'
    // if (checkStatus) {
    //     replace('/error/not-qt-client');
    // }
}

export function redirectToBack(nextState, replace) {
    //已经登录则不进入
    replace(null, '/');
}

export function redirectToLogin(nextState, replace) {
    // redirect a new url
    console.log('enter', nextState, arguments);
    // replace(null, '/')
}

export function checkFlowAuth(nextState, replace) {
    // redirect a new url
    console.log('go to:' + nextState.location.pathname, nextState, arguments);
    // replace(null, '/')
}
