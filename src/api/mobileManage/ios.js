/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2020, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2020/2/20 14:49
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL.js'
import { queryURL } from '@/utils'

// 获取列表
export function getIosList (params) {
  return request({
    url: URLS.iosList,
    method: 'get',
    params: params
  })
}

// 编辑用户
export function editIos (params) {
  return request({
    url: URLS.iosEdit,
    method: 'post',
    data: params
  })
}

// 新增用户
export function addIos (params) {
  return request({
    url: URLS.iosAdd,
    method: 'post',
    data: params
  })
}

// 删除用户
export function deleteIos (id) {
  return request({
    url: queryURL(URLS.iosDelete, [id]),
    method: 'post',
  })
}

// 获取应用列表
export function getAppList (params) {
  return request({
    url: URLS.appList,
    method: 'get',
    params: params
  })
}

// 获取ios详情
export function iosDetail (id) {
  return request({
    url: queryURL(URLS.iosDetail, [id]),
    method: 'get',
  })
}
