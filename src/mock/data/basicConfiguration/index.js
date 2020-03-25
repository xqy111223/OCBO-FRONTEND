/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:04
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  description
 */
import * as regionalList from './regionalPlatformManage/getList'
import * as schoolList from './schoolPlatformManage/getList'
import * as classroomList from './classRoomManage/getList'

export default {
  ...regionalList,
  ...schoolList,
  ...classroomList
}
