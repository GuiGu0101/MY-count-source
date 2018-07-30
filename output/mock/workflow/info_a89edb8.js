module.exports = function (req, res, next) {
    var template = [
        {
            name: '请假类型',
            type: 'select',
            data: [
                {
                    label: '事假',
                    value: 0
                }, {
                    label: '病假',
                    value: 1
                }

            ],
            require: true,
            key: 'x1'
        }, {
            name: '开始时间',
            type: 'date',
            data: 0,
            require: true,
            key: 'x2'
        }, {
            name: '结束时间',
            type: 'date',
            data: 1,
            require: true,
            key: 'x3'
        }, {
            name: '共计天数',
            type: 'number',
            require: true,
            key: 'x4'
        }, {
            name: '请假事由',
            type: 'textarea',
            require: true,
            key: 'x5'
        }, {
            name: '内嵌字段',
            type: 'inner',
            data: [
                {
                    name: '字段1',
                    type: 'select',
                    data: [
                        {
                            label: '事假',
                            value: 0
                        }, {
                            label: '病假',
                            value: 1
                        }

                    ],
                    require: true,
                    key: 'n1'
                }, {
                    name: '请假事由',
                    type: 'textarea',
                    require: true,
                    key: 'n2'
                }
            ],
            key: 'x6'
        },
        {
            name: '开关',
            type: 'switch',
            require: true,
            key: 'x7'
        }
    ];
    var data = {
        'x1': 0,
        'x2': 1497581794000,
        'x3': 1497584794000,
        'x4': 5,
        'x5': '外出办事',
        'x6': [
            {
                n1: 1,
                n2: 'sssssss'
            }, {
                n1: 0,
                n2: '0sssssss'
            }
        ],
        'x7': 0
    };
    var app = [
        {
            'approver': {
                'name': 'zifu',
                'id': 'xxx',
                'require': true
            },
            'name': 'ceshi 1'
        }
    ];
    var ccList = [
        {
            'name': 'zifu',
            'id': 'xxx',
            'require': false
        }, {
            'name': 'zifu',
            'id': 'xxx',
            'require': false
        }, {
            'name': 'zifu',
            'id': 'xxx',
            'require': false
        }, {
            'name': 'zifu',
            'id': 'xxx',
            'require': false
        },
    ];
    res.json({
        'step': app,
        'ccList': JSON.stringify(ccList),
        'auth': 3,
        'flowInfo': {
            'flowData': JSON.stringify(data),
            'flowNo': '201606182070923529',
            'launcher': {
                'accountId': '测试内容325v1',
                'name': '唯一',
                'avatar': 'https://avatar-qingtui-im.alikunlun.com/default/v1/default_avatar_27.png@!84x'
            },
            'template': JSON.stringify(template),
            'status': 4
        },
        'flowRecords': [
            {
                'user': {
                    'accountId': '测试内容jx782',
                    'name': '测试内容测试内容测试内容测试内容测试内容测试内容',
                    'isDelete': 0,
                    'require': true
                },
                'content': '测试内容测试内容测试内容测试内容测试内容测试内容测试内容',
                'status': 3,
                'stepName': 1,
                'timestamp': 1497581794000
            }, {
                'user': {
                    'accountId': '测试内容325v',
                    'name': '测试内容测试内容测试内容测试内容测试内容测试内容',
                    'isDelete': 0,
                    'require': true
                },
                'content': '2',
                'status': 3,
                'stepName': 1,
                'timestamp': 1497581794000
            }, {
                'user': {
                    'accountId': '测试内容325v',
                    'name': '测试内容测试内容测试内容测试内容测试内容测试内容',
                    'isDelete': 0,
                    'require': true
                },
                'content': '',
                'status': 3,
                'stepName': 's2',
                'timestamp': 1497581794000
            }, {
                'user': {
                    'accountId': '测试内容325v',
                    'name': '测试内容测试内容测试内容测试内容测试内容测试内容',
                    'isDelete': 0,
                    'require': true
                },
                'content': '4',
                'status': 3,
                'stepName': 's2',
                'timestamp': 1497581794000
            }, {
                'user': {
                    'accountId': '测试内容325v',
                    'name': '测试内容测试内容测试内容测试内容测试内容测试内容',
                    'isDelete': 1,
                    'require': false
                },
                'content': '',
                'status': 4,
                'stepName': 's2',
                'timestamp': 0
            },
            {
                'user': {
                    'accountId': '测试内容325v',
                    'name': '测试内容测试内容测试内容测试内容测试内容测试内容',
                    'isDelete': 0,
                    'require': true
                },
                'content': '',
                'status': 0,
                'stepName': 's2',
                'timestamp': 0
            }
        ]
    });
};
