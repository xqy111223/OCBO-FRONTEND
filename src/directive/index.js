/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/27 8:53
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  按钮权限
 */
import auth from './btnAuth'

const directive = {
  auth
}

export default function install (Vue) {
  Object.keys(directive).forEach(i => Vue.directive(i, directive[i]))
}
