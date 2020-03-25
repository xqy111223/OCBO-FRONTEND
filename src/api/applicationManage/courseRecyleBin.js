/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/29 11:46
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description
 */

import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取课程列表
 * @param params 请求参数
 */
export function getCourseRecycleList (params) {
  return request({
    url: URLS.recycleCourseList,
    method: 'get',
    params: params
  })
}

/**
 * 操作课程删除状态
 * @param params 请求参数
 */
export function changeCourseDelete (params) {
  return request({
    url: '/ecsp/applicationManage/courseDelete',
    method: 'get',
    params: params
  })
}
