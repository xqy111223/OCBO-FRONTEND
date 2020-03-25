/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/17 16:05
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  后台用户管理路由
 */

import Layout from '@/views/framework/Layout'

const backStage = {
  path: '/bk-se',
  component: Layout,
  redirect: '',
  meta: {
    title: '后台用户管理', icon: 'el-icon-custom-backstage-user'
  },
  children: [
    {
      path: '/bk-se/re-me',
      component: () => import('@/views/backStage/RoleManage'),
      name: 'RoleManage',
      meta: { title: '角色管理' }
    },
    {
      path: '/bk-se/ur-me',
      component: () => import('@/views/backStage/UserManage'),
      name: 'UserManage',
      meta: { title: '用户管理' },
    },
    {
      path: '/bk-se/ad-ur',
      component: () => import('@/views/backStage/RoleManage/AddOrEditRole'),
      name: 'AddUser',
      meta: { title: '新增角色' },
      hidden: true,
    },
    {
      path: '/bk-se/ed-ur',
      component: () => import('@/views/backStage/RoleManage/AddOrEditRole'),
      name: 'EditUser',
      meta: { title: '编辑角色' },
      hidden: true,
    },
  ]
}

export default backStage
