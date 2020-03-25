/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/29 9:42
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description
 */
import knowledgeNetwork from '@/mock/data/knowledgeNetwork'
import URLS from '@/api/OCURL.js'

export default [
  {
    url: URLS.knowledgeMangeData,
    type: 'post',
    data: knowledgeNetwork.knowledgeNetworkData, // 返回知识网络数据
    mock: false
  },
  {
    url: URLS.setDefaultKnowledge,
    type: 'post',
    data: {
      status: '000000000',
      result: {},
      message: 'ok',
    },
    mock: true
  }
]
