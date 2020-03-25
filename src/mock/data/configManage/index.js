/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 15:05
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import * as messageManageListData from './messageManage/listData'
import * as regionalResourceManageListData from './regionalResourceManage/listData'
import * as streamingMediaManageListData from './streamingMediaManage/listData'
import * as cdnManageListData from './cdnManage/listData'

export default {
  ...messageManageListData,
  ...regionalResourceManageListData,
  ...streamingMediaManageListData,
  ...cdnManageListData,
}
