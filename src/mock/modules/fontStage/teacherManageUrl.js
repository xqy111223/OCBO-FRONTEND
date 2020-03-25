/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:46
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import fontStage from '../../data/fontStage/index'
import URLS from '@/api/OCURL'

export default [
  // 获取教师管理列表
  {
    url: URLS.teacherManageList,
    type: 'get',
    data: fontStage.teacherManageListData,
    mock: true
  },
  // 查看教师信息
  {
    url: URLS.teacherManageView,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 编辑教师
  {
    url: URLS.teacherManageEdit,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 删除教师
  {
    url: URLS.teacherManageDelete,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // Excel导出
  {
    url: URLS.teacherExport,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
]
