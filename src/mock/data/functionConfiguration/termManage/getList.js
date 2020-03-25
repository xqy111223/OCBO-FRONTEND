/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:33
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description 区域平台配置列表
 */
export const termList = {
  message: 'success',
  result: [{
    areaCode: '111',
    areaId: '765580',
    areaName: '江苏省1',
    areaPathName: '江苏省-苏州市1',
    semesters: [
      {
        id: 1,
        name: '2019第一学期'
      }, {
        id: 2,
        name: '2012第一学期'
      },
      {
        id: 3,
        name: '2011第一学期'
      }
    ],
    isUsed: true,
    parentId: 211430,
    hasChild: true,
  }, {
    areaCode: '222',
    areaId: '765581',
    areaName: '江苏省2',
    areaPathName: '江苏省-苏州市2',
    semesters: [
      // {
      //   id: 1,
      //   name: '2018第一学期'
      // }
    ],
    isUsed: false,
    parentId: 211430,
    hasChild: true,
  }, {
    areaCode: '333',
    areaId: '765582',
    areaName: '江苏省3',
    areaPathName: '江苏省-苏州市3',
    semesters: [
      {
        id: 1,
        name: '2017第一学期'
      }
    ],
    isUsed: 0,
    parentId: 211430,
    hasChild: true,
  }, {
    areaCode: '444',
    areaId: '765583',
    areaName: '江苏省4',
    areaPathName: '江苏省-苏州市4',
    semesters: [
      {
        id: 1,
        name: '2016第一学期'
      }, {
        id: 2,
        name: '2019第一学期'
      }
    ],
    isUsed: 0,
    parentId: 211430,
    hasChild: true,
  },
  ],
  status: '000000000'
}
