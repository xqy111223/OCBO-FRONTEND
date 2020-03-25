/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 11:43
 *   @Author manchanghao (manchanghao@codyy.com)
 *   @Description
 */
import * as parentManageListData from './parentManage/listData'
import * as parentRecycleListData from './parentRecycleBin/listData'
import * as regionalUserManageListData from './regionalUserManage/listData'
import * as regionalUserManageUserInfo from './regionalUserManage/userInfo'
import * as regionalUserRecycleListData from './regionalUserRecycleBin/listData'
import * as schoolUserManageListData from './schoolUserManage/listData'
import * as schoolUserManageUserInfo from './schoolUserManage/userInfo'
import * as schoolUserRecycleListData from './schoolUserRecycleBin/listData'
import * as studentManageListData from './studentManage/listData'
import * as studentRecycleListData from './studentRecycleBin/listData'
import * as teacherManageListData from './teacherManage/listData'
import * as teacherRecycleListData from './teacherRecycleBin/listData'
import * as roleType from './roleType'

export default {
  ...parentManageListData,
  ...parentRecycleListData,
  ...regionalUserManageListData,
  ...regionalUserManageUserInfo,
  ...regionalUserRecycleListData,
  ...schoolUserManageListData,
  ...schoolUserManageUserInfo,
  ...schoolUserRecycleListData,
  ...studentManageListData,
  ...studentRecycleListData,
  ...teacherManageListData,
  ...teacherRecycleListData,
  ...roleType
}
