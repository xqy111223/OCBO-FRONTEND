<template>
  <div class="serverDialog">
    <el-dialog
      width="500px"
      :before-close="cancel"
      title="服务器配置"
      :visible.sync="visibleDialog">
      <el-form ref="form" :model="formData" label-width="140px" class="demo-ruleForm">
        <el-form-item label="配置方式：" label-width="82px" v-if="!dialogType">
          <el-radio-group v-model="isInherit" @change="changeInherit">
            <el-radio :label='1'>采用上级配置</el-radio>
            <el-radio :label='0'>自定义配置</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="isInherit">
          <div class="tips el-icon-custom-tips">若上级未配置服务器，则会影响到前台功能</div>
          <el-form-item label="流媒体服务器：">
            <span>{{inherit.serverConfigs&&inherit.serverConfigs[0].serverName?inherit.serverConfigs[0].serverName:'暂无'}}</span>
          </el-form-item>
          <el-form-item label="消息服务器：">
            <span>{{inherit.serverConfigs&&inherit.serverConfigs[1].serverName?inherit.serverConfigs[1].serverName:'暂无'}}</span>
          </el-form-item>
          <el-form-item label="区域资源服务器：">
            <span>{{inherit.serverConfigs&&inherit.serverConfigs[2].serverName?inherit.serverConfigs[2].serverName:'暂无'}}</span>
          </el-form-item>
        </div>
        <div v-if="!isInherit">
          <el-form-item label="流媒体服务器：" :rules="{required: true, message: '流媒体服务器不能为空', trigger: 'change'}" prop="serverId1">
            <el-select v-model="formData.serverId1" size="round" placeholder="请选择" v-if="serverList&&serverList.length">
              <el-option
                v-for="item in serverList[0].list"
                :key="item.id"
                :label="item.serverName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消息服务器：">
            <el-select v-model="formData.serverId2" size="round" placeholder="请选择" v-if="serverList&&serverList.length">
              <el-option
                v-for="item in serverList[1].list"
                :key="item.id"
                :label="item.serverName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域资源服务器：" :rules="{required: true, message: '区域资源服务器不能为空', trigger: 'change'}" prop="serverId3">
            <el-select v-model="formData.serverId3" size="round" placeholder="请选择" v-if="serverList&&serverList.length">
              <el-option
                v-for="item in serverList[2].list"
                :key="item.id"
                :label="item.serverName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="20px">
            <el-checkbox v-model="formData.crossDomain" label="是否支持跨域"></el-checkbox>
          </el-form-item>
        </div>
        <div v-if="formData.crossDomain&&isInherit">
          <div class="title">
            <div class="titleName"><i></i><span>跨域服务器</span></div>
          </div>
          <div class="crossDomain">
            <div>
              <el-form-item label="流媒体服务器：">
                <span>{{inherit.crossDomainServerConfigs&&inherit.crossDomainServerConfigs[0].serverName?inherit.crossDomainServerConfigs[0].serverName:'暂无'}}</span>
              </el-form-item>
              <el-form-item label="消息服务器：">
                <span>{{inherit.crossDomainServerConfigs&&inherit.crossDomainServerConfigs[1].serverName?inherit.crossDomainServerConfigs[1].serverName:'暂无'}}</span>
              </el-form-item>
              <el-form-item label="区域资源服务器：">
                <span>{{inherit.crossDomainServerConfigs&&inherit.crossDomainServerConfigs[2].serverName?inherit.crossDomainServerConfigs[2].serverName:'暂无'}}</span>
              </el-form-item>
            </div>
          </div>
        </div>
        <div v-if="formData.crossDomain&&isInherit!==1">
          <div class="title">
            <div class="titleName"><i></i><span>跨域服务器</span></div>
          </div>
          <div class="crossDomain">
            <div>
              <el-form-item label="流媒体服务器：" :rules="{required: true, message: '流媒体服务器不能为空', trigger: 'change'}" prop="serverId4">
                <el-select v-model="formData.serverId4" size="round" placeholder="请选择" v-if="serverList&&serverList.length">
                  <el-option
                    v-for="item in serverList[0].list"
                    :key="item.id"
                    :label="item.serverName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="消息服务器：">
                <el-select v-model="formData.serverId5" size="round" placeholder="请选择" v-if="serverList&&serverList.length">
                  <el-option
                    v-for="item in serverList[1].list"
                    :key="item.id"
                    :label="item.serverName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="区域资源服务器：" :rules="{required: true, message: '区域资源服务器不能为空', trigger: 'change'}" prop="serverId6">
                <el-select v-model="formData.serverId6" size="round" placeholder="请选择" v-if="serverList&&serverList.length">
                  <el-option
                    v-for="item in serverList[2].list"
                    :key="item.id"
                    :label="item.serverName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" round @click="cancel('form')">取 消</el-button>
          <el-button type="primary" size="mini" round @click="confirm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description AddorUpdateDialog
* Created By codyy
* Created At 2019/10/12 10:16
*/

export default {
  name: 'AddOrUpdateDialog',
  props: ['basePlatformId', 'visible', 'dialogType', 'dialogInfo', 'serverList', 'serverInherit'],
  data () {
    return {
      serverList1: [{ list: '' }, { list: '' }, { list: '' }],
      isInherit: '',
      formData: {
        serverId1: '',
        serverId2: '',
        serverId3: '',
        serverId4: '',
        serverId5: '',
        serverId6: '',
      },
      customize: {
        serverConfigs: [],
        crossDomainServerConfigs: []
      },
      inherit: {
        serverConfigs: [],
        crossDomainServerConfigs: []
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
    cancel (formName) {
      // this.$refs.form.resetFields()
      this.$emit('update:visible', false) // 双向绑定
    },
    /**
     *   @description: 弹窗确认时重置form中数据
     *   @param formName form名称
     *   @returns {}
     */
    confirm (formName) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isInherit) {
            if (this.formData.crossDomain) {
              this.formData.crossDomain = 1
            } else {
              this.formData.crossDomain = 0
            }
            this.formData = { ...this.formData, serverConfigs: this.dialogInfo.inherit.serverConfigs, crossDomainServerConfigs: this.dialogInfo.inherit.crossDomainServerConfigs }
          } else {
            this.formData.serverConfigs[0].serverId = this.formData.serverId1
            this.formData.serverConfigs[1].serverId = this.formData.serverId2
            this.formData.serverConfigs[2].serverId = this.formData.serverId3
            this.formData.crossDomainServerConfigs[0].serverId = this.formData.serverId4
            this.formData.crossDomainServerConfigs[1].serverId = this.formData.serverId5
            this.formData.crossDomainServerConfigs[2].serverId = this.formData.serverId6
            if (this.formData.crossDomain) {
              this.formData.crossDomain = 1
            } else {
              this.formData.crossDomain = 0
              this.formData.crossDomainServerConfigs = []
            }
          }
          this.$emit('click', this.formData) // 父级向子级传值
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 处理数组
     */
    sortArr (arr) {
      // 处理arr数据,映射关系，type类型匹配
      const result = [{}, {}, {}]
      arr.length && arr.forEach(item => {
        if (item.type === 'MEDIA') {
          result[0] = item
        } else if (item.type === 'MSG') {
          result[1] = item
        } else if (item.type === 'RESOURCE') {
          result[2] = item
        }
      })
      return result
    },
    /**
     * 下拉框赋值
     */
    selectModel () {
      this.formData.serverId1 = this.formData.serverConfigs[0].serverId
      this.formData.serverId2 = this.formData.serverConfigs[1].serverId
      this.formData.serverId3 = this.formData.serverConfigs[2].serverId
      this.formData.serverId4 = this.formData.crossDomainServerConfigs[0].serverId
      this.formData.serverId5 = this.formData.crossDomainServerConfigs[1].serverId
      this.formData.serverId6 = this.formData.crossDomainServerConfigs[2].serverId
    },
    /**
     * 切换tab页
     */
    changeInherit () { // radio值直接变化，change事件之后直接处理转化后的值
      if (this.isInherit === 0) {
        this.formData = {
          ...this.formData,
          ...this.dialogInfo.customize,
          serverConfigs: this.customize.serverConfigs,
          crossDomainServerConfigs: this.customize.crossDomainServerConfigs,
          serverInherit: this.isInherit
        }
        this.selectModel()
      } else {
        this.formData = {
          ...this.formData,
          ...this.dialogInfo.inherit,
          basePlatformId: this.dialogInfo.customize.basePlatformId,
          serverConfigs: this.inherit.serverConfigs,
          crossDomainServerConfigs: this.inherit.crossDomainServerConfigs,
          serverInherit: this.isInherit
        }
      }
      if (this.formData.crossDomain) {
        this.formData.crossDomain = true
      } else {
        this.formData.crossDomain = false
      }
      // this.$refs.form.resetFields()
    }
  },
  watch: {
    /**
     * 监听用户数据的变化
     * @param newVal
     * @param oldVal
     */
    dialogInfo (newVal) {
      const configs = [{ serverId: '', type: 'MEDIA' }, { serverId: '', type: 'MSG' }, { serverId: '', type: 'RESOURCE' }]
      // 自定义配置
      if (newVal.customize.serverConfigs && newVal.customize.serverConfigs.length) {
        this.customize.serverConfigs = this.sortArr(newVal.customize.serverConfigs)
      } else {
        this.customize.serverConfigs = configs
      }
      if (newVal.customize.crossDomainServerConfigs && newVal.customize.crossDomainServerConfigs.length && newVal.customize.crossDomain) {
        this.customize.crossDomainServerConfigs = this.sortArr(newVal.customize.crossDomainServerConfigs)
      } else {
        this.customize.crossDomainServerConfigs = configs
      }
      // 上级配置配置
      if (newVal.inherit.serverConfigs && newVal.inherit.serverConfigs.length) {
        this.inherit.serverConfigs = this.sortArr(newVal.inherit.serverConfigs)
      } else {
        this.inherit.serverConfigs = configs
      }
      if (newVal.inherit.crossDomainServerConfigs && newVal.inherit.crossDomainServerConfigs.length && newVal.inherit.crossDomain) {
        this.inherit.crossDomainServerConfigs = this.sortArr(newVal.inherit.crossDomainServerConfigs)
      } else {
        this.inherit.crossDomainServerConfigs = configs
      }
      if (this.serverInherit) {
        this.isInherit = 1
        this.formData = {
          ...this.formData,
          ...newVal.inherit,
          basePlatformId: newVal.customize.basePlatformId,
          serverConfigs: this.inherit.serverConfigs,
          crossDomainServerConfigs: this.inherit.crossDomainServerConfigs,
          serverInherit: this.isInherit,
        }
      } else {
        this.isInherit = 0
        this.formData = {
          ...this.formData,
          ...newVal.customize,
          serverConfigs: this.customize.serverConfigs,
          crossDomainServerConfigs: this.customize.crossDomainServerConfigs,
          serverInherit: this.isInherit
        }
        this.selectModel()
      }
      if (this.formData.crossDomain) {
        this.formData.crossDomain = true
      } else {
        this.formData.crossDomain = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .serverDialog {
    .tips {
      color: #999;
      font-size: 12px;
      line-height: 20px;
      &::before {
        color: #2f71e6;
        font-size: 12px;
        margin-right: 5px;
      }
    }
    .title {
      margin-bottom: 20px;
      position: relative;
      .titleName {
        i {
          top: -2px;
          position: absolute;
          width: 2px;
          height: 18px;
          background-color: #347EFF;
        }
        span {
          margin-left: 10px;
        }
      }
    }
    .crossDomain {
      border: 1px dashed #999;
      padding-top: 15px;
    }
  }
</style>
