<template>
  <div class="AddOrUpdateDialog">
    <el-dialog
      width="573px"
      :title="dialogTitle"
      :visible.sync="visibleDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" class="demo-ruleForm">
        <el-form-item label="服务器名称：" prop="serverName">
          <el-input v-model="form.serverName" size="round" placeholder="请输入服务器名称"></el-input>
        </el-form-item>
        <el-form-item label="推流域名：" prop="pushFlow">
          <el-input v-model="form.pushFlow" size="round" placeholder="请输入推流域名"></el-input>
        </el-form-item>
        <el-form-item label="拉流域名：" prop="pullFlow">
          <el-input v-model="form.pullFlow" size="round" placeholder="请输入拉流域名"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-radio v-model="form.type" label="1">阿里云</el-radio>
          <el-radio v-model="form.type" label="2">网宿</el-radio>
          <el-radio v-model="form.type" label="3">声网</el-radio>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item class="mb22" prop="field1" required>
          <label>字段1：</label>
          <el-input class="mb18" v-model="form.field1" size="round"></el-input>
        </el-form-item>
        <el-form-item prop="field2" required>
          <label>字段2：</label>
          <el-input class="mb18" v-model="form.field2" size="round"></el-input>
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
* Created At 2019/10/15 11:20
*/

export default {
  name: 'AddOrUpdateDialog',
  components: {},
  props: ['form', 'serverId', 'dialogTitle', 'visible'],
  data () {
    return {
      rules: {
        serverName: [
          { required: true, message: '请输入服务器名称', trigger: 'blur' },
        ],
        pushFlow: [
          { required: true, message: '请输入推流域名', trigger: 'blur' },
        ],
        pullFlow: [
          { required: true, message: '请输入拉流域名', trigger: 'blur' },
        ],
        field1: [
          { required: true, message: '请输入字段1', trigger: 'blur' },
        ],
        field2: [
          { required: true, message: '请输入字段2', trigger: 'blur' },
        ]
      },
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.form) // 父级向子级传值
          this.close(formName)
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
  .AddOrUpdateDialog {
    .mb22 {
      margin-bottom: 22px;
    }
  }
</style>
