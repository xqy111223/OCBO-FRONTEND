/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/23 17:20
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description 表格树组件的mixins
 */
export const mixins = {
  data () {
    return {
      prefixCls: 'table-tree',
    }
  },
  methods: {
    validateType (type, validTypes, funcName, isReturn = true) {
      if (validTypes.indexOf(type) < 0) throw new Error(`${funcName}'s type must is ${validTypes.join(' or ')}.`)
      if (isReturn) {
        const certainType = {}
        validTypes.forEach((item) => {
          certainType[item] = item === type
        })
        return certainType
      }
      return true
    },
    isExpandCell (table, columnIndex) {
      return table.expandType && (
        (table.showIndex && columnIndex === 1) ||
        (!table.showIndex && columnIndex === 0)
      )
    }
  },
}

let scrollBarWidth

export const getSbw = function () {
  if (scrollBarWidth !== undefined) return scrollBarWidth

  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll

  return scrollBarWidth
}
