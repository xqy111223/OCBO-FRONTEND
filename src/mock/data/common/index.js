/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/9 14:50
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description
 */
/**
 * 获取区域数据
 * */
import Mock from 'mockjs'

export const areaList = Mock.mock(
  {
    result: {
      'list|4-9': [
        {
          'areaCode|+1': 100000,
          areaName: '@province',
          'hasChild|1': false,
          'areaId|+1': 100000
        }
      ]
    },
    status: '000000000'
  })
