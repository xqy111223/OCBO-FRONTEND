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
  // 获取区域用户列表
  {
    url: URLS.regionalUserRecycleBinList,
    type: 'get',
    data: fontStage.regionalUserRecycleListData,
    mock: true
  },
  // 查看用户信息
  {
    url: URLS.regionalUserRecycleBinView,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 恢复用户
  {
    url: URLS.regionalUserRecycleBinRestore,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  }
]
