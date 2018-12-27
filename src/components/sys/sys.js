var Env = require('env');
var Ajax = require('ajax');
var User = require('user');
var Toastr = require('toastr');
var Cache = require('cache');
var Sys = {
    request: function(params) {
        if (params.url && params.url.indexOf(Env.apiHost) < 0) {
            params.url = Env.apiHost + params.url;
        }
        //不同系统cookies前缀不同
        var currentUser = User.getCurrentUserInfoByCookie(params.cookiePrefix);
        if (currentUser.basic_auth) {
            if (!params.headers) {
                params.headers = {};
            }
            params.headers['Authorization'] = 'Basic ' + currentUser.basic_auth;
        }
        return Ajax.request(params);
    },
    requestByApp: function(params) {
        params.cookiePrefix = 'app_';
        return Sys.request(params);
    },
    getCurrentUserInfo: function(callback) {
        var user = User.getCurrentUserInfoByCookie();
        callback(user);
    },
    currentActivity: {},
    getActivityDetail: function() {
        var activity_id = Util.queryUrlParam('activity_id');
        if (!activity_id) {
            var msg = '错误的活动ID';
            new Toastr({
                text: msg,
                iconType: 'fail'
            }).show();
            return;
        }
        return Sys.request({
            url: '/v1/surveys/activities/' + activity_id,
            type: 'GET',
            async: false,
            success: function(res) {
                Util.log('活动详情' + JSON.stringify(res));
                if (res.code != 0) {
                    var msg = res.message
                        ? res.message
                        : '网络错误，请稍后再试！';
                    new Toastr({
                        text: msg,
                        iconType: 'fail'
                    }).show();
                    return;
                }
                Sys.currentActivity = res.data;
            }
        });
    },
    currentRankingUser: {},
    getRankingUserDetail: function() {
        var activity_id = Util.queryUrlParam('activity_id');
        if (!activity_id) {
            var msg = '错误的活动ID';
            new Toastr({
                text: msg,
                iconType: 'fail'
            }).show();
            return;
        }
        return Sys.request({
            url: '/v1/surveys/ranking/user',
            type: 'GET',
            async: false,
            data: {
                activity_id: activity_id
            },
            success: function(res) {
                Util.log('当前赛段和省份信息' + JSON.stringify(res));
                if (res.code != 0) {
                    var msg = res.message
                        ? res.message
                        : '网络错误，请稍后再试！';
                    new Toastr({
                        text: msg,
                        iconType: 'fail'
                    }).show();
                    return;
                }
                Sys.currentRankingUser = res.data;
            }
        });
    },
    /**
     * 检查是否需要显示授权
     */
    userStatusCheck: function() {
        var _user = User.getCurrentUserInfoByCookie();
        if (!_user || !_user.user_id) {
            var returnUrl = window.location.href;
            Util.openView('/bridge?url=' + encodeURIComponent(returnUrl));
        } else {
            return true;
        }
    },
    noNeedMusicID: '|8|9|10|11|12|13|14|',
    /**
     * 能力区分颜色，fcolor 已获得，scolor 预期， tcolor 未获得
     */
    categoryColors: [
        {
            fcolor: '#3eddff',
            scolor: '#3e99ff',
            tcolor: '#f4f4f4'
        },
        {
            fcolor: '#fff715',
            scolor: '#ffb420',
            tcolor: '#ebebeb'
        },
        {
            fcolor: '#ce74fd',
            scolor: '#9a60f2',
            tcolor: '#f4f4f4'
        },
        {
            fcolor: '#b8fd55',
            scolor: '#7bd002',
            tcolor: '#ebebeb'
        },
        {
            fcolor: '#fe4b75',
            scolor: '#de2a54',
            tcolor: '#f4f4f4'
        }
    ],
    RankSchedule: {},
    RankProvince: {},
    changeIndexAnswerOver: function() {
        var currentCacheKey = 'index';
        var currentCache = new Cache(currentCacheKey, 'session');
        currentCache.store('over', true);
    },
    checkIndexAnswerIsOver: function() {
        var currentCacheKey = 'index';
        var currentCache = new Cache(currentCacheKey, 'session');
        var _tempData = currentCache.val();
        if (_tempData) {
            if (_tempData.over) {
                Util.log('检查了');
                return true;
            }
        }
    },
    initIndexAnswerStatus: function() {
        //此页面需要保存临时数据
        var currentCacheKey = 'index';
        var currentCache = new Cache(currentCacheKey, 'session');
        currentCache.clear();
    },
    initGrowingio: function() {
        if (Env.flag == 'prod') {
            var _vds = _vds || [];
            window._vds = _vds;
            (function() {
                _vds.push(['setAccountId', '9b9a7b6787727f65']);
                _vds.push(['enableHT', true]);
                (function() {
                    var vds = document.createElement('script');
                    vds.type = 'text/javascript';
                    vds.async = true;
                    vds.src =
                        ('https:' == document.location.protocol
                            ? 'https://'
                            : 'http://') + 'dn-growing.qbox.me/vds.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(vds, s);
                })();
            })();
        }
    },
    flexible: {
        screenhot: function() {
            // 后台自动截图工具默认是750的宽度 ,防止当做手机来截图时导致尺寸不对 使用
            var docEl = document.documentElement;
            if (docEl.clientWidth == 750) {
                docEl.style.fontSize = 75 + 'px';
            }
        }
    }
};
Sys.initGrowingio();
module.exports = Sys;
