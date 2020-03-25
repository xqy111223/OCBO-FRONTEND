/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/27 16:26
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 获取所有用户按钮权限数据
 */
export const authListData = {
  message: '测试内容g875',
  result: [
    {
      id: '1111' + Math.random(),
      name: '后台用户管理',
      pId: '1111' + Math.random(),
      authId: '001',
      type: '',
      permission: [
        {
          id: '1111' + Math.random(),
          name: '角色管理',
          pId: '1111' + Math.random(),
          type: '',
          permissions: [
            {
              id: '1111' + Math.random(),
              name: '新增角色',
              pId: '1111' + Math.random(),
              type: 83013
            }, {
              id: '1111' + Math.random(),
              name: '编辑',
              pId: '1111' + Math.random(),
              type: 83013
            }, {
              id: '1111' + Math.random(),
              name: '删除',
              pId: '1111' + Math.random(),
              type: 83013
            }
          ],
        }
      ]
    }
  ],
  status: '000000000'
}
