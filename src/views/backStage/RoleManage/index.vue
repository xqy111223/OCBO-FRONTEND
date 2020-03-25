<template>
  <div class="module-role-manage">
    <div class="middle clearfix">
      <span class="table-pager mt18">{{ total }}</span>
      <el-button type="custom" size="mini" round class="fr" icon="el-icon-custom-new-add" @click="addOrEditRole" v-auth:001-001-003>新增角色</el-button>
    </div>
    <!--    角色列表表格-->
    <div class="main">
      <el-table
        :data="roleManageList"
        v-loading="loading"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createAt" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createAt|date('YYYY-MM-DD hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人"></el-table-column>
        <el-table-column label="绑定用户数">
          <template slot-scope="scope">
            <a type="btn" @click="handleBindUser(scope.row)">{{scope.row.userCount}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <a type="btn" @click="viewUser(scope.row.adminRoleId)">查看</a>
            <a type="btn" @click="addOrEditRole('edit',scope.row.adminRoleId)">编辑</a>
            <a type="btn" @click="deleteUser(scope.row.adminRoleId, scope.row.userCount)" color="danger">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页-->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, jumper" :pager-count="5" :total="listData.total" :page-size="listData.pageSize"
                     @current-change="getRoleListData" :hide-on-single-page="hideSingle">
      </el-pagination>
    </div>
    <!--    查看角色弹窗-->
    <view-role :visible.sync="visible" :roleDetailData="roleDetailData"></view-role>
  </div>
</template>

<script>
import ViewRole from './ViewRole'
import { deleteRole, getRoleDetail, getRoleListData } from '@/api/backStage/roleManage'

export default {
  name: 'RoleManage',
  components: {
    ViewRole
  },
  data () {
    return {
      hasUserMangeAuth: true, // 有用户管理权限 只要有当前页面出现就说明有角色管理权限=>后端乐忱
      hideSingle: true, // 隐藏一页
      loading: false, // 加载遮罩
      roleManageList: [], // 角色列表
      total: 0, // 角色列表总条数
      visible: false, // 弹框是否可见状态
      roleDetailData: {}, // 角色详情数据,
      queryData: {}, // 查询列表请求参数
      listData: { // 请求分页规格
        total: 0, // 总数
        pageSize: 20, // 每页显示条目个数
        pageCount: 0, // 总页数
        pageNum: 1, // 当前页
        isPaging: true // 是否分页
      },
    }
  },
  created () {
    this.getRoleListData()
  },
  mounted () {
  },
  methods: {
    add () {
      this.$router.push({ path: '/bk-se/ad-ur' })
    },
    /**
     * @description: 获取用户角色列表
     * @param  描述
     * @returns {}
     */
    async getRoleListData () {
      this.loading = true
      this.queryData = this.listData
      const result = await getRoleListData(this.queryData)
      this.roleManageList = result.list
      this.total = result.total
      this.listData.total = result.total
      this.listData.pageCount = result.pages
      this.loading = false
    },
    /**
     * 获取角色详情
     * @returns {Promise<void>}
     */
    async getRoleDetailData (roleId) {
      this.roleDetailData = await getRoleDetail(roleId)
    },
    /**
     * 查看角色
     * @param roleId 角色id
     */
    viewUser (roleId) {
      this.getRoleDetailData(roleId)
      this.visible = true
    },
    /**
     * 新增编辑角色
     * @param type edit 编辑， 不传为新增
     * @param roleId
     */
    addOrEditRole (type, roleId) {
      if (type && type === 'edit') {
        this.$router.push({
          name: 'EditUser',
          query: {
            adminRoleId: Number(roleId),
            type: 'edit'
          }
        })
      } else {
        this.$router.push({ name: 'AddUser' })
      }
    },
    /**
     * 删除角色
     * @param roleId  角色id
     * @param userCount  角色绑定用户数
     */
    deleteUser (roleId, userCount) {
      if (userCount === 0) {
        this.showConfirmBox({
          message: '是否确认删除？',
          title: '删除',
          type: 1 || 'warning',
          style: 0
        }).then(r => {
          this.deletUserInterface(roleId)
        }).catch(e => console.log('取消', e))
      } else {
        this.showConfirmBox({
          message: '已有用户绑定此角色，是否确认删除？',
          title: '删除',
          type: 1 || 'warning',
          style: 0
        }).then(r => {
          this.deletUserInterface(roleId)
        }).catch(e => console.log('取消', e))
      }
    },
    /**
     * 点击绑定用户数
     * @param roleId 角色id
     */
    async deletUserInterface (roleId) {
      const result = await deleteRole(roleId)
      if (result || result === null) {
        this.getRoleListData()
      } else {
        this.$message({
          message: '删除失败!',
          type: 'error'
        })
      }
    },
    /**
     * 点击绑定用户数
     * @param roleData 角色数据
     */
    handleBindUser (roleData) {
      if (this.hasUserMangeAuth) {
        this.$router.push({
          name: 'UserManage',
          query: {
            adminRoleId: roleData.adminRoleId,
          }
        })
      } else {
        this.$message({
          message: '您没有“用户管理”功能权限，无法跳转!',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .mt18 {
    margin-top: 18px;
  }
  .mt20 {
    margin-top: 20px;
  }

  ul {
    padding-left: 0;
  }

  ul li {
    list-style: none;
    margin-bottom: 20px;
  }

  .module-role-manage {
    .role-total {
      display: inline-block;
      margin-top: 20px;
    }

    .icon-new-add {
      font-size: 14px;
      margin-right: 7px;
    }

    .head-item-title {
      display: inline-block;
      width: 70px;
      text-align: right;
    }

    .role-auth-box {
      border: 1px dashed #c6cfde;
      margin-left: 29px;
      margin-top: 9px;
      padding: 15px 18px;
      box-sizing: border-box;
      padding-bottom: 50px;
    }
  }

  .pagination {
    margin-top: 30px;
    width: 500px;
    left: 50%;
    margin-left: -250px;
    position: relative;
  }
</style>
