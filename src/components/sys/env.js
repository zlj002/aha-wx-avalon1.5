/**
 * 初始化环境
 * 请勿依赖于其他业务模块，否则导致循环引用
 * 此项目为模板项目，生成后请修改此文件
 */
var Env = {
    processEnv: function() {
        var _webSites = [
            //生产环境 
            {
                rootHost: 'https://baidu.com', //站点域名
                apiHost: 'https://baidu.com', //站点api域名
                shareHost: 'https://baidu.com', //站点分享域名
                cookieDomain: 'baidu.com', // 用于cookie 写入时指定的根domain
                selfCookieDomain: 'baidu.com', // 用于cookie 写入时指定的当前域名domain
                app_type: 1, // 1公众号,2ahaschool拼团小程序,3app ,4小恐龙
                appId: 'gh_88888888888888', //第二课堂小程序原始ID
                flag: 'prod' //环境 prod:生产，test:测试，dev:开发
            },
            //开发环境
            {
                rootHost: 'https://baidu.com', //站点域名
                apiHost: 'https://baidu.com', //站点api域名
                shareHost: 'https://baidu.com', //站点分享域名
                cookieDomain: 'baidu.com', // 用于cookie 写入时指定的根domain
                selfCookieDomain: 'baidu.com', // 用于cookie 写入时指定的当前域名domain
                app_type: 4, // 1公众号,2ahaschool拼团小程序,3app ,4小恐龙
                appId: 'gh_88888888888888', //第二课堂小程序原始ID
                flag: 'prod' //环境 prod:生产，test:测试，dev:开发
            },
            //测试环境一 无敌团
            {
                rootHost: 'https://baidu.com', //站点域名
                apiHost: 'https://baidu.com', //站点api域名
                shareHost: 'https://baidu.com', //站点分享域名
                cookieDomain: '.ahaschool.com', // 用于cookie 写入时指定的根domain
                selfCookieDomain: 'baidu.com', // 用于cookie 写入时指定的当前域名domain
                app_type: 1, // 1公众号,2ahaschool拼团小程序,3app ,4小恐龙
                appId: 'gh_ac3e1be146c0', //第二课堂小程序原始ID
                flag: 'test' //环境 prod:生产，test:测试，dev:开发
            }
        ];
        var _hostname = Util.getHostName(window.location.href);
        if (!Env.flag) {
            for (var i in _webSites) {
                var _webSite = _webSites[i];
                var _host = _webSite.rootHost.replace(
                    /^(?:https|http|ftp):\/\//i,
                    ''
                );
                if (_host.indexOf(_hostname) >= 0) {
                    $.extend(true, Env, _webSite);
                    break;
                }
            }
        }
        if (!Env.flag) {
            $.extend(true, Env, _webSites[0]);
        }
    }
};
Env.processEnv();
module.exports = Env;
