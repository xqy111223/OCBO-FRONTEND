<template>
  <div class="schoolUserManage">
    <div class="head mb15">
      <div class="head-item">
        <span>区域：</span>
        <select-region :value.sync="listQuery.areaId" :areaCode="areaCode" :filterable="true" clearble></select-region>
      </div>
      <div class="head-item">
        <span>所在学校：</span>
        <school-selector :area-id="queryData.areaId" :value.sync="schoolData"></school-selector>
      </div>
      <div class="head-item">
        <span>学段：</span>
        <el-input v-model.trim="listQuery.semesterId" size="round" placeholder="请输入学段"></el-input>
      </div>
      <div class="head-item">
        <span>创建时间：</span>
        <el-date-picker v-model="listQuery.createTime" type="daterange" align="right" size="round" unlink-panels range-separator="~" start-placeholder="开始日期"
                        end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="head-item">
        <span>用户名：</span>
        <el-input v-model.trim="listQuery.loginName" size="round" placeholder="请输入用户名"></el-input>
      </div>
      <div class="head-item">
        <span>姓名：</span>
        <el-input v-model.trim="listQuery.userName" size="round" placeholder="请输入姓名"></el-input>
      </div>
      <div class="head-item">
        <span>用户类型：</span>
        <el-select v-model="listQuery.roleId" size="round" placeholder="请选择用户类型" clearable>
          <el-option v-for="item in roleType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="head-item">
        <span>状态：</span>
        <el-select v-model="listQuery.status" size="round" placeholder="请选择状态" clearable>
          <el-option v-for="item in statusType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <el-button size="mini" class="ml20" round type="primary" @click="getList">查询</el-button>
    </div>
    <div class="line mb18"></div>
    <div class="middle">
      <span>共<span class="color-primary">{{ total }}</span>条数据</span>
      <el-checkbox class="ml20" @change="showDirectSchool" v-model="listQuery.isThisLevel" label="只显示直属校用户"></el-checkbox>
      <div class="middle-button">
        <el-button type="custom" @click="add()" round icon="el-icon-plus">新增用户</el-button>
        <el-button type="custom" @click="visible5 = true" round v-auth:school-user-batch-add>批量新增</el-button>
        <el-button type="custom" @click="exp()" round v-auth:school-user-export>导出</el-button>
      </div>
    </div>
    <div class="main">
      <el-table
        :data="list"
        v-loading="loading"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default">
        <el-table-column :show-overflow-tooltip="true" prop="loginName" label="用户名"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime|date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="areaPath" label="区域"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="baseSchoolName" label="所在学校"></el-table-column>
        <el-table-column prop="section" label="学段">
          <template slot-scope="scope">
            <span>{{ getDetailedInfo(scope.row.semesterInfo,'section') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userType" label="用户类型">
          <template slot-scope="scope">
            <span>{{ getStatusCode(scope.row.adminUserType, roleType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span class="status-point" :class="{ isActive : scope.row.status }"></span>
            <span>{{ getStatusCode(scope.row.status, statusType) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <a type="btn" @click="view(scope.row.baseUserId)">查看</a>
            <a type="btn" @click="edit(scope.row.baseUserId)">编辑</a>
            <a type="btn" @click="del(scope.row.baseUserId)" color="danger" v-if="scope.row.adminUserType!==1">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <add-or-update-or-view-dialog
        @confirm="confirmAdd"
        :getStatus="getStatusCode"
        :userId="userInfo.userIds"
        :userInfo="userInfo"
        :dialogType="type"
        :roleType="roleType"
        :statusType="statusType"
        :visible.sync="visible"
        :school-data="schoolData"
        :random="randomPassword"
        :dialog-title="dialogTitle"
        ref="addDialog">
      </add-or-update-or-view-dialog>
      <!--      批量新增-->
      <el-dialog
        width="30%"
        :visible.sync="batchAddVisible"
        title="批量新增">
        <ul>
          <li>
            <span>1、请先下载模板，录入数据后导入：</span>
            <el-button type="custom" @click="download()" round>下载模板</el-button>
          </li>
          <li>
            <span>2、查询行政区划代码：</span>
            <el-button type="custom" @click="searchRegional()" round>查询</el-button>
          </li>
          <li>
            <span>3、Excel导入：</span>
            <el-button type="custom" @click="imp()" round>导入</el-button>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" round @click="visible5 = false">取 消</el-button>
          <el-button type="primary" size="mini" round @click="visible5 = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, jumper" :pager-count="5" :total="total"
                     :current-page="listQuery.pageNum" :page-size="listQuery.pageSize"
                     @current-change="getList" :hide-on-single-page="hideSingle">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  addUser,
  deleteUser,
  downloadTemplate,
  editUser,
  exportExcel,
  getSchoolDataList,
  importExcel,
  searchRegionalCode,
  viewUserInfo
} from '@/api/fontStage/schoolUserManage'
import AddOrUpdateOrViewDialog from './AddOrUpdateOrViewDialog'
import SelectRegion from '@/components/SelectRegion/index'
import SchoolSelector from '@/components/SchoolSelector/index'
import * as utils from '@/utils'
import dayjs from 'dayjs'

export default {
  name: 'schoolUserManage',
  components: { AddOrUpdateOrViewDialog, SelectRegion, SchoolSelector },
  data () {
    return {
      total: 0, // 总数据数
      hideSingle: true,
      areaCode: '000000',
      queryData: {
        areaId: null,
        courseDateMin: '', // 计划上课时间最小
        courseDateMax: '', // 计划上课时间最大
        realStartDateMax: '', // 实际上课时间最大
        realStartDateMin: '', // 实际上课时间最小
        deleteDateMin: '', // 删除时间最小
        deleteDateMax: '', // 删除时间最大
        deleteBy: '',
        videoDelete: 1, // 1：前台逻辑删
        videoExistFlag: 1, // 是否只查询有录播视频的课程 是：1
      },
      schoolData: { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      },
      roleType: [
        {
          id: 0,
          name: '普通用户'
        }, {
          id: 1,
          name: '超级管理员'
        }, {
          id: null,
          name: '全部'
        }
      ],
      statusType: [
        {
          id: 1,
          name: '开启'
        }, {
          id: 0,
          name: '关闭'
        }, {
          id: null,
          name: '全部'
        }
      ],
      visible: false,
      loading: false, // 加载遮罩
      batchAddVisible: false, // 批量新增弹窗
      list: [], // 列表数据
      userInfo: {}, // 查看用户数据
      editDialog: { // 编辑用户表单
        userName: '',
        realName: '',
        regional: '',
        school: '',
        section: '',
        userType: '',
        telephone: '',
        fix: '',
        email: '',
        remark: '',
        status: ''
      },
      addDialog: { // 新增用户表单
        userIds: '',
        userName: 'Stan',
        realName: 'mmm',
        regional: '江苏省-苏州市',
        password: '',
        telephone: '14761788888',
        school: 'dqnu',
        fix: '010-88888888',
        email: '999@qq.com',
        remark: '1'
      },
      listQuery: { // 列表请求参数
        pageNum: 1,
        isPaging: true,
        pageSize: 20,
        status: null,
        isSuperAdmin: '',
        createTime: '',
        userName: '',
        userType: 2,
        isThisLevel: 0,
        schoolId: '',
        semesterId: '',
      },
      dialogTitle: '', // 弹窗标题
      type: '',
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     *   @description: 处理需要的数据并返回
     *   @param info 需要处理的数据 type 需要获得的具体字段
     *   @returns {}
     */
    getDetailedInfo (info, type) {
      if (info) {
        let detailedInfo = ''
        const detailedInfoList = []
        info.forEach(item => {
          let itemInfo
          if (type === 'grade') {
            itemInfo = item.gradeName
          } else if (type === 'class') {
            itemInfo = item.className
          } else if (type === 'section') {
            itemInfo = item.semesterName
          } else if (type === 'headTeacher') {
            itemInfo = item.gradeName + item.className + (item.status === 0 ? '' : (item.status === 1 ? '已毕业' : '已解散'))
          } else if (type === 'subjectInfo') {
            itemInfo = item.gradeName + item.className + (item.status === 0 ? '' : (item.status === 1 ? '已毕业' : '已解散')) + '-' + item.subjectName
          }
          detailedInfoList.push(itemInfo)
        })
        if (detailedInfoList.length > 1) {
          detailedInfo = detailedInfoList.join('、')
        } else {
          detailedInfo = detailedInfoList.join('')
        }
        return detailedInfo
      } else {
        return '--'
      }
    },
    /**
     *   @description: 是否只显示直属校用户
     *   @param arguments 描述
     *   @returns {}
     */
    showDirectSchool () {
      this.listQuery.isThisLevel = this.listQuery.isThisLevel === 1 ? 0 : 1
      if (this.listQuery.isThisLevel === 1) {
        this.showMsgBox({
          message: '查询直属校数据时，请先选择区域',
          type: 'warning'
        })
        return
      }
      this.getList()
    },
    /**
     *   @description: 请求列表信息
     *   @param arguments 描述
     *   @returns {}
     */
    async getList (newVal) {
      this.listQuery.createStartTime = this.listQuery.createTime ? dayjs(this.listQuery.createStartTime[0]).valueOf() : ''
      this.listQuery.createEndTime = this.listQuery.createTime ? dayjs(this.listQuery.createEndTime[1]).valueOf() : ''
      this.loading = true
      if (newVal) {
        this.listQuery.pageNum = newVal
      }
      try {
        const result = await getSchoolDataList(this.listQuery)
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
     *   @description: 根据状态码获得对应的类型名
     *   @param state,data 状态码和类型列表
     *   @returns {result} 对应类型名
     */
    getStatusCode (state, data) {
      let result = ''
      data.forEach(v => {
        if (state === v.id) {
          result = v.name
        }
      })
      return result
    },
    /**
     *   @description: 随机八位密码
     *   @param arguments 描述
     *   @returns {}
     */
    randomPassword () {
      return utils.randomPassword()
    },
    /**
     *   @description: 方法说明
     *   @param  描述
     *   @returns {}
     */
    initUserInfo () {
      this.userInfo = {
        userIds: '',
        loginName: '',
        password: '',
        userName: '',
        areaPath: '',
        baseSchoolName: '',
        baseSchoolId: '',
        mobile: '',
        phone: '',
        email: '',
        remark: ''
      }
    },
    /**
     * 查看
     * @param userId
     * @returns {Promise<void>}
     */
    async view (userIds) {
      this.addDialog.userIds = userIds
      this.dialogTitle = '查看用户'
      this.type = 'view'
      this.visible = true
      try {
        const result = await viewUserInfo(userIds)
        this.userInfo = result.length ? { ...result[0], password: '' } : []
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     *   @description: 新增/编辑确认弹窗
     *   @param val 描述
     *   @returns {}
     */
    async confirmAdd (val) {
      const params = { ...val, userId: val.baseUserId, baseAreaId: val.areaId, userType: 2 }
      try {
        if (this.type === 'add') {
          await addUser(params)
        } else {
          await editUser(params)
        }
        this.getList()
        this.visible = false
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     *   @description: 新增用户
     *   @param arguments 描述
     *   @returns {}
     */
    add () {
      this.dialogTitle = '新增用户'
      this.type = 'add'
      this.initUserInfo()
      this.visible = true
    },
    /**
     *   @description: 编辑用户
     *   @param userId 用户ID
     *   @returns {}
     */
    async edit (userIds) {
      this.dialogTitle = '编辑用户'
      this.type = 'edit'
      try {
        const result = await viewUserInfo(userIds)
        this.userInfo = result ? { ...result[0], password: '', userIds: userIds } : []
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      this.visible = true
    },
    /**
     *   @description: 删除用户
     *   @param userIds 描述
     *   @returns {}
     */
    async deletUserInterface (userIds) {
      try {
        await deleteUser(userIds)
        this.getList()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      this.getList()
    },
    /**
     *   @description: 删除弹窗
     *   @param userId 用户ID
     *   @returns {}
     */
    async del (userIds) {
      this.showConfirmBox({
        message: '是否确定删除该资源？',
        title: '删除',
        type: 1 || 'warning',
        style: 0
      }).then(r => this.deletUserInterface(userIds)).catch(e => console.log('取消', e))
    },
    /**
     *   @description: 下载模板
     *   @param arguments 描述
     *   @returns {}
     */
    async download () {
      alert('下载模板')
      const result = await downloadTemplate
      console.log(result)
    },
    /**
     *   @description: 查询行政区代码
     *   @param arguments 描述
     *   @returns {}
     */
    async searchRegional () {
      alert('查询行政区代码')
      const result = await searchRegionalCode
      console.log(result)
    },
    /**
     *   @description: 导入模板
     *   @param arguments 描述
     *   @returns {}
     */
    async imp () {
      alert('导入模板')
      const result = await importExcel
      console.log(result)
    },
    /**
     *   @description: 导出模板
     *   @param arguments 描述
     *   @returns {}
     */
    async exp () {
      alert('导出模板')
      const result = await exportExcel
      console.log(result)
    },
    /**
     *   @description: 行政区改变时触发
     *   @param arguments 描述
     *   @returns {}
     */
    change () {},
    /**
     *   @description: 弹窗取消时重置form中的数据
     *   @param formName form名称
     *   @returns {}
     */
    close (formName) {
      this.addVisible = false
      this.$refs[formName].resetFields()
    },
    /**
     *   @description: 弹窗确认时重置form中数据
     *   @param formName form名称
     *   @returns {}
     */
    confirm (formName) {
      this.close(formName)
    },
  }
}
</script>

<style scoped lang="scss">
  .schoolUserManage {
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

    .isActive {
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

  body .el-dialog > /deep/ .el-dialog__body {
    max-height: none;
  }
</style>
