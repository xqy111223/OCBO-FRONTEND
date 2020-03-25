/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/29 9:21
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description
 */

export const knowledgeNetworkData = {
  message: '测试内容g875',
  result: [ // data为要渲染的数据结构
    {
      id: 1 + Math.random(),
      name: '幼儿01',
      code: 'X-001',
      type: 'SEMESTER',
      customName: null,
      sort: 1,
      children: [
        {
          id: 2 + Math.random(),
          name: '小班01',
          code: 'g001',
          type: 'GRADE',
          customName: null,
          sort: 1,
          children: [
            {
              id: 3 + Math.random(),
              name: '语文',
              code: 'SU001',
              type: 'SUBJECT',
              customName: null,
              sort: 1,
              children: [
                {
                  id: 4 + Math.random(),
                  name: '人教版',
                  code: 'E001',
                  type: 'EDITION',
                  customName: null,
                  sort: 0,
                  children: [
                    {
                      id: 5 + Math.random(),
                      name: '分册b二',
                      code: 'V002',
                      type: null,
                      customName: null,
                      sort: 22,
                      children: [
                        {
                          id: 6 + Math.random(),
                          name: '第一章',
                          code: null,
                          type: 'CHAPTER',
                          customName: null,
                          sort: 1,
                          children: [
                            {
                              id: 8 + Math.random(),
                              name: '第一节',
                              code: null,
                              type: 'SECTION',
                              customName: null,
                              sort: 1,
                              children: []
                            },
                            {
                              id: 8 + Math.random(),
                              name: '第二节',
                              code: null,
                              type: 'SECTION',
                              customName: null,
                              sort: 1,
                              children: []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: 9 + Math.random(),
                      name: '分册g一',
                      code: 'V001',
                      type: null,
                      customName: null,
                      sort: 11,
                      children: []
                    }
                  ]
                },
                {
                  id: 111,
                  name: '苏教版',
                  code: 'E002',
                  type: 'EDITION',
                  customName: null,
                  sort: 1,
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 44 + Math.random(),
          name: '中班01',
          code: 'g002',
          type: 'GRADE',
          customName: null,
          sort: 2,
          children: []
        }
      ]
    },
    {
      id: 55 + Math.random(),
      name: '小学01',
      code: 'X-002',
      type: 'SEMESTER',
      customName: null,
      sort: 2,
      children: [
        {
          id: 888 + Math.random(),
          name: '小班01',
          code: 'g001',
          type: 'GRADE',
          customName: null,
          sort: 1,
          children: [
            {
              id: 5676441406287872 + Math.random(),
              name: '语文',
              code: 'SU001',
              type: 'SUBJECT',
              customName: null,
              sort: 1,
              children: [
                {
                  id: 447 + Math.random(),
                  name: '人教版',
                  code: 'E001',
                  type: 'EDITION',
                  customName: null,
                  sort: 0,
                  children: [
                    {
                      id: 88888888 + Math.random(),
                      name: '分册b二',
                      code: 'V002',
                      type: null,
                      customName: null,
                      sort: 22,
                      children: [
                        {
                          id: 9999999 + Math.random(),
                          name: '第一章',
                          code: null,
                          type: 'CHAPTER',
                          customName: null,
                          sort: 1,
                          children: [
                            {
                              id: 666666 + Math.random(),
                              name: '第一节',
                              code: null,
                              type: 'SECTION',
                              customName: null,
                              sort: 1,
                              children: []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: 2222222 + Math.random(),
                      name: '分册g一',
                      code: 'V001',
                      type: null,
                      customName: null,
                      sort: 11,
                      children: []
                    }
                  ]
                },
                {
                  id: 3652,
                  name: '苏教版',
                  code: 'E002',
                  type: 'EDITION',
                  customName: null,
                  sort: 1,
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 7879879868 + Math.random(),
          name: '中班01',
          code: 'g002',
          type: 'GRADE',
          customName: null,
          sort: 2,
          children: []
        }
      ]
    },
    {
      id: 611455 + Math.random(),
      name: '中学',
      code: 'X-003',
      type: 'SEMESTER',
      customName: null,
      sort: 3,
      children: []
    }
  ],
  status: '000000000'
}
