var Sys = require('sys'); 
var Toastr = require('toastr');
var wechat = require('wechat');
//欢迎页面
var homeTemplate = require("./views/home/home.html");
var homeControll = require("./views/home/home");
var auth_token = Util.queryUrlParam("auth_token");
var visitor_id = Util.queryUrlParam("visitor_id");
var user_id = Util.queryUrlParam("user_id");
var openid = Util.queryUrlParam("openid");
var root = avalon.define({
    $id: "root",
    mockUser: function () {
        Util.setCookie("visitor_id", visitor_id);
        Util.setCookie("auth_token", auth_token); 
        Util.setCookie("user_id", user_id);
        Util.setCookie("openid", openid);
        
    },
    getData: function () {
        root.mockUser();
    }
});
root.getData();
avalon
    .state("/", {
        url: "/",
        onEnter: function (rs, rj) {
            Util.log("root enter");
            rs();
        },
        views: {
            "": {
                template: homeTemplate,
                controller: homeControll
            }
        }
    })
    .state("home", {
        url: "/",
        views: {
            "": {
                template: homeTemplate,
                controller: homeControll
            }
        }
    })


avalon.state.config({
    onError: function () {
        Util.log(arguments)
    },
    onLoad: function () {}
});
avalon.history.start({
    fireAnchor: false
});
avalon.scan();