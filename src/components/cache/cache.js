/*
页面需要保存临时数据时使用
使用时先调用init 方法指定当前页面的存储key
再调用相关方法取值修改值
*/
var $ = require('jquery');

function Cache(key, type) {
    this.init(key, type);
}

Cache.prototype = {

    init: function (key, type) {

        if (key === undefined) throw (new Error(8000, 'has not cache key'));

        this.key = 'cache_' + key;

        if (type == 'session' && window.sessionStorage) {
            this.cache = window.sessionStorage;
        } else if (window.localStorage) {
            this.cache = window.localStorage;
        } else {
            this.cache = {};
        }
    },
    /*
    保存当前会话需要保存的数据，格式要求必须为json
    */
    store: function (_name, _val) {
        if (!_name && typeof _name != 'string') return;

        var _data = this._format();

        _data[_name] = _val;
        this.cache[this.key] = JSON.stringify(_data);
    },

    remove: function (_name) {
        if (!_name && typeof _name != 'string') return false;

        var _data = this._format();

        if (_name in _data) {

            delete _data[_name];

            if ($.isEmptyObject(_data)) {
                delete this.cache[this.key];
            } else {
                this.cache[this.key] = JSON.stringify(_data);
            }

            return true;
        }
    },

    clear: function () {
        delete this.cache[this.key];
    },

    fetch: function (_name) {
        if (!_name && typeof _name != 'string') return null;

        var _data = this._format();

        if (_name in _data) {
            return _data[_name]
        } else {
            return null;
        }
    },

    val: function () {
        return this.cache[this.key] ? JSON.parse(this.cache[this.key]) : null;
    },

    _format: function () {
        var _data = this.cache[this.key] && $.isPlainObject(JSON.parse(this.cache[this.key])) ? JSON.parse(this.cache[this.key]) : {};
        return _data;
    }
}
module.exports = Cache;