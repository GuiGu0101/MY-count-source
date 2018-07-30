import {combineReducers} from 'redux';

import globalVal from './globalVal';
import baseInfo from './baseInfo';

// 聚合reducer
const rootReducer = combineReducers({
    globalVal,
    baseInfo,
});

export default rootReducer;
