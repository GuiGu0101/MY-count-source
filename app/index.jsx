// 入口文件
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import FastClick from 'fastclick';

// 性能测试
import * as Perf from 'react-addons-perf';
window.Perf = Perf;

import Utils from './util/util';
import '../static/styles/common.less';

// 创建 Redux 的 store 对象
const store = configureStore();

// 获取 route 配置
import Router from './router';

const renderPage = function () {
    render(
        <Provider store={store}>
            <Router history={hashHistory}/>
        </Provider>,
        document.getElementById('root')
    );
};

// 配置fastclick
if ('addEventListener' in document) {
    document.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);
}

renderPage();
