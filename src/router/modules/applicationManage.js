/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/18 13:35
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  应用管理路由
 */

import Layout from '@/views/framework/Layout'

const applicationManage = {
  path: '/an-me',
  component: Layout,
  redirect: '',
  meta: {
    title: '应用管理', icon: 'el-icon-custom-manage-apply'
  },
  children: [
    {
      path: '/an-me/ce-rg-bn',
      component: () => import('@/views/applicationManage/CourseRecyclingBin'),
      name: 'CourseRecyclingBin',
      meta: { title: '课程回收站' }
    },
    {
      path: '/an-me/ay-me',
      component: () => import('@/views/applicationManage/ActivityManage'),
      name: 'ActivityManage',
      meta: { title: '活动管理' }
    },
    {
      path: '/an-me/ay-me/add-activity',
      component: () => import('@/views/applicationManage/ActivityManage/AddOrEditActivity'),
      name: 'AddActivity',
      meta: { title: '新增活动' }
    },
    {
      path: '/an-me/ay-me/edit-activity',
      component: () => import('@/views/applicationManage/ActivityManage/AddOrEditActivity'),
      name: 'EditActivity',
      meta: { title: '编辑活动' }
    },
    {
      path: '/an-me/ay-me/stastic-activity',
      component: () => import('@/views/applicationManage/ActivityManage/ActivityStastic'),
      name: 'ActivityStastic',
      meta: { title: '活动统计' }
    },
    {
      path: '/an-me/ay-me/view-activity',
      component: () => import('@/views/applicationManage/ActivityManage/ViewActivityDetails'),
      name: 'ViewActivity',
      meta: { title: '查看活动' }
    }
  ]
}

export default applicationManage
