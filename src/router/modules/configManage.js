/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/18 13:49
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  配置管理路由
 */
import Layout from '@/views/framework/Layout'

const configManage = {
  path: '/cg-me',
  component: Layout,
  redirect: '',
  meta: {
    title: '配置管理', icon: 'el-icon-custom-manage-deploy'
  },
  children: [
    {
      path: '/cg-me/sg-ma-me',
      component: () => import('@/views/configManage/StreamingMediaManage'),
      name: 'StreamingMediaManage',
      meta: { title: '流媒体服务器配置' }
    },
    {
      path: '/cg-me/me-me',
      component: () => import('@/views/configManage/MessageManage'),
      name: 'MessageManage',
      meta: { title: '消息服务器配置' }
    },
    {
      path: '/cg-me/rl-re-me',
      component: () => import('@/views/configManage/RegionalResourceManage'),
      name: 'RegionalResourceManage',
      meta: { title: '区域资源服务器配置' }
    },
    // {
    //   path: '/cg-me/cdn',
    //   component: () => import('@/views/configManage/CDNManage'),
    //   name: 'CDNManage',
    //   meta: { title: 'CDN服务器配置' }
    // },
  ]
}

export default configManage
