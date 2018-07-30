module.exports = function (req, res, next) {
    var workflow = [];
    workflow.push({
        'createTime': 1497580794000,
        'flowName': '请假',
        'flowNo': '201606182070923529',
        'status': 2,
        'submitter': '鬼谷',
        'updateTime': 1497581794000
    });
    for (var i = 0; i < 10; i++) {
        var ram = function () {
            var s = Math.random().toString();
            s = s.replace('0.', '');
            return parseInt(s.substr(0, 8));
        }();
        workflow.push({
            'createTime': 1497580794000 + ram,
            'flowName': '请假' + ram,
            'flowNo': '2016061820' + ram,
            'status': i % 4 + 1,
            'submitter': '鬼谷',
            'updateTime': 1497581794000
        });
    }
    res.json({code: 50001, message: 'sssss'});
};
