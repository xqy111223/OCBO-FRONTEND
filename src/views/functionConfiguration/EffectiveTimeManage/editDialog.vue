<template>
  <div class="editDialog">
    <el-dialog
      width="450px"
      :title="dialogTitle"
      :visible.sync="visibleDialog">
      <el-form ref="form" class="ruleForm" :rules="rules" :model="form">
        <el-form-item v-if="editType!='SYSTEM'" label="行政区：" prop="areaId" label-width="80px">
          <span v-if="editType==='AREA_EDIT'">{{form.areaPathName}}</span>
          <select-region :value.sync="form.areaId" aria-placeholder="请输入行政区" v-else></select-region>
        </el-form-item>
        <el-form-item label="有效授课/听课时长：" prop="duration" label-width="154px">
          <el-input v-model="form.duration" size="round-mini" maxlength="2" onkeyup="value=value.replace(/[^\d]/g,'') "></el-input>
          分钟
          <span class="tips">最大值60，最小值10</span>
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
  components: { SelectRegion },
  name: 'editDialog',
  props: ['dialogInfo', 'visible', 'dialogTitle', 'editType', 'save'],
  data () {
    var checkDuration = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入有效时长'))
      }
      setTimeout(() => {
        if (value < 10 || value > 60) {
          callback(new Error('时长范围为10-60'))
        } else {
          callback()
        }
      }, 300)
    }
    return {
      form: this.dialogInfo,
      type: this.editType,
      rules: {
        areaId: { required: true, message: '请输入行政区', trigger: 'change' },
        duration: { validator: checkDuration, required: true, trigger: 'blur' }
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
          const params = { ...this.form, type: this.editType }
          this.save && this.save(params)
          this.close()
        } else {
          return false
        }
      })
    }
  },
  watch: {
    dialogInfo (newVal) {
      this.form = newVal
    }
  }
}
</script>

<style scoped lang="scss">
  .editDialog {
    .tips {
      color: #999;
      font-size: 12px;
    }
  }
</style>
