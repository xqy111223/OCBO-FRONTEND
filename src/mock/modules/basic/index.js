/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/18 14:11
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 基础配置mock数据集
 */

import areaManager from './areaManager'
import selectorSchoolList from './schoolManager'
import selectorTeacherList from './teacherManager'

export default [
  ...areaManager,
  ...selectorSchoolList,
  ...selectorTeacherList
]
