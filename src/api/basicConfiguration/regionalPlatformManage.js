/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 20:04
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  区域平台api
 */

import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取区域平台列表
 * @param params
 */
export function regionalList (params) {
  return request({
    url: URLS.regionalList,
    method: 'get',
    params: params
  })
}

/**
 * 获取平台详情
 * @param params
 */
export function getPlatformDetail (params) {
  return request({
    url: URLS.getPlatformDetail + params,
    method: 'get',
  })
}

/**
 * 开通平台
 * @param params
 */
export function addPlatform (params) {
  return request({
    url: URLS.addPlatform,
    method: 'post',
    data: params
  })
}

/**
 * 编辑平台
 * @param params
 */
export function editPlatform (params) {
  return request({
    url: URLS.editPlatform,
    method: 'post',
    data: params
  })
}

/**
 * 获取服务器配置
 * @param params
 */
export function getServerConf (params) {
  return request({
    url: URLS.getServerConf + params,
    method: 'get',
  })
}

/**
 * 获取从上级继承的服务器配置
 * @param params
 */
export function getParentServerConf (params) {
  return request({
    url: URLS.getServerConf + params + '/inherit',
    method: 'get',
  })
}

/**
 * 获取门户配置
 * @param params
 */
export function getPortalConf (params) {
  return request({
    url: URLS.getPortalConf + params,
    method: 'get',
  })
}

/**
 * 保存服务器配置
 * @param params
 */
export function saveServerConf (params) {
  return request({
    url: URLS.saveServerConf,
    method: 'post',
    data: params
  })
}

/**
 * 保存门户配置
 * @param params
 */
export function savePortalConf (params) {
  return request({
    url: URLS.savePortalConf,
    method: 'post',
    data: params
  })
}
