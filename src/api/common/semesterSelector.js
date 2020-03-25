/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2020, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2020/3/3 16:22
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

export function getSemesterList (params) {
  return request({
    url: URLS.semesterList,
    method: 'get',
    params: params
  })
}
