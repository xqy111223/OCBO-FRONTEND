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
<!--          <select-region :area-id="form.baseAreaId" :value.sync="form.baseAreaId" :areaCode="areaCode" :filterable="true"></select-region>-->
          <select-region :value.sync="form.baseAreaId"></select-region>
        </el-form-item>
        <el-form-item label="类型：" prop="type">
          <el-radio-group  v-model="form.type" @change="chooseType">
            <el-radio label="CODYY">阔地</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="this.showField" class="mb22" label="服务器地址：" prop="serverAddress">
          <el-input class="mb18" v-model="param1.paramValue" size="round"></el-input>
        </el-form-item>
        <el-form-item v-if="this.showField" label="https地址：" prop="httpsAddress">
          <el-input class="mb18" v-model="param2.paramValue" size="round"></el-input>
        </el-form-item>
        <el-form-item v-if="this.showField" label="客户端ID：" prop="clientId">
          <el-input class="mb18" v-model="param3.paramValue" size="round"></el-input>
        </el-form-item>
        <el-form-item v-if="this.showField" label="授权码：" prop="authorizationCode">
          <el-input class="mb18" v-model="param4.paramValue" size="round"></el-input>
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
      areaCode: '000000',
      form: this.formData,
      serverParam: [],
      showField: false,
      param1: {
        paramCode: 'server.address',
        paramValue: ''
      },
      param2: {
        paramCode: 'https.server',
        paramValue: ''
      },
      param3: {
        paramCode: 'client.id',
        paramValue: ''
      },
      param4: {
        paramCode: 'authorization.code',
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
        serverAddress: [
          { required: true, message: '请输入服务器地址', trigger: ['blur,change'] }
        ],
        httpsAddress: [
          { required: true, message: '请输入https地址', trigger: ['blur,change'] }
        ],
        clientId: [
          { required: true, message: '请输入客户端ID', trigger: ['blur,change'] }
        ],
        authorizationCode: [
          { required: true, message: '请输入授权码', trigger: ['blur,change'] }
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
  watch: {
    formData (newVal, oldVal) {
      this.updateForm()
    }
  },
  mounted () {
    this.updateForm()
  },
  methods: {
    chooseType () {
      if (this.form.type) {
        this.showField = true
      }
    },
    open () {
      if (this.dialogTitle === '编辑服务器') {
        this.param1.paramValue = Object.values(this.form.resourceParamDTOList)[0] // ES6语法直接获取对象中的value值，拿到的是value组成的数组（因为key是动态的所以只能用这种方法）
        this.param2.paramValue = Object.values(this.form.resourceParamDTOList)[2]
        this.param3.paramValue = Object.values(this.form.resourceParamDTOList)[3]
        this.param4.paramValue = Object.values(this.form.resourceParamDTOList)[1]
      }
      if (!this.form.type) {
        this.showField = false
      }
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
      this.param1.paramValue = ''
      this.param2.paramValue = ''
      this.param3.paramValue = ''
      this.param4.paramValue = ''
      this.serverParam = []
    },
    /**
     *   @description: 弹窗确认时重置form中数据
     *   @param formName form名称
     *   @returns {}
     */
    confirm (formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          this.serverParam.push(this.param1, this.param2, this.param3, this.param4)
          this.form.serverParam = this.serverParam
          _this.$emit('confirm', _this.form) // 父级向子级传值
          _this.close(formName)
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
