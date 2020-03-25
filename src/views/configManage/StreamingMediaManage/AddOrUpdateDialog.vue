<template>
  <div class="AddOrUpdateDialog">
    <el-dialog
      width="573px"
      :title="dialogTitle"
      @open="open()"
      @close="close('form')"
      :visible.sync="visibleDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" class="demo-ruleForm">
        <el-form-item label="服务器名称：" prop="serverName">
          <el-input v-model="form.serverName" size="round" placeholder="请输入服务器名称"></el-input>
        </el-form-item>
        <el-form-item label="区域：" prop="baseAreaId">
<!--          <select-region :value.sync="form.baseAreaId"></select-region>-->
          <select-region :value.sync="form.baseAreaId" :areaCode="areaCode" :filterable="true" clearble></select-region>
        </el-form-item>
        <el-form-item label="类型：" prop="type">
          <el-radio-group  v-model="form.type" @change="changeField">
            <el-radio v-for="item in serverType" :key="item.id" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="showField" :label="field + '：'" label-width="150" prop="paramValue">
          <el-input class="mb18" v-model="param.paramValue" size="round"></el-input>
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
  props: ['formData', 'serverId', 'dialogTitle', 'visible', 'serverType'],
  data () {
    return {
      form: this.formData,
      showField: false,
      field: '1',
      areaCode: '000000',
      serverParam: [],
      param: {
        paramCode: '',
        paramValue: ''
      },
      rules: {
        serverName: [
          { required: true, message: '请输入服务器名称', trigger: 'blur' },
        ],
        baseAreaId: [
          { required: true, message: '请选择区域', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        paramValue: [
          { required: true, message: '请输入对应的值', trigger: 'blur' }
        ]
      },
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
    open () {
      if (this.dialogTitle === '编辑服务器') {
        this.param.paramValue = Object.values(this.form.mediaParamList)[0] // ES6语法直接获取对象中的value值，拿到的是value组成的数组（因为key是动态的所以只能用这种方法）
      }
    },
    changeField () {
      this.serverParam = []
      if (this.form.type) { // 如果是编辑 直接展开字段部分
        this.showField = true
      }
      if (this.form.type === 'CODYY_MCU') { // 根据类型改变字段
        this.field = 'rtmp.serveraddress'
      } else if (this.form.type === 'CODYY_DMC') {
        this.field = 'stream.address'
      } else {
        this.field = 'sip.serveraddress'
      }
      this.param.paramCode = this.field
    },
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
      this.field = ''
      this.showField = false
      this.param = {
        paramCode: '',
        paramValue: ''
      }
    },
    /**
     *   @description: 弹窗确认时重置form中数据
     *   @param formName form名称
     *   @returns {}
     */
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.serverParam.push(this.param)
          this.form.serverParam = this.serverParam
          this.$emit('confirm', this.form) // 父级向子级传值
          this.serverParam = [] // 传递后清空
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
