/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:36
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取区域用户管理列表
export function getRegionalDataList (params) {
  return request({
    url: URLS.regionalUserManageList,
    method: 'get',
    params: params
  })
}

// 查看用户信息
export function viewUserInfo (userIds) {
  return request({
    url: URLS.regionalUserManageView,
    method: 'get',
    params: { userIds }
  })
}

// 编辑用户
export function editUser (params) {
  return request({
    url: URLS.regionalUserManageEdit,
    method: 'post',
    data: params
  })
}

// 新增用户
export function addUser (params) {
  return request({
    url: URLS.regionalUserManageAdd,
    method: 'post',
    data: params
  })
}

// 删除用户
export function deleteUser (userIds) {
  const params = {
    userIds: userIds
  }
  return request({
    url: URLS.regionalUserManageDelete,
    method: 'post',
    data: params
  })
}

// Excel导出
export function exportExcel (userId) {
  return request({
    url: URLS.regionalExport,
    method: 'get',
    params: { userId }
  })
}

// Excel导入
export function importExcel () {
  return request({
    url: URLS.regionalImport,
    method: 'get'
  })
}

// 查询行政区代码
export function searchRegionalCode () {
  return request({
    url: URLS.regionalSearchRegionalCode,
    method: 'get'
  })
}

// 下载模板
export function downloadTemplate () {
  return request({
    url: URLS.regionalDownloadTemplate,
    method: 'get'
  })
}
