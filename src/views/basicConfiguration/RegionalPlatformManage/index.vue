<template>
  <div class="regionalPlatformManage">
    <header>
      <div class="item">
        <label>区域：</label>
        <select-region :value.sync="formData.baseAreaId" placeholder="请选择行政区"></select-region>
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
        <el-button size="mini" type="primary" round class="ml20" @click="getList">搜索</el-button>
      </div>
      <div class="line"></div>
    </header>
    <div class="top-btns">
      <el-button size="mini" type="custom" round icon="el-icon-custom-new-add" @click="add()">开通平台</el-button>
      <el-button size="mini" type="custom" round icon="el-icon-custom-addition" @click="addBatch()">批量开通</el-button>
      <el-button size="mini" type="custom" round icon="el-icon-custom-export" @click="exportExcel()">导出</el-button>
    </div>
    <div class="tableTree">
      <table-tree :data="treeOptions.data"
                  :columns="treeOptions.columns"
                  childrenProp="children"
                  hasChildrenProp="hasChild"
                  idProp="baseAreaId"
                  min-width="1200px"
                  :isInit.sync="treeOptions.dataInit"
                  @tree-icon-click="extendTree">
        <template slot="createAt" slot-scope="scope">
          <span>{{scope.row.createAt|date}}</span>
        </template>
        <template slot="status" slot-scope="scope">
          <span :class="scope.row.status?'enable-status':'disable-status'"></span>
          <span>{{scope.row.status?'开启':'关闭'}}</span>
        </template>
        <template slot="crossDomain" slot-scope="scope">
          <span :class="scope.row.crossDomain?'enable-status':'disable-status'"></span>
          <span>{{scope.row.crossDomain?'支持':'不支持'}}</span>
        </template>
        <template slot="operation" slot-scope="scope" v-if="scope.row.basePlatformId!==null">
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
              <el-dropdown-item @click.native="serverConfig(scope.row.basePlatformId,scope.row.parentId)">服务器配置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </table-tree>
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
      :dialogInfo="platformInfo"
      :basePlatformId="serverInfo.basePlatformId"
      :visible.sync="serverInfo.visible"
      :serverInherit="serverInfo.serverInherit"
      :dialogType="serverInfo.dialogType">
    </server-dialog>
  </div>
</template>

<script>
/*
* Description regionalPlatformManage
* Created By zhuhao@codyy.com
* Created At 2019/9/18 13:01
*/
import * as utils from '@/utils'
import TableTree from '@/components/TableTree/index'
import SelectRegion from '@/components/SelectRegion/index'
import {
  addPlatform,
  editPlatform,
  getParentServerConf,
  getPlatformDetail,
  getPortalConf,
  getServerConf,
  regionalList,
  saveServerConf
} from '@/api/basicConfiguration/regionalPlatformManage'
import { getServerInitData } from '@/api/common/server'
import EditDialog from './editDialog'
import ServerDialog from './serverDialog'
import dayjs from 'dayjs'

export default {
  components: { SelectRegion, TableTree, EditDialog, ServerDialog },
  name: 'regionalPlatformManage',
  props: {},
  data () {
    return {
      serverList: [],
      platformInfo: {},
      serverInfo: {
        basePlatformId: '', // 平台id
        dialogType: '', // 是否第一级，通过判断parentId是否存在，第一级为null
        visible: false,
        serverInherit: 0 // 1继承上级配置 0自定义
      },
      dialogInfo: {
        title: '', // title
        basePlatformId: '', // 平台id
        dialogType: '',
        visible: false,
      },
      queryData: {}, // 请求参数
      formData: {
        baseAreaId: '', // 区域id
        createTime: '', // 创建时间
        status: '', // 状态
        crossDomain: '' // 跨域
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
      treeOptions: { // 树形结构
        dataInit: true,
        data: [],
        columns: [
          {
            label: '区域',
            minWidth: '140px',
            prop: 'areaName',
          },
          {
            label: '创建时间',
            type: 'template',
            template: 'createAt',
            minWidth: '140px',
          },
          {
            label: '创建人',
            minWidth: '80px',
            prop: 'createUserName',
          },
          {
            label: '管理员用户名',
            minWidth: '80px',
            prop: 'loginName',
          },
          {
            label: '管理员姓名',
            minWidth: '80px',
            prop: 'userName',
          },
          {
            label: '学段',
            minWidth: '80px',
            prop: 'semesterNames',
          },
          {
            label: '状态',
            width: '65px',
            type: 'template',
            template: 'status'
          },
          {
            label: '跨域',
            width: '80px',
            type: 'template',
            template: 'crossDomain'
          },
          {
            label: '操作',
            minWidth: '200px',
            type: 'template',
            template: 'operation',
            textAlign: 'center'
          },
        ],
      }
    }
  },
  methods: {
    /**
     * 递归循环函数
     */
    RecursiveCycle (arr) {
      const resArr = []
      let parentId = ''
      if (Array.isArray(arr) && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            arr.forEach((item, index) => {
              if (item.parentId === null) {
                resArr[i] = item
                parentId = item.baseAreaId
              }
            })
            console.log(resArr, i)
            console.log(parentId, 'parentId0')
          } else {
            // const currentData = utils.findTreeByProp(resArr, parentId, 'baseAreaId', 'children')
            // this.$set(currentData, 'children', { item: i })
            arr.forEach((item, index) => {
              // const currentData = utils.findTreeByProp(resArr, parentId, 'baseAreaId', 'children')
              if (item.parentId === parentId) {
                switch (index) {
                  case 1:
                    resArr[0].children = item
                    break
                  case 2:
                    resArr[0].children.children = item
                    break
                  case 3:
                    resArr[0].children.children.children = item
                    break
                  case 4:
                    resArr[0].children.children.children.children = item
                    break
                  case 5:
                    resArr[0].children.children.children.children.children = item
                    break
                  default:
                    resArr[0].children.children.children.children.children.children = item
                    break
                }
                parentId = item.baseAreaId
              }
            })
            console.log(resArr, i)
            console.log(parentId, 'parentId' + i)
          }
        }
      }
      console.log(resArr, 'resArr')
    },
    /**
     * @description: 列表查询
     * @param params 查询参数
     * @returns {return}
     */
    async getList () {
      const loading = this.$loading({ target: '.table-tree' })
      this.queryData = { ...this.formData, isPageing: false }
      this.queryData.createTimeStart = this.formData.createTime ? dayjs(this.formData.createTime[0]).valueOf() : ''
      this.queryData.createTimeEnd = this.formData.createTime ? dayjs(this.formData.createTime[1]).valueOf() : ''
      try {
        const result = await regionalList(this.queryData)
        this.treeOptions.data = result
        this.treeOptions.dataInit = true
        this.RecursiveCycle(result)
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      loading.close()
    },
    /**
     * 展开节点树
     * @param data
     */
    async extendTree (data) { // 参数支持 data,column,columnIndex
      // 判断是否有有子集并且没有加载过子集，且当前是非折叠状态
      if (data.hasChild && !data.children && !data._isFold) {
        // 动态加载数据（如果是一次绑定所有，无需监听此事件）
        const loading = this.$loading({ target: '.table-tree' })
        // 加载完成数据，找到对应的数据并填充子集
        const currentData = utils.findTreeByProp(this.treeOptions.data, data.baseAreaId, 'baseAreaId', 'children')
        const param = { ...this.queryData, parentId: data.baseAreaId }
        try {
          const result = await regionalList(param)
          this.$set(currentData, 'children', result)
        } catch (e) {
          this.$message({
            message: e.message,
            type: 'error'
          })
        }
        loading.close()
      }
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
    async serverConfig (id, parentId) {
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
      if (parentId) {
        this.serverInfo.dialogType = false
      } else {
        this.serverInfo.dialogType = true
      }
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
        this.platformInfo = await getPortalConf(id)
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
        this.platformInfo = { ...this.platformInfo, customize: customize, inherit: inherit }
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
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
  .regionalPlatformManage {
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
    }

    .tableTree {
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
  }
</style>
