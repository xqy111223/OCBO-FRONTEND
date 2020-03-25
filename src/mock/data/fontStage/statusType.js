/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/10 9:55
 *   @Author codyy (codyy@codyy.com)
 *   @Description
 */
// 各状态对应的名称
function getText (value, data) {
  let result = ''
  data.map(v => {
    if (value == v.id) {
      result = v.name
    }
  })
  return result
}

// 状态
const statusCode = {
  data: [{
    id: 0,
    name: '关闭'
  }, {
    id: 1,
    name: '开启'
  }, {
    id: 2,
    name: '全部'
  }],
  getText: function (value) {
    return getText(value, this.data)
  }
}
// 学段
const sectionCode = {
  data: [{
    id: 0,
    name: '小学'
  }, {
    id: 1,
    name: '初中'
  }, {
    id: 2,
    name: '高中'
  }],
  getText: function (value) {
    return getText(value, this.data)
  }
}
// 年级
const gradeCode = {
  data: [{
    id: 0,
    name: '一年级'
  }, {
    id: 1,
    name: '二年级'
  }, {
    id: 2,
    name: '三年级'
  }],
  getText: function (value) {
    return getText(value, this.data)
  }
}
// 教师
const teacherCode = {
  data: [{
    id: 0,
    name: '普通教师'
  }, {
    id: 1,
    name: '名师'
  }, {
    id: 2,
    name: '全部'
  }],
  getText: function (value) {
    return getText(value, this.data)
  }
}
// 角色
const userCode = {
  data: [{
    id: 0,
    name: '普通用户'
  }, {
    id: 1,
    name: '超级管理员'
  }, {
    id: 2,
    name: '全部'
  }],
  getText: function (value) {
    return getText(value, this.data)
  }
}

export {
  statusCode, sectionCode, gradeCode, teacherCode, userCode
}
