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
  // 获取区域用户管理列表
  {
    url: URLS.schoolUserManageList,
    type: 'get',
    data: fontStage.schoolUserManageListData,
    mock: true
  },
  // 查看用户信息
  {
    url: URLS.schoolUserManageView,
    type: 'get',
    data: fontStage.schoolUserManageUserInfo,
    mock: true
  },
  // 编辑用户
  {
    url: URLS.schoolUserManageEdit,
    type: 'get',
    data: fontStage.schoolUserManageUserInfo,
    mock: true
  },
  // 新增用户
  {
    url: URLS.schoolUserManageAdd,
    type: 'get',
    data: fontStage.schoolUserManageUserInfo,
    mock: true
  },
  // 删除用户
  {
    url: URLS.schoolUserManageDelete,
    type: 'get',
    data: fontStage.schoolUserManageUserInfo,
    mock: true
  },
  // Excel导出
  {
    url: URLS.schoolExport,
    type: 'get',
    data: fontStage.schoolUserManageUserInfo,
    mock: true
  },
  // Excel导入
  {
    url: URLS.schoolImport,
    type: 'get',
    data: fontStage.schoolUserManageUserInfo,
    mock: true
  },
  // 查询行政区代码
  {
    url: URLS.schoolSearchRegionalCode,
    type: 'get',
    data: fontStage.schoolUserManageUserInfo,
    mock: true
  },
  // 下载模板
  {
    url: URLS.schoolDownloadTemplate,
    type: 'get',
    data: fontStage.schoolUserManageUserInfo,
    mock: true
  },
]
