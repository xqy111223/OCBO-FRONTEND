/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:47
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import fontStage from '../../data/fontStage/index'
import URLS from '@/api/OCURL'

export default [
  // 获取家长管理列表
  {
    url: URLS.parentManageList,
    type: 'get',
    data: fontStage.parentManageListData,
    mock: false
  },
  // 查看家长信息
  {
    url: URLS.parentManageView,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 编辑家长
  {
    url: URLS.parentManageEdit,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 删除家长
  {
    url: URLS.parentManageDelete,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // Excel导出
  {
    url: URLS.parentManageExport,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
]
