/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 10:12
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 角色管理mock数据api
 */

import backStage from '@/mock/data/backStage/index'
import urls from '@/api/OCURL'

export default [{
  url: urls.roleManageList,
  type: 'get',
  data: backStage.roleListData, // 返回角色列表数据
  mock: false
}, {
  url: urls.roleDetail,
  type: 'get',
  data: backStage.roleDetailData, // 返回角色详情数据
  mock: false
}, {
  url: urls.addRole,
  type: 'get',
  data: '', // 保存角色（新增、编辑）
  mock: false
}]
