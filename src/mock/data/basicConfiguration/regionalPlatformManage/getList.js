/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:33
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description 区域平台配置列表
 */
export const regionalList = {
  message: 'success',
  result: [
    {
      baseAreaId: '' + Math.random(),
      areaName: '安徽省',
      createAt: 1571290000,
      createBy: '张毅',
      loginName: 'adminZhang',
      userName: '张文华',
      semesterNames: '小学、初中',
      status: 1,
      crossDomain: 1,
      hasChild: true,
    },
    {
      baseAreaId: '' + Math.random(),
      areaName: '江苏省',
      createAt: 1571290000,
      createBy: '张毅',
      loginName: 'adminZhang',
      userName: '张文华',
      semesterNames: '小学、初中',
      status: 1,
      crossDomain: 0,
      children: [
        {
          baseAreaId: '' + Math.random(),
          areaName: '苏州市',
          createAt: 1571290000,
          createBy: '张毅',
          loginName: 'adminZhang',
          userName: '张文华',
          semesterNames: '小学、初中',
          status: 0,
          crossDomain: 1,
          children: [
            {
              baseAreaId: '' + Math.random(),
              areaName: '吴中区',
              createAt: 1571290000,
              createBy: '张毅',
              loginName: 'adminZhang',
              userName: '张文华',
              semesterNames: '小学、初中',
              status: 1,
              crossDomain: 2,
            }
          ],
        },
        {
          baseAreaId: '' + Math.random(),
          areaName: '宿迁市',
          createAt: 1571290000,
          createBy: '张毅',
          loginName: 'adminZhang',
          userName: '张文华',
          semesterNames: '小学、初中',
          status: 0,
          crossDomain: 0,
          children: [
            {
              baseAreaId: '' + Math.random(),
              areaName: '宿城区',
              createAt: 1571290000,
              createBy: '张毅',
              loginName: 'adminZhang',
              userName: '张文华',
              semesterNames: '小学、初中',
              status: 0,
              crossDomain: 0,
            },
            {
              baseAreaId: '' + Math.random(),
              areaName: '宿豫区',
              createAt: 1571290000,
              createBy: '张毅',
              loginName: 'adminZhang',
              userName: '张文华',
              semesterNames: '小学、初中',
              status: 0,
              crossDomain: 1,
            },
          ],
        },
      ],
    },
    {
      baseAreaId: '' + Math.random(),
      areaName: '浙江省',
      createAt: 1571290000,
      createBy: '张毅',
      loginName: 'adminZhang',
      userName: '张文华',
      semesterNames: '小学、初中',
      status: 0,
      crossDomain: 1,
      hasChild: true,
    },
    {
      baseAreaId: '' + Math.random(),
      areaName: '云南省',
      createAt: 1571290000,
      createBy: '张毅',
      loginName: 'adminZhang',
      userName: '张文华',
      semesterNames: '小学、初中',
      status: 0,
      crossDomain: 1,
      children: [
        {
          baseAreaId: '' + Math.random(),
          areaName: '丽江市',
          createAt: 1571290000,
          createBy: '张毅',
          loginName: 'adminZhang',
          userName: '张文华',
          semesterNames: '小学、初中',
          status: 0,
          crossDomain: 1,
        }
      ],
    },
  ],
  status: '000000000'
}
