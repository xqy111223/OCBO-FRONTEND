/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 10:47
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description 通用的工具函数
 */

/**
 * 查找树中匹配指定属性的目标对象
 * @param tree 要获取的树对象（Array）
 * @param value 要获取的配置值
 * @param prop 要获取匹配值的字段
 * @param childrenProp 子集合属性名
 * @returns {null}
 */
export function findTreeByProp (tree, value, prop = 'areaId', childrenProp = 'children') {
  let target = null
  for (let i = 0; i < tree.length; i++) {
    const t = tree[i]
    if (t[prop] === value) {
      target = t
      break
    } else {
      if (t[childrenProp] && t[childrenProp].length) {
        // 存在子集
        target = findTreeByProp(t[childrenProp], value, prop, childrenProp)
        if (target) {
          break
        }
      }
    }
  }
  return target
}

/**
 * 获取树中所有指定属性集合
 * @param tree 要获取的树对象（Array）
 * @param prop 要获取的属性
 * @param childrenProp 子集合属性
 * @returns {Array}
 */
export function getTreeAllProps (tree, prop = 'id', childrenProp = 'children', array = []) {
  for (let i = 0; i < tree.length; i++) {
    const t = tree[i]
    array.push(t[prop])
    if (t[childrenProp] && t[childrenProp].length) {
      getTreeAllProps(t[childrenProp], prop, childrenProp, array)
    }
  }
  return array
}

/**
 *   @description: 随机八位密码
 *   @param arguments 描述
 *   @returns {}
 */
export function randomPassword () {
  const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] // 数字类型数组
  const lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] // 小写字母数组
  const upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] // 大写字母数组
  const symbol = ['-', '.', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', ':', '<', '>', '?'] // 特殊字符数组
  // let a, b, c, d
  const a = Math.ceil(Math.random() * 5) // 从数字类型数组中随机的item个数 因为是八位,所以a的范围为1-5
  const b = Math.ceil(Math.random() * (6 - a)) // 从小写字母数组中随机的item个数
  const c = Math.ceil(Math.random() * (7 - a - b)) // 从大写字母数组中随机的item个数
  const d = 8 - a - b - c // 从特殊字符数组中随机的item个数
  let pwd = this.randomStr(num, a) + this.randomStr(lower, b) + this.randomStr(upper, c) + this.randomStr(symbol, d) // 将获取的字符串拼接
  pwd = this.randomSort(pwd) // 将组合在一起的密码随机排序
  return pwd.replace(/,/g, '')
}

/**
 *   @description: 列表随机抽取元素
 *   @param arr 描述
 *   @returns {}
 */
export function randomStr (arr, count) {
  let index = ''
  const newArr = []
  for (let i = 0; i < count; i++) {
    index = Math.ceil(Math.random() * (arr.length - 1))
    newArr.push(arr[index])
  }
  return newArr.toString()
}

/**
 *   @description: 合并后密码列表随机排序为密码字符串
 *   @param arr 描述
 *   @returns {}
 */
export function randomSort (str) {
  const arr = str.split('')
  for (let i = 0; i < arr.length; i++) {
    const index = Math.ceil(Math.random() * (arr.length - 1))
    const item = arr[index]
    arr[index] = arr[arr.length - i - 1]
    arr[arr.length - i - 1] = item
  }
  return arr.join('')
}

/**
 * id=>name关系映射，循环出来name拼接字符串string
 */
export function mapString (arr) {
  const newArr = arr.map((item) => {
    return item.name
  })
  return newArr.join('、')
}

/**
 *   @description: 传多个参时拼接url
 *   @param  描述
 *   @returns {}
 */
export function queryURL (url, params) {
  let html = ''
  params && params.forEach(val => {
    html += '/' + val
  })
  url = url + html
  return url
}
