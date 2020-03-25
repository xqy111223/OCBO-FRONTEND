/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 14:50
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import configManage from '../../data/configManage/index'
import URLS from '@/api/OCURL'

export default [
  // 获取列表
  {
    url: URLS.streamingMediaManageList,
    type: 'get',
    data: configManage.streamingMediaManageListData,
    mock: true
  }]
