<template>
  <div class="AddOrUpdateDialog">
    <el-dialog
      width="500px"
      :before-close="cancel"
      :title="dialogTitle"
      :visible.sync="visibleDialog">
      <el-form ref="form" :model="formData" :rules="rules" label-width="130px" class="demo-ruleForm">
        <div class="title">
          <div class="titleName"><i></i><span>平台信息</span></div>
        </div>
        <div class="tips el-icon-custom-tips">同一所学校内，教室名称不允许重复</div>
        <el-form-item label="教室名称：" prop="roomName">
          <el-input v-model.trim="formData.roomName" size="round" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域：" v-if="baseClassroomId">
          <span>{{ formData.areaNamePath }}</span>
        </el-form-item>
        <el-form-item label="所在学校：" prop="schoolName" v-if="!baseClassroomId">
          <school-selector :areaId="formData.baseAreaId" :value.sync="schoolData" placeholder="请输入学校名称"></school-selector>
        </el-form-item>
        <el-form-item label="所在学校：" v-if="baseClassroomId">
          <span>{{ formData.schoolName }}</span>
        </el-form-item>
        <el-form-item label="学生人数：" prop="studentNum">
          <el-input v-model.number="formData.studentNum" size="round" placeholder="人数不超过500"
                    onkeyup='this.value=this.value.replace(/[^1-9\d]/g,"")' maxLength="3"></el-input>
        </el-form-item>
        <el-form-item label-width="20px">
          <el-checkbox v-model="formData.crossDomain" label="是否支持跨域"></el-checkbox>
        </el-form-item>
        <div v-if="formData.crossDomain">
          <el-form-item label="终端信息(MCU)：">
            <div v-if="!baseClassroomId">
              <el-radio v-model="formData.mcuCreateType" :label='0'>自动创建</el-radio>
              <el-radio v-model="formData.mcuCreateType" :label='1'>手动创建</el-radio>
            </div>
            <div v-if="baseClassroomId">
              <span>{{formData.mcuCreateType===0?'自动创建':'手动创建'}}</span>
            </div>
          </el-form-item>
          <div class="crossDomain" v-if="!baseClassroomId&&formData.mcuCreateType===1">
            <el-form-item label="终端号：" prop="mcuNo">
              <el-input v-model.trim="formData.mcuNo" size="round" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="终端登录账号：" prop="mcuLoginName">
              <el-input v-model.trim="formData.mcuLoginName" size="round" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="终端登录密码：" prop="mcuLoginPassword">
              <el-input v-model.trim="formData.mcuLoginPassword" size="round" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div class="crossDomain" v-if="formData.mcuCreateType===0&&baseClassroomId">
            <el-form-item label="终端号：">
              <span>{{ formData.mcuNo }}</span>
            </el-form-item>
            <el-form-item label="终端登录账号：">
              <span>{{ formData.mcuLoginName }}</span>
            </el-form-item>
            <el-form-item label="终端登录密码：">
              <span>{{ formData.mcuLoginPassword }}</span>
            </el-form-item>
          </div>
        </div>
        <el-form-item v-if="baseClassroomId" label="状态：">
          <el-radio v-model="formData.status" :label='0'>关闭</el-radio>
          <el-radio v-model="formData.status" :label='1'>开启</el-radio>
        </el-form-item>
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
import SchoolSelector from '@/components/SchoolSelector/index'
import * as validate from '@/utils/validate'

export default {
  name: 'AddOrUpdateDialog',
  components: { SchoolSelector },
  props: ['baseClassroomId', 'visible', 'dialogTitle', 'dialogType', 'dialogInfo'],
  data () {
    const checkPassword = (rule, value, callback) => {
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入密码'))
      } else {
        if (!validate.checkPassword(value)) {
          return callback(new Error('密码必须包含大小写字母、数字、特殊符号,.;~!@#%^*()_+-=/'))
        }
        callback()
      }
    }
    const checkSchoolName = (rule, value, callback) => {
      if (this.schoolData.schoolId === '') {
        return callback(new Error('请输入所在学校'))
      }
      callback()
    }
    const checkStudentNum = (rule, value, callback) => {
      if (value === '' || value === undefined || value === null) {
        return callback(new Error('请输入学生人数'))
      } else {
        if (value > 500) {
          return callback(new Error('学生人数不能超过500'))
        }
        callback()
      }
    }
    return {
      schoolData: { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      },
      rules: { // 校验规则
        roomName: [
          { required: true, message: '请输入教室名称', trigger: 'blur' },
        ],
        schoolName: [
          { required: true, validator: checkSchoolName, trigger: 'blur' },
        ],
        studentNum: [
          { required: true, validator: checkStudentNum, trigger: 'blur' },
        ],
        mcuLoginName: [
          { required: true, message: '请输入终端登录账号', trigger: 'blur' },
        ],
        mcuLoginPassword: [
          { min: 8, max: 18, message: '密码需要是8到18个英文字符', trigger: 'blur' },
          { required: true, validator: checkPassword, trigger: 'blur' },
        ],
      },
      formData: {},
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
      this.$refs.form.resetFields()
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
          this.formData.crossDomain = this.formData.crossDomain ? 1 : 0
          this.formData = { ...this.formData, classroomName: this.formData.roomName, baseSchoolId: this.schoolData.schoolId }
          console.log(this.formData.crossDomain, 'crossDomain')
          this.$emit('click', this.formData) // 父级向子级传值
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  watch: {
    /**
     * 监听用户数据的变化
     * @param newVal
     * @param oldVal
     */
    dialogInfo (newVal) {
      console.log(newVal)
      this.formData = newVal
      this.formData.mcuCreateType = this.formData.mcuCreateType === 1 ? 1 : 0
      if (this.formData.crossDomain === 1) {
        this.formData = { ...this.formData, crossDomain: true }
      } else {
        this.formData = { ...this.formData, crossDomain: false }
      }
    }
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
    .crossDomain {
      border: 1px dashed #999;
      padding: 16px;
    }
    .tips {
      color: #999;
      font-size: 12px;
      line-height: 20px;
      margin-left: 38px;
      &::before {
        color: #2f71e6;
        font-size: 15px;
        margin-right: 5px;
      }
    }
  }
</style>
