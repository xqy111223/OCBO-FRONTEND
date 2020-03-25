/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/29 11:38
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description
 */

import applicationManage from '@/mock/data/applicationManage/index'

export default [
  {
    url: '/ecsp/applicationManage/courseRecycleList',
    type: 'get',
    data: applicationManage.courseRecycleList, // 返回课程回收站课程数据
    mock: true
  },
  {
    url: '/ecsp/applicationManage/courseDelete',
    type: 'get',
    data: {}, // 删除
    mock: true
  },
]
