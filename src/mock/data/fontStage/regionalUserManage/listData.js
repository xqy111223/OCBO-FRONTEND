/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 11:42
 *   @Author manchanghao (manchanghao@codyy.com)
 *   @Description
 */
export const regionalUserManageListData = {
  success: 'success',
  status: '000000000',
  result: {
    total: 67,
    list: [
      {
        userId: '123', // 用户ID
        userName: 'Eminem', // 用户名
        realName: 'Marshell', // 姓名
        createTime: 1570032000000, // 创建时间
        creator: 'Stan', // 创建人
        regional: '江苏省-苏州市-工业园区', // 区域
        userType: 0, // 用户类型
        status: 1, // 状态
      },
      {
        userId: '456',
        userName: 'SAS',
        realName: 'UK',
        createTime: 1570032000000,
        creator: 'UK',
        regional: '江苏省-苏州市-工业园区',
        userType: 1,
        status: 0,
      },
      {
        userId: '789',
        userName: 'Eminem',
        realName: 'Marshell',
        createTime: 1570032000000,
        creator: 'Stan',
        regional: '江苏省-苏州市-工业园区',
        userType: 0,
        status: 1,
        isOpen: true
      }
    ]
  }
}
