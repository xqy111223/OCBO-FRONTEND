/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:42
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  区域平台配置
 */
import basicConfiguration from '@/mock/data/basicConfiguration'
import URLS from '@/api/OCURL'

export default [{
  url: URLS.regionalList,
  type: 'get',
  data: basicConfiguration.regionalList, // 区域平台列表
  mock: false
}]
