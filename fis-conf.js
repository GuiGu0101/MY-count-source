/**
 * fis配置文件
 */
var nowDate = new Date();
var buqilingwei = function (num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
};
// 按需编译，根据入口index.html寻找依赖编译，按需加载，智能打包
fis.set('project.files', ['/index.html', '/mock/**']);

fis.set('project.version', '1.0.0.20');
fis.set('project.qaVersion', '1.0.1.2');

fis.match('/output', {
    release: false
});

// mock数据，必须放在mock下面才生效，并且不编译
fis.match('/mock/**', {
    useCompile: false
});

// 采用 commonjs 模块化方案。需要 npm install fis3-hook-commonjs --save-dev
fis.hook('commonjs', {
    baseUrl: './app', // 默认为 . 即项目根目录。用来配置模块查找根目录
    extList: ['.js', '.jsx'] // 当引用模块时没有指定后缀，该插件会尝试这些后缀
});

fis.match('{/app/**.js,*.jsx}', {
    parser: fis.plugin('babel-5.x', {
        blacklist: ['regenerator'],
        optional: ['es7.decorators', 'es7.classProperties'],
        stage: 2, // 为了支持解构赋值
        sourceMaps: true
    }),
    rExt: '.js'
});

fis.match('*.{css,less}', {
    postprocessor: fis.plugin('autoprefixer', {
        browsers: ['android 4', 'ios 6', 'last 1 Chrome versions', 'last 2 Safari versions'],
        'cascade': true
    })
});
fis.match('!/node_modules/*.{css,less}', {
    postprocessor: false
});

fis.match('*.less', {
    parser: fis.plugin('less'),
    // postprocessor: fis.plugin('px2rem', {
    //     remUnit: 75
    // }, 'append'),
    rExt: '.css'
});
fis.match('*.scss', {
    parser: fis.plugin('node-sass-qt'),
    rExt: '.css'
});

// fis3 中预设的是 fis-components，这里使用 fis3-hook-node_modules，所以先关了。
fis.unhook('components');
fis.hook('node_modules');

// 设置成是模块化 js
fis.match('/{node_modules,app}/**.{js,jsx}', {
    isMod: true
});

fis.match('*.{js,es,es6,jsx,ts,tsx}', {
    // 支持直接 require 'xxx.css' 直接 require 'xxx.png'等文件
    preprocessor: [
        fis.plugin('js-require-file'),
        fis.plugin('js-require-css')
    ]
});

fis.match('::package', {
    // 需要 npm install fis3-packager-deps-pack --save-dev
    // 测试环境发布相对目录，线上走CDN
    // packager: fis.plugin('deps-pack', {
    //     // 将 /node_module 中的依赖项，打包成 static/pkg/webappreact/third.js
    //     'static/pkg/third.js': [
    //         // 将 /app/index.js 的依赖项加入队列，包含了 /app 中的依赖项 和 /node_modules 中的依赖项
    //         '/app/index.jsx:deps',
    //         // 移除 /app/** 只保留 /node_module 中的依赖项
    //         '!/app/**'
    //     ],
    //
    //     // 将几个直接以<script>方式引用到 html 中的 js 文件（例如 fastclick.js、mod.js、统计的js等）打包成一个 lib.js ，减少http请求
    //     // js工具包，一般单独放在 static 文件夹下面
    //     'static/pkg/lib.js': '/static/**.js',
    //
    //     // 在此打包 css，因为 fis.match('::packager') 配置的打包优先级更高
    //     'static/pkg/aio.css': '*.{less,css}',
    //
    //     // 将 /app 中的依赖项，打包成 static/pkg/app.js
    //     'static/pkg/app.js': [
    //         // 将 /app/index.jsx 加入队列
    //         '/app/index.jsx',
    //         // 将 /app/index/jsx 的所有依赖项加入队列，因为第一步中已经命中了 /node_module 中的所有依赖项，因此这里只打包 /app 中的依赖项
    //         '/app/index.jsx:deps'
    //     ],
    //
    //
    //     // 不好使
    //     'static/pkg/index.html': '/index.html'
    // }),

    // 本项目为纯前端项目，所以用 loader 编译器加载 如果用后端运行时框架，请不要使用
    postpackager: fis.plugin('loader', {
        // source map 内联
        useInlineMap: true
    })
});

fis.media('test')
    .match('*', {
        // release: '/jello$0',
        deploy: fis.plugin('local-deliver', {
            to: function () {
                var date = nowDate;
                var dateStr = date.getFullYear() + '_' +
                    buqilingwei(date.getMonth() + 1) + '_' +
                    buqilingwei(date.getDate()) + '_' +
                    buqilingwei(date.getHours()) + buqilingwei(date.getMinutes()) + buqilingwei(date.getSeconds());
                return '../../output/teamAuth/(prod)workflow_' + dateStr + '_ecs';
            }()

        })
    });

fis.media('publish')
    .match('*.{js,jsx}', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.{css,less}', {
        optimizer: fis.plugin('clean-css')
    })
    // .match('*.{js,css,jsx,es6,less}', {
    //     domain: ['//cdn.baidu.com']
    // })
    // 定义modile的id，即打包之后的代码中的 `defind('node_module/react/lib/index.js')`这种相对路径改为 `define('xxxxxx')` 这种ID的形式
    // 这个配置是上线之后又作为优化配置上去的，会是打包的代码更小一些
    // .match('/{node_modules,app}/**.{js,jsx}', {
    //     moduleId: function(m, path) {
    //         return fis.util.md5(path);
    //     }
    // })
    .match('*.{js,css,png,jpg,jpeg,gif}', {
        useHash: true
    })
    .match('::package', {

        // 更多用法请参考： https://github.com/fex-team/fis3-packager-deps-pack
        packager: fis.plugin('deps-pack', {
            'pkg/index.js': /*当有多条时，请用数组*/[
                'app/index.jsx',
                'app/index.jsx:deps', // 以及其所有依赖
            ],
            'pkg/libs.css': /*当有多条时，请用数组*/[
                'app/index.jsx:deps'
            ],
            'pkg/libs.js': /*当有多条时，请用数组*/[
                'static/lib/**.js' // 以及其所有依赖
            ],
            'pkg/app.css': /*当有多条时，请用数组*/[
                '/qtui/**.css',
                'static/style/common.less',
                'static/style/iconfont.scss',
                'app/**.less',
                'app/**.scss',
            ]
        })
    });

fis.media('publish-dev')
    .match('*.{js,jsx}', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.{css,less}', {
        optimizer: fis.plugin('clean-css'),
        useHash: true
    })
    // .match('*.{js,css,jsx,es6,less}', {
    //     domain: ['//cdn.baidu.com']
    // })
    // 定义modile的id，即打包之后的代码中的 `defind('node_module/react/lib/index.js')`这种相对路径改为 `define('xxxxxx')` 这种ID的形式
    // 这个配置是上线之后又作为优化配置上去的，会是打包的代码更小一些
    .match('/{node_modules,app}/**.{js,jsx}', {
        moduleId: function (m, path) {
            return fis.util.md5(path);
        }
    })
    .match('*.{js,css,png,jpg,jpeg,gif}', {
        useHash: true
    })
    .match('::package', {

        // 更多用法请参考： https://github.com/fex-team/fis3-packager-deps-pack
        packager: fis.plugin('deps-pack', {
            'pkg/index.js': /*当有多条时，请用数组*/[
                'app/index.jsx',
                'app/index.jsx:deps', // 以及其所有依赖
            ],
            'pkg/libs.css': /*当有多条时，请用数组*/[
                'app/index.jsx:deps'
            ],
            'pkg/libs.js': /*当有多条时，请用数组*/[
                'static/lib/**.js' // 以及其所有依赖
            ],
            'pkg/app.css': /*当有多条时，请用数组*/[
                '/qtui/**.css',
                'static/style/common.less',
                'static/style/iconfont.scss',
                'app/**.less',
                'app/**.scss',
            ]
        })
    })
    .match('*', {
        // release: '/jello$0',
        deploy: fis.plugin('local-deliver', {
            to: function () {
                var date = nowDate;
                var dateStr = date.getFullYear() + '_' +
                    buqilingwei(date.getMonth() + 1) + '_' +
                    buqilingwei(date.getDate()) + '_' +
                    buqilingwei(date.getHours()) + buqilingwei(date.getMinutes()) + buqilingwei(date.getSeconds());
                return '../output/workflow/(dev)workflow_' + dateStr + '_ecs';
            }()

        })
    })
    .match('{static/**,pkg/**}', {
        deploy: [
            fis.plugin('local-deliver', {
                to: function () {
                    var date = nowDate;
                    var dateStr = date.getFullYear() + '_' +
                        buqilingwei(date.getMonth() + 1) + '_' +
                        buqilingwei(date.getDate()) + '_' +
                        buqilingwei(date.getHours()) + buqilingwei(date.getMinutes()) + buqilingwei(date.getSeconds());
                    return '../output/workflow/(dev)workflow_' + dateStr + '_cdn';
                }()

            }),
            fis.plugin('smart-alioss', {
                accessKey: 'LTAIwavU5vqOUCc6',
                secretKey: 'zsl9reCGCxLtsDa43IZspzZIlMwv8e',
                bucket: 'qtstatic',
                to: '/workflow/dev'
            })
        ],
        domain: '//static.qingtui.im/workflow/dev'
    })
    .match('index.html', {
        deploy: [
            fis.plugin('local-deliver', {
                to: function () {
                    var date = nowDate;
                    var dateStr = date.getFullYear() + '_' +
                        buqilingwei(date.getMonth() + 1) + '_' +
                        buqilingwei(date.getDate()) + '_' +
                        buqilingwei(date.getHours()) + buqilingwei(date.getMinutes()) + buqilingwei(date.getSeconds());
                    return '../output/workflow/(dev)workflow_' + dateStr + '_cdn';
                }()

            }),
            fis.plugin('http-push', {
                receiver: 'http://172.16.101.46:8999/receiver',
                to: '/apps-release/application/h5/small_tools_workflow' // 注意这个是指的是测试机器的路径，而非本地机器
            })
        ]
    });

fis.media('publish-test')
    .match('/app/constants/urls.js', {
        parser: [
            function (content, file, settings) {
                //预处理时,替换测试环境地址为正式环境地址
                content = content.replace('export const BASE_REQ = \'\'', 'export const BASE_REQ = \'https://testqtoa.qingtui.im/workflow/api\'');
                return content;
            },
            fis.plugin('babel-5.x', {
                blacklist: ['regenerator'],
                optional: ['es7.decorators', 'es7.classProperties'],
                stage: 2, // 为了支持解构赋值
                sourceMaps: true
            })],
        rExt: '.js'
    })
    .match('*.{js,jsx}', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.{css,less}', {
        optimizer: fis.plugin('clean-css'),
        useHash: true
    })
    // .match('*.{js,css,jsx,es6,less}', {
    //     domain: ['//cdn.baidu.com']
    // })
    // 定义modile的id，即打包之后的代码中的 `defind('node_module/react/lib/index.js')`这种相对路径改为 `define('xxxxxx')` 这种ID的形式
    // 这个配置是上线之后又作为优化配置上去的，会是打包的代码更小一些
    .match('/{node_modules,app}/**.{js,jsx}', {
        moduleId: function (m, path) {
            return fis.util.md5(path);
        }
    })
    .match('*.{js,css,png,jpg,jpeg,gif}', {
        useHash: true
    })
    .match('::package', {

        // 更多用法请参考： https://github.com/fex-team/fis3-packager-deps-pack
        packager: fis.plugin('deps-pack', {
            'pkg/index.js': /*当有多条时，请用数组*/[
                'app/index.jsx',
                'app/index.jsx:deps', // 以及其所有依赖
            ],
            'pkg/libs.css': /*当有多条时，请用数组*/[
                'app/index.jsx:deps'
            ],
            'pkg/libs.js': /*当有多条时，请用数组*/[
                'static/lib/**.js' // 以及其所有依赖
            ],
            'pkg/app.css': /*当有多条时，请用数组*/[
                '/qtui/**.css',
                'static/style/common.less',
                'static/style/iconfont.scss',
                'app/**.less',
                'app/**.scss',
            ]
        })
    })
    .match('*', {
        // release: '/jello$0',
        deploy: fis.plugin('local-deliver', {
            to: function () {
                var date = nowDate;
                var dateStr = date.getFullYear() + '_' +
                    buqilingwei(date.getMonth() + 1) + '_' +
                    buqilingwei(date.getDate()) + '_' +
                    buqilingwei(date.getHours()) + buqilingwei(date.getMinutes()) + buqilingwei(date.getSeconds());
                return '../output/workflow/(test)workflow_' + dateStr + '_ecs';
            }()

        })
    })
    .match('{static/**,pkg/**}', {
        deploy: [
            fis.plugin('local-deliver', {
                to: function () {
                    var date = nowDate;
                    var dateStr = date.getFullYear() + '_' +
                        buqilingwei(date.getMonth() + 1) + '_' +
                        buqilingwei(date.getDate()) + '_' +
                        buqilingwei(date.getHours()) + buqilingwei(date.getMinutes()) + buqilingwei(date.getSeconds());
                    return '../output/workflow/(test)workflow_' + dateStr + '_cdn';
                }()

            }),
            fis.plugin('smart-alioss', {
                accessKey: 'LTAIwavU5vqOUCc6',
                secretKey: 'zsl9reCGCxLtsDa43IZspzZIlMwv8e',
                bucket: 'qtstatic',
                to: '/workflow/test'
            })
        ],
        domain: '//static.qingtui.im/workflow/test'
    });

fis.media('cicd-test')
    .match('/app/constants/urls.js', {
        parser: [
            function (content, file, settings) {
                //预处理时,替换测试环境地址为正式环境地址
                content = content.replace('export const BASE_REQ = \'\'', 'export const BASE_REQ = \'https://testqtoa.qingtui.im/workflow/api\'');
                return content;
            },
            fis.plugin('babel-5.x', {
                blacklist: ['regenerator'],
                optional: ['es7.decorators', 'es7.classProperties'],
                stage: 2, // 为了支持解构赋值
                sourceMaps: true
            })],
        rExt: '.js'
    })
    .match('*.{js,jsx}', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.{css,less}', {
        optimizer: fis.plugin('clean-css'),
        useHash: true
    })
    // .match('*.{js,css,jsx,es6,less}', {
    //     domain: ['//cdn.baidu.com']
    // })
    // 定义modile的id，即打包之后的代码中的 `defind('node_module/react/lib/index.js')`这种相对路径改为 `define('xxxxxx')` 这种ID的形式
    // 这个配置是上线之后又作为优化配置上去的，会是打包的代码更小一些
    .match('/{node_modules,app}/**.{js,jsx}', {
        moduleId: function (m, path) {
            return fis.util.md5(path);
        }
    })
    .match('*.{js,css,png,jpg,jpeg,gif}', {
        useHash: true
    })
    .match('::package', {

        // 更多用法请参考： https://github.com/fex-team/fis3-packager-deps-pack
        packager: fis.plugin('deps-pack', {
            'pkg/index.js': /*当有多条时，请用数组*/[
                'app/index.jsx',
                'app/index.jsx:deps', // 以及其所有依赖
            ],
            'pkg/libs.css': /*当有多条时，请用数组*/[
                'app/index.jsx:deps'
            ],
            'pkg/libs.js': /*当有多条时，请用数组*/[
                'static/lib/**.js' // 以及其所有依赖
            ],
            'pkg/app.css': /*当有多条时，请用数组*/[
                'app/components/qtui/qtui.less',
                'static/styles/common.less',
                'static/styles/iconfont.scss',
                'app/**.less',
                'app/**.scss',
            ]
        })
    })
    .match('*', {
        // release: '/jello$0',
        deploy: [
            fis.plugin('tar', {
                filename: 'fe-sa-public-workflow-' + fis.get('project.version') + 'test.tar.gz'
            }),
            fis.plugin('local-deliver', {
                to: './output'

            })
        ]
    })
    .match('{static/**,pkg/**}', {
        deploy: [
            fis.plugin('smart-alioss', {
                accessKey: 'LTAIwavU5vqOUCc6',
                secretKey: 'zsl9reCGCxLtsDa43IZspzZIlMwv8e',
                bucket: 'qtstatic',
                to: '/workflow/test'
            })
        ],
        domain: '//static.qingtui.im/workflow/test'
    });

fis.media('cicd-qa')
    .match('/app/constants/urls.js', {
        parser: [
            function (content, file, settings) {
                //预处理时,替换测试环境地址为正式环境地址
                content = content.replace('export const BASE_REQ = \'\'', 'export const BASE_REQ = \'https://qaqtoa.qingtui.im/workflow/api\'');
                return content;
            },
            fis.plugin('babel-5.x', {
                blacklist: ['regenerator'],
                optional: ['es7.decorators', 'es7.classProperties'],
                stage: 2, // 为了支持解构赋值
                sourceMaps: true
            })],
        rExt: '.js'
    })
    .match('*.{js,jsx}', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.{css,less}', {
        optimizer: fis.plugin('clean-css'),
        useHash: true
    })
    // .match('*.{js,css,jsx,es6,less}', {
    //     domain: ['//cdn.baidu.com']
    // })
    // 定义modile的id，即打包之后的代码中的 `defind('node_module/react/lib/index.js')`这种相对路径改为 `define('xxxxxx')` 这种ID的形式
    // 这个配置是上线之后又作为优化配置上去的，会是打包的代码更小一些
    .match('/{node_modules,app}/**.{js,jsx}', {
        moduleId: function (m, path) {
            return fis.util.md5(path);
        }
    })
    .match('*.{js,css,png,jpg,jpeg,gif}', {
        useHash: true
    })
    .match('::package', {

        // 更多用法请参考： https://github.com/fex-team/fis3-packager-deps-pack
        packager: fis.plugin('deps-pack', {
            'pkg/index.js': /*当有多条时，请用数组*/[
                'app/index.jsx',
                'app/index.jsx:deps', // 以及其所有依赖
            ],
            'pkg/libs.css': /*当有多条时，请用数组*/[
                'app/index.jsx:deps'
            ],
            'pkg/libs.js': /*当有多条时，请用数组*/[
                'static/lib/**.js' // 以及其所有依赖
            ],
            'pkg/app.css': /*当有多条时，请用数组*/[
                'app/components/qtui/qtui.less',
                'static/styles/common.less',
                'static/styles/iconfont.scss',
                'app/**.less',
                'app/**.scss',
            ]
        })
    })
    .match('*', {
        // release: '/jello$0',
        deploy: [
            fis.plugin('tar', {
                filename: 'fe-sa-public-workflow-' + fis.get('project.qaVersion') + '-qa.tar.gz'
            }),
            fis.plugin('local-deliver', {
                to: './output'

            })
        ]
    })
    .match('{static/**,pkg/**}', {
        deploy: [
            fis.plugin('smart-alioss', {
                accessKey: 'LTAIwavU5vqOUCc6',
                secretKey: 'zsl9reCGCxLtsDa43IZspzZIlMwv8e',
                bucket: 'qtstatic',
                to: '/workflow/qa'
            })
        ],
        domain: '//static.qingtui.im/workflow/qa'
    });
    fis.media('release-oss')
    .match('/app/constants/urls.js', {
        parser: [
            fis.plugin('babel-5.x', {
                blacklist: ['regenerator'],
                optional: ['es7.decorators', 'es7.classProperties'],
                stage: 2, // 为了支持解构赋值
                sourceMaps: true
            })],
        rExt: '.js'
    })
    .match('*.{js,jsx}', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.{css,less}', {
        optimizer: fis.plugin('clean-css'),
        useHash: true
    })
    // .match('*.{js,css,jsx,es6,less}', {
    //     domain: ['//cdn.baidu.com']
    // })
    // 定义modile的id，即打包之后的代码中的 `defind('node_module/react/lib/index.js')`这种相对路径改为 `define('xxxxxx')` 这种ID的形式
    // 这个配置是上线之后又作为优化配置上去的，会是打包的代码更小一些
    .match('/{node_modules,app}/**.{js,jsx}', {
        moduleId: function (m, path) {
            return fis.util.md5(path);
        }
    })
    .match('*.{js,css,png,jpg,jpeg,gif}', {
        useHash: true
    })
    .match('::package', {

        // 更多用法请参考： https://github.com/fex-team/fis3-packager-deps-pack
        packager: fis.plugin('deps-pack', {
            'pkg/index.js': /*当有多条时，请用数组*/[
                'app/index.jsx',
                'app/index.jsx:deps', // 以及其所有依赖
            ],
            'pkg/libs.css': /*当有多条时，请用数组*/[
                'app/index.jsx:deps'
            ],
            'pkg/libs.js': /*当有多条时，请用数组*/[
                'static/lib/**.js' // 以及其所有依赖
            ],
            'pkg/app.css': /*当有多条时，请用数组*/[
                'app/components/qtui/qtui.less',
                'static/styles/common.less',
                'static/styles/iconfont.scss',
                'app/**.less',
                'app/**.scss',
            ]
        })
    })
    .match('*', {
        // release: '/jello$0',
        deploy: [
            fis.plugin('tar', {
                filename: 'fe-sa-public-workflow-' + fis.get('project.qaVersion') + '-qa.tar.gz'
            }),
            fis.plugin('local-deliver', {
                to: './output'

            })
        ]
    })
    .match('*', {
        deploy: [
            fis.plugin('smart-alioss', {
                accessKey: 'EUuKVDZjFwmfYem6',
                secretKey: 'y6d0pnZ9BsM3yVEWAHiXWErzKdNXtM',
                bucket: 'zyxdick6',
                to: ''
            })
        ]
    });