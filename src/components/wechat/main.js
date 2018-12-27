// require('./jweixin-1.1.0.js'); 
/**
 * 需要引用官方jssdk
 */
var Sys = require('sys'); 
var sharemask = require('./sharemask.html');
var _init = function () {
    var shareSign = {
        beta: true,
        // debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        jsApiList: ['getInstallState', 'launch3rdApp', 'checkJsApi', 'onMenuShareTimeline',
            'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems',
            'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord',
            'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage',
            'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation',
            'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView',
            'addCard', 'chooseCard', 'openCard'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    };
    if (typeof (INIT_DATA) != "undefined" && INIT_DATA.wxShareSign) {
        shareSign.appId = INIT_DATA.wxShareSign.appid;
        shareSign.timestamp = INIT_DATA.wxShareSign.timestamp;
        shareSign.nonceStr = INIT_DATA.wxShareSign.noncestr;
        shareSign.signature = INIT_DATA.wxShareSign.signature;
        wx.config(shareSign);
    } else {
        // var parameterUrl = window.location.href;
        // var url =  '/v1/supports/signature?url=' + encodeURIComponent(parameterUrl);

        // Sys.request({
        //     silence: true,
        //     data: {
        //         appid: BASE_INFO.appid
        //     },
        //     url: url,
        //     success: function (data) {
        //         if (data.code == 0) {
        //             //微信配置初始化
        //             wx.config({
        //                 beta: true,
        //                 debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //                 appId: data.data.appid, // 必填，公众号的唯一标识
        //                 timestamp: data.data.timestamp, // 必填，生成签名的时间戳
        //                 nonceStr: data.data.noncestr, // 必填，生成签名的随机串
        //                 signature: data.data.signature, // 必填，签名，见附录1
        //                 jsApiList: ['getInstallState', 'launch3rdApp', 'checkJsApi', 'onMenuShareTimeline',
        //                     'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems',
        //                     'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord',
        //                     'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage',
        //                     'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation',
        //                     'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView',
        //                     'addCard', 'chooseCard', 'openCard'
        //                 ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        //             });

        //             wx.error(function (res) {
        //                 /* config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，
        //                  也可以在返回的res参数中查看，对于SPA可以在这里更新签名。*/
        //                 if (debug) alert('wx config error');

        //             });

        //         } else {
        //             if (debug) alert('api code error');

        //         }
        //     },
        //     error: function (e) {
        //         if (debug) alert('api request error');
        //     }
        // });
    }
    wx.ready(function () {
        wx.hideMenuItems({
            menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone', 'menuItem:copyUrl', 'menuItem:originPage'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    });

}

var APIS = {
    wxTimelineShareConf: {},
    wxSessionShareConf: {},
    reviewImg: function () {
        // img 增加class 为 .previewImg
        function imagePreview(curSrc, srcList) {
            if (!curSrc || !srcList || srcList.length == 0) {
                return;
            }
            if (!Util.isWeChat()) {
                // alert('浏览器不支持');
            } else {
                if (!!WeixinJSBridge) {
                    WeixinJSBridge.invoke('imagePreview', {
                        'current': curSrc,
                        'urls': srcList
                    });
                } else {
                    console.log('不支持WeixinJSBridge的浏览器!');
                    return;
                }
            }
        };
        (function ($) {
            var srcList = [];
            $.each($(".previewImg"), function (key, val) {
                srcList.push(val.src);
            });
            $('.previewImg').click(function () {
                imagePreview(this.src, srcList);
            });
        })(jQuery);
    },
    showShareLayer: function (shareContent) {
        // var utm_source = Util.getCookie('utm_source');
        // //如果在返利app中调返利的分享
        // if (utm_source == 'fanli') {
        //     APIS.showShareTarget();
        //     return false;
        // }
        if (Util.isInApp()) {
            Util.log('分享信息:' + JSON.stringify({
                "imageUrl": APIS.wxSessionShareConf.imgUrl, // 分享的图片链接  
                "shareUrl": APIS.wxSessionShareConf.link, // 分享的Url
                "title": APIS.wxSessionShareConf.title, // 分享标题
                "content": APIS.wxSessionShareConf.desc, // 分享内容
                // 小程序分享配置
                // "miniAppImgUrl": APIS.wxSessionShareConf.miniAppImgUrl, // 分享为小程序图片链接
                // "miniAppLink": APIS.wxSessionShareConf.miniAppLink, // 分享为小程序link
                // "appId": Env.appId, // 必须是小程序原始ID
                // "isMiniAppShare": APIS.wxSessionShareConf.isMiniAppShare
            }))
            //app分享点击就认为分享成功，回调,utm_medium 固定为 wxappmessage
            // window.AHASCHOOL.onShareSuccess = function(res){
            //     alert(res)
            // }
            if ($.isFunction(APIS.wxSessionShareConf.success)) {
                window.AHASCHOOL.onShareSuccess = APIS.wxSessionShareConf.success;

                //     APIS.wxSessionShareConf.success({utm_medium:'wxappmessage'});
            }
            Util.callAppMethod('showSharePage', JSON.stringify({
                "imageUrl": APIS.wxSessionShareConf.imgUrl, // 分享的图片链接  
                "shareUrl": APIS.wxSessionShareConf.link, // 分享的Url
                "title": APIS.wxSessionShareConf.title, // 分享标题
                "content": APIS.wxSessionShareConf.desc, // 分享内容
                // 小程序分享配置
                // "miniAppImgUrl": APIS.wxSessionShareConf.miniAppImgUrl, // 分享为小程序图片链接
                // "miniAppLink": APIS.wxSessionShareConf.miniAppLink, // 分享为小程序link
                // "appId": Env.appId, // 必须是小程序原始ID
                // "isMiniAppShare": APIS.wxSessionShareConf.isMiniAppShare
            }));
            return false;
        }
        //  弹层效果
        var _mask = $('#wx_share_mask');
        if (_mask.length <= 0) {
            _mask = $(sharemask);
            $('body').append(_mask);
        }
        if (shareContent || shareContent != '') {
            $('#wx_share_mask .kp').html(shareContent);
        }
        _mask.off().on('touchend', function () {
            APIS.hideShareLayer();
        });

        $('#wx_share_mask').show();
    },
    overscroll: function (el) {
        // 微信下拉禁止看网址  例: footmark.php 下的 error.html error.js
        // 注意 ,需要在不能滑动的div 父页面 增加class "scroll".scroll 高度固定  里面的内容很长
        // <div ms-controller="errors" class="pub-page scroll"> 一般是最顶部的div   内部若有需要单独滑动的层级 也加上"scroll" 的class
        // 调用方式 引入当前的wechat  var wechat = require('wechat');
        // 使用时  wechat.overscroll(document.querySelector('.scroll'));//
        el.addEventListener('touchstart', function () {
            var top = el.scrollTop,
                totalScroll = el.scrollHeight,
                currentScroll = top + el.offsetHeight;
            if (top === 0) {
                el.scrollTop = 1;
            } else if (currentScroll === totalScroll) {
                el.scrollTop = top - 1;
            }
        });
        el.addEventListener('touchmove', function (evt) {
            if (el.offsetHeight < el.scrollHeight)
                evt._isScroller = true;
        });
        document.body.addEventListener('touchmove', function (evt) {
            if (!evt._isScroller) {
                evt.preventDefault();
            }
        });
    },

    hideShareLayer: function () {
        $('#wx_share_mask').hide();
    },

    menuShare: function (params) {


        var _defualt_params = {
            imgUrl: Env.rootHost + '/logo_aha.png',
            title: 'Ahaschool/芝麻学社',
            desc: '2017~2018天赋发现大奖赛火热进行中……',
            link: Env.rootHost,
            //区分朋友圈和朋友分享
            toTimelineTitle: '',
            toAppmessageTitle: '',
            isNeedUserName: false,

            obj_id: 0,
            obj_type: 0,
            utm_source: decodeURIComponent(BASE_INFO.utm_source) || '',
            pk: decodeURIComponent(BASE_INFO.pk) || '',
            utm_medium: decodeURIComponent(BASE_INFO.utm_medium) || '',
            utm_campaign: decodeURIComponent(BASE_INFO.utm_campaign) || ''

        }

        var _params = $.extend(_defualt_params, params);

        //如果不在微信中，要讲默认网页的title 修改为配置好的title ，因为微博默认取的是默认网页title
        if (!BASE_INFO.is_weixin) {
            // document.title = _params.title;
        }

        if (!_params.link) return;

        var _share_type_arr = ['timeline', 'appmessage', 'qq', 'weibo', 'qzone'];
        var _share_confs = {};

        var _utm_replace_reg = /(?:^|\_)wx(?:timeline|appmessage|qq|weibo|qzone)(?=\_|$)/ig;
        var _temp_utm_sorce = (_params.utm_source || '').replace(_utm_replace_reg, '');

        $.each(_share_type_arr, function (_idx, _key) {

            var _item_share_conf = $.extend({}, _params);
            //如果没有设置分享标题，则分享到朋友圈时，将默认的魔术放到title后面组成新的朋友圈分享标题
            if ((!params || !params.title) && _key == 'timeline') {
                _item_share_conf.title = _item_share_conf.title + "，" + _item_share_conf.desc;
            }

            _item_share_conf.key = _key;

            if (_temp_utm_sorce != '') {
                _item_share_conf.utm_source = _temp_utm_sorce + '_wx' + _key;
            } else {
                _item_share_conf.utm_source = 'wx' + _key;
            }

            /**
             * 区分朋友圈和朋友分享标题
             *
             */
            if (_key == 'timeline' && _item_share_conf.toTimelineTitle) {
                _item_share_conf.title = _item_share_conf.toTimelineTitle;
            }
            if (_key == 'appmessage' && _item_share_conf.toAppmessageTitle) {
                _item_share_conf.title = _item_share_conf.toAppmessageTitle;
            }


            _item_share_conf.link = Util.editUrlParam(_item_share_conf.link, "utm_source", _item_share_conf.utm_source);
            _item_share_conf.link = Util.editUrlParam(_item_share_conf.link, "pk", _item_share_conf.pk);
            _item_share_conf.link = Util.editUrlParam(_item_share_conf.link, "utm_medium", _item_share_conf.utm_medium);
            _item_share_conf.link = Util.editUrlParam(_item_share_conf.link, "utm_campaign", _item_share_conf.utm_campaign);


            _item_share_conf.cancel = function (res) {
                APIS.hideShareLayer();
                if ($.isFunction(_params.cancel)) {
                    _params.cancel(res);
                }
            }

            _item_share_conf.trigger = function (res) {
                APIS.hideShareLayer();
                if ($.isFunction(_params.trigger)) {
                    _params.trigger(res);
                }
            }

            _item_share_conf.fail = function (res) {
                APIS.hideShareLayer();
                if ($.isFunction(_params.fail)) {
                    _params.fail(res);
                }
            }

            _item_share_conf.success = function (res) {
                APIS.hideShareLayer();
                if ($.isFunction(_params.success)) {
                    _params.success(res);
                } 
                /*分享回调*/
                if (res.errMsg && res.errMsg.indexOf(':ok') > -1) {
                    Sys.request({
                        url: '/v1/supports/sharelog',
                        type: 'POST',
                        silence: true,
                        data: {
                            obj_id: _item_share_conf.obj_id || 0,
                            obj_type: _item_share_conf.obj_type || 7,
                            utm_source: _item_share_conf.utm_source || '',
                            utm_medium: _item_share_conf.utm_medium || '',
                            utm_campaign: _item_share_conf.utm_campaign || ''
                        }
                    });
                }


            }


            _share_confs[_key] = _item_share_conf;
        })

        var _get_type_conf = function (_type) {

            if (!_share_confs[_type]) return {};

            var _conf = _share_confs[_type];

            return {
                imgUrl: _conf.imgUrl,
                title: _conf.title,
                desc: _conf.desc,
                link: _conf.link,
                cancel: _conf.cancel,
                trigger: _conf.trigger,
                fail: _conf.fail,
                success: _conf.success
            }
        }
        //用来保存用户设置信息，已便于其他渠道调用
        APIS.wxTimelineShareConf = _get_type_conf('timeline');
        APIS.wxSessionShareConf = _get_type_conf('appmessage');
        wx.ready(function () {
            wx.onMenuShareTimeline(_get_type_conf('timeline'));
            wx.onMenuShareAppMessage(_get_type_conf('appmessage'));
            wx.onMenuShareQQ(_get_type_conf('qq'));
            wx.onMenuShareWeibo(_get_type_conf('weibo'));
            wx.onMenuShareQZone(_get_type_conf('qzone'));
        })
    }

}


_init();

module.exports = APIS;