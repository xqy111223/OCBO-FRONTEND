/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:38
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取家长管理列表
export function getParentDataList (params) {
  return request({
    url: URLS.parentManageList,
    method: 'get',
    params: params
  })
}

// 查看家长信息
export function viewParentInfo (userIds) {
  const params = {
    userIds: userIds
  }
  return request({
    url: URLS.parentManageView,
    method: 'get',
    params: params
  })
}

// 编辑家长
export function editParent (userId) {
  return request({
    url: URLS.parentManageEdit,
    method: 'get',
    params: { userId }
  })
}

// 删除家长
export function deleteParent (userIds) {
  const params = {
    userIds: userIds
  }
  return request({
    url: URLS.parentManageDelete,
    method: 'post',
    data: params
  })
}

// Excel导出
export function exportExcel (userId) {
  return request({
    url: URLS.parentManageExport,
    method: 'get',
    params: { userId }
  })
}
