/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 15:03
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import messageManageUrl from './messageManageUrl'
import streamingMediaManageUrl from './streamingMediaManageUrl'
import regionalResourceManageUrl from './regionalResourceManageUrl'
import cdnManageUrl from './cdnManageUrl'

export default [
  ...regionalResourceManageUrl,
  ...streamingMediaManageUrl,
  ...messageManageUrl,
  ...cdnManageUrl
]
