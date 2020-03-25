/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2020/2/24 14:45
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  获取服务器列表下拉 promise.all
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取流媒体服务器列表
 */
function getStreamingMediaManageDataList (params) {
  return request({
    url: URLS.streamingMediaManageList,
    method: 'get',
    params: params
  })
}

/**
 * 获取流媒体服务器列表
 */
function getRegionalResourceManageDataList (params) {
  return request({
    url: URLS.regionalResourceManageList,
    method: 'get',
    params: params
  })
}

/**
 * 获取消息服务器列表
 */
function getMessageManageDataList (params) {
  return request({
    url: URLS.messageManageList,
    method: 'get',
    params: params
  })
}

/**
 * 服务器配置
 */
export function getServerInitData (params) {
  return Promise.all([getStreamingMediaManageDataList(params), getMessageManageDataList(params), getRegionalResourceManageDataList(params)])
}
