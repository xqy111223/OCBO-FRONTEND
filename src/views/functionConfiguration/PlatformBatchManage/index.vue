<template>
  <div class="platformBatchManage">
    <el-form ref="form" class="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="区域：" prop="areaId">
        <select-region :value.sync="form.areaId" aria-placeholder="请输入行政区"></select-region>
      </el-form-item>
      <el-form-item label="范围：" prop="range">
        <el-radio v-model="form.range" label="0">全部</el-radio>
        <el-radio v-model="form.range" label="1">仅区域</el-radio>
        <el-radio v-model="form.range" label="2">仅学校</el-radio>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-radio v-model="form.status" label="1">开启</el-radio>
        <el-radio v-model="form.status" label="0">关闭</el-radio>
      </el-form-item>
      <el-button size="mini" type="primary" round @click="set_batch">批量配置</el-button>
    </el-form>
  </div>
</template>

<script>
/*
* Description platformBatchManage
* Created By admin
* Created At 2019/9/18 13:31
*/
import SelectRegion from '@/components/SelectRegion/index'
import { platBatchSetting } from '@/api/functionConfiguration/platformBatchManage'

export default {
  components: { SelectRegion },
  name: 'platformBatchManage',
  props: {},
  data () {
    return {
      form: {
        areaId: '',
        range: '0',
        status: '1'
      },
      rules: {
        areaId: { required: true, message: '请输入行政区', trigger: 'change' }
      }
    }
  },
  methods: {
    /**
     * 批量配置
     */
    set_batch () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    /**
     * 保存
     * @returns {Promise<void>}
     */
    async save () {
      const params = {
        areaId: this.form.areaId,
        configList: [
          {
            configCode: 'range',
            configVal: this.form.range
          }, {
            configCode: 'status',
            configVal: this.form.status
          }
        ]
      }
      await platBatchSetting(params)
      this.$message({
        message: '配置成功',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .platformBatchManage {
  }
</style>
