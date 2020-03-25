<template>
  <!--  活动统计-->
  <div class="module-activity-stastic">
    <div class="">
      <div class="head-item">
        <label class="params-label">用户信息：</label>
        <el-input v-model="queryData.username" size="round" placeholder="请输入用户信息"></el-input>
      </div>
      <div class="head-item">
        <label class="params-label">IP：</label>
        <el-input v-model="queryData.ipAddress" size="round" placeholder="请输入IP"></el-input>
      </div>
      <div class="head-item">
        <label class="params-label">地里位置：</label>
        <el-input v-model="queryData.location" size="round" placeholder="请输入地里位置"></el-input>
      </div>
      <div class="head-item">
        <label class="params-label">CDN服务器：</label>
        <el-select
          v-model="queryData.cdnServerId"
          size="round"
          placeholder="请选择CDN服务器">
          <el-option key="empty" value="请选择">请选择</el-option>
          <el-option key="all" value="全部">全部</el-option>
          <el-option v-for="item in cdnServerlList"
                     :key="item.serverId"
                     :label="item.serverName"
                     :value="item.serverId"></el-option>
        </el-select>
      </div>
      <div class="head-item">
        <label class="params-label">终端类型：</label>
        <el-select
          v-model="queryData.terminalType"
          size="round"
          placeholder="请选择终端类型">
          <el-option key="empty" value="请选择">请选择</el-option>
          <el-option key="all" value="全部">全部</el-option>
          <!--          <el-option v-for="(item) in terminalTypeList"</el-option>-->
        </el-select>
        <el-button size="mini" type="primary" round @click="query()">查询</el-button>
      </div>
      <div class="cy-driver mb15"></div>
    </div>
    <div>
      <el-row>
        <span class="font-small table-total">共<span class="color-primary">{{ listData.total }}</span>条数据</span>
        <div class="fr">
          <el-button type="custom" size="mini" round @click="kickOutActivity('multiple')" icon="el-icon-custom-addition">批量请出活动</el-button>
          <el-button type="custom" size="mini" round @click="importAct" icon="el-icon-custom-export">导出</el-button>
        </div>
      </el-row>
      <el-table
        v-loading="loading"
        :data="stasticList"
        @selection-change="handleSelectionChange"
        stripe
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        style="width: 100%">
        <el-table-column type="selection" label="全选"></el-table-column>
        <el-table-column prop="username" label="用户信息"></el-table-column>
        <el-table-column prop="ipAddress" label="IP"></el-table-column>
        <el-table-column prop="location" label="地理位置" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="firstInTime" label="首次进入时间">
          <template slot-scope="scope">
            {{scope.row.firstInTime|date('YYYY-MM-DD hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="lastOutTime" label="最后一次退出时间">
          <template slot-scope="scope">
            {{scope.row.lastOutTime|date('YYYY-MM-DD hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="观看时长/分钟">
          <template slot-scope="scope">{{scope.row.firstInTime| filterDuration(scope.row.lastOutTime)}}</template>
        </el-table-column>
        <el-table-column prop="username" label="CDN服务器"></el-table-column>
        <el-table-column prop="username" label="终端类型"></el-table-column>
        <el-table-column prop="watchDuration" label="请出次数"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <a type="btn" class="color-primary" @click="kickOutActivity('', scope.row.activityStatId)">请出活动</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, jumper" :pager-count="5" :total="listData.pageCount" :page-size="pagination.pageSize"
                     @current-change="query">
      </el-pagination>
    </div>
  </div>
</template>

<script>
/*
 * Description ActivityStastic
 * Created By Administrator
 * Created At 2019/10/29 19:12
 */
import { getCDNManageDataList } from '@/api/configManage/cdnManage'
import { getActStasticList, kickOutActivity } from '@/api/applicationManage/activityManage'

export default {
  name: 'ActivityStastic',
  props: {},
  data () {
    return {
      loading: false,
      queryData: {
        username: '',
        ipAddress: '',
        location: '',
        cdnServerId: '',
        terminalType: ''
      },
      listData: { // 请求分页规格
        total: 0, // 总数
        pageSize: 20, // 每页显示条目个数
        pageCount: 0, // 总页数
        pageNum: 1, // 当前页
        isPageing: true // 是否分页
      },
      cdnServerlList: [],
      stasticList: [], // 查询到的活动列表
      multipleSelection: [],
    }
  },
  created () {
  },
  mounted () {
    this.getCDNManageList()
    this.query()
  },
  methods: {
    async query () {
      this.loading = true
      await getActStasticList().then(response => {
        this.stasticList = response.list
        this.listData.total = response.rowCount
        this.listData.pageCount = response.pageCount
        this.loading = false
      })
    },
    /**
     * 请求cdn服务器列表
     * @returns {Promise<void>}
     */
    async getCDNManageList () {
      const params = { ...this.queryData, ...this.listData }
      await getCDNManageDataList(params).then(response => {
        this.cdnServerlList = response.list
      })
    },
    /**
     * 请出活动
     * @param actId  活动id
     * @param type 值为multiple表示为批量操作， 否则为表格内请出
     */
    kickOutActivity (type, actId) {
      const params = {}
      if (type === 'multiple') { // 批量请出
        if (this.multipleSelection.length === 0) {
          this.showMsgBox({
            message: '请选择要请出的用户！',
            type: 'info'
          })
          return
        }
        params.actvityStatId = this.multipleSelection
      } else {
        params.actvityStatId = actId
      }
      this.showConfirmBox({
        message: '是否确认将选择的用户请出活动？',
        title: '删除',
        type: 'warning',
        style: 2
      }).then(r => {
        kickOutActivity(params).then(response => {
          if (response.status === '000000000') {}
        })
      }).catch(e => {
      })
    },
    /**
     * 导出
     */
    importAct () {},
    /**
     * 监测表格中的全选触发
     * @param val 数组，选中项所有数据
     */
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.activityStatId // 遍历获取活动id
      })
    }
  },
  filters: {
    /**
     * 过滤获取观看时长分钟数
     * @param firstInTime 首次进入时间戳
     * @param lastOutTime 退出时间戳
     * @returns {*}
     */
    filterDuration (firstInTime, lastOutTime) {
      const time = lastOutTime - firstInTime
      const minutes = (time % (1000 * 60 * 60)) / (1000 * 60) // 得到分钟数
      return minutes < 10 ? ('0' + minutes) : minutes
    }
  }
}
</script>

<style scoped lang="scss">
  .mb15 {
    margin-bottom: 15px;
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
  .module-activity-stastic {
    .head-item {
      display: inline-block;
      margin-bottom: 20px;

      label:first-child {
        text-align: right;
        width: 100px;
        height: 14px;
        display: inline-block;
      }
    }
  }
</style>
