/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 20:04
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  平台批量配置api
 */

import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 平台批量配置
 * @param params
 */
export function platBatchSetting (params) {
  return request({
    url: URLS.platBatchSetting,
    method: 'post',
    params: params
  })
}
