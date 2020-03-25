/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 20:04
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  有效时长api
 */

import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取区域平台列表
 * @param params
 */
export function effectiveTimeList (params) {
  return request({
    url: URLS.effectiveTimeList,
    method: 'post',
    params: params
  })
}

export function editTime (params) {
  return request({
    url: URLS.editTime,
    method: 'post',
    params: params
  })
}
