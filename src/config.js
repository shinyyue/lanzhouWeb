layui.define(function (exports) {
    exports('conf', {
        //容器ID
        container: 'app',
        //容器内容ID
        containerBody: 'app-body',
        //版本号
        v: layui.cache.version,
        //记录src文件夹所在路径
        base: layui.cache.base,
        css: layui.cache.base + 'css/',
        //视图所在目录
        views: layui.cache.base + 'views/',
        //是否开启选项卡
        viewTabs: true,
        //显示页面加载条
        viewLoadBar: false,
        //公用加载的样式
        style: [
            layui.cache.base + "css/base.css"
        ],
        //是否开启调试模式，开启的话接口异常会抛出异常 URL信息
        debug: layui.cache.debug,
        //网站名称
        name: '学校平台',
        //默认视图文件名
        entry: '/index',
        //视图文件后缀名
        engine: '.html',
        eventName: 'nepadmin-event',
        //本地存储表名
        tableName: 'user',
        //全局设置 headers 信息
        requestHeaders: {
            'content-type': 'application/json;charset=UTF-8'
            // 'Test-User-Agent': 'os=pc;ver=0.0.1;imei=asdasdas'
        },
        //request 基础URL
//      requestUrl: 'http://127.0.0.1:8080',
//      requestUrl: 'http://39.104.97.6:8080',
        requestUrl: 'http://39.108.69.34:8080',
        //独立页面路由，可随意添加（无需写参数）
        indPage: [
            '/login', //登入页
            '/chat', // 聊天室
        ],
        //登录页面，当未登录或登录失效时进入
        loginPage: '/login',
        //登录 token 名称，request 请求的时候会带上此参数到 header
        tokenName: 'token',
        //是否要强制检查登录状态， 使用tokenName进行登录验证，不通过的话会返回 loginPage 页面
        loginCheck: true,
        //根据服务器返回的 HTTP 状态码检查登录过期，设置为false不通过http返回码检查
        logoutHttpCode: '401',
        //全局自定义响应字段
        response: {
            //数据状态的字段名称
            statusName: 'code',
            statusCode: {
                //数据状态一切正常的状态码
                ok: 200,
                //通过接口返回的登录过期状态码
                logout: 401
            },
            msgName: 'msg', //状态信息的字段名称
            dataName: 'data', //数据详情的字段名称
            countName: 'count' //数据条数的字段名称，用于 table
        },
        //全局 table 配置
        //参数请参照 https://www.layui.com/doc/modules/table.html
        table: {
            page: true,
            size: 'lg',
            skin: 'line',
            //每页显示的条数
            limit: 20,
            //是否显示加载条
            loading: true,
            //用于对分页请求的参数：page、limit重新设定名称
            request: {
                pageName: 'page', //页码的参数名称，默认：page
                limitName: 'row' //每页数据量的参数名，默认：limit
            }
        },
        //第三方扩展
        extend: {
            //后台根据业务需求扩展的方法
            // helper: 'lay/extends/helper',
            //生成图表
            echarts: '../lay/extends/echarts',
            echartsTheme: '../lay/extends/echartsTheme',
            //复制内容到剪贴板
            clipboard: 'lay/extends/clipboard'
        }
    })
})
