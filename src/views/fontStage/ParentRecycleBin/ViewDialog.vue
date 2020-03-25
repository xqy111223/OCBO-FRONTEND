<template>
  <div class="AddOrUpdateDialog">
    <el-dialog
      width="573px"
      :title="dialogTitle"
      :visible.sync="visibleDialog">
      <el-form ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名：">
          <span>{{ userInfo.loginName }}</span>
        </el-form-item>
        <el-form-item label="家长姓名：">
          <span>{{ userInfo.userName }}</span>
        </el-form-item>
        <el-form-item label="区域：">
          <span>{{ userInfo.areaPath }}</span>
        </el-form-item>
        <el-form-item label="所在学校：">
          <span>{{ userInfo.baseSchoolName }}</span>
        </el-form-item>
        <el-form-item label="手机号：">
          <span>{{ userInfo.mobile }}</span>
        </el-form-item>
        <el-form-item label="电子邮箱：">
          <span>{{ userInfo.email }}</span>
        </el-form-item>
        <el-form-item label="备注：">
          <span>{{ userInfo.remark }}</span>
        </el-form-item>
        <el-form-item label="状态：">
          <span class="status-point" :class="{ openColor: userInfo.isOpen }"></span>
          <span>{{ userInfo.status }}</span>
        </el-form-item>
        <div>
          <div>学生信息</div>
          <div class="line"></div>
          <el-table
            :data="userInfo.gradeClassInfo"
            row-class-name="table-body-default"
            header-row-class-name="table-header-default"
            style="width: 100%">
            <el-table-column prop="stuName" label="学生姓名"></el-table-column>
            <el-table-column prop="stuLoginName" label="学生用户名"></el-table-column>
            <el-table-column prop="gradeName" label="年级"></el-table-column>
            <el-table-column prop="className" label="班级"></el-table-column>
          </el-table>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" round @click="close('form')">取 消</el-button>
          <el-button type="primary" size="mini" round @click="close('form')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description AddOrUpdateDialog
* Created By codyy
* Created At 2019/10/14 14:52
*/
export default {
  name: 'AddOrUpdateDialog',
  props: ['userInfo', 'userId', 'visible', 'dialogTitle'],
  data () {
    return {
      form: {
        userId: '',
        userName: '',
        realName: '',
        headTeacher: '',
        info: '',
        isFamous: '',
        regional: '',
        school: '',
        section: '',
        telephone: '',
        email: '',
        remark: '',
        status: ''
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
    close (formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:visible', false) // 双向绑定
    },
  }
}
</script>

<style scoped lang="scss">
  .AddOrUpdateDialog {
    .line {
      height: 1px;
      background-color: #e1e7f0;
      margin-top: -20px;
    }
  }
</style>
