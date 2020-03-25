/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2020, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2020/3/5 17:09
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL.js'

/**
 * 获取数据列表
 */
export function getLogList (params) {
  return request({
    url: URLS.logList,
    method: 'get',
    params: params
  })
}

// /**
//  *   @description: 查看请求参数
//  *   @param  描述
//  *   @returns {}
//  */
// export function getDetail (params) {
//   return request({
//     url: URLS.logList,
//     method: 'get',
//     params: params
//   })
// }
