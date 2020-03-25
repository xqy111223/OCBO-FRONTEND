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
  // 获取家长列表
  {
    url: URLS.parentRecycleBinList,
    type: 'get',
    data: fontStage.parentRecycleListData,
    mock: true
  },
  // 查看家长信息
  {
    url: URLS.parentRecycleBinView,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 恢复家长
  {
    url: URLS.parentRecycleBinRestore,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
]
