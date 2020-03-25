/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/14 15:39
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 根据区域父ID获取绑定过知识网络的区域列表 http://10.5.52.14/workspace/myWorkspace.do?projectId=317#9549
 */

export const platFormData = {
  message: 'ok',
  result: [
    {
      areaCode: '2222',
      areaName: '江苏',
      baseAreaId: 28442 + Math.random(),
      hasChild: true,
      children: [
        {
          areaCode: '2222',
          areaName: '直属校',
          baseAreaId: 28442 + Math.random(),
          baseSchoolId: 40662 + Math.random(),
          schoolName: '某个学校'
        },
        {
          areaCode: '2222',
          areaName: '子区域',
          baseAreaId: 28442 + Math.random(),
          baseSchoolId: 40662 + Math.random(),
          schoolName: '某个学校'
        }
      ],
      directSchools: [
        {
          baseSchoolId: 40662 + Math.random(),
          schoolName: '某个学校'
        }
      ],
      hasKnowledge: 1,
      idPath: '111111111',
      namePath: '全国/江苏',
      pid: 81116
    },
    {
      areaCode: '2222',
      areaName: '江苏',
      baseAreaId: 28442 + Math.random(),
      hasChild: true,
      directSchools: [
        {
          baseSchoolId: 40662 + Math.random(),
          schoolName: '某个学校'
        }
      ],
      hasKnowledge: 1,
      idPath: '111111111',
      namePath: '全国/江苏',
      pid: 81116
    }
  ],
  status: '000000000'
}
