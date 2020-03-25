<template>
  <div class="messageManage">
    <div class="head mb15">
      <div class="head-item">
        <span>区域：</span>
        <select-region :value.sync="listQuery.baseAreaId" :areaCode="areaCode" :filterable="true"></select-region>
      </div>
      <div class="head-item">
        <span>服务器：</span>
        <el-input v-model="listQuery.serverName" size="round" placeholder="请输入服务器名"></el-input>
      </div>
      <el-button size="mini" class="ml20" round @click="getList()" type="primary">查询</el-button>
    </div>
    <div class="line mb18"></div>
    <div class="middle">
      <span>共<span class="color-primary">{{ total }}</span>条数据</span>
      <div class="middle-button">
        <el-button type="custom" @click="add()" round icon="el-icon-plus">新增服务器</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="list" v-loading="loading" row-class-name="table-body-default" header-row-class-name="table-header-default">
        <el-table-column :show-overflow-tooltip="true" prop="serverName" label="服务器名称"></el-table-column>
        <el-table-column prop="areaNamePath" label="行政区"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="serverAddress" label="COCO服务器地址"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="serverPort" label="COCO服务器端口"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="slaveServerName" label="备用服务器名称"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="slaveServerAddress" label="备用COCO服务器地址"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="slaveServerPort" label="备用COCO服务器端口"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <a type="btn" @click="edit(scope.row.id)">编辑</a>
            <a type="btn" @click="del(scope.row.id)" color="danger">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <add-or-update-dialog
        :visible.sync="visible"
        :formData="form"
        :dialog-title="dialogTitle"
        :server-id="form.serverId"
        @confirm="confirmAddOrEdit"
        ref="form">
      </add-or-update-dialog>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next, jumper" :pager-count="5" :total="total"
                       :current-page="listQuery.pageNum" :page-size="listQuery.pageSize"
                       @current-change="getList" :hide-on-single-page="hideSingle">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
/*
* Description messageManage
* Created By admin
* Created At 2019/9/18 13:55
*/
import {
  addMessageManage,
  deleteMessageManage,
  editMessageManage,
  getMessageManageDataList,
  messageDetail
} from '@/api/configManage/messageManage'
import SelectRegion from '@/components/SelectRegion/index'
import AddOrUpdateDialog from './AddOrUpdateDialog'

export default {
  name: 'messageManage',
  components: { AddOrUpdateDialog, SelectRegion },
  props: {},
  data () {
    return {
      total: 0,
      hideSingle: true,
      loading: false,
      visible: false,
      list: [],
      areaCode: '000000',
      form: {
        serverId: '',
        regional: '',
        serverName: '',
        serverAddress: '',
        serverPort: '',
        slaveServerName: '',
        slaveServerAddress: '',
        slaveServerPort: ''
      },
      userInfo: {},
      addUser: {},
      listQuery: {
        baseAreaId: '',
        serverName: '',
        isPaging: true,
        pageNum: 1,
        pageSize: 20
      },
      dialogTitle: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList (newVal) {
      this.loading = true
      if (newVal) {
        this.listQuery.pageNum = newVal
      }
      try {
        const result = await getMessageManageDataList(this.listQuery)
        this.list = result.list
        this.total = result.total
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
      // this.form = {
      //   serverId: '',
      //   baseAreaId: 0,
      //   serverName: '',
      //   serverAddress: '',
      //   serverPort: '',
      //   slaveServerName: '',
      //   slaveServerAddress: '',
      //   slaveServerPort: ''
      // }
      this.form = {}
      this.visible = true
    },
    async edit (serverId) {
      this.form.serverId = serverId
      this.dialogTitle = '编辑服务器'
      try {
        const result = await messageDetail(serverId)
        this.form = result
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      this.visible = true
    },
    async confirmAddOrEdit (form) {
      debugger
      const param = { ...form, baseAreaId: form.baseAreaId, serverName: form.serverName, type: form.type, serverParam: form.serverParam, serverId: form.serverId }
      try {
        if (form.id) {
          const result = await editMessageManage(param)
          console.log(result)
        } else {
          const result = await addMessageManage(param)
          console.log(result)
        }
        this.visible = false
        this.getList()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    async del (id) {
      try {
        const result = await deleteMessageManage(id)
        console.log(result)
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    change (val) {
      console.log(val)
    },
  }
}
</script>

<style scoped lang="scss">
  .messageManage {
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

  label > .el-form-item__label {
    width: 200px;
    height: 72px;
  }
</style>
