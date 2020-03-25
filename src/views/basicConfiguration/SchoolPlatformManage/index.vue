<template>
  <div class="schoolPlatformManage">
    <header>
      <div class="item">
        <label>区域：</label>
        <select-region :value.sync="formData.baseAreaId" placeholder="请选择行政区"></select-region>
      </div>
      <div class="item">
        <label>学校：</label>
        <el-input v-model.trim="formData.schoolName" size="round" placeholder="请输入学校名称"></el-input>
      </div>
      <div class="item">
        <label>创建时间：</label>
        <el-date-picker
          v-model="formData.createTime"
          type="daterange"
          align="right"
          size="round"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="item">
        <label>学段：</label>
        <el-select v-model="formData.semesterId" size="round" placeholder="请选择学段">
          <el-option
            v-for="item in periodList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <label>状态：</label>
        <el-select v-model="formData.status" size="round" placeholder="请选择状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <label>教室总数：</label>
        <el-input v-model.number="formData.classroomNumStart" size="round-small" placeholder="请输入范围"
                  onkeyup='this.value=this.value.replace(/[^1-9\d]/g,"")'></el-input>
        <span>--</span>
        <el-input v-model.number="formData.classroomNumEnd" size="round-small" placeholder="请输入范围"
                  onkeyup='this.value=this.value.replace(/[^\d]/g,"")'></el-input>
      </div>
      <div class="item">
        <label>跨域：</label>
        <el-select v-model="formData.crossDomain" size="round" placeholder="请选择跨域情况">
          <el-option
            v-for="item in crossDomainList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <el-button size="mini" type="primary" round class="ml20" @click="getList(1)">搜索</el-button>
      </div>
      <div class="line"></div>
    </header>
    <div class="top-btns">
      <div class="total">共<span>{{pagination.total}}</span>条数据
        <el-checkbox v-model="formData.directOnly" @change="showDirect()" class="ml20">只显示直属校</el-checkbox>
      </div>
      <el-button size="mini" type="custom" round icon="el-icon-custom-new-add" @click="add()">开通平台</el-button>
      <el-button size="mini" type="custom" round icon="el-icon-custom-addition" @click="addBatch()">批量开通</el-button>
      <el-button size="mini" type="custom" round icon="el-icon-custom-export" @click="exportExcel()">导出</el-button>
    </div>
    <div class="tableList">
      <el-table
        v-loading="loading"
        :data="tableData"
        min-width="1000px"
        style="width: 100%">
        <el-table-column prop="schoolName" label="所在学校" min-width="120px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="areaNamePath" label="行政区" min-width="120px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="semesterNames" label="学段" min-width="100px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="createAt" label="创建时间" min-width="100px" :show-overflow-tooltip="tooltip">
          <template slot-scope="scope">
            <span>{{scope.row.createAt|date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人" min-width="80px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="loginName" label="管理员用户名" min-width="120px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="userName" label="管理员姓名" min-width="120px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column label="教室总数">
          <template slot-scope="scope">
            <a type="btn" @click="handleClass(scope.row.schoolId)">{{scope.row.classroomNum}}</a>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.status?'enable-status':'disable-status'"></span>{{`${scope.row.status?'开启':'关闭'}`}}
          </template>
        </el-table-column>
        <el-table-column label="跨域">
          <template slot-scope="scope">
            <span :class="scope.row.crossDomain?'enable-status':'disable-status'"></span>{{`${scope.row.crossDomain?'支持':'不支持'}`}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300"
          header-align="center"
        >
          <template slot-scope="scope" v-if="scope.row.basePlatformId!==null">
            <el-dropdown :key="`operation_${scope.row._normalIndex}`">
              <span class="el-dropdown-link">
                平台操作 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="view(scope.row.basePlatformId)">查看</el-dropdown-item>
                <el-dropdown-item @click.native="edit(scope.row.basePlatformId)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native="del(scope.row.basePlatformId)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown :key="`setting_${scope.row._normalIndex}`">
              <span class="el-dropdown-link">
                平台配置 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="portalConfig(scope.row.basePlatformId)">门户配置</el-dropdown-item>
                <el-dropdown-item @click.native="serverConfig(scope.row.basePlatformId)">服务器配置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <a type="btn" @click="handleClass(scope.row.id)">关联学校</a>
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
    <!--新增、编辑平台  v-if="dialogInfo.visible"-->
    <edit-dialog
      @click="confirm"
      :dialogInfo="platformInfo"
      :basePlatformId="dialogInfo.basePlatformId"
      :visible.sync="dialogInfo.visible"
      :dialogType="dialogInfo.dialogType"
      :dialog-title="dialogInfo.title">
    </edit-dialog>
    <!--服务器编辑弹窗-->
    <server-dialog
      @click="confirmServer"
      :serverList="serverList"
      :dialogInfo="platformInfo1"
      :basePlatformId="serverInfo.basePlatformId"
      :visible.sync="serverInfo.visible"
      :serverInherit="serverInfo.serverInherit">
    </server-dialog>
  </div>
</template>

<script>
/*
* Description schoolPlatformManage
* Created By zhuhao
* Created At 2019/9/18 13:04
*/
import SelectRegion from '@/components/SelectRegion/index'
import { schoolList } from '@/api/basicConfiguration/schoolPlatformManage'
import { addPlatform, editPlatform, getParentServerConf, getPlatformDetail, getPortalConf, getServerConf, saveServerConf } from '@/api/basicConfiguration/regionalPlatformManage'
import { getServerInitData } from '@/api/common/server'
import EditDialog from './editDialog'
import ServerDialog from './serverDialog'
import dayjs from 'dayjs'

export default {
  components: { SelectRegion, EditDialog, ServerDialog },
  name: 'schoolPlatformManage',
  props: {},
  data () {
    return {
      serverList: [],
      platformInfo: {},
      platformInfo1: {},
      serverInfo: {
        basePlatformId: '', // 平台id
        visible: false,
        serverInherit: 0 // 1继承上级配置 0自定义
      },
      dialogInfo: {
        title: '', // title
        basePlatformId: '', // 平台id
        dialogType: '',
        visible: false,
      },
      loading: false,
      tooltip: true, // 当内容过长被隐藏时显示 tooltip
      hideSingle: true, // 隐藏一页
      formData: {
        baseAreaId: '', // 区域id
        createTime: '', // 创建时间
        baseSchoolId: '', // 学校名称
        semesterId: '', // 学段
        status: '', // 状态
        classroomNumStart: '', // 教室数开头
        classroomNumEnd: '', // 教师数结尾
        crossDomain: '', // 跨域
        directOnly: false // 只显示直属校
      },
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
        pageCount: 0,
        isPaging: true
      },
      statusList: [ // 状态list
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '开启'
        },
        {
          value: 0,
          label: '关闭'
        }
      ],
      crossDomainList: [ // 跨域情况list
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '支持'
        },
        {
          value: 0,
          label: '不支持'
        }
      ],
      periodList: [ // 学段list
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '小学'
        },
        {
          value: '2',
          label: '初中'
        },
        {
          value: '3',
          label: '高中'
        }
      ],
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
      if (this.formData.classroomNumStart > this.formData.classroomNumEnd) {
        this.$message({
          message: '请输入正确的教室总数范围！',
          type: 'warning'
        })
        return
      }
      this.loading = true
      this.pagination.pageNum = pageNum
      const queryData = { ...this.pagination, ...this.formData }
      queryData.createTimeStart = this.formData.createTime ? dayjs(this.formData.createTime[0]).valueOf() : ''
      queryData.createTimeEnd = this.formData.createTime ? dayjs(this.formData.createTime[1]).valueOf() : ''
      const result = await schoolList(queryData)
      this.tableData = result.list
      this.pagination.total = result.total
      this.loading = false
    },
    /**
     * 只显示直属校
     */
    showDirect () {
      this.directOnly = !this.directOnly
      this.getList(1)
    },
    /**
     * 删除
     */
    del (id) {
      this.showConfirmBox({
        message: [
          '删除平台时，',
          {
            text: '相关联的平台、学校、账号等信息无法恢复，',
            type: 'danger'
          },
          '请谨慎操作，是否确认删除？',
        ],
        title: '删除',
        type: 'warning',
        style: 3
      }).then(r => console.log('确定', r)).catch(e => console.log('取消', e))
    },
    /**
     * 查看
     */
    view (id) {
      this.getDetail(id)
      this.dialogInfo.title = '查看平台' // title
      this.dialogInfo.basePlatformId = id // 平台id
      this.dialogInfo.dialogType = 'view'
      this.dialogInfo.visible = true
    },
    /**
     * 编辑
     */
    edit (id) {
      this.getDetail(id)
      this.dialogInfo.title = '编辑平台' // title
      this.dialogInfo.basePlatformId = id // 平台id
      this.dialogInfo.dialogType = 'edit'
      this.dialogInfo.visible = true
    },
    /**
     * 开通平台
     */
    add () {
      this.platformInfo = {}
      this.platformInfo1 = {}
      this.dialogInfo.title = '开通平台' // title
      this.dialogInfo.basePlatformId = '' // 平台id
      this.dialogInfo.dialogType = 'add'
      this.dialogInfo.visible = true
    },
    /**
     * 门户配置
     */
    portalConfig (id) {
      this.getPortalDetail(id)
    },
    /**
     * 服务器配置
     */
    async serverConfig (id) {
      try {
        const params = {
          isPaging: false,
          pageNum: 1,
          pageSize: 20
        }
        this.serverList = await getServerInitData(params)
        console.log(this.serverList, 'serverList')
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      await this.getServerDetail(id)
      this.serverInfo.basePlatformId = id // 平台id
      this.serverInfo.visible = true
    },
    /**
     * 批量开通平台
     */
    addBatch () {
      console.log('addBatch')
    },
    /**
     * 导出
     */
    exportExcel () {
      console.log('exportExcel')
    },
    /**
     * 编辑，新增确认
     */
    async confirm (val) {
      try {
        if (this.dialogInfo.dialogType === 'add') {
          await addPlatform(val)
        } else if (this.dialogInfo.dialogType === 'edit') {
          await editPlatform(val)
        }
        this.dialogInfo.dialogType !== 'view' && this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.dialogInfo.visible = false
        await this.getList(1)
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     * 获取平台详情
     * @param id
     */
    async getDetail (id) {
      try {
        this.platformInfo = await getPlatformDetail(id)
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     * 获取门户配置详情
     * @param id
     */
    async getPortalDetail (id) {
      try {
        this.platformInfo1 = await getPortalConf(id)
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     * 获取服务器配置详情
     * @param id
     */
    async getServerDetail (id) {
      try {
        const customize = await getServerConf(id)
        const inherit = await getParentServerConf(id)
        if (customize.serverInherit) {
          this.serverInfo.serverInherit = 1
        } else {
          this.serverInfo.serverInherit = 0
        }
        this.platformInfo1 = { ...this.platformInfo1, customize: customize, inherit: inherit }
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     * 编辑服务器确认
     */
    async confirmServer (val) {
      try {
        await saveServerConf(val)
        this.serverInfo.visible = false
        await this.getList(1)
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    }
  },
  created () {
    this.getList(1)
  }
}
</script>

<style scoped lang="scss">
  .schoolPlatformManage {
    .ml20 {
      margin-left: 20px;
    }

    header {
      .line {
        border-bottom: 1px solid #e1e7f0;
        margin-top: -5px;
      }

      .item {
        display: inline-block;
        margin-bottom: 20px;

        label {
          font-weight: normal;
          text-align: right;
          width: 80px;
          display: inline-block;
        }
      }
    }

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
