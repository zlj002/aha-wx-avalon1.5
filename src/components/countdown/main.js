/** 显示倒计时
 * @params:
 * selector: 显示倒计时的dom
 * countsecond: 剩余的时间秒
 * callback: 倒计时结束后的回调函数（可选）
 */

function CountDown(selector, countsecond, callback, templet, isonce) {
    if (!(this instanceof CountDown)) {
        return new CountDown(selector, countsecond, callback, templet, isonce);
    }

    this.el = !selector ? null : $(selector);
    this.count = parseInt(countsecond) && parseInt(countsecond) > 0 ? parseInt(countsecond) : 0;
    this.handle = callback && (typeof callback == "function") ? callback : null;
    this.timer = null;
    this.templet = templet ? templet : '{{day}}天{{hour}}小时{{minutes}}分{{seconds}}秒';
    this.isonce = !!isonce; //仅运行一次

    this.init();
}

CountDown.prototype = {
    constructor: CountDown,

    init: function () {

        var _self = this;



        clearInterval(this.timer);
        this.timer = null;

        if (!_self.isonce) this.timer = setInterval(_count_handle, 1000);

        _count_handle();

        function _count_handle() {

            var _need_count_day = false;

            if (_self.templet.indexOf('{{day}}') > -1) {
                _need_count_day = true;
            }

            var _day = parseInt(_self.count / (60 * 60 * 24)),
                _hours = _need_count_day ? parseInt(_self.count % (60 * 60 * 24) / (60 * 60)) : parseInt(_self.count / (60 * 60)),
                _minutes = parseInt(_self.count % (60 * 60) / 60),
                _seconds = _self.count % 60;

            if (_self.el && _self.el.length > 0) {
                _self.el.each(function () {
                    var _this = $(this);

                    _hours = _hours < 10 ? "0" + _hours : _hours;
                    _minutes = _minutes < 10 ? "0" + _minutes : _minutes;
                    _seconds = _seconds < 10 ? "0" + _seconds : _seconds;

                    var _html_str = (((_self.templet.replace('{{day}}', _day)).replace('{{hour}}', _hours)).replace('{{minutes}}', _minutes)).replace('{{seconds}}', _seconds);

                    _this.html(_html_str);

                });
            }


            if (_self.count <= 0) {
                clearInterval(_self.timer);
                _self.timer = null;
                if (_self.handle) _self.handle(_self.el);
                return;
            }
            _self.count--;


        }

    }

}

module.exports = CountDown;