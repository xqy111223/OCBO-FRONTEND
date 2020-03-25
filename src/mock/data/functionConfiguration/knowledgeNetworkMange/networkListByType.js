/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/18 15:30
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 模拟根据区域ID或者学校ID获取知识网络列表（按类型返回不同列表）
 */
export const networkListByType = {
  message: 'ok',
  status: '000000000',
  result: {
    editionList: [
      {
        code: '人教版',
        customName: '人教版',
        id: 61033 + Math.random(),
        name: '人教版'
      },
      {
        code: '人教版',
        customName: '人教版',
        id: 61033 + Math.random(),
        name: '人教版1'
      },
      {
        code: '人教版',
        customName: '人教版',
        id: 61033 + Math.random(),
        name: '人教版2'
      },
      {
        code: '人教版',
        customName: '人教版',
        id: 61033 + Math.random(),
        name: '人教版22'
      },
      {
        code: '人教版',
        customName: '人教版',
        id: 61033 + Math.random(),
        name: '人教版'
      }
    ],
    gradeList: [
      {
        code: '一年级',
        customName: '一年级',
        id: 23054 + Math.random(),
        name: '一年级'
      },
      {
        code: '一年级',
        customName: '一年级',
        id: 23054 + Math.random(),
        name: '一年级'
      },
      {
        code: '一年级',
        customName: '一年级',
        id: 23054 + Math.random(),
        name: '一年级'
      },
      {
        code: '一年级',
        customName: '一年级',
        id: 23054 + Math.random(),
        name: '一年级'
      },
      {
        code: '一年级',
        customName: '一年级',
        id: 23054 + Math.random(),
        name: '一年级'
      }
    ],
    semesterList: [
      {
        code: '幼儿',
        customName: '自定义幼儿',
        id: 78730 + Math.random(),
        name: '幼儿',
        hasChild: true,
      },
      {
        code: '幼儿',
        customName: '自定义幼儿',
        id: 78730 + Math.random(),
        name: '小学',
        hasChild: true,
      },
      {
        code: '幼儿',
        customName: '自定义幼儿',
        id: 78730 + Math.random(),
        name: '初中',
        hasChild: true,
      },
      {
        code: '幼儿',
        customName: '自定义幼儿',
        id: 78730 + Math.random(),
        name: '高中',
        hasChild: true,
      },
      {
        code: '幼儿',
        customName: '自定义幼儿',
        id: 78730 + Math.random(),
        name: '高中',
        hasChild: true,
      }
    ],
    subjectList: [
      {
        code: '语文',
        customName: '语文',
        id: 58375 + Math.random(),
        name: '语文'
      },
      {
        code: '语文',
        customName: '语文',
        id: 58375 + Math.random(),
        name: '语文'
      },
      {
        code: '语文',
        customName: '语文',
        id: 58375 + Math.random(),
        name: '语文'
      },
      {
        code: '语文',
        customName: '语文',
        id: 58375 + Math.random(),
        name: '语文'
      },
      {
        code: '语文',
        customName: '语文',
        id: 58375 + Math.random(),
        name: '语文'
      },
      {
        code: '语文',
        customName: '语文',
        id: 58375 + Math.random(),
        name: '语文'
      },
    ]
  }
}
