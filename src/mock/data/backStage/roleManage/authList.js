/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/15 15:09
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 新增编辑角色角色所有权限数据， 供前端渲染页面使用
 */
export const authListData = [
  {
    moduleName: '后台用户管理',
    code: 'ocbo-backStage',
    isChecked: false,
    children: [
      {
        moduleName: '角色管理',
        code: 'role-manage',
        isChecked: false,
        authArray: [
          {
            code: 'back-role-add',
            name: '新增角色',
            isChecked: false
          },
          {
            code: 'back-role-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'back-role-delete',
            name: '删除',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '用户管理',
        code: 'user-manage',
        isChecked: false,
        authArray: [
          {
            code: 'back-user-add',
            name: '新增用户',
            isChecked: false
          },
          {
            code: 'back-user-edit',
            name: '编辑',
            isChecked: false
          }
        ]
      },
    ]
  },
  {
    moduleName: '前台用户管理',
    code: 'ocbo-frontStage',
    isChecked: false,
    isCollapsed: true,
    children: [
      {
        moduleName: '区域用户管理',
        code: 'regional-user-mange',
        isChecked: false,
        authArray: [
          {
            code: 'regional-user-add ',
            name: '新增用户',
            isChecked: false
          },
          {
            code: 'regional-user-batch-add',
            name: '批量新增',
            isChecked: false
          },
          {
            code: 'regional-user-export',
            name: '导出',
            isChecked: false
          },
          {
            code: 'regional-user-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'regional-user-delete',
            name: '删除',
            isChecked: false
          }
        ]
      },
      {
        moduleName: '校级用户管理',
        code: 'school-user-mange',
        authArray: [
          {
            code: 'school-user-add ',
            name: '新增用户',
            isChecked: false
          },
          {
            code: 'school-user-batch-add',
            name: '批量新增',
            isChecked: false
          },
          {
            code: 'school-user-export',
            name: '导出',
            isChecked: false
          },
          {
            code: 'school-user-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'school-user-delete',
            name: '删除',
            isChecked: false
          }
        ]
      },
      {
        moduleName: '教师管理',
        code: 'teacher-manage',
        isChecked: false,
        authArray: [
          {
            code: 'teacher-export',
            name: '导出',
            isChecked: false
          },
          {
            code: 'teacher-delete',
            name: '删除',
            isChecked: false
          }
        ]
      },
      {
        moduleName: '学生管理',
        code: 'student-manage',
        isChecked: false,
        authArray: [
          {
            code: 'student-export',
            name: '导出',
            isChecked: false
          },
          {
            code: 'student-delete',
            name: '删除',
            isChecked: false
          }
        ]
      },
      {
        moduleName: '家长管理',
        code: ' parent-manage',
        isChecked: false,
        authArray: [
          {
            code: 'parent-export',
            name: '导出',
            isChecked: false
          },
          {
            code: 'parent-delete',
            name: '删除',
            isChecked: false
          }
        ]
      },
      {
        moduleName: '区域用户回收站',
        code: 'regional-user-bin',
        isChecked: false,
        authArray: [
          {
            code: 'regional-user-recovery',
            name: '恢复',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '校级用户回收站',
        code: 'school-user-bin',
        isChecked: false,
        authArray: [
          {
            code: 'school-user-recovery',
            name: '恢复',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '教师回收站',
        code: 'teacher-bin',
        isChecked: false,
        authArray: [
          {
            code: 'teacher-recovery',
            name: '恢复',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '学生回收站',
        code: 'student-bin',
        isChecked: false,
        authArray: [
          {
            code: 'student-recovery',
            name: '恢复',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '家长回收站',
        code: 'parent-bin',
        isChecked: false,
        authArray: [
          {
            code: 'parent-recovery',
            name: '恢复',
            isChecked: false
          },
        ]
      }
    ],
  },
  {
    moduleName: '基础配置',
    code: 'ocbo-basicConfig',
    isChecked: false,
    children: [
      {
        moduleName: '区域平台管理',
        code: 'regional-plat-mange',
        isChecked: false,
        authArray: [
          {
            code: 'regional-plat-open',
            name: '开通平台',
            isChecked: false
          },
          {
            code: 'regional-plat-bactch-open',
            name: '批量开通',
            isChecked: false
          },
          {
            code: 'regional-plat-export',
            name: '导出',
            isChecked: false
          },
          {
            code: 'regional-plat-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'regional-plat-delete',
            name: '删除',
            isChecked: false
          },
          {
            code: 'map-edit',
            name: ' 编辑地图',
            isChecked: false
          },
          {
            code: 'map-delete',
            name: '删除地图',
            isChecked: false
          },
          {
            code: 'regional-protal-config',
            name: '门户配置',
            isChecked: false
          },
          {
            code: 'regional-server-config',
            name: ' 服务器配置',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '校级平台管理',
        code: 'school-plat-mange',
        isChecked: false,
        authArray: [
          {
            code: 'school-plat-open',
            name: '开通平台',
            isChecked: false
          },
          {
            code: 'school-plat-bactch-open',
            name: '批量开通',
            isChecked: false
          },
          {
            code: 'school-plat-export',
            name: '导出',
            isChecked: false
          },
          {
            code: 'school-plat-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'school-plat-delete',
            name: '删除',
            isChecked: false
          },
          {
            code: 'school-protal-config',
            name: ' 门户配置',
            isChecked: false
          },
          {
            code: 'school-server-config',
            name: '服务器配置',
            isChecked: false
          },
          {
            code: 'associate-school',
            name: '关联学校',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '教室管理',
        code: 'class-manage',
        isChecked: false,
        authArray: [
          {
            code: 'class-add',
            name: '新增教室',
            isChecked: false
          },
          {
            code: 'class-batch-add',
            name: '批量新增',
            isChecked: false
          },
          {
            code: 'class-edit',
            name: '导出',
            isChecked: false
          },
          {
            code: 'class-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'class-delete',
            name: '删除',
            isChecked: false
          },
        ]
      },
    ]
  },
  {
    moduleName: '知识网络管理',
    code: 'ocbo-knowledge',
    isChecked: false,
    children: [
      {
        moduleName: '知识网络管理',
        code: 'ocbo-knowledge',
        isChecked: false,
        authArray: [
          {
            code: 'knowledge-default-show',
            name: '默认显示',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '学科管理',
        authArray: [
          {
            code: 'course-default-show',
            name: '默认显示',
            isChecked: false
          },
        ]
      },
    ]
  },
  {
    moduleName: '功能配置',
    children: [
      {
        moduleName: '有效时长配置',
        authArray: [
          {
            code: 'regional-time-config',
            name: '配置区域时长',
            isChecked: false
          },
          {
            code: 'system-time-config ',
            name: '配置系统时长',
            isChecked: false
          },
          {
            code: 'time-adit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'time-delete',
            name: '删除',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '学期配置',
        authArray: [
          {
            code: 'regional-term-config',
            name: '配置区域学期',
            isChecked: false
          },
          {
            code: 'system-term-config  ',
            name: '配置系统学期',
            isChecked: false
          },
          {
            code: 'term-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'term-delete',
            name: '删除',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '平台批量配置',
        authArray: []
      },
      {
        moduleName: '门户批量配置',

        authArray: []
      },
      {
        moduleName: '知识网络配置',
        authArray: [
          {
            code: 'knowledge-config',
            name: '配置知识网络',
            isChecked: false
          },
          {
            code: 'knowledge-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'knowledge-delete',
            name: '删除',
            isChecked: false
          },
        ]
      },
    ]
  },
  {
    moduleName: '应用管理',
    children: [
      {
        moduleName: '课程回收站',
        authArray: [
          {
            code: 'course-recovery',
            name: '恢复',
            isChecked: false
          },
          {
            code: 'course-delete',
            name: '彻底删除',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '活动管理',
        authArray: [
          {
            code: 'activity-add',
            name: '新增活动',
            isChecked: false
          },
          {
            code: 'activity-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'activity-statistics',
            name: '活动统计',
            isChecked: false
          },
          {
            code: 'communication-mamage',
            name: '交流管理',
            isChecked: false
          },
          {
            code: 'activity-delete',
            name: '删除',
            isChecked: false
          },
        ]
      },
    ]
  },
  {
    moduleName: '配置管理',
    children: [
      {
        moduleName: '流媒体服务器配置',
        authArray: [
          {
            code: 'media-server-add',
            name: '新增服务器',
            isChecked: false
          },
          {
            code: 'media-server-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'media-server-delete',
            name: '删除',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '消息服务器配置',
        authArray: [
          {
            code: 'msg-server-add',
            name: '新增服务器',
            isChecked: false
          },
          {
            code: 'msg-server-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'msg-server-delete',
            name: '删除',
            isChecked: false
          },
        ]
      },
      {
        moduleName: '区域资源服务器配置',
        authArray: [
          {
            code: 'resources-server-add',
            name: '新增服务器',
            isChecked: false
          },
          {
            code: 'resources-server-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'resources-server-delete',
            name: '删除',
            isChecked: false
          },
        ]
      },
      {
        moduleName: 'CDN服务器配置',
        authArray: [
          {
            code: 'cdn-server-add',
            name: '新增服务器',
            isChecked: false
          },
          {
            code: 'cdn-server-edit',
            name: '编辑',
            isChecked: false
          },
          {
            code: 'cdn-server-delete',
            name: '删除',
            isChecked: false
          },
        ]
      },
    ]
  },
]
