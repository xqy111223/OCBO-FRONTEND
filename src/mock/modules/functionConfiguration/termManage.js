/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:42
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  学期配置
 */
import functionConfiguration from '@/mock/data/functionConfiguration'
import URLS from '@/api/OCURL'

export default [{
  url: URLS.termList,
  type: 'post',
  data: functionConfiguration.termList, // 学期列表
  mock: true
}, {
  url: URLS.editTerm,
  type: 'post',
  data: functionConfiguration.editTerm, // 编辑学期配置
  mock: true
}, {
  url: URLS.addTerm,
  type: 'post',
  data: functionConfiguration.addTerm, // 新增学期配置
  mock: true
}, {
  url: URLS.termTableList,
  type: 'post',
  data: functionConfiguration.termTableList, // 区域/系统学期列表
  mock: true
}]
