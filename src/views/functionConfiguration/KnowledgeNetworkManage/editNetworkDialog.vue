<template>
  <div class="module-edit-network">
    <el-dialog
      width="601px"
      title="编辑知识网络"
      :visible.sync="isVisible"
      :before-close="cancel">
      <div class="net-tree-box">
        <el-tree
          v-if="showTree"
          ref="tree"
          :data="treeData"
          :default-expand-all="isExpandAll"
          @node-click="handleNodeClick"
          @check="handleCheck"
          show-checkbox
          class="custom-tree"
          node-key="id"
          icon-class="el-icon-custom-fold"
          :indent="0">
          <span slot-scope="{node,data}">
            <span>{{data.name}}</span>
          </span>
        </el-tree>
      </div>
      <div class="btn-box">
        <el-button size="mini" type="custom" round @click="handleExpandAll">显示全部</el-button>
        <el-button size="mini" type="custom" round @click="handleEllapseAll">收缩全部</el-button>
        <el-button size="mini" type="custom" round @click="handleCheckAll">全选</el-button>
        <el-button size="mini" type="custom" round @click="handleCancelAll">全部取消</el-button>
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
 * Description editNetworkDialog 编辑知识网络弹框
 * Created By Administrator
 * Created At 2019/11/19 9:24
 */

export default {
  name: 'EditNetworkDialog',
  props: {
    visible: {
      type: Boolean
    },
    defaultNetworkList: {
      type: Array
    }
  },
  data () {
    return {
      showTree: true,
      isExpandAll: false,
      treeData: [],
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
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
    defaultNetworkList (val) {
      this.treeData = val
    }
  },
  methods: {
    handleCheck (v1, v2) {
    },
    handleNodeClick (v1, v2, v3) {},
    /**
     * 显示全部
     */
    handleExpandAll () {
      for (let i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = true
      }
    },
    /**
     * 收缩全部
     */
    handleEllapseAll () {
      this.isExpandAll = !this.isExpandAll
      for (let i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = false
      }
    },
    /**
     * 全选
     */
    handleCheckAll () {
      // 使用el-tree自有方法设置选中节点
      this.$refs.tree.setCheckedNodes(this.treeData)
    },
    /**
     * 全部取消
     */
    handleCancelAll () {
      this.$refs.tree.setCheckedKeys([])
    },
    cancel () {
      this.$emit('update:visible', false)
    },
    confirm () {
      const checkedNodes = this.$refs.tree.getCheckedNodes()
      if (checkedNodes.length === 0) { // 未选择知识网络
        this.$message({
          message: '请选择知识网络',
          type: 'warning'
        })
        return false
      } else {
        this.cancel()
        this.$emit('confirm', checkedNodes)
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .module-edit-network {
    /deep/ .el-dialog__body {
      max-height: 440px
    }
    .net-tree-box {
      width: 382px;
      height: 395px;
      overflow-y: auto;
      display: inline-block;
      border: 1px solid #c6cfde;
      box-sizing: border-box;
    }
    .btn-box {
      width: 99px;
      margin-top: 27px;
      display: inline-block;
      vertical-align: top;
      .el-button {
        width: 99px;
        text-align: center;
        margin-top: 20px;
        margin-left: 36px;
      }
    }
  }
</style>
