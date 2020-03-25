/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/14 15:42
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 知识网络管理数据模拟
 */
import functionConfiguration from '@/mock/data/functionConfiguration'
import URLS from '@/api/OCURL'

export default [
  {
    url: URLS.platFormData,
    type: 'post',
    data: functionConfiguration.platFormData,
    mock: true,
  },
  {
    url: URLS.networkListByType,
    type: 'post',
    data: functionConfiguration.networkListByType,
    mock: true,
  },
  {
    url: URLS.knowledgeTypesList,
    type: 'post',
    data: functionConfiguration.knowledgeTypesList,
    mock: true,
  },
  {
    url: URLS.saveNetworkConfig,
    type: 'post',
    data: {
      message: 'ok',
      result: {},
      status: '000000000',
    },
    mock: true,
  },
  {
    url: URLS.bindEditions,
    type: 'post',
    data: {
      message: 'ok',
      result: {},
      status: '000000000',
    },
    mock: true,
  }
]
