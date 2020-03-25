<template>
  <div class="editDialog">
    <el-dialog
      width="570px"
      title="新增区域学期"
      :before-close="close"
      :visible.sync="visibleDialog">
      <el-form ref="form" class="ruleForm" :rules="rules" :model="formData" label-width="120px">
        <el-form-item label="区域：" prop="areaId">
          <select-region :value.sync="formData.areaId" aria-placeholder="请输入行政区"></select-region>
        </el-form-item>
        <el-form-item label="状态：" prop="useFlag">
          <el-radio v-model="formData.useFlag" label='Y'>开启</el-radio>
          <el-radio v-model="formData.useFlag" label='N'>关闭</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="mini" round @click="close">取 消</el-button>
        <el-button type="primary" size="mini" round @click="confirm">确 定</el-button>
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
import SelectRegion from '@/components/SelectRegion/index'

export default {
  name: 'editDialog',
  props: ['visible'],
  components: { SelectRegion },
  data () {
    return {
      formData: {
        areaId: '',
        useFlag: 'Y'
      },
      rules: {
        areaId: { required: true, message: '请选择区域', trigger: 'change' },
        useFlag: { required: true, message: '请选择状态', trigger: 'change' }
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
          this.$emit('click', this.formData) // 父级向子级传值
        } else {
          return false
        }
      })
    }
  },
}
</script>

<style scoped lang="scss"></style>
