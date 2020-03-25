/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/27 17:19
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 角色管理相关接口请求api
 */
import request from '@/utils/request'
import urls from '@/api/OCURL'

/**
 * 获取角色列表数据
 * @param params
 */
export function getRoleListData (params) {
  return request({
    url: urls.roleManageList,
    method: 'get',
    params: params
  })
}

/**
 * 获取角色详情
 * @param params
 */
export function getRoleDetail (params) {
  return request({
    url: urls.roleDetail + '/' + params,
    method: 'get',
  })
}

/**
 * 新增角色
 * @param params
 */
export function addRole (params) {
  return request({
    url: urls.addRole,
    method: 'post',
    data: params
  })
}

/**
 * 编辑角色
 * @param params
 */
export function editRole (params) {
  return request({
    url: urls.editRole,
    method: 'post',
    data: params
  })
}

/**
 * 删除角色
 * @param roleId 角色id
 */
export function deleteRole (roleId) {
  return request({
    url: urls.deleteRole + '/' + roleId,
    method: 'post',
  })
}

/**
 * 获取可选权限
 */
export function getAllPermissions () {
  return request({
    url: urls.allPermissions,
    method: 'get',
  })
}
