var requestPath = "http://39.104.97.6:8080";

var page = 1;

layui.define(['jquery'], function(exports) {
	var $ = layui.jquery;
	var obj = {
		ajax: function(url, type, dataType, data, callback) {
			$.ajax({
				url: url,
				type: type,
				dataType: dataType,
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				data: data,
				success: callback,
			});
		}
	};
	//输出接口
	exports('common', obj);
});

layui.config({
	base: './layui/' //自定义layui组件的目录
}).extend({ //设定组件别名
	common: 'common',
});