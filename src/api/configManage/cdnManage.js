/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/21 14:36
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 14:46
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

// 获取管理列表
export function getCDNManageDataList () {
  return request({
    url: URLS.cdnManageList,
    method: 'get',
    params: ''
  })
}
