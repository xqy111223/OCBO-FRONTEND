/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 11:17
 *   @Author manchanghao (manchanghao@codyy.com)
 *   @Description
 */
import fontStage from '../../data/fontStage/index'
import URLS from '@/api/OCURL'

export default [
  // 获取区域用户管理列表
  {
    url: URLS.regionalUserManageList,
    type: 'get',
    data: fontStage.regionalUserManageListData,
    mock: false
  },
  // 查看用户信息
  {
    url: URLS.regionalUserManageView,
    type: 'get',
    data: fontStage.regionalUserManageUserInfo,
    mock: true
  },
  // 编辑用户
  {
    url: URLS.regionalUserManageEdit,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 新增用户
  {
    url: URLS.regionalUserManageAdd,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 删除用户
  {
    url: URLS.regionalUserManageDelete,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // Excel导出
  {
    url: URLS.regionalExport,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // Excel导入
  {
    url: URLS.regionalImport,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 查询行政区代码
  {
    url: URLS.regionalSearchRegionalCode,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
  // 下载模板
  {
    url: URLS.regionalDownloadTemplate,
    type: 'get',
    data: fontStage.userInfo,
    mock: true
  },
]
