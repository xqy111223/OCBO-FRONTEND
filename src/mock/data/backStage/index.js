/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 9:26
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 后台用户管理模块mock数据入口
 */
import * as roleListData from './roleManage/roleManageList'
import * as roleDetailData from './roleManage/getRoleDetail'
import * as userListData from './userManage/getUserList'
import * as userDetailData from './userManage/getUserDetail'
import * as authListData from './roleManage/authList'

export default {
  ...roleListData,
  ...roleDetailData,
  ...userListData,
  ...userDetailData,
  ...authListData
}
