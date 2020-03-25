<template>
  <div class="systemTerm">
    <div class="top-btns">
      <div class="total">共<span>{{pagination.total}}</span>条数据</div>
      <el-button size="mini" type="custom" round icon="el-icon-custom-new-add" @click="addTerm">新增学期</el-button>
    </div>
    <div class="tableList">
      <el-table
        v-loading="loading"
        :data="tableData"
        min-width="1000px"
        style="width: 100%">
        <el-table-column prop="name" label="学期名称" :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="startDate" label="开始日期" :show-overflow-tooltip="tooltip">
          <template slot-scope="scope">
            {{`${scope.row.startDate}`|date}}
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="结束日期" :show-overflow-tooltip="tooltip">
          <template slot-scope="scope">
            {{`${scope.row.endDate}`|date}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <a type="btn" @click="edit(scope.row.id)">编辑</a>
            <a type="btn" @click="del(scope.row.id)" color="danger">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, jumper" :current-page="pagination.pageNum" :pager-count="5"
                     :total="pagination.total" :page-size="pagination.pageSize"
                     @current-change="getList" :hide-on-single-page="hideSingle">
      </el-pagination>
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
* Description schoolPlatformManage
* Created By zhuhao
* Created At 2019/9/18 13:04
*/
import { addTerm, editTerm, termTableList } from '@/api/functionConfiguration/termManage'
import EditDialog from './editDialog'

export default {
  components: { EditDialog },
  name: 'systemTerm',
  data () {
    return {
      loading: false,
      editType: '',
      visible: false,
      dialogTitle: '',
      dialogInfo: {},
      tooltip: true, // 当内容过长被隐藏时显示 tooltip
      hideSingle: true, // 隐藏一页
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
        pageCount: 0,
        isPageing: true
      },
      tableData: []
    }
  },
  methods: {
    /**
     * @description: 列表查询
     * @param params 查询参数
     * @returns {return}
     */
    async getList (pageNum) {
      this.loading = true
      this.pagination.pageNum = pageNum
      const result = await termTableList(this.pagination.pageNum)
      this.tableData = result.list
      this.pagination.total = result.total
      this.loading = false
    },
    /**
     * 新增学期
     */
    addTerm () {
      this.dialogInfo = {}
      this.dialogTitle = '新增学期'
      this.editType = 'add'
      this.visible = true
    },
    /**
     * 编辑
     * @param item
     */
    edit (item) {
      this.dialogInfo = item
      this.dialogTitle = '编辑学期'
      this.editType = 'edit'
      this.visible = true
    },
    /**
     * 删除
     * @param id
     */
    del (id) {
      this.showConfirmBox({
        message: '是否确定删除该学期？',
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
     * 编辑保存
     */
    async save (params) {
      console.log(params, 'save params')
      if (params.type === 'edit') {
        await editTerm(params)
      } else {
        await addTerm(params)
      }
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      this.getList()
    }
  },
  created () {
    this.getList(1)
  }
}
</script>

<style scoped lang="scss">
  .systemTerm {
    .top-btns {
      text-align: right;
      margin: 20px 0 10px;
      .total {
        float: left;
        line-height: 30px;
        span {
          color: #347EFF;
        }
      }
    }
    .tableList {
      span.enable-status, span.disable-status {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      span.enable-status {
        background-color: #40d688;
      }
      span.disable-status {
        background-color: #bbbbbb;
      }
    }
    .pagination {
      width: 500px;
      margin: 30px auto;
    }
  }
</style>
