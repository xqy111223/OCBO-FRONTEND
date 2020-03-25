/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/30 15:05
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 学科管理接口请求api
 */

import request from '@/utils/request'
import URLS from '@/api/OCURL.js'

/**
 * 学科管理学科列表
 */
export function getSubjectList (params) {
  return request({
    url: URLS.subjectList,
    method: 'get',
    params: params
  })
}

/**
 * 学科管理设置默认
 */
export function setSubjectDefault (params) {
  return request({
    url: URLS.setSubjectDefault,
    method: 'post',
    params: params
  })
}
