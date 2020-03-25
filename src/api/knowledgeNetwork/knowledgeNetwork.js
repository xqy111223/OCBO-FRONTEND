/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/29 9:16
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 知识网络管理数据请求
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL.js'

/**
 * 获取知识网络数据
 */
export function getKnowledgeNetworkData (params) {
  return request({
    url: URLS.knowledgeMangeData,
    method: 'get',
    params: params
  })
}

/**
 * 设置默认显示
 */
export function setDefault (params) {
  return request({
    url: URLS.setDefaultKnowledge,
    method: 'post',
    params: params
  })
}
