/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/19 15:19
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description 平台配置mock
 */
import basic from '@/mock/data/basic/index'

export default [{
  url: 'area/add',
  type: 'get',
  data: basic.addAreaData,
  mock: true
}, {
  url: 'areas',
  type: 'get',
  data: basic.areaListData,
  mock: true
}]
