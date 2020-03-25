/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/18 12:51
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  基础配置路由
 */

import Layout from '@/views/framework/Layout'

const basicConfiguration = {
  path: '/bc-cn',
  component: Layout,
  redirect: '',
  meta: {
    title: '基础配置', icon: 'el-icon-custom-dispose-basic'
  },
  children: [
    {
      path: '/bc-cn/rl-pm-me',
      component: () => import('@/views/basicConfiguration/RegionalPlatformManage'),
      name: 'RegionalPlatformManage',
      meta: { title: '区域平台配置' }
    },
    {
      path: '/bc-cn/sl-pm-me',
      component: () => import('@/views/basicConfiguration/SchoolPlatformManage'),
      name: 'SchoolPlatformManage',
      meta: { title: '校级平台配置' }
    },
    {
      path: '/bc-cn/cm-me',
      component: () => import('@/views/basicConfiguration/ClassroomManage'),
      name: 'ClassroomManage',
      meta: { title: '教室管理' }
    },
    {
      path: '/fn-cn/pl-me',
      component: () => import('@/views/basicConfiguration/RegionalPlatformManage/portalManage'),
      name: 'PortalManage',
      meta: { title: '门户配置' },
      hidden: true
    }
  ]
}

export default basicConfiguration
