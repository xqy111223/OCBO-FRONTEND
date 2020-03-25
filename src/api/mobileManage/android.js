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
export function getAndroidList (params) {
  return request({
    url: URLS.androidList,
    method: 'get',
    params: params
  })
}

// 编辑用户
export function editAndroid (params) {
  return request({
    url: URLS.androidEdit,
    method: 'post',
    data: params
  })
}

// 新增用户
export function addAndroid (params) {
  return request({
    url: URLS.androidAdd,
    method: 'post',
    data: params
  })
}

// 删除
export function deleteAndroid (id) {
  return request({
    url: queryURL(URLS.androidDelete, [id]),
    method: 'post',
  })
}

// 获取android详情
export function androidDetail (id) {
  return request({
    url: queryURL(URLS.androidDetail, [id]),
    method: 'get',
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

// 上传
export function androidUpload (file) {
  return request({
    url: URLS.androidUpload,
    method: 'post',
    data: file
  })
}

// 下载
export function androidDownload (fileName) {
  return request({
    url: queryURL(URLS.androidDownload, [fileName]),
    method: 'get',
  })
}
