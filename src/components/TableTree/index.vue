<template>
  <div
    v-if="columns.length > 0"
    ref="table"
    :class="[prefixCls, tableClass]" style="overflow-x: auto">
    <div
      v-show="showHeader"
      ref="header-wrapper"
      :class="`${prefixCls}__header-wrapper`"
      :style="headerWrapperStyle"
      @mousewheel="handleEvent('header', $event)">
      <table-header
        ref="table-header">
      </table-header>
    </div>
    <div
      ref="body-wrapper"
      :style="bodyWrapperStyle"
      :class="`${prefixCls}__body-wrapper`"
      @scroll="handleEvent('body', $event)">
      <table-body
        ref="table-body"
        :class="bodyClass">
      </table-body>
    </div>
  </div>
</template>

<script>
/*
* Description Table Tree Component
* Created By Waroom
* Created At 2019/9/23 15:38
*/
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import { getSbw, mixins } from './mixins'

/* eslint-disable */
function getBodyData (data, isTreeType, childrenProp, hasChildrenProp, isFold, level = 1) {
  let bodyData = []
  data.forEach((row, index) => {
    const children = row[childrenProp]
    const childrenLen = Object.prototype.toString.call(children).slice(8, -1) === 'Array' ? children.length : 0
    bodyData.push({
      _isHover: false,
      _isExpanded: false,
      _level: level,
      _isHide: row.hasOwnProperty('isHide') ? row.isHide : ((row.hasOwnProperty('isFold') ? row.isFold : isFold) ? level !== 1 : false),
      _isFold: row.hasOwnProperty('isFold') ? row.isFold : isFold,
      _childrenLen: row[hasChildrenProp] || childrenLen,
      _normalIndex: index + 1,
      ...row,
    })
    if (isTreeType) {
      if (childrenLen > 0) {
        if (row.hasOwnProperty('isFold') && !row.isFold) {
          children.forEach(c => {
            c.isHide = false
          })
        }
        bodyData = bodyData.concat(getBodyData(children, true, childrenProp, hasChildrenProp, isFold, level + 1))
      }
    }
  })
  return bodyData
}

function initialState (table) {
  return {
    bodyHeight: 'auto',
    firstProp: table.columns[0].prop,
    bodyData: getBodyData(table.data, table.treeType, table.childrenProp, table.hasChildrenProp, table.isFold),
  }
}

function initialColumns (table, clientWidth) {
  let columnsWidth = 0
  const minWidthColumns = []
  const otherColumns = []
  const columns = table.columns.concat()
  if (table.expandType) {
    columns.unshift({
      width: '50',
    })
  }
  if (table.selectionType) {
    columns.unshift({
      width: '50',
    })
  }
  if (table.showIndex) {
    columns.unshift({
      width: '50px',
      prop: '_normalIndex',
      label: table.indexText,
    })
  }
  columns.forEach((column, index) => {
    let width = ''
    let minWidth = ''
    if (!column.width) {
      if (column.minWidth) {
        minWidth = typeof column.minWidth === 'number' ? column.minWidth : parseInt(column.minWidth, 10)
      } else {
        minWidth = 80
      }
      minWidthColumns.push({
        ...column,
        minWidth,
        _index: index,
      })
    } else {
      width = typeof column.width === 'number' ? column.width : parseInt(column.width, 10)
      otherColumns.push({
        ...column,
        width,
        _index: index,
      })
    }
    columnsWidth += minWidth || width
  })
  const scrollBarWidth = getSbw()
  const totalWidth = columnsWidth + scrollBarWidth
  const isScrollX = totalWidth > clientWidth
  if (!isScrollX) {
    const extraWidth = clientWidth - totalWidth
    const averageExtraWidth = Math.floor(extraWidth / minWidthColumns.length)
    minWidthColumns.forEach((column) => {
      column.computedWidth = column.minWidth + averageExtraWidth
    })
  }
  const tableColumns = otherColumns.concat(minWidthColumns)
  tableColumns.sort((a, b) => a._index - b._index)
  return tableColumns
}

export default {
  name: 'TreeTable',
  mixins: [mixins],
  components: {
    TableHeader,
    TableBody
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    maxHeight: {
      type: [String, Number],
      default: 'auto',
    },
    minWidth: {
      type: [String, Number],
      default: 'auto',
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    treeType: {
      type: Boolean,
      default: true,
    },
    childrenProp: {
      type: String,
      default: 'children',
    },
    hasChildrenProp: {
      type: String,
      default: 'hasChild'
    },
    idProp: {
      type: String,
      default: 'id'
    },
    isFold: {
      type: Boolean,
      default: true,
    },
    expandType: {
      type: Boolean,
      default: false,
    },
    selectionType: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    indexText: {
      type: String,
      default: '序号',
    },
    showRowHover: {
      type: Boolean,
      default: true,
    },
    isInit: {
      type: Boolean,
      default: true
    },
    rowKey: Function,
    rowClassName: [String, Function],
    cellClassName: [String, Function],
    rowStyle: [Object, Function],
    cellStyle: [Object, Function],
  },
  data () {
    return {
      computedWidth: '',
      computedHeight: '',
      tableColumns: [],
      ...initialState(this),
    }
  },
  computed: {
    bodyWrapperStyle () {
      return {
        height: this.bodyHeight,
        minWidth: this.minWidth || 'auto'
      }
    },
    headerWrapperStyle () {
      return {
        minWidth: this.minWidth || 'auto'
      }
    },
    tableClass () {
      return {
        [`${this.prefixCls}--border`]: this.border,
      }
    },
    bodyClass () {
      return {
        [`${this.prefixCls}--stripe`]: this.stripe,
      }
    },
  },
  methods: {
    handleEvent (type, $event) {
      this.validateType(type, ['header', 'body', 'footer'], 'handleEvent')
      const eventType = $event.type
      if (eventType === 'scroll') {
        this.$refs['header-wrapper'].scrollLeft = $event.target.scrollLeft
        this.$refs['footer-wrapper'].scrollLeft = $event.target.scrollLeft
      }
      if (eventType === 'mousewheel') {
        const deltaX = $event.deltaX
        const $body = this.$refs['body-wrapper']
        if (deltaX > 0) {
          $body.scrollLeft += 10
        } else {
          $body.scrollLeft -= 10
        }
      }
      return this.$emit(`${type}-${eventType}`, $event)
    },
    // computedWidth, computedHeight, tableColumns
    measure () {
      this.$nextTick(() => {
        const { clientWidth, clientHeight } = this.$el
        this.computedWidth = clientWidth + 2
        this.computedHeight = clientHeight + 2

        const maxHeight = parseInt(this.maxHeight, 10)
        if (this.maxHeight !== 'auto' && this.computedHeight > maxHeight) {
          this.bodyHeight = `${maxHeight - 83}px`
        }
        this.tableColumns = initialColumns(this, clientWidth)
      })
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        // 重新处理当前的bodyData
        const bodyData = getBodyData(this.data, this.treeType, this.childrenProp, this.hasChildrenProp, this.isFold)
        // 为了保留Fold状态
        if (!this.isInit) {
          bodyData.forEach(body => {
            const exist = this.bodyData.filter(old => old[this.idProp] === body[this.idProp])
            if (exist.length) {
              const old = exist[0]
              Object.assign(body, {
                _isHover: old._isHover,
                _isExpanded: old._isExpanded,
                _isHide: old._isHide,
                _isFold: old._isFold
              })
            } else {
              Object.assign(body, { _isHide: this.bodyData.length ? false : body._isHide })
            }
          })
        }
        this.bodyData = bodyData
        this.$emit('update:isInit', false)
      },
    },
  },
  updated () {
    this.measure()
  },
  mounted () {
    this.measure()
    window.addEventListener('resize', this.measure)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.measure)
  },
}
</script>

<style lang="scss" src="./index.scss"></style>
