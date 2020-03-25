/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 13:41
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取教师回收列表
export function getTeacherRecycleDataList (params) {
  return request({
    url: URLS.teacherRecycleBinList,
    method: 'get',
    params: params
  })
}

// 查看教师信息
export function viewTeacherInfo (userIds) {
  const params = {
    userIds: userIds
  }
  return request({
    url: URLS.teacherRecycleBinView,
    method: 'get',
    params: params
  })
}

// 恢复教师
export function restoreTeacher (TeacherId) {
  return request({
    url: URLS.teacherRecycleBinRestore,
    method: 'get',
    params: { TeacherId }
  })
}
