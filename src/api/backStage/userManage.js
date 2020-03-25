/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/27 17:19
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 用户管理相关接口请求api
 */
import request from '@/utils/request'
import urls from '@/api/OCURL'

/**
 * 获取用户列表数据
 * @param params
 */
export function getUserListData (params) {
  return request({
    url: urls.userList,
    method: 'get',
    params: params
  })
}

/**
 * 编辑用户
 * @param params
 */
export function editUser (params) {
  return request({
    url: urls.editUser,
    method: 'post',
    data: params
  })
}

/**
 * 新增用户
 * @param params
 */
export function addUser (params) {
  return request({
    url: urls.addUser,
    method: 'post',
    data: params
  })
}

/**
 * 获取用户详情
 * @param params
 */
export function getUserDetail (userId) {
  return request({
    url: urls.userDetail + '/' + userId,
    method: 'get',
  })
}
