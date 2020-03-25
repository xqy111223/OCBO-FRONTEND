/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/9 14:52
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description
 */
import { areaList } from '../../data/common'
import URLS from '@/api/OCURL'

export default [{
  url: URLS.areaList,
  type: 'get',
  data: areaList,
  mock: false
}]
