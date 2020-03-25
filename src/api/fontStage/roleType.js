/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/10 11:29
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取家长管理列表
export function getRoleType (params) {
  return request({
    url: URLS.roleType,
    method: 'get',
    params: params
  })
}

export default getRoleType
