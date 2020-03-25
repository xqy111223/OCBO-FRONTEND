/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/14 15:49
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 知识网络配置api
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 请求知识网络区域数据
 * @param params
 */
export function getPlatFormData (params) {
  return request({
    url: URLS.platFormData,
    method: 'post',
    params: params
  })
}

/**
 * 根据区域ID或者学校ID获取知识网络列表（按类型返回不同列表）
 * @param params
 */
export function networkListByType (params) {
  return request({
    url: URLS.networkListByType,
    method: 'post',
    params: params
  })
}

/**
 * 获取特定类型知识网络列表（为配置知识网络中的版本配置使用的）
 * @param params
 */
export function knowledgeTypesList (params) {
  return request({
    url: URLS.knowledgeTypesList,
    method: 'post',
    params: params
  })
}

/**
 * 保存知识网络配置
 * @param params
 */
export function saveNetworkConfig (params) {
  return request({
    url: URLS.saveNetworkConfig,
    method: 'post',
    params: params
  })
}

/**
 * 绑定版本配置
 * @param params
 */
export function bindEditions (params) {
  return request({
    url: URLS.bindEditions,
    method: 'post',
    params: params
  })
}
