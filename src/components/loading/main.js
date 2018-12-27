require('./main.css');
var $ = require('jquery');
var imgLoing1 = require('./1.png');
var imgLoing2 = require('./2.png');
var imgLoing3 = require('./3.png');
var imgLoing4 = require('./4.png');

function Loading(o) {
    if (!(this instanceof Loading)) {
        return new Loading(o);
    }
    if (!isPlainObject(o)) o = {};
    o.delay = parseInt(o.delay) ? parseInt(o.delay) : 0;
    o.modal = undefined == o.modal ? true : !!o.modal;

    this.o = o;
    this.t = 0;
    this.init();
}

function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

Loading.prototype = {
    constructor: Loading,

    init: function () {
        var el = $('<div>', {
            'class': 'pub-loading',
            html: ''
        });
        var mask = null;
        $('.pub-loading-mask').remove();
        $('.pub-loading').remove();
        el.appendTo('body');
        if (this.o.modal) {
            mask = $('<div>', {
                'class': 'pub-loading-mask',
                html: ''
            });
            mask.appendTo('body');
            mask.off('touchmove').on('touchmove', function (e) {
                e.preventDefault();
                e.stopPropagation();
            })
        }
        this.el = el;
        this.mask = mask;
    },

    show: function () {
        var el = this.el;
        var mask = this.mask;
        var o = this.o;

        var _html_debut = '<img src="'+imgLoing1+'" alt="" class="pic1" />' +
            '<img src="'+imgLoing2+'" alt="" class="pic2" />' +
            '<img src="'+imgLoing3+'" alt="" class="pic3" />' +
            '<img src="'+imgLoing4+'" alt="" class="pic4" />' +
            '<img src="'+imgLoing4+'" alt="" class="pic5" />';

        var _html_normal = '<div class="pic-normal-loading"></div>';

        /*是否是第一次开场,第一次打开显示LOGO动画,否则显示"菊花"*/
        if (undefined === o.debut) {
            //o.debut = !window['__loading_seenup'];
            o.debut = false;
        } else {
            o.debut = !!o.debut;
        }

        el.empty().removeClass('debut-loading');

        if (o.debut) {
            el.addClass('debut-loading')
            el.append(_html_debut);
            if (mask) mask.addClass('debut-loading-mask');
        } else {
            el.append(_html_normal);
            if (mask) mask.removeClass('debut-loading-mask');
        }

        el.show();

        if (mask) mask.show();


        window['__loading_seenup'] = true;
        o.debut = false;
    },

    hide: function () {
        var el = this.el;
        var mask = this.mask;
        el.hide();
        if (mask) mask.hide();
    }
};
module.exports = Loading;