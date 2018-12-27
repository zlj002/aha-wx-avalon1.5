var Env = require('env');
var Ajax = require('ajax');

var User = {
    saveCurrentUserInfoToCookie: function (user) {
        Util.setCookie("visitor_id", user.visitor_id);
        Util.setCookie("auth_token", user.auth_token);
        Util.setCookie("openid", user.openid);
        Util.setCookie("user_id", user.user_id);
    },
    getCurrentUserInfoByCookie: function (prefix) {
        /*
         *目前项目只运行在微信中
         *默认隐式授权 只有openid 结合 auth_token 生成 basic_auth
         *如果用户显示授权之后会有 visitor_id 结合 auth_token  用于登录之后生成basic_auth 
         *特殊如果不在微信中运行（理论不存在）
         *如果没有显示登录（就没有visitor_id和user_id）
         */
        if(!prefix){
            prefix="";
        }
        var user = {};
        var visitor_id = Util.getCookie(prefix+'visitor_id');
        var auth_token = Util.getCookie(prefix+'auth_token');
        var openid = Util.getCookie(prefix+'openid');
        var user_id = Util.getCookie(prefix+'user_id');
        if (visitor_id && auth_token) {
            user.visitor_id = visitor_id;
            user.user_id = user_id;
            user.auth_token = auth_token;
            user.basic_auth = Util.base64().encode(user.visitor_id + ':' + user.auth_token);
        } else if (openid && auth_token) {
            user.openid = openid;
            user.user_id = user_id;
            user.auth_token = auth_token;
            user.basic_auth = Util.base64().encode('weixin:' + user.openid + '$' + user.auth_token);
        } else {
            user.basic_auth = Util.base64().encode("visitor:28ad87ef9fdce5d12dea093b860e8772");
        }
        Util.log("当前cookie的用户" + JSON.stringify(user));
        return user;
    }

}
module.exports = User;