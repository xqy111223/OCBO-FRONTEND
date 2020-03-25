<template>
  <div class="streamingMediaManage">
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
          <el-option v-for="item in serverType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <el-button size="mini" class="ml20" round type="primary" @click="getList()">查询</el-button>
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
        @confirm="confirm"
        :visible.sync="visible"
        :dialog-title="dialogTitle"
        :formData="form"
        :serverId="form.serverId"
        :server-type="serverType"
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
* Description streamingMediaManage
* Created By admin
* Created At 2019/9/18 13:54
*/
import {
  addStreamingMediaManage,
  deleteStreamingMediaManage,
  editStreamingMediaManage,
  getStreamingMediaManageDataList,
  streamingMediaDetail
} from '@/api/configManage/streamingMediaManage'
import SelectRegion from '@/components/SelectRegion/index'
import AddOrUpdateDialog from './AddOrUpdateDialog'

export default {
  name: 'streamingMediaManage',
  components: { AddOrUpdateDialog, SelectRegion },
  props: {},
  data () {
    return {
      total: 0,
      hideSingle: true,
      serverType: [
        { // 状态码
          id: 'CODYY_MCU',
          name: '阔地MCU',
          field: 'rtmp.serveraddress'
        }, {
          id: 'CODYY_DMC',
          name: '阔地DMC',
          field: 'stream.address'
        }, {
          id: 'AVA',
          name: '奥威亚',
          field: 'sip.serveraddress'
        }, {
          id: 'HONGYUN',
          name: '红云',
          field: 'sip.serveraddress'
        }
      ],
      areaCode: '000000',
      loading: false,
      visible: false,
      dialogTitle: '',
      list: [],
      value4: '',
      form: {
        baseAreaId: '',
        serverName: '',
        type: false,
        serverParam: [
          // {
          //   paramCode: '1',
          //   paramValue: '2'
          // }
        ]
      },
      addUser: {}, // 添加用户
      listQuery: {
        baseAreaId: '',
        areaId: '',
        serverName: '',
        type: '',
        isPaging: true,
        pageNum: 1,
        pageSize: 20
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
        const result = await getStreamingMediaManageDataList(this.listQuery)
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
      console.log(this.form.serverId)
      try {
        const result = await streamingMediaDetail(id)
        this.form = result
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      this.dialogTitle = '编辑服务器'
      this.visible = true
    },
    async confirm (form) {
      debugger
      const param = { ...form, baseAreaId: form.baseAreaId, serverName: form.serverName, type: form.type, serverParam: form.serverParam, serverId: form.serverId }
      try {
        if (form.id) {
          const result = await editStreamingMediaManage(param)
          console.log(result)
        } else {
          const result = await addStreamingMediaManage(param)
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
      try {
        await deleteStreamingMediaManage(id)
        this.getList()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     *   @description: 删除弹窗
     *   @param userId 用户ID
     *   @returns {}
     */
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
  .streamingMediaManage {
    ul li {
      list-style: none;
      margin-bottom: 20px;
    }

    .mb22 {
      margin-bottom: 22px;
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
