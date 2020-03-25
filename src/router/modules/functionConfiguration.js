/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/18 13:22
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  功能配置路由
 */

import Layout from '@/views/framework/Layout'

const functionConfiguration = {
  path: '/fn-cn',
  component: Layout,
  redirect: '',
  meta: {
    title: '功能配置', icon: 'el-icon-custom-dispose-function'
  },
  children: [
    {
      path: '/fn-cn/ee-te-me',
      component: () => import('@/views/functionConfiguration/EffectiveTimeManage'),
      name: 'EffectiveTimeManage',
      meta: { title: '有效时长配置' }
    },
    {
      path: '/fn-cn/tm-me',
      component: () => import('@/views/functionConfiguration/TermManage'),
      name: 'TermManage',
      meta: { title: '学期配置' }
    },
    {
      path: '/fn-cn/pm-bh-me',
      component: () => import('@/views/functionConfiguration/PlatformBatchManage'),
      name: 'PlatformBatchManage',
      meta: { title: '平台批量配置' }
    },
    {
      path: '/fn-cn/pl-bh-me',
      component: () => import('@/views/functionConfiguration/PortalBatchManage'),
      name: 'PortalBatchManage',
      meta: { title: '门户批量配置' }
    },
    {
      path: '/fn-cn/ke-nk-me',
      component: () => import('@/views/functionConfiguration/KnowledgeNetworkManage'),
      name: 'KnowledgeNetworkManage',
      meta: { title: '知识网络配置' }
    },
    {
      path: '/fn-cn/set-nk',
      component: () => import('@/views/functionConfiguration/KnowledgeNetworkManage/setKnowledgeNetwork'),
      name: 'SetKnowledgeNetwork',
      meta: { title: '配置知识网络' }
    },
    {
      path: '/fn-cn/sm-tm',
      component: () => import('@/views/functionConfiguration/TermManage/systemTerm'),
      name: 'SystemTerm',
      meta: { title: '配置系统学期' }
    },
    {
      path: '/fn-cn/rl-tm',
      component: () => import('@/views/functionConfiguration/TermManage/regionalTerm'),
      name: 'RegionalTerm',
      meta: { title: '配置区域学期' }
    },
  ]
}

export default functionConfiguration
