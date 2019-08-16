layui
    .extend({
        conf: 'config',
        api: 'lay/modules/api',
        view: 'lay/modules/view'
    })
    .define(['conf', 'view', 'api', 'jquery', 'table'], function (exports) {
        POPUP_DATA = {}
        var conf = layui.conf
        var view = layui.view
        var element = layui.element
        var $ = layui.jquery
        var table = layui.table
        // var Edit = layui.layedit

        layui.extend(conf.extend)
        var self = {}
        var windowWidth = $(window).width()

        self.route = layui.router()
        self.api = layui.api
        self.closeOnceHashChange = false
        self.ie8 = view.ie8
        self.get = view.request
        self.appBody = null
        self.shrinkCls = 'nepadmin-sidebar-shrink'
        self.isInit = false
        self.routeLeaveFunc = null
        self.loginToken = null


        /**
         * 设置编辑器内容
         * @param {[type]} index   编辑器索引
         * @param {[type]} content 要设置的内容
         * @param {[type]} flag    是否追加模式
         */
        // Edit.prototype.setContent = function (index, content, flag) {
        //     var iframeWin = getWin(index);
        //     if (!iframeWin[0]) return;
        //     if (flag) {
        //         $(iframeWin[0].document.body).append(content)
        //     } else {
        //         $(iframeWin[0].document.body).html(content)
        //     };
        //     layedit.sync(index)
        // };

        Date.prototype.format = function (fmt) { //author: meizz  
            var o = {
                "M+": this.getMonth() + 1, //月份  
                "d+": this.getDate(), //日  
                "h+": this.getHours(), //小时  
                "m+": this.getMinutes(), //分  
                "s+": this.getSeconds(), //秒   
                "q+": Math.floor((this.getMonth() + 3) / 3), //q是季度
                "S": this.getMilliseconds() //毫秒  
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        String.prototype.format = function (args) {
            var result = this;
            if (arguments.length > 0) {
                if (arguments.length == 1 && typeof (args) == "loginTime") {
                    for (var key in args) {
                        if (args[key] != undefined) {
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                } else {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] != undefined) {
                            //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题  
                            var reg = new RegExp("({)" + i + "(})", "g");
                            result = result.replace(reg, arguments[i]);
                        }
                    }
                }
            }
            return result;
        }

        self.dateFormat = function (value) {
            return value ? new Date(value * 1000).format("yyyy-MM-dd hh:mm:ss") : "";
        }

        self.routeLeave = function (callback) {
            this.routeLeaveFunc = callback
        }
        self.render = function (elem) {
            if (typeof elem == 'string') elem = $('#' + elem)
            if (!elem.get(0)) return
            var action = elem.get(0).tagName == 'SCRIPT' ? 'next' : 'find'
            elem[action]('[is-template]').remove()
            view.parse(elem)
        }
        self.getLoginToken = function () {
            if (self.loginToken == null) {
                self.loginToken =
                    self.data()[conf.tokenName] ||
                    layui.sessionData(conf.tableName, conf.tokenName)
            }
            return self.loginToken
        }
        self.logout = function () {
            layui.sessionData('user', null);
            layui.sessionData('userInfo', null);
            layui.sessionData('role', null);
            layui.sessionData('techSet', null);
            self.navigate(conf.loginPage)
        }
        self.login = function (token, data, isSession) {
            self.data({
                    key: conf.tokenName,
                    value: token
                },
                isSession && sessionStorage
            )

            // 将数据存到缓存
            if ($.isPlainObject(data)) {
                var disableData = []
                layui.each(data, function (key) {
                    disableData.push({
                        key: key,
                        value: data[key]
                    })
                })
                self.data(disableData)
            }
        }
        //初始化整个页面(页面跳转不会触发，页面刷新时触发)
        self.initPage = function (initCallback) {
            //加载样式文件
            layui.each(layui.conf.style, function (index, url) {
                layui.link(url + '?v=' + conf.v)
            })

            self.initView(self.route)
        }
        self.post = function (params) {
            view.request($.extend({
                type: 'post'
            }, params))
        }

        self.delete = function (params) {
            view.request($.extend({
                type: 'delete'
            }, params))
        }

        self.put = function (params) {
            view.request($.extend({
                type: 'put'
            }, params))
        }

        table.set(conf.table)

        /**
        self.router = function(url) {
          var route
          if (url) {
            url = '#' + url
            if (url == '#/') url += conf.entry
            console.log(url)
          } else {
            route = layui.router()
          }
          route.fileurl = '/' + route.path.join('/')
          return route
        }
         */
        //初始化视图区域,刷新时触发
        self.initView = function (route) {
            if (!self.route.href || self.route.href == '/') {
                self.route = layui.router('#' + conf.entry)
                route = self.route
            }
            route.fileurl = '/' + route.path.join('/')

            //判断登录页面
            if (conf.loginCheck == true) {
                // 没有token验证，暂时用role来记录用户的登录状态
                if (layui.sessionData('user').role) {
                    // if (route.fileurl == conf.loginPage) {
                    //     self.navigate('/')
                    //     return
                    // }
                } else {
                    if (route.fileurl != conf.loginPage) {
                        self.logout()
                        return
                    }
                }
            }

            if ($.inArray(route.fileurl, conf.indPage) === -1) {
                var loadRenderPage = function (params) {
                    if (conf.viewTabs == true) {
                        view.renderTabs(route)
                    } else {
                        view.render(route.fileurl)
                    }
                }

                if (view.containerBody == null) {
                    //加载layout文件
                    view.renderLayout(function () {
                        //重新渲染导航
                        element.render('nav', 'side_nav')
                        //加载视图文件
                        loadRenderPage()
                    })
                } else {
                    //layout文件已加载，加载视图文件
                    loadRenderPage()
                }
            } else {
                //加载单页面
                view.renderIndPage(route.fileurl, function () {
                    if (conf.viewTabs == true) view.tab.clear()
                })
            }
        }
        //根据当前加载的URL高亮左侧导航
        self.sidebarFocus = function (url) {
            url = url || self.route.href
            var elem = $('#app-sidebar')
                .find('[lay-href="' + url + '"]')
                .eq(0)
            if (elem.length > 0) {
                elem.parents('.layui-nav-item').addClass('layui-nav-itemed')
                elem.click()
            }
        }
        self.navBarFocus = function (url) {
            url = url || self.route.href
            var elem = $('#header_nav')
                .find('[lay-href="' + url + '"]')
                .eq(0)

            if (elem.length > 0) {
                elem.parents('.layui-nav-item').addClass('layui-nav-itemed')
                elem.click()
            }
        }

        self.flexible = function (open) {
            if (open == true) {
                view.container.removeClass(self.shrinkCls)
            } else {
                view.container.addClass(self.shrinkCls)
            }
        }
        self.on = function (name, callback) {
            return layui.onevent(conf.eventName, 'system(' + name + ')', callback)
        }
        self.event = function (name, params) {
            layui.event(conf.eventName, 'system(' + name + ')', params)
        }
        self.csshref = function (name) {
            name = name == undefined ? self.route.path.join('/') : name
            return conf.css + 'views/' + name + '.css' + '?v=' + conf.v
        }
        self.prev = function (n) {
            if (n == undefined) n = -1
            window.history.go(n)
        }
        self.navigate = function (url) {
            if (url == conf.entry) url = '/'
            window.location.hash = url
        }
        self.data = function (settings, storage) {
            if (settings == undefined) return layui.sessionData(conf.tableName)
            if ($.isArray(settings)) {
                layui.each(settings, function (i) {
                    layui.sessionData(conf.tableName, settings[i], storage)
                })
            } else {
                layui.sessionData(conf.tableName, settings, storage)
            }
        }

        self.setSideNav = function() {
            var menuList = layui.sessionData('role').role.menuTrees,
                route = layui.router(),
                path = route.href, // 路由后缀
                firstPath = route.path[0];
            // 根据一级路由找到对应的侧边列表，渲染
            // 找到与当前页面路由一致的菜单，若该菜单无二级，则设置为选中状态；若该菜单有二级，则设置该一级菜单展开二级，并将与当前路由一致的二级菜单设为选中状态
            for (var j = 0; j < menuList.length; j++) {
                var menuUrlList = menuList[j].menuUrl.split('/')
                if (menuUrlList[1] === firstPath) {
                    var child = menuList[j].child
                    var childNav = ''
                    if (child.length === 0) {
                        self.setHomeSide()
                        return
                    }
                    for (var k = 0; k < child.length; k++) {
                        var dlStr = ''
                        var childFirstPath = child[k].menuUrl.split('/')[1]
                        if (child[k].child.length > 0) {
                            var list = child[k].child
                            var ddStr = ''
                            var showDl = false
                            var pathReg = new RegExp('^' + path, 'ig')
                            for (var f = 0; f < list.length; f++) {
                                var isMatch = pathReg.test(list[f].menuUrl)
                                ddStr +=
                                    '<dd class="' +
                                    (isMatch ? 'active' : '') +
                                    '">' +
                                    '   <a target="' +
                                    ('' || '') +
                                    '" ' +
                                    '      lay-href="' +
                                    (list[f].menuUrl || '') +
                                    '" data-url="' +
                                    (list[f].menuUrl || '') +
                                    '">' +
                                    list[f].menuName +
                                    '   </a>' +
                                    '</dd>'
                            }
                            showDl = path === child[k].menuUrl ? 'show' : ''
                            dlStr =
                                '<dl class="layui-nav-child ' +
                                showDl +
                                '">' +
                                ddStr +
                                '</dd>'
                        }
                        childNav +=
                            '<li class="layui-nav-item sider-nav-item">' +
                            '   <a class="layui-nav-first" href="/index.html#' +
                            child[k].menuUrl +
                            '"data-url="' +
                            child[k].menuUrl +
                            '">' +
                            '       <cite class="cite">' +
                            child[k].menuName +
                            '</cite>' +
                            '<img src="src/images/right-arrow.png" style="' + (path === child[k].menuUrl && dlStr ? 'transform: rotate(90deg);' : 'transform: rotate(0deg);') + 'margin-top: 16px; height: 18px;float:right">'+
                            '   </a>' +
                            dlStr +
                            '</li>'
                    }
                    $('#home_welcome').css({
                        display: 'none'
                    })
                    $('#side_nav').css({
                        display: 'block'
                    })
                    $('#side_nav').html(childNav)
                    $('#side_nav .layui-nav-item').each(function () {
                        var index = $(this).index()
                        var urlReg = new RegExp(
                            '^' +
                            $(this)
                            .find('a')
                            .data('url'),
                            'ig'
                        )
                        if (urlReg.test(path)) {
                            $(this).addClass('layui-this')
                        }
                    })
                    $('#side_nav .layui-nav-item').click(function () {
                        $(this).addClass('layui-this')
                        $(this)
                            .siblings()
                            .removeClass('layui-this')
                        
                        $(this).siblings().each(function(index) {
                            var siDl = $(this).find('dl')
                            if (siDl.length > 0) {
                                $(this).find('dl').css('display', 'none')
                                $(this).find('.layui-nav-first img').css({
                                    'transform': 'rotate(0deg)'
                                })
                            }
                        })
                        var dl = $(this).find('dl')
                        if (dl.length > 0) {
                            $(this)
                                .find('dl')
                                .css('display', 'block')
                            if (
                                $(this)
                                .siblings()
                                .find('dl')
                            ) {
                                $(this)
                                    .siblings()
                                    .find('dl')
                                    .css('display', 'none')
                            }
                            $(this).find('.layui-nav-first img').css({
                                'transform': 'rotate(90deg)'
                            })
                        }
                    })
                    $('#side_nav')
                        .find('.layui-nav-item  dd')
                        .on('click', function () {
                            // $(this).css('background', '#fff')
                            // $(this)
                            //     .find('a')
                            //     .css('color', '#fff')
                            // $(this)
                            //     .siblings()
                            //     .css('background', '#126093')
                            $(this).addClass('active')
                            $(this)
                                .siblings()
                                .removeClass('active');

                            self.navigate($(this).find('a').data('url'))
                            path = $(this)
                                .find('a')
                                .data('url')
                        })
                }
            }
        }

        self.setHomeSide = function () {
            var route = layui.router(),
                path = route.href; // 路由后缀
                
            if (path === '/student') {
                $('#home_welcome').css('display', 'block')
                $('#side_nav').css('display', 'none')
                $('#home_welcome').html(
                    '<span>Welcome!</span>' +
                    '<p>欢迎您使用虚拟仿真实验教学平台！</p>' +
                    '<p>如有困难请点击主菜单栏的“答疑室”搜索常见问题或者向网上值班的老师提问。如果教师不在线你的问题将自动发送到教师的邮箱中。</p>'
                )
            } else if (path === '/') {
                $('#home_welcome').css('display', 'block')
                $('#side_nav').css('display', 'none')
                $('#home_welcome').html(
                    '<span>Welcome!</span>' +
                    '<p>欢迎您使用虚拟仿真实验教学平台！</p>' +
                    '<p>教师在任课期间点击主菜单栏的“答疑室”可接受学生的咨询、整理常见问题、维护答疑库。当您不在答疑室期间，学生针对您所任课程的问题将直接发往您本人登记的电子邮件，请您及时回答学生的问题。</p>'
                )
            } else {
                $('#home_welcome').css('display', 'none')
                $('#side_nav').css('display', 'block')
            }
        }

        self.modal = {}
        self.modal.info = function (msg, params) {
            params = params || {}
            params.titleIcoColor = params.titleIcoColor || '#5a8bff'
            params.titleIco = params.titleIco || 'exclaimination'
            var newLocal = ';display:inline-block;position:relative;top:-2px;height:24px;line-height:24px;text-align:center;width:24px;color:#fff;border-radius:50%;margin-right:10px;"></img>';
            params.title = [
                '<i class="layui-icon layui-icon-' +
                params.titleIco +
                '" style="font-size:12px;background:' +
                params.titleIcoColor +
                newLocal +
                (params.title || '提醒'),
                'background:#fff;border:none;font-weight:bold;font-size:18px;color:#08132b;padding-top:20px;height:46px;line-height:46px;padding-bottom:0;'
            ]
            params = $.extend({
                    btn: ['我知道了'],
                    skin: 'layui-layer-admin-modal',
                    area: [windowWidth <= 750 ? '90%' : '50%'],
                    closeBtn: 0,
                    shadeClose: true
                },
                params
            )
            layer.alert(msg, params)
        }
        self.modal.success = function (msg, params) {
            params = params || {}
            params.titleIco = 'ok'
            params.titleIcoColor = '#30d180'
            self.modal.info(msg, params)
        }
        self.modal.warn = function (msg, params) {
            params = params || {}
            params.titleIco = 'exclaimination'
            params.titleIcoColor = '#ff9900'
            self.modal.info(msg, params)
        }
        self.modal.error = function (msg, params) {
            params = params || {}
            params.titleIco = 'close'
            params.titleIcoColor = '#ed4014'
            self.modal.info(msg, params)
        }
        self.isUrl = function (str) {
            return /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(
                str
            )
        }
        self.popup = function (params) {
            var url = params.url || ''
            var success = params.success || function () {}
            params.skin = 'layui-layer-admin-page'
            POPUP_DATA = params.data || {}
            var defaultParams = {
                type: 1,
                area: ['90%', '90%'], //宽高
                shadeClose: true
            }

            if (self.isUrl(url)) {
                params.type = 2
                params.content = url
                layer.open($.extend(defaultParams, params))
                return
            }

            view.tab.del(url)

            view.loadHtml(conf.views + url, function (res) {
                var htmlElem = $('<div>' + res.html + '</div>')

                if (params.title === undefined) {
                    params.title = htmlElem.find('title').text() || '信息'
                    if (params.title) htmlElem.find('title').remove()
                }

                params.content = htmlElem.html()
                params.success = function (layer, index) {
                    success(layer, index)

                    view.parse(layer)
                    //重新对面包屑进行渲染
                    element.render('breadcrumb', 'nepadmin-breadcrumb')
                }

                params = $.extend(defaultParams, params)
                layer.open($.extend(defaultParams, params))
            })
        }

        //当小于这个尺寸的时候会进行手机端的适配
        var mobileWidth = 991
        var isMobileAdapter = false

        // function mobileAdapter() {
        //     self.flexible(false)
        //     var device = layui.device()
        //     if (device.weixin || device.android || device.ios) {
        //         //点击空白处关闭侧边栏
        //         $(document).on('click', '#' + conf.containerBody, function () {
        //             if (
        //                 $(window).width() < mobileWidth &&
        //                 !view.container.hasClass(self.shrinkCls)
        //             ) {
        //                 self.flexible(false)
        //             }
        //         })
        //     }
        //     isMobileAdapter = true
        // }

        // $(window).on('resize', function (e) {
        //     if ($(window).width() < mobileWidth) {
        //         if (isMobileAdapter == true) return
        //         mobileAdapter()
        //     } else {
        //         isMobileAdapter = false
        //     }
        // })

        // 页面切换时触发
        $(window).on('hashchange', function (e) {
            //移动端跳转链接先把导航关闭
            // if ($(window).width() < mobileWidth) {
            //     self.flexible(false)
            // }
            self.route = layui.router()
            layer.closeAll()
            self.initView(self.route)
        })

        //回车提交 form 表单
        $(document).on('keydown', function (e) {
            var ev = document.all ? window.event : e
            if (ev.keyCode == 13) {
                var form = $(':focus').parents('.layui-form')
                form.find('[lay-submit]').click()
            }
        })

        $(document).on('click', '[lay-href]', function (e) {
            var href = $(this).attr('lay-href')
            var target = $(this).attr('target')

            if (href == '') return
            if (self.isUrl(href)) {
                next()
            }

            function next() {
                target == '__blank' ? window.open(href) : self.navigate(href)
            }

            if ($.isFunction(self.routeLeaveFunc)) {
                self.routeLeaveFunc(self.route, href, next)
            } else {
                next()
            }

            return false
        })
        $(document).on('click', '[lay-popup]', function (e) {
            var params = $(this).attr('lay-popup')
            self.popup(
                params.indexOf('{') === 0 ?
                new Function('return ' + $(this).attr('lay-popup'))() : {
                    url: params
                }
            )
            return false
        })
        $(document).on('mouseenter', '[lay-tips]', function (e) {
            var title = $(this).attr('lay-tips')
            var dire = $(this).attr('lay-dire') || 3
            if (title) {
                layer.tips(title, $(this), {
                    tips: [dire, '#263147']
                })
            }
        })
        $(document).on('mouseleave', '[lay-tips]', function (e) {
            layer.closeAll('tips')
        })

        $(document).on('click', '*[' + conf.eventName + ']', function (e) {
            self.event($(this).attr(conf.eventName), $(this))
        })

        var shrinkSidebarBtn =
            '.' + self.shrinkCls + ' #app-sidebar .layui-nav-item a'

        $(document).on('click', shrinkSidebarBtn, function (e) {
            if (isMobileAdapter == true) return
            var chileLength = $(this)
                .parent()
                .find('.layui-nav-child').length
            if (chileLength > 0) {
                self.flexible(true)
                layer.closeAll('tips')
            }
        })
        $(document).on('mouseenter', shrinkSidebarBtn, function (e) {
            var title = $(this).attr('title')
            if (title) {
                layer.tips(title, $(this).find('.layui-icon'), {
                    tips: [2, '#263147']
                })
            }
        })
        $(document).on('mouseleave', shrinkSidebarBtn, function (e) {
            layer.closeAll('tips')
        })

        self.on('flexible', function (init) {
            var status = view.container.hasClass(self.shrinkCls)
            self.flexible(status)
            self.data({
                key: 'flexible',
                value: status
            })
        })
        self.on('refresh', function (e) {
            var url = self.route.href
            if (conf.viewTabs == true) {
                //view.tab.refresh(url);
            } else {
                view.render(location.hash)
            }
        })
        self.on('prev', function (e) {
            self.prev()
        })

        self.on('logout', function (e) {
            self.logout()
        })

        self.on('fullscreen', function (e) {
            var normalCls = 'layui-icon-screen-full'
            var activeCls = 'layui-icon-screen-restore'
            var ico = e.find('.layui-icon')

            if (ico.hasClass(normalCls)) {
                var e = document.body
                e.webkitRequestFullScreen ?
                    e.webkitRequestFullScreen() :
                    e.mozRequestFullScreen ?
                    e.mozRequestFullScreen() :
                    e.requestFullScreen && e.requestFullscreen()
                ico.removeClass(normalCls).addClass(activeCls)
            } else {
                var e = document
                e.webkitCancelFullScreen ?
                    e.webkitCancelFullScreen() :
                    e.mozCancelFullScreen ?
                    e.mozCancelFullScreen() :
                    e.cancelFullScreen ?
                    e.cancelFullScreen() :
                    e.exitFullscreen && e.exitFullscreen()
                ico.removeClass(activeCls).addClass(normalCls)
            }
        })

        // if ($(window).width() <= mobileWidth) {
        //     mobileAdapter()
        // } else {
        var flexibleOpen = self.data().flexible
        self.flexible(flexibleOpen === undefined ? true : flexibleOpen)
        // }

        exports('admin', self)
    })