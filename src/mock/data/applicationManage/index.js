/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/29 10:36
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description
 */
import * as courseRecycleList from './courseRecyclingBin/courseRecyleList'
import * as schoolList from '../basic/schoolList'
import * as teacherList from '../basic/teacherList'
import * as activityList from './activityMange/activityList'
import * as activityDetailsData from './activityMange/activityDetailsData'
import * as courseTableList from './activityMange/tableCourseList'
import * as actStatsicList from './activityMange/activityStasticList'

export default {
  ...courseRecycleList,
  ...schoolList,
  ...teacherList,
  ...activityList,
  ...activityDetailsData,
  ...courseTableList,
  ...actStatsicList
}
