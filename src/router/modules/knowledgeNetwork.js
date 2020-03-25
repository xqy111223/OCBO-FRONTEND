/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/18 13:14
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  知识网络管理
 */
import Layout from '@/views/framework/Layout'

const knowledgeNetwork = {
  path: '/kn-nk',
  component: Layout,
  redirect: '',
  meta: {
    title: '知识网络管理', icon: 'el-icon-custom-manage-knowledge'
  },
  children: [
    {
      path: '/kn-nk/ke-nk',
      component: () => import('@/views/knowledgeNetwork/KnowledgeNetwork'),
      name: 'KnowledgeNetwork',
      meta: { title: '知识网络管理' }
    },
    {
      path: '/kn-nk/ce-me',
      component: () => import('@/views/knowledgeNetwork/CourseManage'),
      name: 'CourseManage',
      meta: { title: '学科管理' }
    }
  ]
}

export default knowledgeNetwork
