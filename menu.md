```bash
[{
    "role": 'teacher',
    "menu": [{
        "name": '首页',
        "path": '/',
        child: []
    }, {
        "name": '课程管理',
        "path": '/course/index',
        child: [{
            name: '课程库',
            path: '/course/index',
            child: []
        }]
    }, {
        "name": '课程设置',
        "path": '/techSet/techpre',
        child: [{
                name: '课程导读',
                path: '/techSet/techpre',
                child: []
            },
            {
                name: '试卷管理',
                path: '/techSet/paperManage',
                child: []
            },
            {
                name: '实验准备',
                path: '/techSet/readyNew',
                child: [{
                    name: '布置新实验',
                    path: '/techSet/readyNew',
                }, {
                    name: '已安排实验',
                    path: '/techSet/readyList',
                }]
            },
            {
                name: '实验过程',
                path: '/techSet/processTest',
                child: []
            },
            {
                name: '实验结果',
                path: '/techSet/processTest',
                child: [{
                    name: '实验结果',
                    path: '/techSet/resultTest',
                    child: [{
                        name: '实验批改',
                        path: '/techSet/resultTest',
                    }, {
                        name: '成绩导出',
                        path: '/techSet/scoreOut',
                    }]
                }],
            },
            {
                name: '实验评价',
                path: '/techSet/evaluate',
                child: []
            },
        ]
    }, {
        "name": '开课管理',
        "path": '/techManage/index',
        child: [{
            name: '开课计划',
            path: '/techManage/plan',
            child: []
        }, {
            name: '开课列表',
            path: '/techManage/index',
            child: []
        }, {
            name: '开课统计',
            path: '/techManage/display',
            child: []
        }]
    }, {
        "name": '实验管理',
        "path": '/experiment/mylist',
        child: [{
            name: '实验管理',
            path: '/experiment/mylist',
            child: [{
                name: '参考实验库',
                path: '/experiment/refer',
            }, {
                name: '我的实验库',
                path: '/experiment/mylist',
            }]
        }]
    }, {
        "name": '资源管理',
        "path": '/sourceManage/myList',
        child: [{
            name: '资源管理',
            path: '/sourceManage/myList',
            child: [{
                name: '我的资源库',
                path: '/sourceManage/myList',
            }, {
                name: '教学资源库',
                path: '/sourceManage/techList',
            }]
        }]
    }, {
        "name": '题库管理',
        "path": '/examine/knowledge',
        child: [{
            name: '题库管理',
            path: '/examine/knowledge',
            child: [{
                name: '知识点',
                path: '/examine/knowledge'
            }, {
                name: '习题库',
                path: '/examine/examlist'
            }, {
                name: '试卷策略',
                path: '/examine/ploy'
            }]
        }]

    }, {
        "name": '课程表',
        "path": '/schedule/teacherList',
        child: [{
            "name": '课程表',
            "path": '/schedule/teacherList',
            child: [{
                "name": '教师个人课程表',
                "path": '/schedule/teacherList',
            }, {
                "name": '总课程表',
                "path": '/schedule/allList',
            }]
        }]
    }, {
        "name": '答疑室',
        "path": '/chat',
    }, {
        "name": '个人信息',
        "path": '/personalInfo/personalInfo',
        child: [{
            "name": '个人信息',
            "path": '/personalInfo/personalInfo',
        }]
    }]
}, {
    "role": 'student',
    "menu": [{
        "name": '首页',
        "path": '/student'
    }, {
        "name": '选课',
        "path": '/checkCourse/preintro',
        child: [{
            "name": '选课',
            "path": '/checkCourse/preintro'
        }, {
            "name": '查看已选课单',
            "path": '/checkCourse/checkedList',
        }]
    }, {
        "name": '课程内容',
        "path": '/checkCourse/preintro',
        child: [{
            "name": '课程导读',
            "path": '/checkCourse/preintro'
        }, {
            "name": '理论测试',
            "path": '/checkCourse/testList',
        }, {
            "name": '虚拟实验',
            "path": '/checkCourse/virtualTest',
        }, {
            "name": '实物实验',
            "path": '/checkCourse/entityTest',
        }, {
            "name": '课程评价',
            "path": '/checkCourse/courseEvaluate',
        }]
    }, {
        "name": '资源库',
        "path": '/sourceManage/myList',
        child: [{
            name: '资源库',
            "path": '/sourceManage/myList',
            child: [{
                name: '我的收藏',
                "path": '/sourceManage/myList',
            }, {
                name: '资源列表',
                "path": '/sourceManage/techList',
            }]
        }]
    }, {
        "name": '课程表',
        "path": '/schedule/allList',
        child: [{
            "name": '课程表',
            "path": '/schedule/allList',
            child: [{
                name: '学生个人课程表',
                "path": '/schedule/teacherList',
            }, {
                name: '总课程表',
                "path": '/schedule/allList',
            }]
        }]
    }, {
        "name": '答疑室',
        "path": '/chat'
    }, {
        "name": '个人信息',
        "path": '/personalInfo/personalInfo',
        child: [{
            "name": '个人信息',
            "path": '/personalInfo/personalInfo',
        }]
    }]
}, {
    "role": 'admin',
    "menu": [{
        "name": '用户管理',
        "path": '/user/all',
        child: [{
            name: '用户管理',
            path: '/user/all',
            child: [{
                name: '学生列表',
                path: '/user/student'
            }, {
                name: '教工列表',
                path: '/user/teacher'
            }, {
                name: '所有用户',
                path: '/user/all'
            }]
        }, {
            name: '机构管理',
            path: '/orgManage/college',
            child: [{
                name: '学院管理',
                path: '/orgManage/college'
            }, {
                name: '系管理',
                path: '/orgManage/school'
            }, {
                name: '专业管理',
                path: '/orgManage/profess'
            }, {
                name: '班管理',
                path: '/orgManage/classes'
            }]
        }],
    }, {
        "name": '系统管理',
        "path": '/systemManage/roleManage',
        child: [{
            name: '系统管理',
            path: '/systemManage/roleManage',
            child: [{
                name: '角色管理',
                path: '/systemManage/roleManage'
            }, {
                name: '权限管理',
                path: '/systemManage/ruleManage'
            }, {
                name: '学生类型',
                path: '/systemManage/studentType'
            }, {
                name: '教室管理',
                path: '/systemManage/classroomManage'
            }, {
                name: '实验室管理',
                path: '/systemManage/labManage'
            }, {
                name: '实验类型管理',
                path: '/systemManage/testType'
            }, {
                name: '规则管理',
                path: '/systemManage/ruleManage'
            }, {
                name: '周次管理',
                path: '/systemManage/weekTimeManage'
            }, {
                name: '数据备份',
                path: '/systemManage/dataBackup'
            }]
        }],
    }, {
        "name": '学期配置',
        "path": '/termDeploy/termSet',
        child: [{
            name: '学期设置',
            path: '/termDeploy/termSet'
        }, {
            name: '选课日期',
            path: '/termDeploy/courseSelecteDate'
        }, {
            name: '上课时间',
            path: '/termDeploy/classTime'
        }, {
            name: '年期管理',
            path: '/termDeploy/gradeManage'
        }]
    }, {
        "name": '统计管理',
        "path": '/statistics/tech',
        child: [{
            name: '系开课统计管理',
            path: '/statistics/tech'
        }, {
            name: '虚拟实验统计',
            path: '/statistics/test'
        }, {
            name: '成绩系统分析',
            path: '/statistics/score'
        }, {
            name: '资源统计管理',
            path: '/statistics/source'
        }]
    }, {
        "name": '个人信息',
        "path": '/personalInfo/personalInfo',
        child: [{
            "name": '个人信息',
            "path": '/personalInfo/personalInfo',
        }]
    }]
}]
```
