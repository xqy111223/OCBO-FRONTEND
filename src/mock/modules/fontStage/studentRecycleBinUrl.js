/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:48
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import fontStage from '../../data/fontStage/index'
import URLS from '@/api/OCURL'

export default [
  // 获取学生列表
  {
    url: URLS.studentRecycleBinList,
    type: 'get',
    data: fontStage.studentRecycleListData,
    mock: true
  },
  // 查看学生信息
  {
    url: URLS.studentRecycleBinView,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 恢复学生
  {
    url: URLS.studentRecycleBinRestore,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
]
