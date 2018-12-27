var $ = require('jquery');
var Toastr = require('toastr');
var Loading = require('loading');
var Env = require('env');
var _loading;

var widget = {

    request: function (params) {

        if (!$.isPlainObject(params)) return;

        if (!params.silence) {
            _loading = new Loading({
                delay: params['delay'],
                modal: params['modal']
            })
            _loading.show(); // 显示loading
        }

        var _path;

        var options = {
            headers: {},
            type: 'get',
            contentType: 'application/json',
            dataType: 'json',
            url: '',
            data: null,
            success: null,
            error: null,
            timeout: 200000
        };

        options = $.extend(options, params);


        // options.headers['X-Env'] = Env.x_env;
        options.headers['X-Requested-With'] = 'XMLHttpRequest';


        var o = $.extend({}, options);

        if ((o.type).toLowerCase() != 'get') {
            o.processData = false;
            if (o.data && typeof (o.data) != 'string') {
                o.data = JSON.stringify(o.data);
            }
        }

        o.success = function (res) {
            if (res.code != 0 && !(options.iserrorlog)) {
                var errorData = {
                    "page_url": window.location.href,
                    "event_type": 'success',
                    "request_param": options,
                    "response_data": res
                }
                errorData.headers = options.headers;
                errorlog.ajaxlog(errorData);
            }
            if (options.success) options.success(res);
        };

        o.error = function (err) {
            if (!(options.iserrorlog)) {
                var errorData = {
                    "page_url": window.location.href,
                    "event_type": 'error',
                    "request_param": options,
                    "response_data": err
                }
                errorData.headers = options.headers;
                errorlog.ajaxlog(errorData);
            }
            if (options.error) options.error(err);

            if (!params.silence) {
                var _toastr = new Toastr({
                    text: '网络错误，请稍后再试！',
                    iconType: "fail"
                });
                _toastr.show();
            }

        };

        o.complete = function (xhr, staus) {
            if (!params.silence) {
                _loading.hide();
            }

            if (options.complete) options.complete(xhr, staus);
        }

        return $.ajax(o);
    }
};
/*
 *   当ajax请求错误时，上传错误日志
 *   "page_url" 当前访问的页面
 *   "error_type": 错误类型，success code!=0的错误信息
 *   "request_param": 请求的数据
 *   "response_data": 响应的数据
 */
var errorlog = {
    ajaxlog: function (errorData) {
        widget.request({
            url: Env.apiHost + '/v1/supports/ajaxlog/',
            type: 'POST',
            headers: errorData.headers,
            silence: true,
            iserrorlog: true, //此类型的请求如果再错误就不在记录
            data: {
                "page_url": errorData.page_url,
                "event_type": errorData.event_type,
                "request_param": errorData.request_param,
                "response_data": errorData.response_data
            },
            success: function (res) {
                if (res.code == 0) {

                } else if (res.code != 0) {
                    // alert(res.message);
                }
            },
            error: function () {
                // alert('您的网络断了');
                new Toastr({
                    text: '您的网络断了',
                    iconType: "fail",
                    showicon: false
                  }).show();
            }
        });
    }
}
module.exports = widget;