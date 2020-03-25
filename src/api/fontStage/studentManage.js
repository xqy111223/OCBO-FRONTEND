/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:38
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取学生管理列表
export function getStudentDataList (params) {
  return request({
    url: URLS.studentManageList,
    method: 'get',
    params: params
  })
}

// 查看学生信息
export function viewStudentInfo (userIds) {
  return request({
    url: URLS.studentManageView,
    method: 'get',
    params: { userIds }
  })
}

// 编辑学生
export function editStudent (userId) {
  return request({
    url: URLS.studentManageEdit,
    method: 'post',
    data: { userId }
  })
}

// 删除学生
export function deleteStudent (userIds) {
  const params = {
    userIds: userIds
  }
  return request({
    url: URLS.studentManageDelete,
    method: 'post',
    data: params
  })
}

// Excel导出
export function exportExcel (userId) {
  return request({
    url: URLS.studentExport,
    method: 'get',
    params: { userId }
  })
}
