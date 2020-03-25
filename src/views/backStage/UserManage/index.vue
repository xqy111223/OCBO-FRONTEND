<template>
  <div class="module-user-manage">
    <div>
      <div class="head-item">
        <label class="head-item-label">用户名：</label>
        <el-input v-model="queryData.loginName" size="round" placeholder="请输入用户名"></el-input>
      </div>
      <div class="head-item">
        <label class="head-item-label">姓名：</label>
        <el-input v-model="queryData.userName" size="round" placeholder="请输入姓名"></el-input>
      </div>
      <div class="head-item">
        <label class="head-item-label">角色：</label>
        <el-select v-model="queryData.adminRoleId" @change="selectRole" size="round" placeholder="请选择或输入角色" clearable>
          <el-option v-for="item in roleOptions" :key="item.adminRoleId" :label="item.roleName" :value="item.adminRoleId"></el-option>
        </el-select>
      </div>
      <el-button size="mini" type="primary" round class="ml-20" @click="getUserList">查询</el-button>
    </div>
    <div class="cy-driver mb-15"></div>
    <div>
      <el-row class="clearfix">
        <span class="font-small role-total">共<span class="color-primary">{{ listData.total }}</span>条数据</span>
        <el-button type="custom" size="mini" round class="fr" @click="addOrEditUser" icon="el-icon-custom-new-add">新增用户
        </el-button>
      </el-row>
      <el-table
        :data="userManageList"
        v-loading="loading"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        style="width: 100%">
        >
        <el-table-column prop="loginName" label="用户名"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="createAt" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createAt|date('YYYY-MM-DD hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人"></el-table-column>
        <el-table-column prop="roleNames" label="角色"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.status?'enable-status':'disable-status'"></span>{{` ${scope.row.status?'开启':'关闭'}`}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a type="btn" @click="addOrEditUser(scope.row.adminUserId, 'edit')">编辑</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页-->
    <div class="pagination">
      <el-pagination background
                     layout="prev, pager, next, jumper"
                     :pager-count="5"
                     :total="listData.total"
                     :hide-on-single-page="hideSingle"
                     :page-size="listData.pageSize"
                     @current-change="getUserList">
      </el-pagination>
    </div>
    <add-edit-user
      :visible.sync="visible"
      :userDetail="userDetail"
      :dialogType="dialogType"
      :roleOptions="roleOptions"
      @saveUser="saveUser"></add-edit-user>
  </div>
</template>

<script>
import AddEditUser from './AddEditUser'
import { addUser, editUser, getUserDetail, getUserListData } from '@/api/backStage/userManage'
import { getRoleListData } from '@/api/backStage/roleManage'

export default {
  name: 'UserManage',
  components: {
    AddEditUser
  },
  props: {},
  data () {
    return {
      hideSingle: true,
      loading: false, // 加载遮罩
      userId: '',
      userManageList: [],
      queryData: {
        adminRoleId: null,
        loginName: '', // 输入用户名
        userName: '', // 输入姓名
      },
      listData: { // 请求分页规格
        total: 0, // 总数
        pageSize: 20, // 每页显示条目个数
        pageCount: 0, // 总页数
        pageNum: 1, // 当前页
        isPaging: true // 是否分页
      },
      rolePageData: { // 请求分页规格
        total: 0, // 总数
        pageSize: 20, // 每页显示条目个数
        pageCount: 0, // 总页数
        pageNum: 1, // 当前页
        isPaging: false // 是否分页
      },
      visible: false, // 控制新增编辑用户弹框显示
      roleOptions: [],
      userDetail: {},
      roleList: [],
      dialogType: '' // 弹框类型， edit为编辑
    }
  },
  created () {
    this.queryData.adminRoleId = this.$route.query.adminRoleId || null
    this.getRoleListData()
    this.getUserList()
  },
  methods: {
    /**
     * 获取用户列表
     * @returns {Promise<void>}
     */
    async getUserList () {
      this.loading = true
      const params = { ...this.queryData, ...this.listData }
      const result = await getUserListData(params)
      this.userManageList = result.list
      this.listData.total = result.total
      this.listData.pageCount = result.pages
      this.loading = false
    },
    /**
     * @description: 获取用户角色列表
     */
    async getRoleListData () {
      const result = await getRoleListData(this.rolePageData)
      this.roleOptions = result.list
    },
    /**
     * 获取用户信息
     */
    async getUserDetail (userId) {
      const result = await getUserDetail(userId)
      this.userDetail = result
    },
    /**
     * 新增编辑用户弹框
     * @param userId 所选用户id
     */
    addOrEditUser (userId, type) {
      this.userDetail = {}
      if (type === 'edit') { // 编辑
        this.dialogType = type
        this.getUserDetail(userId)
      } else { // 新增
        this.dialogType = ''
        const roleList = []
        this.roleOptions.forEach((item) => { // 获取角色列表数据， 组成新增需要的数据
          roleList.push({
            roleId: item.adminRoleId,
            roleName: item.roleName
          })
        })
        this.userDetail = {
          loginName: '',
          password: '',
          roles: roleList,
          userName: '',
        }
      }
      this.visible = true
      this.userId = userId
    },
    /**
     * 保存用户
     * @param userData 编辑或新增弹框得来的用户数据
     */
    async saveUser (userData) {
      const data = {
        loginName: userData.loginName,
        password: userData.password,
        userName: userData.userName,
        status: 0,
        userType: 1,
        roleIds: userData.checkedType
      }
      if (this.dialogType === 'edit') { // 编辑
        data.adminUserId = this.userId
        data.status = userData.status
        this.editUser(data)
      } else { // 新增
        this.addUser(data)
      }
    },
    /**
     * 提示信息
     * @param type
     */
    showMessage (type) {
      this.showMsgBox({
        message: '这是个提示信息，你就按照这样用就行！',
        type: type
      })
    },
    /**
     * 角色下拉框选择选择后，获取角色名称
     * @param roleName 角色名称
     */
    selectRole (roleName) {
      if (this.roleOptions.length > 0) {
        const obj = this.roleOptions.find(item => {
          return item.roleName === roleName
        })
        this.queryData.adminRoleId = obj.adminRoleId
      }
    },
    /**
     * 新增用户
     * @param data用户数据
     */
    async addUser (data) {
      try {
        const result = await addUser(data)
        if (result || result === null) {
          this.visible = false
          this.getUserList()
        }
      } catch (err) {
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      }
    },
    /**
     * 新增角色
     * * @param data用户数据
     */
    async editUser (data) {
      try {
        const result = await editUser(data)
        if (result || result === null) {
          this.visible = false
          this.getUserList()
        }
      } catch (err) {
        console.log(err)
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .module-user-manage {
    .head-item {
      display: inline-block;
      margin-bottom: 20px;

      label:first-child {
        text-align: right;
        width: 56px;
        height: 14px;
        display: inline-block;
      }
      .head-item-label {
        font-weight: normal;
      }
    }
    .role-total {
      display: inline-block;
      margin-top: 20px;
    }
    .icon-new-add {
      font-size: 14px;
      margin-right: 7px;
    }
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
    .pagination {
      margin-top: 30px;
      width: 500px;
      left: 50%;
      margin-left: -250px;
      position: relative;
    }

  }
</style>
