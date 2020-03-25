/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2020, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2020/3/6 9:59
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
export const modules = [
  {
    value: 'ocbo-backStage',
    label: '后台用户管理',
    children: [
      {
        value: 'role-manage',
        label: '角色管理'
      },
      {
        value: 'user-manage',
        label: '用户管理'
      }
    ]
  },
  {
    value: 'ocbo-frontStage',
    label: '前台用户管理',
    children: [
      {
        value: 'regional-user-mange',
        label: '区域用户管理'
      },
      {
        value: 'school-user-mange',
        label: '校级用户管理'
      },
      {
        value: 'teacher-manage',
        label: '教师管理'
      },
      {
        value: 'student-manage',
        label: '学生管理'
      },
      {
        value: 'parent-manage',
        label: '家长管理'
      },
      {
        value: 'regional-user-bin',
        label: '区域用户回收站'
      },
      {
        value: 'school-user-bin',
        label: '校级用户回收站'
      },
      {
        value: 'teacher-bin',
        label: '教师回收站'
      },
      {
        value: 'student-bin',
        label: '学生回收站'
      },
      {
        value: 'parent-bin',
        label: '家长回收站'
      },
    ]
  },
  {
    value: 'ocbo-basicConfig',
    label: '基础配置',
    children: [
      {
        value: 'regional-plat-mange',
        label: '区域平台管理'
      },
      {
        value: 'school-plat-mange',
        label: '校级平台管理'
      },
      {
        value: 'class-manage',
        label: '教室管理'
      },
    ]
  },
  {
    value: 'ocbo-knowledge',
    label: '知识网络管理',
    children: [
      {
        value: 'knowledge-mange',
        label: '知识网络管理'
      },
      {
        value: 'subject-manage',
        label: '学科管理'
      }
    ]
  },
  {
    value: 'ocbo-functionConfig',
    label: '功能配置',
    children: [
      {
        value: 'regional-time-config',
        label: '有效时长配置'
      },
      {
        value: 'regional-term-config',
        label: '学期配置'
      },
      {
        value: 'palt-batch-config',
        label: '平台批量配置'
      },
      {
        value: 'portal-batch-config',
        label: '门户批量配置'
      },
      {
        value: 'knowledge-config',
        label: '知识网络配置'
      }
    ]
  },
  {
    value: 'ocbo-application',
    label: '应用管理',
    children: [
      {
        value: 'subject-bin',
        label: '课程回收站'
      },
      {
        value: 'activity-manage',
        label: '活动管理'
      }
    ]
  },
  {
    value: 'ocbo-config',
    label: '配置管理',
    children: [
      {
        value: 'media-server-config',
        label: '流媒体服务器配置'
      },
      {
        value: 'msg-server-config',
        label: '消息服务器配置'
      },
      {
        value: 'resources-server-config',
        label: '区域资源服务器配置'
      },
      {
        value: 'cdn-server-config',
        label: 'CDN服务器配置'
      }
    ]
  },
  {
    value: 'ocbo-log',
    label: '日志管理',
    children: [
      {
        value: 'log-manage',
        label: '日志管理'
      }
    ]
  },
  {
    value: 'ocbo-mobile',
    label: '移动端版本管理',
    children: [
      {
        value: 'android-mange',
        label: 'Android版本管理'
      },
      {
        value: 'ios-manage',
        label: 'IOS版本管理'
      }
    ]
  },
]
