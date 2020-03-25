/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 20:04
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  学期配置api
 */

import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取区域平台列表
 * @param params
 */
export function termList (params) {
  return request({
    url: URLS.termList,
    method: 'post',
    params: params
  })
}

/**
 * 编辑学期
 * @param params
 */
export function editTerm (params) {
  return request({
    url: URLS.editTerm,
    method: 'post',
    params: params
  })
}

/**
 * 新增学期
 * @param params
 */
export function addTerm (params) {
  return request({
    url: URLS.addTerm,
    method: 'post',
    params: params
  })
}

/**
 * 区域/系统学期列表
 * @param params
 */
export function termTableList (params) {
  return request({
    url: URLS.termTableList,
    method: 'post',
    params: params
  })
}
