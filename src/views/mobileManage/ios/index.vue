<template>
  <div class="ios-version">
    <div class="head mb15">
      <div class="head-item">
        <span>应用名称：</span>
        <el-select v-model="listQuery.applicationId" size="round" placeholder="请选择应用名称" @focus="getAppList" clearable>
          <el-option v-for="item in appList" :key="item.applicationId" :label="item.applicationName" :value="item.applicationId"></el-option>
        </el-select>
      </div>
      <div class="head-item">
        <span>升级模式：</span>
        <el-select v-model="listQuery.upgradeInd" size="round" placeholder="请选择升级模式" clearable>
          <el-option v-for="item in upgradeInd" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="head-item">
        <span>版本号：</span>
        <el-input v-model="listQuery.version" size="round" placeholder="请输入版本号"></el-input>
      </div>
      <el-button size="mini" class="ml20" round type="primary" @click="getList()">查询</el-button>
    </div>
    <div class="line mb18"></div>
    <div class="middle">
      <span>共<span class="color-primary">{{ total }}</span>条数据</span>
      <div class="middle-button">
        <el-button type="custom" @click="add()" round icon="el-icon-plus">新增版本</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="list" v-loading="loading" row-class-name="table-body-default" header-row-class-name="table-header-default">
        <el-table-column prop="applicationName" label="应用名称"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="version" label="版本号"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="description" label="功能描述"></el-table-column>
        <el-table-column label="升级模式">
          <template slot-scope="scope">
            {{scope.row.upgradeInd ? '强制升级' : '非强制升级'}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="downloadUrl" label="下载地址" width="500"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <a type="btn" @click="edit(scope.row.adminAppIosId)">编辑</a>
            <a type="btn" @click="del(scope.row.adminAppIosId)" color="danger">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <!--      查看弹窗-->
      <add-or-update-dialog
        @confirm="confirm"
        :visible.sync="visible"
        :dialog-title="dialogTitle"
        :info="info"
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
* Description ios-version
* Created By zhuhao@codyy.com
* Created At 2020/2/20 9:33
*/
import { addIos, deleteIos, editIos, getAppList, getIosList, iosDetail } from '@/api/mobileManage/ios'
import AddOrUpdateDialog from './AddOrUpdateDialog'

export default {
  name: 'ios-version',
  components: { AddOrUpdateDialog },
  props: {},
  data () {
    return {
      total: 0,
      visible: false,
      hideSingle: true,
      loading: false,
      dialogTitle: '',
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        isPaging: true,
        applicationId: '',
        upgradeInd: '',
        version: ''
      },
      list: [],
      appList: [],
      upgradeInd: [
        {
          id: 0,
          label: '非强制升级'
        },
        {
          id: 1,
          label: '强制升级'
        }
      ],
      info: {},
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     *   @description: 方法说明
     *   @param  描述
     *   @returns {}
     */
    async getList (newVal) {
      this.loading = true
      if (newVal) {
        this.listQuery.pageNum = newVal
      }
      try {
        const result = await getIosList(this.listQuery)
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
    /**
     *   @description: 方法说明
     *   @param  描述
     *   @returns {}
     */
    async getAppList () {
      try {
        const result = await getAppList()
        this.appList = result
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     *   @description: 方法说明
     *   @param  描述
     *   @returns {}
     */
    add () {
      this.dialogTitle = '新增版本'
      this.info = {}
      this.visible = true
    },
    /**
     *   @description: 方法说明
     *   @param  描述
     *   @returns {}
     */
    async edit (serverId) {
      this.dialogTitle = '编辑版本'
      try {
        const result = await iosDetail(serverId)
        this.info = result
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      this.visible = true
    },
    /**
     *   @description: 方法说明
     *   @param  描述
     *   @returns {}
     */
    async deleteInterface (id) {
      try {
        await deleteIos(id)
        this.getList()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    del (id) {
      this.showConfirmBox({
        message: '是否确定删除该资源？',
        title: '删除',
        type: 1 || 'warning',
        style: 0
      }).then(r => this.deleteInterface(id)).catch(e => console.log('取消', e))
    },
    /**
     *   @description: 方法说明
     *   @param  描述
     *   @returns {}
     */
    async confirm (form) {
      const param = { ...form }
      try {
        if (form.id) {
          await editIos(param)
        } else {
          await addIos(param)
        }
        this.visible = false
        this.getList()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .ios-version {
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
