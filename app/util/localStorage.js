// 操作 localstorage

export default {
    getItem(key) {
        let value;
        try {
            value = localStorage.getItem(key);
        } catch (ex) {
            console.error('localStorage.getItem报错, ', ex.message);
        } finally {
            if (!!value) {
                value = JSON.parse(value);
                value = value.data;
            }
            return value;
        }
    },
    setItem(key, value) {
        value = {
            data: value
        };
        try {
            // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
            localStorage.setItem(key, JSON.stringify(value));
        } catch (ex) {
            console.error('localStorage.setItem报错, ', ex.message);
        }
    },
    delItem(key) {
        try {
            // ios safari 无痕模式下，直接使用 localStorage.removeItem 会报错
            localStorage.removeItem(key);
        } catch (ex) {
            console.error('localStorage.delItem报错, ', ex.message);
        }
    }
};
