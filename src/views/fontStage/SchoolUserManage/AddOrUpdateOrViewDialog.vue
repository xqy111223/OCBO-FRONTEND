<template>
  <div class="addOrUpdateDialog">
    <el-dialog
      width="573px"
      :title="dialogTitle"
      :visible.sync="visibleDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名：" prop="loginName">
          <el-input v-if="dialogType!=='view'" v-model.trim="form.loginName" size="round" autocomplete="off" maxlength="30"></el-input>
          <span v-else>{{ userInfo.loginName }}</span>
        </el-form-item>
        <el-form-item v-if="dialogType!=='view'" label="密码：" prop="password">
          <el-input v-model.trim="form.password" size="round" autocomplete="off" @change="change($event)"></el-input>
          <el-button type="custom" @click="randomPassword()" round>随机密码</el-button>
        </el-form-item>
        <el-form-item label="姓名：" prop="userName">
          <el-input v-if="dialogType!=='view'" v-model.trim="form.userName" size="round" autocomplete="off" maxlength="20"></el-input>
          <span v-else>{{ userInfo.userName }}</span>
        </el-form-item>
        <!--        <el-form-item v-if="!userId" label="区域：" prop="areaPath">-->
        <!--          <select-region v-if="dialogType=='add'" :value.sync="form.areaId" clearble></select-region>-->
        <!--          <span v-if="dialogType=='view'">{{ userInfo.areaPath }}</span>-->
        <!--        </el-form-item>-->
        <el-form-item v-if="dialogType=='view'" label="用户类型：">
          <span>{{getStatusCode(userInfo.userType,statusList)}}</span>
        </el-form-item>
        <el-form-item v-if="dialogType=='view'" label="所在学校：">
          <span>{{userInfo.baseSchoolName}}</span>
        </el-form-item>
        <el-form-item v-if="dialogType=='view'" label="学段：">
          <span>{{getStatusCode(userInfo.userType,statusList)}}</span>
        </el-form-item>
        <el-form-item v-if="!userId" label="学校名称：" prop="schoolName">
          <!--          <select-region v-if="dialogType=='add'" :value.sync="form.areaId"></select-region>-->
          <school-selector v-if="dialogType=='add'" :area-id="form.areaId" :value.sync="schoolData"></school-selector>
          <span v-if="dialogType=='view'">{{ userInfo.areaPath }}</span>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-if="dialogType!=='view'" v-model.trim="form.mobile" size="round" maxlength="11"></el-input>
          <span v-else>{{ userInfo.mobile }}</span>
        </el-form-item>
        <el-form-item label="固定电话：" prop="phone">
          <el-input v-if="dialogType!=='view'" v-model.trim="form.phone" size="round"></el-input>
          <span v-else>{{ userInfo.phone }}</span>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input v-if="dialogType!=='view'" v-model.trim="form.email" size="round" maxlength="100"></el-input>
          <span v-else>{{ userInfo.email }}</span>
        </el-form-item>
        <el-form-item v-if="!userId" label="备注：">
          <el-input v-if="dialogType!=='view'" v-model.trim="form.remark" size="round"></el-input>
          <span v-else>{{ userInfo.remark }}</span>
        </el-form-item>
        <el-form-item v-if="userId" label="状态：">
          <el-radio-group v-if="dialogType!=='view'" v-model="form.status">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
          <span v-if="dialogType=='view'">{{userInfo.status==0?'关闭':'开启'}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" round @click="close('form')">取 消</el-button>
          <el-button type="primary" size="mini" round @click="confirm('form')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description AddOrUpdateDialog
* Created By codyy
* Created At 2019/10/14 14:52
*/
// import SelectRegion from '@/components/SelectRegion/index'
import SchoolSelector from '@/components/SchoolSelector/index'
import * as validate from '@/utils/validate'
import * as utils from '@/utils'

export default {
  name: 'AddOrUpdateDialog',
  components: { SchoolSelector },
  props: ['userId', 'visible', 'dialogTitle', 'random', 'userInfo', 'dialogType', 'getStatus'],
  data () {
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
        }
        callback()
      }
    }
    const checkLandLine = (rule, value, callback) => {
      if (value === '' || value === undefined || value === null) {
        callback()
      } else {
        if (!validate.checkLandLine(value)) {
          return callback(new Error('座机号格式不正确'))
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
      schoolData: {},
      rules: { // 校验规则
        loginName: [
          { min: 5, max: 30, message: '用户名需要是5到30个英文字符', trigger: 'blur' },
          { required: true, validator: checkUserName, trigger: 'blur' }
        ],
        password: [
          { min: 8, max: 18, message: '密码需要是8到18个英文字符', trigger: ['blur', 'change'] },
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
        ],
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        // regional: [
        //   { required: true, message: '请选择区域', trigger: 'blur' },
        // ],
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
      form: {},
      statusList: [{
        id: '',
        name: '全部'
      }, {
        id: 0,
        name: '普通用户'
      }, {
        id: 1,
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
    }
  },
  watch: {
    userInfo (newVal) {
      this.form = newVal
    }
  },
  methods: {
    change (e) {
      this.forceUpdate()
    },
    /**
     *   @description: 弹窗取消时重置form中的数据
     *   @param formName form名称
     *   @returns {}
     */
    close (formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:visible', false) // 双向绑定
    },
    /**
     *   @description: 弹窗确认时重置form中数据
     *   @param formName form名称
     *   @returns {}
     */
    confirm (formName) {
      if (this.dialogType === 'add') {
        this.form.status = 1
      }
      this.form = { ...this.form, baseSchoolId: this.schoolData.schoolId }
      console.log(this.form, 'commit')
      if (this.dialogType !== 'view') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('confirm', this.form) // 父级向子级传值
            // _this.close(formName)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    /**
     *   @description: 随机密码
     *   @param arguments 描述
     *   @returns {}
     */
    randomPassword () {
      this.form.password = utils.randomPassword()
    },
    /**
     * 用户类型
     * @param state
     * @param data
     */
    getStatusCode (state, data) {
      this.getStatus(state, data)
    }
  }
}
</script>

<style scoped lang="scss">
  .addOrUpdateDialog {
  }
</style>
