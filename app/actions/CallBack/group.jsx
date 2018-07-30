/**
 * Created by guigu on 2017/7/2.
 */
import * as URLS from '../../constants/urls';

import {post, get} from '../../fetch/request';

//
export function doGroup(params) {
    // 获取state属性/state下面的值，要用dispatch主动触发
    params = {
        ...params
    };
    return post(URLS.DO_GROUP, params);
}
export function submitTeamPoint(params) {
    // 获取state属性/state下面的值，要用dispatch主动触发
    params = {
        ...params
    };
    return post(URLS.POINT_TEAM, params);
}
export function submitSinglePoint(params) {
    // 获取state属性/state下面的值，要用dispatch主动触发
    params = {
        ...params
    };
    return post(URLS.POINT_SINGLE, params);
}
export function info(params) {
    // 获取state属性/state下面的值，要用dispatch主动触发
    params = {
        ...params
    };
    return get(URLS.GROUP_INFO, params);
}
