/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/13 10:08
 *   @Author Administrator (Administrator@codyy.com)
 *   @Description 管理教师选择器教师数据
 */
import basic from '@/mock/data/basic/index'
import urls from '@/api/OCURL'

export default [{
  url: urls.selectorTeacherList,
  type: 'get',
  data: basic.selectorTeacherList,
  mock: false
}]
