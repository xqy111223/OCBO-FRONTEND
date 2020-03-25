/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/19 15:13
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description 基础设置的mock
 */
import * as areaData from './areaData'
import * as schoolData from './schoolData'
import * as selectorSchoolList from './schoolList'
import * as teacherList from './teacherList'

export default {
  ...areaData,
  ...schoolData,
  ...selectorSchoolList,
  ...teacherList,
}
