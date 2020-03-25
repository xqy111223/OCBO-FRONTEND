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

// 获取管理列表
export function getMessageManageDataList (params) {
  return request({
    url: URLS.messageManageList,
    method: 'get',
    params: params
  })
}

export function addMessageManage (params) {
  return request({
    url: URLS.messageManageAdd,
    method: 'post',
    data: params
  })
}

export function editMessageManage (params) {
  return request({
    url: URLS.messageManageEdit,
    method: 'post',
    data: params
  })
}

export function deleteMessageManage (id) {
  return request({
    url: queryURL(URLS.messageManageDelete, [id]),
    methods: 'post',
  })
}

export function messageDetail (serverId) {
  return request({
    url: queryURL(URLS.messageDetail, [serverId]),
    methods: 'get',
  })
}
