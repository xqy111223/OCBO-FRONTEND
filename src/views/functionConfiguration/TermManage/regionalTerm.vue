<template>
  <div class="regionalTerm">
    <header>
      <el-form ref="form" class="ruleForm" :rules="rules" :model="formDate" label-width="110px">
        <el-form-item label="区域：" prop="areaId">
          <select-region :value.sync="formDate.areaId" aria-placeholder="请输入行政区"></select-region>
        </el-form-item>
        <el-form-item label="是否使用学期：" prop="isUsed">
          <el-radio v-model="formDate.isUsed" label=true>是</el-radio>
          <el-radio v-model="formDate.isUsed" label=false>否</el-radio>
        </el-form-item>
      </el-form>
    </header>
    <div class="top-btns">
      <span class="tableName">学期列表</span>
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
    <div class="footer">
      <el-button type="info" size="mini" round @click="close">取 消</el-button>
      <el-button type="primary" size="mini" round @click="confirm">确 定</el-button>
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
import SelectRegion from '@/components/SelectRegion/index'
import { addTerm, editTerm, termTableList } from '@/api/functionConfiguration/termManage'
import EditDialog from './editDialog'

export default {
  components: { EditDialog, SelectRegion },
  name: 'RegionalTerm',
  data () {
    return {
      params: '',
      loading: false,
      editType: '',
      visible: false,
      dialogTitle: '',
      dialogInfo: {},
      tooltip: true, // 当内容过长被隐藏时显示 tooltip
      hideSingle: true, // 隐藏一页
      formDate: {
        areaId: '',
        isUsed: 1
      },
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
        pageCount: 0,
        isPageing: true
      },
      tableData: [],
      rules: {
        areaId: { required: true, message: '请输入行政区', trigger: 'change' },
      }
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
    },
    /**
     * 取消
     */
    close () {
      this.$router.push({ path: '/fn-cn/tm-me' })
    },
    /**
     * 确定
     */
    confirm () {
      this.$message({
        message: '配置成功',
        type: 'success'
      })
      this.$router.push({ path: '/fn-cn/tm-me' })
    }
  },
  created () {
    this.params = this.$route.query
    console.log(typeof (this.params.isUsed))
    this.formDate.isUsed = this.params.isUsed
    this.getList(1)
  }
}
</script>

<style scoped lang="scss">
  .regionalTerm {
    header {
      border-bottom: 1px solid #ddd;
    }
    .top-btns {
      text-align: right;
      margin: 20px 0 10px;
      .tableName {
        line-height: 30px;
        float: left;
        font-weight: bold;
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
    .footer {
      width: 135px;
      margin: 30px auto;
    }
  }
</style>
