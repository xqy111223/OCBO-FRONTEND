/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/30 15:12
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description
 */
import knowledgeNetwork from '@/mock/data/knowledgeNetwork'
import URLS from '@/api/OCURL.js'

export default [
  {
    url: URLS.subjectList,
    type: 'get',
    data: knowledgeNetwork.subjectList, // 返回知识网络学科列表
    mock: false
  },
  {
    url: URLS.setSubjectDefault,
    type: 'post',
    data: {
      message: 'ok',
      status: '000000000',
      result: {}
    }, // 设置学科默认
    mock: true
  }
]
