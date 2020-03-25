/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:01
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  基础配置
 */
import regionalPlatformManage from './regionalPlatformManage'
import schoolPlatformManage from './schoolPlatformManage'
import classRoomManage from './classRoomManage'

export default [
  ...regionalPlatformManage,
  ...schoolPlatformManage,
  ...classRoomManage
]
