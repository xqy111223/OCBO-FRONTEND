/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/9 14:37
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

export function getAreaData ({ areaId, areaCode }) {
  const params = {}
  if (areaId) {
    params.pid = areaId
  } else if (areaCode) {
    params.pAreaCode = areaCode
  }
  return request({
    url: URLS.areaList,
    method: 'get',
    params: params
  })
}
