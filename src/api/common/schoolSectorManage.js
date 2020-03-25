/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/13 10:49
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description // 管理学校选择器列表
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取学校选择器学校列表
export function getSelectorSchoolList (params) {
  return request({
    url: URLS.selectorSchoolList,
    method: 'get',
    params: params
  })
}
