/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:01
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  功能配置
 */
import effectiveTimeManage from './effectiveTimeManage'
import termManage from './termManage'
import platformBatchManage from './platformBatchManage'
import knowledgeNetworkManage from './knowledgeNetworkManage'

export default [
  ...effectiveTimeManage,
  ...termManage,
  ...platformBatchManage,
  ...knowledgeNetworkManage
]
