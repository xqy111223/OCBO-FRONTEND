<template>
  <div class="AddOrUpdateDialog">
    <el-dialog
      width="573px"
      :title="dialogTitle"
      :visible.sync="visibleDialog">
      <el-form ref="form" :model="form" label-width="170px" class="demo-ruleForm">
        <el-form-item label="行政区：">
          <select-region :value.sync="form.baseAreaId"></select-region>
        </el-form-item>
        <el-form-item label="服务器名称：">
          <el-input v-model="form.serverName" size="round"></el-input>
        </el-form-item>
        <el-form-item label="COCO服务器地址：">
          <el-input v-model="form.serverAddress" size="round"></el-input>
        </el-form-item>
        <el-form-item label="COCO服务器端口：">
          <el-input v-model="form.serverPort" size="round"></el-input>
        </el-form-item>
        <el-form-item label="备用服务器名称：">
          <el-input v-model="form.slaveServerName" size="round"></el-input>
        </el-form-item>
        <el-form-item label="备用COCO服务器地址：">
          <el-input v-model="form.slaveServerAddress" size="round"></el-input>
        </el-form-item>
        <el-form-item label="备用COCO服务器端口：">
          <el-input v-model="form.slaveServerPort" size="round"></el-input>
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
import SelectRegion from '@/components/SelectRegion/index'

export default {
  name: 'AddOrUpdateDialog',
  components: { SelectRegion },
  props: ['formData', 'serverId', 'dialogTitle', 'visible'],
  data () {
    return {
      form: this.formData
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
    formData (newVal, oldVal) {
      this.updateForm()
    }
  },
  mounted () {
    this.updateForm()
  },
  methods: {
    updateForm () {
      this.form = this.formData
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
  .AddOrUpdateDialog {
  }
</style>
