layui.define(['layer'], function (exports) {
    "use strict";

    var $ = layui.jquery,
        layer = layui.layer;

    var common = {

        /**
         * 抛出一个异常错误信息
         * @param {String} msg
         */
        throwError: function (msg) {
            throw new Error(msg);
            return;
        },
        /**
         * 弹出一个错误提示
         * @param {String} msg
         */
        msgError: function (msg) {
            layer.msg(msg, {
                icon: 5
            });
            return;
        },

        // 设置cookie
        setCookie: function(name, value) {
            var Days = 30
            var exp = new Date()
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
            document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
        },

        //读取cookies
        getCookie: function(name) {
            var arr,
                reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
            if ((arr = document.cookie.match(reg))) return unescape(arr[2])
            else return null
        }

    };

    exports('common', common);
});