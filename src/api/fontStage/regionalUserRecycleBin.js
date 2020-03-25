/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:39
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取区域用户回收列表
export function getRegionalRecycleDataList (params) {
  return request({
    url: URLS.regionalUserRecycleBinList,
    method: 'get',
    params: params
  })
}

// 查看用户信息
export function viewUserInfo (userIds) {
  const params = {
    userIds: userIds
  }
  return request({
    url: URLS.regionalUserRecycleBinView,
    method: 'get',
    params: params
  })
}

// 恢复区域用户
export function restoreUser (userId) {
  return request({
    url: URLS.regionalUserRecycleBinRestore,
    method: 'get',
    params: { userId }
  })
}
