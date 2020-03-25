/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/18 13:56
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  日志管理路由
 */

import Layout from '@/views/framework/Layout'

const logManage = {
  path: '/lg-me',
  component: Layout,
  redirect: '',
  meta: {
    title: '日志管理', icon: 'el-icon-custom-manage-journal'
  },
  children: [
    {
      path: '/lg-me',
      component: () => import('@/views/logManage/LogManage'),
      name: 'LogManage',
      meta: { title: '日志管理' }
    }
  ]
}

export default logManage
