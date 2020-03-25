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
        <el-form-item label="姓名：">
          <span>{{ userInfo.userName }}</span>
        </el-form-item>
        <el-form-item label="班主任：">
          <span>{{ getInfo(userInfo.gradeClassInfo,'headTeacher') }}</span>
        </el-form-item>
        <el-form-item label="任课信息：">
          <span>{{ getInfo(userInfo.headerSubjectInfo,'subjectInfo') }}</span>
        </el-form-item>
        <el-form-item label="是否名师：">
          <span>{{ userInfo.isFamous ? '名师' : '普通教师' }}</span>
        </el-form-item>
        <el-form-item label="区域：">
          <span>{{ userInfo.areaPath }}</span>
        </el-form-item>
        <el-form-item label="所在学校：">
          <span>{{ userInfo.baseSchoolName }}</span>
        </el-form-item>
        <el-form-item label="学段：">
          <span>{{ getInfo(userInfo.semesterInfo,'section') }}</span>
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
  props: ['userInfo', 'userId', 'visible', 'dialogTitle', 'getDetailedInfo'],
  data () {
    return {}
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
    getInfo (info, type) {
      if (info) {
        const result = this.getDetailedInfo(info, type)
        return result
      }
    },
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
  }
</style>
