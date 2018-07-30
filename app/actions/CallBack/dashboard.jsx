/**
 * Created by guigu on 2017/7/2.
 */
import * as URLS from '../../constants/urls';

import {post, get} from '../../fetch/request';

//
export function getDashData(params) {
    // 获取state属性/state下面的值，要用dispatch主动触发
    params = {
        ...params
    };
    return get(URLS.DASH_DATA, params);
}
//
export function getDashDataWater(params) {
    // 获取state属性/state下面的值，要用dispatch主动触发
    params = {
        ...params
    };
    return get(URLS.DASH_DATA_WATER, params);
}
