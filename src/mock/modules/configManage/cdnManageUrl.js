/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/21 14:37
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
import configManage from '../../data/configManage'
import URLS from '@/api/OCURL'

export default [
  // 获取列表
  {
    url: URLS.cdnManageList,
    type: 'get',
    data: configManage.cdnManageListData,
    mock: true
  },
]
