<template>
  <div class="editDialog">
    <el-dialog
      width="570px"
      :title="dialogTitle"
      :visible.sync="visibleDialog">
      <el-form ref="form" class="ruleForm" :rules="rules" :model="formDate" label-width="100px">
        <el-form-item label="学期名称：" prop="name">
          <el-input placeholder="请输入学期名称" v-model="formDate.name" maxlength="30" show-word-limit size="round"></el-input>
        </el-form-item>
        <el-form-item label="学期范围：" prop="termTime">
          <el-date-picker
            v-model="formDate.termTime"
            type="daterange"
            align="right"
            size="round"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="假期信息：" v-if="formDate.holidays.length">
          <div class="termBox" v-for="(item,index) in formDate.holidays" :key="index">
            <div class="item">
              <div class="name">
                <label>假期名称：</label>
                <el-input placeholder="请输入假期名称" maxlength="5" show-word-limit size="round" v-model="item.name"></el-input>
              </div>
              <div>
                <label>假期范围：</label>
                <el-date-picker
                  v-model="formDate.termTime"
                  type="daterange"
                  align="right"
                  size="round"
                  unlink-panels
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <div class="delItem el-icon-custom-delete"></div>
            </div>
          </div>
          <div class="addHoliday">
            <span class="el-icon-custom-add"></span>
            <span>添加假期信息</span>
          </div>
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

export default {
  name: 'editDialog',
  props: ['dialogInfo', 'visible', 'dialogTitle', 'editType', 'save'],
  data () {
    return {
      formDate: {
        name: '2019年第二学期',
        termTime: '',
        holidays: [
          {
            startDate: '',
            endDate: '',
            name: '1',
            sort: 1,
          }, {
            startDate: '',
            endDate: '',
            name: '2',
            sort: 2,
          }, {
            startDate: '',
            endDate: '',
            name: '3',
            sort: 3,
          }
        ]
      },
      type: this.editType,
      rules: {
        name: { required: true, message: '请输入学期名称', trigger: 'blur' },
        termTime: { required: true, message: '请输入学期范围', trigger: 'change' }
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
    .termBox {
      border: 1px dashed #ddd;
      width: 320px;
      height: 124px;
      box-sizing: border-box;
      padding: 20px;
      position: relative;
      margin-bottom: 15px;
      border-radius: 5px;
      .item {
        .name {
          margin-bottom: 10px;
        }
        .delItem {
          position: absolute;
          left: 340px;
          top: 52px;
          color: red;
          cursor: pointer;
        }
      }
    }
    .addHoliday {
      border: 1px dashed #ddd;
      width: 320px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-bottom: 15px;
      color: #347EFF;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  body .el-form-item--medium:nth-child(3) /deep/ .el-form-item__content {
    max-height: 222px;
    overflow: auto;
  }
</style>
