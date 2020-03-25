/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/17 16:05
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  前台用户管理路由
 */

import Layout from '@/views/framework/Layout'

const mobileManage = {
  path: '/me-vn',
  component: Layout,
  redirect: '',
  meta: {
    title: '移动端版本控制', icon: 'el-icon-custom-Mobile-management'
  },
  children: [
    {
      path: '/me-me/andriod',
      component: () => import('@/views/mobileManage/android'),
      name: 'AndroidVersion',
      meta: { title: 'Android版本控制' }
    },
    {
      path: '/me-me/ios',
      component: () => import('@/views/mobileManage/ios'),
      name: 'IosVersion',
      meta: { title: 'IOS版本控制' }
    }
  ]
}

export default mobileManage
