import { mixins } from './mixins'

/* eslint-disable */
export default {
  name: 'table-tree__header',
  mixins: [mixins],
  data () {
    return {}
  },
  computed: {
    table () {
      return this.$parent
    },
  },
  methods: {},
  render () {
    // className
    function getClassName (type, { headerAlign, prop }) {
      const certainType = this.validateType(type, ['cell', 'inner'], 'getClassName')
      const classList = []
      if (certainType.cell) {
        classList.push(`${this.prefixCls}__header-cell`)
        if (this.table.border) {
          classList.push(`${this.prefixCls}--border-cell`)
        }
        if (['center', 'right'].indexOf(headerAlign) > -1) {
          classList.push(`${this.prefixCls}--${headerAlign}-cell`)
        }
      }
      if (certainType.inner) {
        classList.push(`${this.prefixCls}__cell-inner`)
        if (this.table.treeType && this.table.firstProp === prop) {
          classList.push(`${this.prefixCls}--firstProp-header-inner`)
        }
      }
      return classList.join(' ')
    }

    // 根据type渲染单元格Label
    function renderLabel (column) {
      return column.label ? column.label : ''
    }

    // Template
    return (
      <table cellspacing="0" cellpadding="0" border="0" class={`${this.prefixCls}__header`}>
        <colgroup>
          {this.table.tableColumns.map(column =>
            <col width={column.computedWidth || column.minWidth || column.width}></col>)
          }
        </colgroup>
        <thead>
        <tr class={`${this.prefixCls}__header-row`}>
          {this.table.tableColumns.map((column, columnIndex) =>
            <th class={getClassName.call(this, 'cell', column)} style={'text-align:' + (column.textAlign || 'left')}>
              <div class={getClassName.call(this, 'inner', column)}>
                {renderLabel.call(this, column, columnIndex)}
              </div>
            </th>)
          }
        </tr>
        </thead>
      </table>
    )
  },
}
