<template>
  <div class="customNameDialog">
    <el-dialog
      width="600px"
      title="编辑自定义名称"
      :visible.sync="isVisible"
      :before-close="cancel">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="106px">
        <el-form-item label="自定义名称：" prop="customName">
          <el-input v-model="ruleForm.customName" size="round" placeholder="请输入自定义名称"></el-input>
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
 * Description customNameDialog 自定义名称dialog
 * Created By Administrator
 * Created At 2019/11/19 14:58
 */
export default {
  name: 'CustomNameDialog',
  props: {
    visible: {
      type: Boolean
    },
  },
  data () {
    return {
      ruleForm: {
        customName: '',
      },
      rules: {
        customName: [{ required: true, message: '请输入自定义名称', trigger: 'blur change' }]
      }
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    },
  },
  methods: {
    cancel () {
      this.$emit('update:visible', false)
    },
    confirm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {

        } else {
          return false
        }
      })
      this.cancel()
    },
  }
}
</script>

<style scoped lang="scss">
  .customNameDialog {
  }
</style>
