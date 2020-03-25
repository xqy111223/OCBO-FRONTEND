<template>
  <div class="addOrUpdateDialog">
    <el-dialog
      width="573px"
      :title="dialogTitle"
      @close="close('form')"
      :visible.sync="visibleDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" class="demo-ruleForm">
        <el-form-item label="应用名称：" prop="applicationId">
          <el-select v-model="form.applicationId" @focus="getApp" size="round" placeholder="请选择应用名称" clearable>
            <el-option v-for="item in appList" :key="item.applicationId" :label="item.applicationName" :value="item.applicationId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号：" prop="version">
          <el-input v-model="form.version" size="round" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="功能描述：" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入内容" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="下载地址：" prop="downloadUrl">
          <el-input v-model="form.downloadUrl" type="textarea" placeholder="请输入内容" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="升级模式：" prop="upgradeInd">
          <el-radio-group v-model="form.upgradeInd">
            <el-radio :label="0">非强制升级</el-radio>
            <el-radio :label="1">强制升级</el-radio>
          </el-radio-group>
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
* Description dialog
* Created By codyy
* Created At 2020/2/20 15:26
*/
import { getAppList } from '@/api/mobileManage/ios'

export default {
  name: 'AddOrUpdateDialog',
  props: ['visible', 'dialogTitle', 'info'],
  data () {
    return {
      rules: { // 校验规则
        applicationId: [
          { required: true, message: '请选择应用', trigger: ['blur,change'] }
        ],
        version: [
          { min: 0, max: 30, message: '版本号长度在0~30之间', trigger: ['blur,change'] },
          { required: true, message: '请输入版本号', trigger: ['blur,change'] },
        ],
        description: [
          { min: 0, max: 200, message: '功能描述长度在0~200之间', trigger: ['blur,change'] },
          { required: true, message: '请输入功能描述', trigger: ['blur,change'] },
        ],
        downloadUrl: [
          { min: 0, max: 200, message: '下载地址长度在0~200之间', trigger: ['blur,change'] },
          { required: true, message: '请输入下载地址', trigger: ['blur,change'] },
        ],
        upgradeInd: [
          { required: true, message: '请选择升级模式', trigger: ['blur,change'] },
        ],
      },
      form: {},
      appList: []
    }
  },
  watch: {
    info (newVal, oldVal) {
      this.form = newVal
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
  methods: {
    /**
     *   @description: 方法说明
     *   @param  描述
     *   @returns {}
     */
    async getApp () {
      try {
        const result = await getAppList()
        this.appList = result
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     *   @description: 弹窗取消时重置form中的数据
     *   @param formName form名称
     *   @returns {}
     */
    close (formName) {
      this.form = {}
      this.$refs[formName].resetFields()
      this.$emit('update:visible', false) // 双向绑定
    },
    /**
     *   @description: 弹窗确认时重置form中数据
     *   @param formName form名称
     *   @returns {}
     */
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.form) // 父级向子级传值
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  .addOrUpdateDialog {
  }
</style>
