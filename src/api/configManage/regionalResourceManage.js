/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 14:46
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'
import { queryURL } from '@/utils'

// 获取家长管理列表
export function getRegionalResourceManageDataList (params) {
  return request({
    url: URLS.regionalResourceManageList,
    method: 'get',
    params: params
  })
}

export function addRegionalResourceManage (params) {
  return request({
    url: URLS.regionalResourceManageAdd,
    method: 'post',
    data: params
  })
}

export function editRegionalResourceManage (params) {
  return request({
    url: URLS.regionalResourceManageEdit,
    method: 'post',
    data: params
  })
}

export function deleteRegionalResourceManage (id) {
  return request({
    url: queryURL(URLS.regionalResourceManageDelete, [id]),
    method: 'post',
  })
}

export function regionalResourceDetail (serverId) {
  return request({
    url: queryURL(URLS.regionalResourceDetail, [serverId]),
    method: 'get',
  })
}
