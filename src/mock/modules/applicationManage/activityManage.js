/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/23 9:24
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description
 */
import applicationManage from '@/mock/data/applicationManage/index'
import urls from '@/api/OCURL'

export default [
  {
    url: urls.activityList,
    type: 'get',
    data: applicationManage.activityList, // 活动列表数据
    mock: false
  },
  {
    url: urls.activityDetailsData,
    type: 'get',
    data: applicationManage.activityDetailsData, // 活动详情
    mock: false
  },
  {
    url: urls.courseTableList,
    type: 'get',
    data: applicationManage.courseTableList, // 课表课程列表
    mock: false
  },
  {
    url: urls.actStasticList,
    type: 'get',
    data: applicationManage.actStatsicList, // 活动统计列表
    mock: true
  }
]
