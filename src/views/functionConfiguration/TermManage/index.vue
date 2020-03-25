<template>
  <div class="termManage">
    <div class="top-tips">
      <div>
        您好，①可以给某个区域配置学期或者配置不使用学期 ; ② 如果某个区域配置了学期，则上级或者下级无法再配置学期；③ 对于学校，如果存在某个上级配置了学期，则采用此学期配置，如果所有
        上级都没有设置，则采用系统学期; ④ 对于区域，如果本级或者某个上级配置了学期，则采用此学期配置，否则采用系统学期；⑤ 学期的增删改，与课表已排课数据，不再互相影响。
      </div>
      <div class="set-btns">
        <el-button size="mini" type="custom" round icon="el-icon-custom-dispose-basic" @click="setReligion">配置区域学期</el-button>
        <el-button size="mini" type="custom" round icon="el-icon-custom-dispose-basic" @click="setSystem">配置系统学期</el-button>
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
        <template slot="semesters" slot-scope="scope">
          {{map(scope.row.semesters)}}
        </template>
        <template slot="operation" slot-scope="scope" v-if="scope.row.semesters.length">
          <a type="btn" @click="edit(scope.row)">编辑</a>
          <a type="btn" color="danger" @click="del(scope.row.id)">删除</a>
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
* Description termManage
* Created By zhuhao
* Created At 2019/9/18 13:31
*/
import * as utils from '@/utils'
import TableTree from '@/components/TableTree/index'
import { editTerm, termList } from '@/api/functionConfiguration/termManage'
import EditDialog from './editDialog'

export default {
  components: { TableTree, EditDialog },
  name: 'termManage',
  props: {},
  data () {
    return {
      map: utils.mapString,
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
            label: '学期',
            minWidth: '200px',
            type: 'template',
            template: 'semesters'
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
      const result = await termList()
      this.treeOptions.data = result
      this.treeOptions.dataInit = true
      loading.close()
    },
    /**
     * 编辑
     * @param item
     */
    edit (item) {
      this.$router.push({ name: 'RegionalTerm', query: item })
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
      this.$router.push({ name: 'RegionalTerm' })
    },
    /**
     * 配置系统时长
     */
    setSystem () {
      this.$router.push({ name: 'SystemTerm' })
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
        const result = await termList()
        this.$set(currentData, 'children', result)
        loading.close()
      }
    },
    /**
     * 编辑保存
     */
    async save (params) {
      console.log(params, 'save params')
      await editTerm(params)
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
  .termManage {
    overflow: hidden;
    .top-tips {
      font-size: 12px;
      line-height: 20px;
      .set-btns {
        margin-top: 10px;
        text-align: right;
      }
    }
  }
</style>
