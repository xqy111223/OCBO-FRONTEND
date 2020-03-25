/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 14:46
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'
import { queryURL } from '@/utils/'

// 获取列表
export function getStreamingMediaManageDataList (params) {
  return request({
    url: URLS.streamingMediaManageList,
    method: 'get',
    params: params
  })
}

export function addStreamingMediaManage (params) {
  return request({
    url: URLS.streamingMediaManageAdd,
    method: 'post',
    data: params
  })
}

export function editStreamingMediaManage (params) {
  return request({
    url: URLS.streamingMediaManageEdit,
    method: 'post',
    data: params
  })
}

export function deleteStreamingMediaManage (serverId) {
  return request({
    url: queryURL(URLS.streamingMediaManageDelete, [serverId]),
    method: 'post',
    // data: id
  })
}

export function streamingMediaDetail (serverId) {
  return request({
    url: queryURL(URLS.streamingMediaDetail, [serverId]),
    method: 'get'
  })
}
