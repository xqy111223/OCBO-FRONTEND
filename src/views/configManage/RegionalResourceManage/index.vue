<template>
  <div class="regionalResourceManage">
    <div class="head mb15">
      <div class="head-item">
        <span>区域：</span>
<!--        <select-region :area-id="listQuery.areaId" :value.sync="listQuery.areaId" :areaCode="areaCode" :filterable="true"></select-region>-->
        <select-region :value.sync="listQuery.baseAreaId" :areaCode="areaCode" :filterable="true" clearble></select-region>
      </div>
      <div class="head-item">
        <span>服务器：</span>
        <el-input v-model="listQuery.serverName" size="round" placeholder="请输入服务器名"></el-input>
      </div>
      <div class="head-item">
        <span>类型：</span>
        <el-select v-model="listQuery.type" size="round" placeholder="请选择类型" clearable>
          <el-option v-for="item in statusType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <el-button size="mini" class="ml20" @click="getList()" round type="primary">查询</el-button>
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
        <el-table-column :show-overflow-tooltip="true" prop="areaNamePath" label="行政区"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <a type="btn" @click="edit(scope.row.id)">编辑</a>
            <a type="btn" @click="del(scope.row.id)" color="danger">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <!--      查看弹窗-->
      <add-or-update-dialog
        @confirm="confirmAddOrEdit"
        :visible.sync="visible"
        :dialog-title="dialogTitle"
        :formData="form"
        :serverId="form.serverId"
        ref="serverInfo">
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
* Description regionalResourceManage
* Created By admin
* Created At 2019/9/18 13:55
*/
import {
  addRegionalResourceManage,
  deleteRegionalResourceManage,
  editRegionalResourceManage,
  getRegionalResourceManageDataList,
  regionalResourceDetail
} from '@/api/configManage/regionalResourceManage'
import SelectRegion from '@/components/SelectRegion/index'
import AddOrUpdateDialog from './AddOrUpdateDialog'

export default {
  name: 'regionalResourceManage',
  components: { AddOrUpdateDialog, SelectRegion },
  props: {},
  data () {
    return {
      total: 0,
      hideSingle: true,
      statusType: [
        { // 状态码
          id: 'CODYY',
          name: '阔地'
        },
      ],
      loading: false,
      visible: false,
      dialogTitle: '',
      list: [],
      value4: '',
      form: {
        baseAreaId: 0,
        serverName: '',
        type: '',
        serverParam: {
          field1: '',
          field2: ''
        }
      },
      areaCode: '000000',
      addUser: {}, // 添加用户
      listQuery: {
        baseAreaId: '',
        areaId: '',
        isPaging: true,
        pageNum: 1,
        pageSize: 20,
        serverName: '',
        type: '',
      },
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
        const result = await getRegionalResourceManageDataList(this.listQuery)
        console.log(result)
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
    // 获取状态码对应的name
    getStatusCode (state, data) {
      let result = ''
      data.map(v => {
        if (state === v.id) {
          result = v.name
        }
      })
      return result
    },
    add () {
      this.form.serverId = ''
      this.dialogTitle = '新增服务器'
      this.form = {}
      this.visible = true
    },
    async edit (id) {
      this.form.serverId = id
      this.dialogTitle = '编辑服务器'
      try {
        const result = await regionalResourceDetail(id)
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
      const param = { ...form, baseAreaId: form.baseAreaId, serverName: form.serverName, type: form.type, serverParam: form.serverParam, serverId: form.serverId }
      try {
        if (form.id) {
          const result = await editRegionalResourceManage(param)
          console.log(result)
        } else {
          const result = await addRegionalResourceManage(param)
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
    async deleteInterface (id) {
      this.form.serverId = id
      this.dialogTitle = '删除服务器'
      try {
        await deleteRegionalResourceManage(id)
        this.getList()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    async del (id) {
      this.showConfirmBox({
        message: '是否确定删除该资源？',
        title: '删除',
        type: 1 || 'warning',
        style: 0
      }).then(r => this.deleteInterface(id)).catch(e => console.log('取消', e))
    },
    change () {}
  }
}
</script>

<style scoped lang="scss">
  .regionalResourceManage {
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
