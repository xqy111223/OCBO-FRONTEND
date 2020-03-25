/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/21 15:55
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 学校选择器学校列表 mock http://10.5.52.14/workspace/myWorkspace.do?projectId=306#9341
 */

export const selectorSchoolList = {
  message: 'ok',
  status: '000000000',
  result: {
    list: [
      {
        areaName: '区域名称',
        baseSchoolId: '111' + Math.random(),
        schoolName: '学校名',
        relateSchools: [
          {
            areaName: '区域名称',
            baseSchoolId: '111' + Math.random(),
            schoolName: '关联学校名',
          }
        ]
      },
      {
        areaName: '区域名称44',
        baseSchoolId: '111' + Math.random(),
        schoolName: '学校名',
        relateSchools: [
          {
            areaName: '区域名称',
            baseSchoolId: '111' + Math.random(),
            schoolName: '关联学校名',
          }
        ]
      },
      {
        areaName: '区域名称2',
        baseSchoolId: '111' + Math.random(),
        schoolName: '学校名2',
        relateSchools: [
          {
            areaName: '区域名称2',
            baseSchoolId: '111' + Math.random(),
            schoolName: '关联学校名2',
          }
        ]
      },
      {
        areaName: '区域名称66',
        baseSchoolId: '111' + Math.random(),
        schoolName: '学校名2',
        relateSchools: [
          {
            areaName: '区域名称2',
            baseSchoolId: '111' + Math.random(),
            schoolName: '关联学校名2',
          }
        ]
      },
      {
        areaName: '区域名称66',
        baseSchoolId: '111' + Math.random(),
        schoolName: '小学校',
        relateSchools: [
          {
            areaName: '区域名称2',
            baseSchoolId: '111' + Math.random(),
            schoolName: '关联学校名2',
          }
        ]
      }
    ]
  }
}
