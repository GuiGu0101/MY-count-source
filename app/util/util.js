/*
 工具类
 */

var Utils = {

    // 获取url中所有的参数
    getParams(url) {
        var vars = {},
            hash, hashes, i;

        url = url || window.location.href;

        // 没有参数的情况
        if (url.indexOf('?') == -1) {
            return vars;
        }

        hashes = url.slice(url.indexOf('?') + 1).split('&');

        for (i = 0; i < hashes.length; i++) {
            if (!hashes[i] || hashes[i].indexOf('=') == -1) {
                continue;
            }
            hash = hashes[i].split('=');
            if (hash[1]) {
                vars[hash[0]] = (hash[1].indexOf('#') != -1) ? hash[1].slice(0, hash[1].indexOf('#')) : hash[1];
            }
        }
        return vars;
    },

    // 获取指定name的参数
    getParam(name, url) {
        return this.getParams(url)[name];
    },

    getCurrentParam(name) {
        return this.getParam(name, location.href);
    },

    // 设置头部信息及右上角按钮事件
    setTitleBar(cfg = {}) {
        document.title = cfg.titleText;
    },

    // 封装toast方法
    showToast(text, speed = 'short') {
        window.WMApp.nui.toast({
            text: text,
            duration: speed
        });
    },

    alert(obj) {
        alert(JSON.stringify(obj));
    },
    formatTimeByInput(str = '', pattern) {
        if (str !== '') {
            const dateStr = str.match(/\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}/);
            if (dateStr) {
                const date = new Date();
                const dateStrGroup = dateStr[0].split('T');
                const dateAtDay = dateStrGroup[0].split('-');
                date.setFullYear(dateAtDay[0]);
                date.setMonth(parseInt(dateAtDay[1]) - 1);
                date.setDate(dateAtDay[2]);
                if (dateStrGroup[1]) {
                    const dateAtTime = dateStrGroup[1].split(':');
                    date.setHours(dateAtTime[0]);
                    date.setMinutes(dateAtTime[1]);
                }
                return this.formatTime(date, pattern);
            } else {
                return '不合法的日期格式';
            }

        } else {
            return this.formatTime(Date.now(), pattern);
        }

    },
    formatTime(datetime = 0, pattern) {
        let chenck = Number(datetime);
        let time1;
        if (!isNaN(chenck)) {
            time1 = chenck;
        } else {
            time1 = new Date(datetime).getTime();
        }
        let date = new Date(time1);
        var o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds(), //毫秒,
            'W': function (week) {
                var str;
                switch (week) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        str = week;
                        break;
                    default:
                        str = '';
                }
                return str;
            }(date.getDay())
        };
        if (/(y+)/.test(pattern))
            pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '')
                .substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(pattern))
                pattern = pattern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k])
                    .substr(('' + o[k]).length)));
        return pattern;
    },
    isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    },
    tarnsNoToStepStr(no) {
        let str = '';
        switch (no) {
            case 1:
                str = '一';
                break;
            case 2:
                str = '二';
                break;
            case 3:
                str = '三';
                break;
            case 4:
                str = '四';
                break;
            case 5:
                str = '五';
                break;
            case 6:
                str = '六';
                break;
            case 7:
                str = '七';
                break;
            case 8:
                str = '八';
                break;
            case 9:
                str = '九';
                break;
            case 10:
                str = '十';
                break;
        }
        return '第' + str + '步';
    },
    getStringLength(str) {
        return str.replace(/[\u0391-\uFFE5]/g, 'aa').length;  //先把中文替换成两个字节的英文，在计算长度
    },
    checkStringLength(str, length){
        // true 代表超出长度，false代表未超出长度
        return this.getStringLength(str) > length;
    }


};

export default Utils;
