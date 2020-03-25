<template>
  <div class="cdnManage">
    <div class="middle">
      <span>共<span class="color-primary">{{ total }}</span>条数据</span>
      <div class="middle-button">
        <el-button type="custom" @click="add()" round icon="el-icon-plus">新增服务器</el-button>
      </div>
    </div>
    <div class="main">
      <el-table
        :data="list"
        v-loading="loading"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default">
        <el-table-column
          :show-overflow-tooltip="true"
          prop="serverName"
          label="服务器名称">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="pushFlow"
          label="推流域名">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="pullFlow"
          label="拉流域名">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <a type="btn" @click="edit(scope.row.userId)">编辑</a>
            <a type="btn" @click="del(scope.row.userId)" color="danger">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <!--      查看弹窗-->
      <add-or-update-dialog
        :visible.sync="visible"
        :dialog-title="dialogTitle"
        :form="form"
        :serverId="form.serverId"
        ref="form">
      </add-or-update-dialog>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next, jumper" :pager-count="5" :total="pagination.pageCount" :page-size="pagination.pageSize"
                       @current-change="getList">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
/*
* Description regionalResourceManage
* Created By admin
* Created At 2019/9/18 13:55
*/
import { getRegionalResourceManageDataList } from '@/api/configManage/regionalResourceManage'
import AddOrUpdateDialog from './AddOrUpdateDialog'

export default {
  name: 'regionalResourceManage',
  components: { AddOrUpdateDialog },
  props: {},
  data () {
    return {
      total: '',
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 1000,
        pageCount: 100
      },
      loading: false,
      visible: false,
      list: [],
      value4: '',
      form: {
        serverId: '',
        serverName: '',
        pushFlow: '',
        pullFlow: '',
        type: '',
        field1: '',
        field2: ''
      },
      userInfo: {},
      addUser: {},
      listQuery: {
        regional: '',
        serverName: '',
        type: '',
      },
      dialogTitle: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      this.loading = true
      try {
        const result = await getRegionalResourceManageDataList(this.listQuery)
        this.list = result.list
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      this.loading = false
    },
    add () {
      this.form.serverId = ''
      this.dialogTitle = '新增服务器'
      this.visible = true
    },
    edit (serverId) {
      this.form.serverId = serverId
      this.dialogTitle = '编辑服务器'
      this.visible = true
    },
    change () {
    }
  }
}
</script>

<style scoped lang="scss">
  .cdnManage {
    ul li {
      list-style: none;
      margin-bottom: 20px;
    }

    .mb18 {
      margin-bottom: 18px;
    }

    .mb15 {
      margin-bottom: 15px;
    }

    .ml20 {
      margin-left: 20px;
    }

    .ml50 {
      margin-left: 50px;
    }

    .middle-button {
      display: inline-block;
      float: right;
    }

    .line {
      height: 1px;
      background-color: #e1e7f0;
      margin-top: -20px;
    }

    .head-item {
      display: inline-block;
      margin-bottom: 20px;

      span:first-child {
        text-align: right;
        width: 80px;
        height: 14px;
        display: inline-block;
      }
    }

    .middle {
      height: 36px;
      width: 100%;

      span {
        line-height: 36px;
      }
    }

    .status-point {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #D3D3D3;
      vertical-align: middle;
      margin-right: 5px
    }

    .openColor {
      background-color: #90EE90;
    }

    .pagination {
      margin-top: 30px;
      width: 500px;
      left: 50%;
      margin-left: -250px;
      position: relative;
    }
  }
</style>
