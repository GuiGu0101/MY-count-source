module.exports = function (req, res, next) {
    var workflow = [];
    workflow.push({
        'createTime': 1497580794000,
        'flowName': '请假',
        'flowNo': '201606182070923529',
        'status': 2,
        'submitter': '鬼谷',
        'updateTime': 1497581794000,
        'read': true
    });
    for (var i = 0; i < 10; i++) {
        var ram = function () {
            var s = Math.random().toString();
            s = s.replace('0.', '');
            return parseInt(s.substr(0, 8));
        }();
        workflow.push({
            'createTime': 1497580794000 + ram,
            'flowName': '请假',
            'flowNo': '2016061820' + ram,
            'status': i % 5,
            'submitter': '鬼谷',
            'updateTime': 1497581794000,
            'read': i % 2 === 0
        });
    }


    res.json({'count': 11, 'size': 10, 'total': 30, 'workflows': workflow});
};
