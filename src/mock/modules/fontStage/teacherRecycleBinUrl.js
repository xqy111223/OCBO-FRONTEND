/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:49
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import fontStage from '../../data/fontStage/index'
import URLS from '@/api/OCURL'

export default [
  // 获取区域用户管理列表
  {
    url: URLS.teacherRecycleBinList,
    type: 'get',
    data: fontStage.teacherRecycleListData,
    mock: true
  },
  // 查看用户信息
  {
    url: URLS.teacherRecycleBinView,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 恢复教师
  {
    url: URLS.teacherRecycleBinRestore,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
]
