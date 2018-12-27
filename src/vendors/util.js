! function () {
    /**
     * 日期格式化
     */
    Date.prototype.normByFormat = function () {
        return {
            'yyyy': this.getFullYear(),
            'yy': this.getFullYear().toString().slice(-2),
            'MM': this.getMonth() + 1,
            'dd': this.getDate(),
            'hh': this.getHours(),
            'mm': this.getMinutes(),
            'ss': this.getSeconds()
        }
    }
    /**
     * 查询字符串参数
     */
    String.prototype.query = function (name) {
        var reg = new RegExp('(?:\\?|&)' + name + '=([^&#!/]+)'),
            res = this.match(reg);
        return res ? res[1] : '';
    }
    /**
     * 获取中英文长度
     */
    String.prototype.gblen = function () {
        var len = 0;
        for (var i = 0; i < this.length; i++) {
            if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    }
    //Array的ECMA-262新标准扩展方法,兼容旧环境
    Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
        var c, d, e, f;
        if (null == this) throw new TypeError('"this" is null or not defined');
        if (d = Object(this), e = d.length >>> 0, 0 === e) return -1;
        if (f = +b || 0, 1 / 0 === Math.abs(f) && (f = 0), f >= e) return -1;
        for (c = Math.max(f >= 0 ? f : e - Math.abs(f), 0); e > c;) {
            if (c in d && d[c] === a) return c;
            c++
        }
        return -1
    }), Array.prototype.filter || (Array.prototype.filter = function (a) {
        "use strict";
        var b, c, d, e, f, g;
        if (void 0 === this || null === this) throw new TypeError;
        if (b = Object(this), c = b.length >>> 0, "function" != typeof a) throw new TypeError;
        for (d = [], e = arguments.length >= 2 ? arguments[1] : void 0, f = 0; c > f; f++) f in b && (g = b[f], a.call(e, g, f, b) && d.push(g));
        return d
    }), Array.prototype.map || (Array.prototype.map = function (a, b) {
        var c, d, e, f, g, h, i;
        if (null == this) throw new TypeError(" this is null or not defined");
        if (f = Object(this), g = f.length >>> 0, "[object Function]" != Object.prototype.toString.call(a)) throw new TypeError(a + " is not a function");
        for (b && (c = b), d = new Array(g), e = 0; g > e;) e in f && (h = f[e], i = a.call(c, h, e, f), d[e] = i), e++;
        return d
    }), "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function (a, b) {
        "use strict";
        if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
        if ("function" != typeof a) throw new TypeError(a + " is not a function");
        var c, d, e = this.length >>> 0,
            f = !1;
        for (1 < arguments.length && (d = b, f = !0), c = 0; e > c; ++c) this.hasOwnProperty(c) && (f ? d = a(d, this[c], c, this) : (d = this[c], f = !0));
        if (!f) throw new TypeError("Reduce of empty array with no initial value");
        return d
    }), Array.prototype.every || (Array.prototype.every = function (a) {
        "use strict";
        var b, c, d, e;
        if (void 0 === this || null === this) throw new TypeError;
        if (b = Object(this), c = b.length >>> 0, "function" != typeof a) throw new TypeError;
        for (d = arguments.length >= 2 ? arguments[1] : void 0, e = 0; c > e; e++)
            if (e in b && !a.call(d, b[e], e, b)) return !1;
        return !0
    }), Array.prototype.find || (Array.prototype.find = function (a) {
        "use strict";
        var b, c, d, e, f;
        if (null == this) throw new TypeError("Array.prototype.find called on null or undefined");
        if ("function" != typeof a) throw new TypeError("predicate must be a function");
        for (b = Object(this), c = b.length >>> 0, d = arguments[1], f = 0; c > f; f++)
            if (e = b[f], a.call(d, e, f, b)) return e;
        return void 0
    }), Array.prototype.findIndex || (Array.prototype.findIndex = function (a) {
        var b, c, d, e, f;
        if (null === this) throw new TypeError("Array.prototype.findIndex called on null or undefined");
        if ("function" != typeof a) throw new TypeError("predicate must be a function");
        for (b = Object(this), c = b.length >>> 0, d = arguments[1], f = 0; c > f; f++)
            if (e = b[f], a.call(d, e, f, b)) return f;
        return -1
    }), Array.prototype.includes || (Array.prototype.includes = function (a) {
        "use strict";
        var b, c, d, e, f;
        if (null == this) throw new TypeError("Array.prototype.includes called on null or undefined");
        if (b = Object(this), c = parseInt(b.length, 10) || 0, 0 === c) return !1;
        for (d = parseInt(arguments[1], 10) || 0, d >= 0 ? e = d : (e = c + d, 0 > e && (e = 0)); c > e;) {
            if (f = b[e], a === f || a !== a && f !== f) return !0;
            e++
        }
        return !1
    }), Array.prototype.forEach || (Array.prototype.forEach = function (a, b) {
        var c, d, e, f, g;
        if (null == this) throw new TypeError(" this is null or not defined");
        if (e = Object(this), f = e.length >>> 0, "function" != typeof a) throw new TypeError(a + " is not a function");
        for (arguments.length > 1 && (c = b), d = 0; f > d;) d in e && (g = e[d], a.call(c, g, d, e)), d++
    });

    //数组交集
    Array.intersection = function (array) {
        if (array == null) return [];
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, length = array.length; i < length; i++) {
            var item = array[i];
            if (result.indexOf(item) > -1) continue;
            for (var j = 1; j < argsLength; j++) {
                if (arguments[j].indexOf(item) < 0) break;
            }
            if (j === argsLength) result.push(item);
        }
        return result;
    };

}();

var Util = {
    //输出日志
    log: function (msg) {
        if (console) {
            console.log(msg);
        }
    },
    formatDate: function (formatStr, dateObj, addDays) {
        var date = dateObj;
        var dateMaps = {
            d: function (str, date, key) {
                var d = date.getDate().toString();
                if (d.length < 2) {
                    d = "0" + d
                }
                return str.replace(new RegExp(key, "mg"), d)
            },
            m: function (str, date, key) {
                var d = (date.getMonth() + 1).toString();
                if (d.length < 2) {
                    d = "0" + d
                }
                return str.replace(new RegExp(key, "mg"), d)
            },
            Y: function (str, date, key) {
                return str.replace(new RegExp(key, "mg"), date.getFullYear())
            },
            H: function (str, date, key) {
                var d = date.getHours().toString();
                if (d.length < 2) {
                    d = "0" + d
                }
                return str.replace(new RegExp(key, "mg"), d)
            },
            i: function (str, date, key) {
                var d = date.getMinutes().toString();
                if (d.length < 2) {
                    d = "0" + d
                }
                return str.replace(new RegExp(key, "mg"), d)
            },
            s: function (str, date, key) {
                var d = date.getSeconds().toString();
                if (d.length < 2) {
                    d = "0" + d
                }
                return str.replace(new RegExp(key, "mg"), d)
            }
        };

        function addDay(n) {
            n = n || 0;
            date.setDate(date.getDate() + n);
            return date
        }

        function format(format) {
            if (typeof format !== "string") {
                format = ""
            }
            for (var key in dateMaps) {
                format = dateMaps[key].call(this, format, date, key)
            }
            return format
        }

        if (addDays) {
            date = addDay(addDays);
            return format(formatStr)
        }
        return format(formatStr)
    },
    /** 
     * 字符串转时间（yyyy-MM-dd HH:mm:ss） 
     * result （分钟） 
     */
    stringToDate: function (fDate) {
        var fullDate = fDate.split("-");

        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0);
    },
    isWeChat: function () {
        if (window.navigator.userAgent.toLowerCase().match("micromessenger") || !!window.navigator.userAgent.match("MicroMessenger")) {
            return true
        }
        return false
    },
    getHostName: function (url) {
        var e = new RegExp("^(?:(?:https?|ftp):)?\/\/(?:[^@]+@)?([^:/#]+)", 'i'),
            matches = e.exec(url);
        return matches ? matches[1] : url;
    },
    is_weixin: function () {
        var ua = '';
        window && window.navigator && window.navigator.userAgent && (ua = navigator.userAgent.toLowerCase());
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    isInApp: function () {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        return (!!ua.match(/Ahaschool\/Android/i) || !!ua.match(/Ahaschool\/ios/i));
    },
    getAbsUrl: function (url) {
        var a = document.createElement('a');
        a.href = url;

        var _result = /^(?:https?|ftp):\/\//i.test(a.href) ? a.href : a.getAttribute('href', 4);

        return _result ? _result : '';
    },

    parseURI: function (url) {
        var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        // authority = '//' + user + ':' + pass '@' + hostname + ':' port
        return (m ? {
            href: m[0] || '',
            protocol: m[1] || '',
            authority: m[2] || '',
            host: m[3] || '',
            hostname: m[4] || '',
            port: m[5] || '',
            pathname: m[6] || '',
            search: m[7] || '',
            hash: m[8] || ''
        } : null);
    },
    base64: function () {
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64
                } else {
                    if (isNaN(chr3)) {
                        enc4 = 64
                    }
                }
                output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
            }
            return output
        };
        var decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2)
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3)
                }
            }
            output = _utf8_decode(output);
            return output
        };

        function _utf8_encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c)
                } else {
                    if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128)
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128)
                    }
                }
            }
            return utftext
        }

        function _utf8_decode(utftext) {
            var string = "";
            var i = 0;
            var c = 0,
                c1 = 0,
                c2 = 0,
                c3 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++
                } else {
                    if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3
                    }
                }
            }
            return string
        }

        return {
            encode: encode,
            decode: decode
        }
    },
    //删除url参数
    delURIParam: function (url, paramKey) {

        if (!url) return '';

        var hashMatch = url.match(/\!?\#[\s\S]*$/);
        var hashUrl = '';

        if (hashMatch && hashMatch.length > 0) {
            hashUrl = hashMatch[0];
            url = url.replace(hashUrl, '');
        }

        var urlParam = (url.indexOf("?") <= -1) ? '' : url.substr(url.indexOf('?') + 1);
        var beforeUrl = (url.indexOf("?") <= -1) ? url : url.substr(0, url.indexOf('?'));
        var nextUrl = '';

        var arr = new Array();
        var tempParamArr;

        if (urlParam != '') {
            var urlParamArr = urlParam.split('&');

            for (var i = 0; i < urlParamArr.length; i++) {
                tempParamArr = urlParamArr[i].split('=');
                if (tempParamArr[0] != paramKey) {
                    arr.push(urlParamArr[i]);
                }
            }
        }

        if (arr.length > 0) {
            nextUrl = "?" + arr.join("&");
        }
        url = beforeUrl + nextUrl + hashUrl;
        return url;
    },
    //增加URL参数
    addURIParam: function (url, paramKey, paramVal) {

        if (!url) return '';

        var hashMatch = url.match(/\!?\#[\s\S]*$/);
        var hashUrl = '';

        if (hashMatch && hashMatch.length > 0) {
            hashUrl = hashMatch[0];
            url = url.replace(hashUrl, '');
        }

        var andStr = "?";
        var beforeparam = url.indexOf("?");
        if (beforeparam != -1) {
            andStr = "&";
        }
        return url + andStr + paramKey + "=" + encodeURIComponent(paramVal) + hashUrl;
    },

    editUrlParam: function (url, paramKey, paramVal) {

        if (!url) return '';

        var _current_url = this.delURIParam(url, paramKey);

        return this.addURIParam(_current_url, paramKey, paramVal);

    },
    queryUrlParam: function (name) {
        return window.location.href.query(name);
    },
    setCookie: function (name, value, expiredays, domain, path) {
        var Days = (parseInt(expiredays) && parseInt(expiredays) > 0) ? parseInt(expiredays) : 30,
            exp = new Date();

        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

        var _str = name + '=' + encodeURIComponent(value) + ';expires= ' + exp.toGMTString();

        if (domain) {
            _str += '; domain=' + domain;
        }

        if (path) {
            _str += '; path=' + path;
        } else {
            _str += '; path=/';
        }

        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + _str;
    },
    //读取cookies
    getCookie: function (name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg)) {
            return decodeURIComponent(arr[2]);
        } else {
            return null;
        }
    },
    //删除cookies
    delCookie: function (name) {
        var self = this,
            exp = new Date();

        exp.setTime(exp.getTime() - 1);

        var cval = self.getCookie(name);

        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },

    lStorage: {
        setItem: function (_key, _val) {
            "object" == typeof localStorage ? localStorage.setItem(_key, _val) : Util.setCookie(_key, _val, 366, "", "/");
        },
        getItem: function (_key) {
            return "object" == typeof localStorage ? localStorage.getItem(_key) : Util.getCookie(_key);
        },
        removeItem: function (_key) {
            "object" == typeof localStorage ? localStorage.removeItem(_key) : Util.delCookie(_key);
        }
    },
    sStorage: {
        setItem: function (_key, _val) {
            "object" == typeof sessionStorage ? sessionStorage.setItem(_key, _val) : Util.setCookie(_key, _val, 0, "", "/");
        },
        getItem: function (_key) {
            return "object" == typeof sessionStorage ? sessionStorage.getItem(_key) : Util.getCookie(_key);
        },
        removeItem: function (_key) {
            "object" == typeof sessionStorage ? sessionStorage.removeItem(_key) : Util.delCookie(_key);
        }
    },

    delay: function (func, wait) {
        var args = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(null, args);
        }, wait);
    },
    REG: {
        //数字类型日期  20170707
        NumDate: /^(19|20)\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/
    },
    openView: function (url) {
        if (url) {
            location.href = url
        } else {
            history.go(1);
        }
    },
    isInApp: function () {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        return (!!ua.match(/Ahaschool\/Android/i) || !!ua.match(/Ahaschool\/ios/i));
    },
    isInAppios: function () {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        return !!ua.match(/Ahaschool\/ios/i);
    },
    isInAppandroid: function () {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        return !!ua.match(/Ahaschool\/Android/i);
    },
    callAppMethod: function (methodStr) {
        if (!Util.isInApp()) return; //不是内嵌在APP内或viewload还未结束时 APP方法不可用
        //iOS 支付成功之后方法有版本限制，1.4之后，android 没有限制
        if (methodStr.toLowerCase() == "onpaysuccess" && Util.isInAppios()) {
            var _currentVersion = Util.getAppVesion();
            if (Util.compareVersion(_currentVersion, '1.4') <= 0) {
                return;
            }
        }
        var _param = [];
        if (arguments.length > 1) _param = Array.prototype.slice.call(arguments, 1);
        if (window['AHASCHOOL'] && typeof window['AHASCHOOL'][methodStr] == "function") {
            return window['AHASCHOOL'][methodStr].apply(window['AHASCHOOL'], _param);
        }
    },
    /**
     * 秒数格式化为时分秒
     * 
     */
    secondsFormat: function (seconds, templet) {
        var _day = parseInt(seconds / (60 * 60 * 24)),
            _hours = parseInt(seconds % (60 * 60 * 24) / (60 * 60)),
            _minutes = parseInt(seconds % (60 * 60) / 60),
            _seconds = seconds % 60;

        _hours = _hours < 10 ? "" + _hours : _hours;
        _minutes = _minutes < 10 ? "" + _minutes : _minutes;
        _seconds = _seconds < 10 ? "" + _seconds : _seconds;

        var _html_str = (((templet.replace('{{day}}', _day)).replace('{{hour}}', _hours)).replace('{{minutes}}', _minutes)).replace('{{seconds}}', _seconds);
        return _html_str;
    },
    secondsToMinutes: function (seconds) {
        var _minutes = parseInt(seconds / 60);
        return _minutes;
    }
}


module.exports = Util;