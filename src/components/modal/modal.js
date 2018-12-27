var modalTemplate = require("./modal.html");
require('./modal.less');
var _interface = function () { }
module.exports = avalon.component('ms:modal', {
    $template: modalTemplate,
    $replace: true, //替换容器
    title: '',
    isShowCloseBtn: true, //控制关闭按钮
    addClass: '',
    addBoxClass: '',
    isShow: false, // 控制弹层展示
    modalClose: false,  //控制弹层点击关闭
    onModalClose: _interface,
    close: function () {
        avalon.vmodels["modal"].isShow = false;
    },
    $init: function (vm, el) {
        vm.$watch('isShow', function (value, oldValue) {
            Util.log('监听' + 'value=' + value + 'oldValue=' + oldValue)
            vm.isShow = value;
            avalon.vmodels["modal"].isShow = value;
        })
    },
    $ready: function (vm, el) {
        // Util.log("弹窗控件");
        vm.onClose = function () {
            vm.isShow = false;
        }
        vm.onModalClose = function () {
            if (vm.modalClose) {
                vm.isShow = false;
            }
        }
    },
    $dispose: function (vm, el) {
        //在这里移除事件与清空节点内部
        el.innerHTML = ""
    },
    content: "",
    cancelText: "取消",
    okText: "确定"
})