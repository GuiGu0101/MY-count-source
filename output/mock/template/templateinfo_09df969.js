module.exports = function (req, res, next) {
    var template = [
        {
            name: '开始时间',
            type: 'text',
            require: false,
            key: 'x0'
        },
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
            type: 'radio',
            require: true,
            data: [
                {
                    label: '事假',
                    value: 0
                }, {
                    label: '病假',
                    value: 1
                }

            ],
            key: 'x21'
        }, {
            name: '开始时间',
            type: 'date',
            data: 0,
            require: false,
            key: 'x22'
        }, {
            name: '开始时间',
            type: 'switch',
            require: true,
            key: 'x23'
        }, {
            name: '开始时间',
            type: 'checkbox',
            require: true,
            data: [
                {
                    label: '事假',
                    value: 0
                }, {
                    label: '病假',
                    value: 1
                }

            ],
            key: 'x24'
        }, {
            name: '结束时间',
            type: 'date',
            data: 1,
            require: false,
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
        }
    ];
    res.json({
        'ccList': [],
        'disabled': true,
        'id': '100001',
        'name': '请假',
        'serverTime': 13576,
        'step': [
            {
                'approver': {
                    'accountId': '测试内容w992',
                    'name': '测试内容pw26',
                    'isDelete': 1
                },
                'name': '测试内容x2ce'
            }, {
                'approver': null,
                'name': '测试内容x2ce'
            }
        ],
        'template': JSON.stringify(template)
    });
};
