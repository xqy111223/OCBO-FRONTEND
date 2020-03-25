/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/23 9:22
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 活动管理接口api
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取互动列表
 * @param params 请求参数
 */
export function getActivityList (params) {
  debugger
  return request({
    url: URLS.activityList,
    method: 'get',
    params: params
  })
}

/**
 * 获取活动详情
 * @param params 请求参数
 */
export function getActivityDetails (params) {
  return request({
    url: URLS.activityDetailsData,
    method: 'get',
    params: params
  })
}

/**
 * 获取课表排课列表
 * @param params 请求参数
 */
export function getCourseTableList (params) {
  return request({
    url: URLS.courseTableList,
    method: 'get',
    params: params
  })
}

/**
 * 获取活动统计列表
 * @param params 请求参数
 */
export function getActStasticList (params) {
  return request({
    url: URLS.actStasticList,
    method: 'get',
    params: params
  })
}

/**
 * 请出活动
 * @param params 请求参数
 */
export function kickOutActivity (params) {
  return request({
    url: URLS.kickOutActivity,
    method: 'get',
    params: params
  })
}

/**
 *新增活动保存
 * @param params 请求参数
 */
export function addActivity (params) {
  return request({
    url: URLS.addActivity,
    method: 'post',
    data: params
  })
}

/**
 * 删除活动
 * @param params 请求参数
 */
export function deleteActivity (params) {
  return request({
    url: URLS.deleteActivity,
    method: 'get',
    params: params
  })
}
