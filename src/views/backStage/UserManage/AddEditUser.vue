<template>
  <div class="module-edit-user">
    <!--编辑用户-->
    <el-dialog
      width="597px"
      :close-on-click-modal="false"
      :title="dialogType === 'edit' ? '编辑用户': '新增用户'"
      :visible="visible"
      :before-close="cancel">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="用户名：" prop="loginName">
          <el-input v-model="ruleForm.loginName" size="round" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd">
          <el-input v-model="ruleForm.pwd" size="round" placeholder="请输入密码"></el-input>
          <el-button size="mini" class="ml10" type="custom" round @click="createPass">随机密码</el-button>
        </el-form-item>
        <el-form-item label="姓名：" prop="userName">
          <el-input v-model="ruleForm.userName" size="round" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="type">
          <el-checkbox-group v-model="ruleForm.checkedType" class="role-type-box">
            <el-checkbox v-for="option in roleOptions" :key="option.adminRoleId" :label="option.adminRoleId">{{option.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态：" v-if="dialogType==='edit'">
          <el-radio v-model="ruleForm.status" label="1">开启</el-radio>
          <el-radio v-model="ruleForm.status" label="0">关闭</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="mini" round @click="cancel">取 消</el-button>
        <el-button type="primary" size="mini" round @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
 * Description EditUser
 * Created By Administrator
 * Created At 2019/9/26 15:14
 */
import * as utils from '@/utils'
import * as validate from '@/utils/validate'

export default {
  name: 'EditUser',
  props: {
    visible: { // 控制弹框显示
      type: Boolean,
      default: false
    },
    dialogType: { // 为edit是编辑，否则为新增
      type: String
    },
    userDetail: { // 用户数据
      type: Object
    },
    roleOptions: {
      type: Array
    }
  },
  data () {
    const checkUserName = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入用户名'))
      } else {
        // if (!validate.checkUserName(value)) {
        //   return callback(new Error('用户名格式不正确'))
        // }
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (this.dialogType === 'edit') { // 编辑用户不校验密码
        callback()
      } else {
        if (value === '' || value === undefined) {
          callback(new Error('请输入密码'))
        } else {
          if (!validate.checkPassword(value)) {
            return callback(new Error('密码格式不正确'))
          }
          callback()
        }
      }
    }
    const checkName = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入姓名'))
      } else {
        // if (!validate.checkName(value)) {
        //   return callback(new Error('姓名格式不正确'))
        // }
        callback()
      }
    }
    return {
      confirmUserData: {}, // 保存的用户数据
      ruleForm: { // 表单字段
        userName: '', // 用户姓名
        pwd: '',
        loginName: '', // 用户名
        status: '0',
        checkedType: []
      },
      rules: { // 校验规则
        loginName: [
          { validator: checkUserName, required: true, trigger: 'blur' },
        ],
        pwd: [
          { validator: checkPassword, required: true, trigger: ['blur', 'change'] },
        ],
        userName: [
          { validator: checkName, required: true, trigger: 'blur' },
        ],
        type: [
          {
            type: 'array'
          }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
    this.handleUserData()
  },
  methods: {
    /**
     * 处理用户数据
     */
    handleUserData () {
      const roleIds = this.userDetail.roleIds
      this.ruleForm.loginName = this.userDetail.loginName
      this.ruleForm.pwd = this.userDetail.password
      this.ruleForm.userName = this.userDetail.userName
      if (this.dialogType === 'edit') { // 编辑用户
        this.ruleForm.status = this.userDetail.status === undefined ? '0' : this.userDetail.status.toString()
        this.ruleForm.checkedType = roleIds || []
      } else { // 新增用户
        this.ruleForm.checkedType = []
      }
    },
    /**
     * 取消编辑
     */
    cancel () {
      this.$emit('update:visible', false)
    },
    /**
     * 确认编辑
     * @param ruleForm 表单数据
     */
    confirm () {
      this.$refs.ruleForm.validate((valid) => { // 验证
        if (valid) { // 验证通过
          if (!this.ruleForm.checkedType.length) {
            this.$message({
              message: '请先选择角色',
              type: 'warning'
            })
            return
          }
          this.$emit('saveUser', this.ruleForm)
        } else {
          return false
        }
      })
    },
    /**
     *   @description: 创建随机密码
     */
    createPass () {
      this.ruleForm.pwd = utils.randomPassword()
    },
  },
  watch: {
    /**
     * 监听用户数据的变化
     * @param newVal
     * @param oldVal
     */
    userDetail (newVal, oldVal) {
      this.handleUserData()
    },
    dialogType (val) {
      if (val === 'edit') {
        this.rules.pwd[0].required = false
      } else {
        this.rules.pwd[0].required = true
      }
    }
  },
}
</script>

<style scoped lang="scss">
  .module-edit-user {
    .ml10 {
      margin-left: 10px;
    }

    .align-center {
      text-align: center;
    }

    .role-type-box {
      border: 1px dashed #c6cfde;
      width: 452px;
      height: 150px;
      box-sizing: border-box;
      padding-top: 20px;
      padding-left: 20px;
      overflow: auto;
    }
  }
</style>
