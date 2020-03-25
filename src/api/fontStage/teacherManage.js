/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:38
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取教师管理列表
export function getTeacherDataList (params) {
  return request({
    url: URLS.teacherManageList,
    method: 'get',
    params: params
  })
}

// 查看教师信息
export function viewTeacherInfo (userIds) {
  return request({
    url: URLS.teacherManageView,
    method: 'get',
    params: { userIds }
  })
}

// 编辑教师
export function editTeacher (userId) {
  return request({
    url: URLS.teacherManageEdit,
    method: 'post',
    data: { userId }
  })
}

// 删除教师
export function deleteTeacher (userIds) {
  const params = {
    userIds: userIds
  }
  return request({
    url: URLS.teacherManageDelete,
    method: 'post',
    data: params
  })
}

// Excel导出
export function exportExcel (userId) {
  return request({
    url: URLS.teacherExport,
    method: 'get',
    params: { userId }
  })
}
