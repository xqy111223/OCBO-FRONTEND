/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/13 11:07
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 教师选择器数据管理
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

export function getTeacherSectorList (params) {
  return request({
    url: URLS.selectorTeacherList,
    method: 'get',
    params: params
  })
}
