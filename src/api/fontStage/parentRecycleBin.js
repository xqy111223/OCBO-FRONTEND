/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:40
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取家长回收列表
export function getParentRecycleDataList (params) {
  return request({
    url: URLS.parentRecycleBinList,
    method: 'get',
    params: params
  })
}

// 查看教师信息
export function viewParentInfo (userIds) {
  const params = {
    userIds: userIds
  }
  return request({
    url: URLS.parentRecycleBinView,
    method: 'get',
    params: params
  })
}

// 恢复教师
export function restoreParent (userId) {
  return request({
    url: URLS.parentRecycleBinRestore,
    method: 'get',
    params: { userId }
  })
}
