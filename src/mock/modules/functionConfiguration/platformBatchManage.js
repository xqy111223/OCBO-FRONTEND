/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:42
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  平台批量配置
 */
import functionConfiguration from '@/mock/data/functionConfiguration'
import URLS from '@/api/OCURL'

export default [{
  url: URLS.platBatchSetting,
  type: 'post',
  data: functionConfiguration.setBatch, // 平台批量配置
  mock: true
}]
