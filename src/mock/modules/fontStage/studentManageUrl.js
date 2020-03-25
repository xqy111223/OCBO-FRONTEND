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
  // 获取区域用户管理列表
  {
    url: URLS.studentManageList,
    type: 'get',
    data: fontStage.studentManageListData,
    mock: true
  },
  // 查看用户信息
  {
    url: URLS.studentManageView,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 编辑学生
  {
    url: URLS.studentManageEdit,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 删除学生
  {
    url: URLS.studentManageDelete,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // Excel导出
  {
    url: URLS.studentExport,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
]
