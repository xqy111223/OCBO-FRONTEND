/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/28 11:16
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description
 */

import backStage from '@/mock/data/backStage/index'
import urls from '@/api/OCURL'

export default [
  {
    url: urls.userList,
    type: 'get',
    data: backStage.userListData, // 返回用户列表
    mock: false
  }, {
    url: urls.userDetail,
    type: 'get',
    data: backStage.userDetailData, // 返回用户详情
    mock: false
  }, {
    url: urls.editUser, // 保存用户
    type: 'get',
    data: {
      result: true
    },
    mock: false
  }
]
