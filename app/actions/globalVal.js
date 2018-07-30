import * as actionTypes from '../constants/types';
import * as errorCode from '../constants/errorCode';
import * as URLS from '../constants/urls';
import { get, post } from '../fetch/request';

// 一. 公共接口数据

export function hideSuccess() {
    return {
        type: actionTypes.HIDE_SUCCESS
    };
}
export const showSuccess = data => {
    return {
        type: actionTypes.SHOW_SUCCESS,
        text: data
    };
};
export function hideError() {
    return {
        type: actionTypes.HIDE_ERROR
    };
}
export const showError = data => {
    if (typeof data === 'number') {
        const msg = errorCode['CODE_' + data] || '系统错误';
        return {
            type: actionTypes.SHOW_ERROR,
            text: msg
        };
    } else {
        return {
            type: actionTypes.SHOW_ERROR,
            text: data
        };
    }
};
export function hideLoading() {
    return {
        type: actionTypes.HIDE_LOADING
    };
}
export function showLoading() {
    return {
        type: actionTypes.SHOW_LOADING
    };
}
//获取首页全部卡片信息（包括我的权益与在售卡片），promise形式
export function getBaseInfo(params) {
    // 获取state属性/state下面的值，action通过dispatch触发reduce
    return (dispatch, getState) => {
        // action执行的时候，会传递dispatch getState参数，属于store方法
        return dispatch({
            type: actionTypes.GET_BASEINFO_USER,
            promise: get(URLS.BASE_INFO, params)
        });
    };
}
