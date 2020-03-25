/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2020, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2020/3/10 9:16
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */

import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 平台批量配置
 * @param params
 */
export function platformNameConfig (params) {
  return request({
    url: URLS.platformNameConfig,
    method: 'post',
    data: params
  })
}

/**
 * 平台批量配置
 * @param params
 */
export function logoConfig (params) {
  return request({
    url: URLS.logoConfig,
    method: 'post',
    data: params
  })
}

/**
 * 平台批量配置
 * @param params
 */
export function iconConfig (params) {
  return request({
    url: URLS.iconConfig,
    method: 'post',
    data: params
  })
}

/**
 * 平台批量配置
 * @param params
 */
export function bottomConfig (params) {
  return request({
    url: URLS.bottomConfig,
    method: 'post',
    data: params
  })
}

/**
 * 平台批量配置
 * @param params
 */
export function navConfig (params) {
  return request({
    url: URLS.navConfig,
    method: 'post',
    data: params
  })
}

/**
 * 平台批量配置
 * @param params
 */
export function mapColorConfig (params) {
  return request({
    url: URLS.mapColorConfig,
    method: 'post',
    data: params
  })
}

/**
 * 平台批量配置
 * @param params
 */
export function uploadImg (params) {
  return request({
    url: URLS.uploadImg,
    method: 'post',
    data: params
  })
}
