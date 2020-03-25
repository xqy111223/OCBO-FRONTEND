<template>
  <div class="module-edition-config">
    <el-dialog
      width="910px"
      title="版本配置"
      :visible.sync="isVisible"
      :before-close="cancel">
      <div class="edition-box">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedEditions" @change="handleCheckedEditions">
          <el-checkbox v-for="item in editionList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <p class="el-icon-custom-tips color-disable font-small">至少选择一个版本</p>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" round @click="cancel">取 消</el-button>
          <el-button type="primary" size="mini" round @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
 * Description editionConfigDialog 版本配置弹框
 * Created By Administrator
 * Created At 2019/11/19 9:24
 */
export default {
  name: 'EditionConfigDialog',
  props: {
    visible: {
      type: Boolean
    },
    editionList: {
      type: Array
    }
  },
  data () {
    return {
      isIndeterminate: false, // 部分选中聚焦状态
      checkAll: false,
      checkedEditions: [],
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    },
  },
  methods: {
    /**
     * 处理多选框组选中事件
     * @param val 选中checkboxlabel值组成的数组
     */
    handleCheckedEditions (val) {
      const checkedCount = val.length
      this.checkAll = checkedCount === this.editionList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.editionList.length
    },
    /**
     * 处理全选按钮
     * @param val 全选按钮选中状态， 选中为true
     */
    handleCheckAllChange (val) {
      const checkAllEdition = this.editionList.map(item => {
        return item.id
      })
      this.checkedEditions = val ? checkAllEdition : []
      this.isIndeterminate = false
    },
    cancel () {
      this.$emit('update:visible', false)
    },
    confirm () {
      console.log(this.checkedEditions)
      this.cancel()
      this.$emit('confirm', this.checkedEditions)
    },
  }
}
</script>

<style scoped lang="scss">
  .module-edition-config {
    .el-checkbox-group {
      border: 1px solid #c6cfde;
      padding: 0 20px;
      height: 300px;
      overflow-y: auto;
      .el-checkbox {
        height: 42px;
        line-height: 42px;
        width: 126px;
      }
    }
    .el-icon-custom-tips:before {
      color: #347eff;
      margin-right: 5px;
    }
  }
</style>
