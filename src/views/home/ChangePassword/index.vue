<template>
  <div class="editDialog">
    <el-dialog
      width="400px"
      title="修改密码"
      :visible.sync="visibleDialog">
      <el-form ref="form" :rules="rules" :model="formData" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="formData.oldPassword" type="password" autocomplete="off" maxlength='18' size="round"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="formData.newPassword" type="password" autocomplete="off" maxlength='18' size="round"/>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="formData.confirmPassword" type="password" autocomplete="off" maxlength='18' size="round"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" round @click="confirm">确 定</el-button>
        <el-button type="info" size="mini" round @click="close">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/*
* Description editDialog
* Created By zhuhao
* Created At 2019/10/14 14:52
*/

export default {
  name: 'ChangePassword',
  props: ['visible'],
  data () {
    return {
      formData: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        oldPassword: { required: true, message: '请输入原密码', trigger: 'blur' },
        newPassword: { required: true, message: '请输入新密码', trigger: 'blur' },
        confirmPassword: { required: true, message: '请确认新密码', trigger: 'blur' }
      }
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
    close () {
      this.$refs.form.resetFields()
      this.$emit('update:visible', false) // 双向绑定
    },
    /**
     * 确认dialog
     */
    confirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // this.save && this.save(this.formData)
          this.close()
        } else {
          return false
        }
      })
    }
  },
  watch: {
    dialogInfo (newVal) {
      this.formDate = newVal
    }
  }
}
</script>
