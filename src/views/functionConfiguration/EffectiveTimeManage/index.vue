<template>
  <div class="effectiveTimeManage">
    <div class="top-tips">
      <div class="effective-time">
        系统有效授课/听课时长：<span>{{effectiveTime?effectiveTime:'-'}}分钟</span>
      </div>
      <div>
        选择某个区域配置有效授课/听课时长，该区域下的全部学校会采用该配置，学校会采用关系最接近的区域配置。
      </div>
      <div class="set-btns">
        <el-button size="mini" type="custom" round icon="el-icon-custom-dispose-basic" @click="setReligion">配置区域时长</el-button>
        <el-button size="mini" type="custom" round icon="el-icon-custom-dispose-basic" @click="setSystem">配置系统时长</el-button>
      </div>
    </div>
    <div class="table-tree">
      <table-tree :data="treeOptions.data"
                  :columns="treeOptions.columns"
                  childrenProp="children"
                  hasChildrenProp="hasChild"
                  idProp="areaId"
                  min-width="600px"
                  :isInit.sync="treeOptions.dataInit"
                  @tree-icon-click="extendTree">
        <template slot="operation" slot-scope="scope">
          <a type="btn" @click="edit(scope.row)">编辑</a>
          <a type="btn" color="danger" @click="del(scope.row.areaId)">删除</a>
        </template>
      </table-tree>
    </div>
    <!--    编辑弹窗-->
    <edit-dialog
      :dialogTitle="dialogTitle"
      :dialogInfo="dialogInfo"
      :visible.sync="visible"
      :editType="editType"
      :save="save"
    ></edit-dialog>
  </div>
</template>

<script>
/*
* Description effectiveTimeManage
* Created By admin
* Created At 2019/9/18 13:31
*/
import * as utils from '@/utils'
import TableTree from '@/components/TableTree/index'
import { editTime, effectiveTimeList } from '@/api/functionConfiguration/effectiveTimeManage'
import EditDialog from './editDialog'

export default {
  components: { TableTree, EditDialog },
  name: 'effectiveTimeManage',
  props: {},
  data () {
    return {
      editType: '',
      visible: false,
      effectiveTime: '30', // 系统有效授课时长
      treeOptions: { // 树形结构
        dataInit: true,
        data: [],
        columns: [
          {
            label: '区域',
            minWidth: '200px',
            prop: 'areaName',
          },
          {
            label: '时长/分钟',
            prop: 'duration',
            minWidth: '200px',
          },
          {
            label: '操作',
            width: '120px',
            type: 'template',
            template: 'operation',
            textAlign: 'center'
          },
        ],
      },
      dialogTitle: '',
      dialogInfo: {},
    }
  },
  methods: {
    /**
     * @description: 列表查询
     * @param params 查询参数
     * @returns {return}
     */
    async getList () {
      const loading = this.$loading({ target: '.table-tree' })
      const result = await effectiveTimeList()
      this.treeOptions.data = result
      this.treeOptions.dataInit = true
      loading.close()
    },
    /**
     * 编辑
     * @param item
     */
    edit (item) {
      this.dialogInfo = item
      this.dialogTitle = '编辑区域时长'
      this.editType = 'AREA_EDIT'
      this.visible = true
    },
    /**
     * 删除
     * @param id
     */
    del (id) {
      this.showConfirmBox({
        message: '是否确定删除该资源？',
        title: '删除',
        type: 'warning',
      }).then((r) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      }).catch(e => console.log('取消', e))
    },
    /**
     * 配置区域时长
     */
    setReligion () {
      this.dialogInfo = {}
      this.dialogTitle = '配置区域时长'
      this.editType = 'AREA'
      this.visible = true
    },
    /**
     * 配置系统时长
     */
    setSystem () {
      this.dialogInfo = {}
      this.dialogTitle = '配置系统时长'
      this.editType = 'SYSTEM'
      this.visible = true
    },
    /**
     * 展开节点树
     * @param data
     */
    async extendTree (data) { // 参数支持 data,column,columnIndex
      console.log(data)
      // 判断是否有有子集并且没有加载过子集，且当前是非折叠状态
      if (data.hasChild && !data.children && !data._isFold) {
        // 动态加载数据（如果是一次绑定所有，无需监听此事件）
        const loading = this.$loading({ target: '.table-tree' })
        // 加载完成数据，找到对应的数据并填充子集
        const currentData = utils.findTreeByProp(this.treeOptions.data, data.areaId, 'areaId', 'children')
        const result = await effectiveTimeList()
        this.$set(currentData, 'children', result)
        loading.close()
      }
    },
    /**
     * 编辑保存
     */
    async save (params) {
      console.log(params, 'save params')
      await editTime(params)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      this.getList()
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
  .effectiveTimeManage {
    overflow: hidden;
    .top-tips {
      font-size: 12px;
      .effective-time {
        color: #999;
        span {
          color: #347eff;
        }
        margin-bottom: 10px;
      }
      .set-btns {
        margin-top: 10px;
        text-align: right;
      }
    }
  }
</style>
