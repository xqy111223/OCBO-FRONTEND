/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:42
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  有效时长配置
 */
import functionConfiguration from '@/mock/data/functionConfiguration'
import URLS from '@/api/OCURL'

export default [{
  url: URLS.effectiveTimeList,
  type: 'post',
  data: functionConfiguration.effectiveTimeList, // 有效时长列表
  mock: true
}, {
  url: URLS.editTime,
  type: 'post',
  data: functionConfiguration.editTime, // 有效时长配置
  mock: true
}]
