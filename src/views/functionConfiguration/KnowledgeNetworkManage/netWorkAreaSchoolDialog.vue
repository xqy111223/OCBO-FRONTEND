<template>
  <div class="netWorkAreaSchoolDialog">
    <el-dialog
      width="460px"
      title="配置知识网络"
      :visible.sync="isVisible"
      :before-close="cancel">
      <p class="color-disable font-small">注： 请选择区域或者学校</p>
      <el-form :model="ruleForm" ref="ruleForm" :inline="true" :show-message="false">
        <el-form-item label="区域：">
          <select-region :area-id="ruleForm.baseAreaId" :value.sync="ruleForm.baseAreaId" :filterable="true"></select-region>
        </el-form-item>
        <el-form-item label="学校：">
          <school-selector :areaId="ruleForm.baseAreaId" :value.sync="schoolData"></school-selector>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" round @click="cancel">取 消</el-button>
          <el-button type="primary" size="mini" round @click="confirm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
 * Description netWorkAreaSchoolDialog 配置知识网络前选择区域学校的弹框
 * Created By Administrator
 * Created At 2019/11/17 15:22
 */
import SchoolSelector from '@/components/SchoolSelector/index'
import SelectRegion from '@/components/SelectRegion/index.vue'

export default {
  name: 'NetworkAreaSchoolDialog',
  props: {
    visible: {
      type: Boolean
    }
  },
  components: { SchoolSelector, SelectRegion },
  data () {
    return {
      schoolData: { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      },
      ruleForm: {
        baseAreaId: null,
      },
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
    }
  },
  methods: {
    cancel () {
      this.$emit('update:visible', false)
    },
    confirm () {
      const obj = { ...this.ruleForm, ...this.schoolData }
      if (obj.baseAreaId !== '' && obj.baseAreaId !== null && obj.schoolId !== '') { // 验证通过
        this.cancel()
        this.$emit('confirm', obj)
      } else {
        this.$message({
          message: '请选择区域或者学校',
          type: 'error'
        })
        return false
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .netWorkAreaSchoolDialog {
  }
</style>
