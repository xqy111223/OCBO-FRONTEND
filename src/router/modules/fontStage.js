/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/17 16:05
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  前台用户管理路由
 */

import Layout from '@/views/framework/Layout'

const fontStage = {
  path: '/ft-se',
  component: Layout,
  redirect: '',
  meta: {
    title: '前台用户管理', icon: 'el-icon-custom-foreground-user'
  },
  children: [
    {
      path: '/ft-se/rl-ur-me',
      component: () => import('@/views/fontStage/RegionalUserManage'),
      name: 'RegionalUserManage',
      meta: { title: '区域用户管理' }
    },
    {
      path: '/ft-se/sl-ur-me',
      component: () => import('@/views/fontStage/SchoolUserManage'),
      name: 'SchoolUserManage',
      meta: { title: '校级用户管理' }
    },
    {
      path: '/ft-se/tr-me',
      component: () => import('@/views/fontStage/TeacherManage'),
      name: 'TeacherManage',
      meta: { title: '教师管理' }
    },
    {
      path: '/ft-se/st-me',
      component: () => import('@/views/fontStage/StudentManage'),
      name: 'StudentManage',
      meta: { title: '学生管理' }
    },
    {
      path: '/ft-se/pt-me',
      component: () => import('@/views/fontStage/ParentManage'),
      name: 'ParentManage',
      meta: { title: '家长管理' }
    },
    {
      path: '/ft-se/rl-ur-re-bn',
      component: () => import('@/views/fontStage/RegionalUserRecycleBin'),
      name: 'RegionalUserRecycleBin',
      meta: { title: '区域用户回收站' }
    },
    {
      path: '/ft-se/sl-ur-re-bn',
      component: () => import('@/views/fontStage/SchoolUserRecycleBin'),
      name: 'SchoolUserRecycleBin',
      meta: { title: '校级用户回收站' }
    },
    {
      path: '/ft-se/tr-re-bn',
      component: () => import('@/views/fontStage/TeacherRecycleBin'),
      name: 'TeacherRecycleBin',
      meta: { title: '教师回收站' }
    },
    {
      path: '/ft-se/st-re-bn',
      component: () => import('@/views/fontStage/StudentRecycleBin'),
      name: 'StudentRecycleBin',
      meta: { title: '学生回收站' }
    },
    {
      path: '/ft-se/pt-re-bn',
      component: () => import('@/views/fontStage/ParentRecycleBin'),
      name: 'ParentRecycleBin',
      meta: { title: '家长回收站' }
    }
  ]
}

export default fontStage
