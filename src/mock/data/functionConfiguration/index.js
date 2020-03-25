/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:04
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  description
 */
import * as effectiveTimeList from './effectiveTimeManage/getList'
import * as editTime from './effectiveTimeManage/editTime'
import * as termList from './termManage/getList'
import * as termTableList from './termManage/termTableList'
import * as editTerm from './termManage/editTerm'
import * as addTerm from './termManage/addTerm'
import * as setBatch from './platformBatchManage/setBatch'
import * as platFormData from './knowledgeNetworkMange/getPlatform'
import * as networkListByType from './knowledgeNetworkMange/networkListByType'
import * as knowledgeTypesList from './knowledgeNetworkMange/knowledgeTypesList'

export default {
  ...effectiveTimeList,
  ...editTime,
  ...termList,
  ...termTableList,
  ...editTerm,
  ...addTerm,
  ...setBatch,
  ...platFormData,
  ...networkListByType,
  ...knowledgeTypesList,
}
