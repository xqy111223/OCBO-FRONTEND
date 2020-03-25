<template>
  <div class="AddOrUpdateDialog">
    <el-dialog
      width="500px"
      :before-close="cancel"
      :title="dialogTitle"
      :visible.sync="visibleDialog">
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
        <div class="title">
          <div class="titleName"><i></i><span>平台信息</span></div>
        </div>
        <div v-if="dialogType==='view'">
          <el-form-item label="学校：">
            <span>{{ formData.schoolName }}</span>
          </el-form-item>
          <el-form-item label="区域：">
            <span>{{ formData.areaNamePath }}</span>
          </el-form-item>
          <el-form-item label="学段：">
            <span>{{ formData.semesterNames }}</span>
          </el-form-item>
          <el-form-item label="域名：">
            <span>{{ formData.domain }}</span>
          </el-form-item>
          <el-form-item label="状态：">
            <span>{{formData.status===0?'关闭':'开启'}}</span>
          </el-form-item>
        </div>
        <div v-if="dialogType!=='view'">
          <el-form-item label="学校：" v-if="basePlatformId">
            <span>{{ formData.schoolName }}</span>
          </el-form-item>
          <el-form-item label="区域：" prop="baseAreaId">
            <select-region v-if="dialogType==='add'" :value.sync="formData.baseAreaId"></select-region>
            <span v-else>{{ formData.areaNamePath }}</span>
          </el-form-item>
          <el-form-item label="域名：" prop="domain">
            <el-input v-model.trim="formData.domain" size="round" autocomplete="off" maxlength="200"></el-input>
          </el-form-item>
          <el-form-item v-if="basePlatformId" label="状态：">
            <el-radio v-model="formData.status" :label='0'>关闭</el-radio>
            <el-radio v-model="formData.status" :label='1'>开启</el-radio>
          </el-form-item>
        </div>
        <div class="title">
          <div class="titleName"><i></i><span>管理员信息</span></div>
        </div>
        <div v-if="dialogType==='view'">
          <el-form-item label="用户名：">
            <span>{{ formData.loginName }}</span>
          </el-form-item>
          <el-form-item label="姓名：">
            <span>{{ formData.userName }}</span>
          </el-form-item>
          <el-form-item label="手机号：">
            <span>{{ formData.mobile }}</span>
          </el-form-item>
          <el-form-item label="固定电话：">
            <span>{{ formData.phone }}</span>
          </el-form-item>
          <el-form-item label="电子邮箱：">
            <span>{{ formData.email }}</span>
          </el-form-item>
        </div>
        <div v-if="dialogType!=='view'">
          <el-form-item label="用户名：" prop="loginName">
            <el-input v-model.trim="formData.loginName" size="round" autocomplete="off" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="userName">
            <el-input v-model.trim="formData.userName" size="round" autocomplete="off" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="pwd">
            <el-input v-model.trim="formData.pwd" size="round" autocomplete="off"></el-input>
            <el-button type="custom" @click="randomPassword" round>随机密码</el-button>
          </el-form-item>
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-if="dialogType!=='view'" v-model.trim="formData.mobile" size="round" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="固定电话：" prop="phone">
            <el-input v-if="dialogType!=='view'" v-model.trim="formData.phone" size="round"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱：" prop="email">
            <el-input v-if="dialogType!=='view'" v-model.trim="formData.email" size="round" maxlength="100"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="mini" round @click="cancel('form')">取 消</el-button>
        <el-button type="primary" size="mini" round @click="confirm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description AddorUpdateDialog
* Created By codyy
* Created At 2019/10/12 10:16
*/
import SelectRegion from '@/components/SelectRegion/index'
import * as validate from '@/utils/validate'
import * as utils from '@/utils'

export default {
  name: 'AddOrUpdateDialog',
  components: { SelectRegion },
  props: ['basePlatformId', 'visible', 'dialogTitle', 'dialogType', 'dialogInfo'],
  data () {
    const checkDomain = (rule, value, callback) => {
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入域名'))
      } else {
        if (!validate.isDomain(value)) {
          return callback(new Error('域名格式不正确！'))
        }
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (value === '' || value === undefined || value === null) {
        if (this.dialogType === 'edit') {
          callback()
        } else {
          callback(new Error('请输入密码'))
        }
      } else {
        if (!validate.checkPassword(value)) {
          return callback(new Error('密码必须包含大小写字母、数字、特殊符号,.;~!@#%^*()_+-=/'))
        }
        callback()
      }
    }
    const checkUserName = (rule, value, callback) => {
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入用户名'))
      } else {
        if (!validate.checkUserName(value)) {
          return callback(new Error('用户名只可包含字母、数字、特殊符号,.;~!@#%^*()_+-=/'))
        }
        callback()
      }
    }
    const checkPhone = (rule, value, callback) => {
      if (value === '' || value === undefined || value === null) {
        callback()
      } else {
        if (!validate.checkPhone(value)) {
          return callback(new Error('手机号格式不正确'))
        } else {
          callback()
        }
      }
    }
    const checkLandLine = (rule, value, callback) => {
      if (value === '' || value === undefined || value === null) {
        callback()
      } else {
        if (!validate.checkLandLine(value)) {
          return callback(new Error('固定电话格式不正确'))
        }
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      if (value === '' || value === undefined || value === null) {
        callback()
      } else {
        if (!validate.checkEmail(value)) {
          return callback(new Error('电子邮箱格式不正确'))
        }
        callback()
      }
    }
    return {
      rules: { // 校验规则
        baseAreaId: [
          { required: true, message: '请选择区域', trigger: 'change' },
        ],
        domain: [
          { required: true, validator: checkDomain, trigger: 'blur' },
        ],
        loginName: [
          { min: 5, max: 30, message: '用户名需要是5到30个英文字符', trigger: 'blur' },
          { required: true, validator: checkUserName, trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        pwd: [
          { min: 8, max: 18, message: '密码需要是8到18个英文字符', trigger: ['blur', 'change'] },
          { required: true, validator: checkPassword, trigger: ['blur', 'change'] },
        ],
        mobile: [
          { validator: checkPhone, trigger: 'blur' },
        ],
        phone: [
          { validator: checkLandLine, trigger: 'blur' },
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' },
        ],
      },
      formData: {},
      statusList: [{
        id: '',
        name: '全部'
      }, {
        id: '0',
        name: '普通用户'
      }, {
        id: '1',
        name: '超级管理员'
      }],
    }
  },
  computed: {
    visibleDialog: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    },
  },
  methods: {
    /**
     *   @description: 弹窗取消时重置form中的数据
     *   @param formName form名称
     *   @returns {}
     */
    cancel (formName) {
      this.dialogType !== 'view' && this.$refs.form.resetFields()
      this.$emit('update:visible', false) // 双向绑定
    },
    /**
     *   @description: 弹窗确认时重置form中数据
     *   @param formName form名称
     *   @returns {}
     */
    confirm (formName) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('click', this.formData) // 父级向子级传值
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     *   @description: 随机密码
     *   @param arguments 描述
     *   @returns {}
     */
    randomPassword () {
      const pwd = utils.randomPassword()
      this.formData = { ...this.formData, pwd: pwd }
      this.$refs.form.validate('pwd')
    },
  },
  watch: {
    /**
     * 监听用户数据的变化
     * @param newVal
     * @param oldVal
     */
    dialogInfo (newVal) {
      this.formData = newVal
      this.formData = { ...this.formData, pwd: '' }
    },
    /**
     * 根据type类型不同展示不同内容
     * @param val
     */
    dialogType (val) {
      if (val === 'edit') {
        this.rules.pwd[1].required = false
      } else if (val === 'add') {
        this.rules.pwd[1].required = true
      }
    },
  },
}
</script>

<style scoped lang="scss">
  .AddOrUpdateDialog {
    .title {
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
      position: relative;
      .titleName {
        i {
          top: -2px;
          position: absolute;
          width: 2px;
          height: 18px;
          background-color: #347EFF;
        }
        span {
          margin-left: 10px;
        }
      }
    }
    .tips {
      color: #999;
      font-size: 12px;
      line-height: 20px;
      &::before {
        color: #2f71e6;
        font-size: 15px;
        margin-right: 5px;
      }
    }
  }
</style>
