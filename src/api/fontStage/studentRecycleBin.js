/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:40
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取学生回收列表
export function getStudentRecycleDataList (params) {
  return request({
    url: URLS.studentRecycleBinList,
    method: 'get',
    params: params
  })
}

// 查看学生信息
export function viewStudentInfo (userIds) {
  const params = {
    userIds: userIds
  }
  return request({
    url: URLS.studentRecycleBinView,
    method: 'get',
    params: params
  })
}

// 恢复学生
export function restoreStudent (studentId) {
  return request({
    url: URLS.studentRecycleBinRestore,
    method: 'get',
    params: { studentId }
  })
}
