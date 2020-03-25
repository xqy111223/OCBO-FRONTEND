/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 11:17
 *   @Author manchanghao (manchanghao@codyy.com)
 *   @Description
 */
import regionalUserManageUrl from './regionalUserManageUrl'
import regionalUserRecycleBinUrl from './regionalUserRecycleBinUrl'
import schoolUserManageUrl from './schoolUserManageUrl'
import schoolUserRecycleBinUrl from './schoolUserRecycleBinUrl'
import teacherManageUrl from './teacherManageUrl'
import teacherRecycleBinUrl from './teacherRecycleBinUrl'
import studentManageUrl from './studentManageUrl'
import studentRecycleBinUrl from './studentRecycleBinUrl'
import parentManageUrl from './parentManageUrl'
import parentRecycleBinUrl from './parentRecycleBinUrl'
import roleTypeUrl from './roleTypeUrl'

export default [
  ...regionalUserManageUrl,
  ...regionalUserRecycleBinUrl,
  ...schoolUserManageUrl,
  ...schoolUserRecycleBinUrl,
  ...teacherManageUrl,
  ...teacherRecycleBinUrl,
  ...studentManageUrl,
  ...studentRecycleBinUrl,
  ...parentManageUrl,
  ...parentRecycleBinUrl,
  ...roleTypeUrl
]
