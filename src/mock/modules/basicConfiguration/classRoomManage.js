/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/17 19:56
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  校级平台配置
 */
import basicConfiguration from '@/mock/data/basicConfiguration'
import URLS from '@/api/OCURL'

export default [{
  url: URLS.classroomList,
  type: 'get',
  data: basicConfiguration.classroomList, // 校级平台列表
  mock: false
}]
