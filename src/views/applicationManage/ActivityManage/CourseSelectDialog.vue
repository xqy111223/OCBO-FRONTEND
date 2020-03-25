<template>
  <div class="course-select-dialog">
    <el-dialog
      width="905px"
      title="根据课表选课"
      :visible.sync="isVisible"
      :before-close="cancel">
      <div>
        <el-form :model="ruleForm" ref="ruleForm" :inline="true" :rules="rules">
          <el-form-item label="区域：" prop="baseAreaId">
            <select-region :area-id="ruleForm.baseAreaId" :value.sync="ruleForm.baseAreaId" :filterable="true"></select-region>
          </el-form-item>
          <el-form-item label="学校：" prop="baseSchoolId">
            <school-selector :areaId="ruleForm.baseSchoolId" :value.sync="schoolData"></school-selector>
          </el-form-item>
          <el-form-item label="主讲教室：" prop="classRoomId">
            <el-select
              v-model="ruleForm.classRoomId"
              remote
              size="round"
              placeholder="请输入主讲教室"
              :remote-method="getClassroomList"
              :loading="loadingRoom">
              <el-option v-for="item in classroomList"
                         :key="item.baseClassroomId"
                         :label="item.roomName"
                         :value="item.baseClassroomId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排课日期：" prop="arrangeCourseDate">
            <el-date-picker
              v-model="courseDate"
              type="daterange"
              align="right"
              size="round"
              unlink-panels
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" round @click="submitForm">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="loading"
        :data="courseList"
        @selection-change="handleSelectionChange"
        stripe
        empty-text="请设置查询条件"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        width="905px"
        height="270px">
        <el-table-column prop="courseId" label="选择">
          <template slot-scope="scope">
            <el-radio v-model="courseId" :label="scope.$index" @change="handleSelectionChange(scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="gradeBaseName" label="年级"></el-table-column>
        <el-table-column prop="subjectBaseName" label="学科"></el-table-column>
        <el-table-column prop="courseDate" label="排课日期">
          <template slot-scope="scope">
            {{scope.row.courseDate|date('YYYY-MM-DD hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column prop="weekDate" label="星期一"></el-table-column>
        <el-table-column prop="lessonSeq" label="节次"></el-table-column>
        <el-table-column prop="masterRoom" label="主讲教室"></el-table-column>
        <el-table-column prop="masterTeacherName" label="主讲教师"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" round @click="cancel">取 消</el-button>
          <el-button type="primary" size="mini" round @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
 * Description CourseSelectDialog
 * Created By Administrator
 * Created At 2019/10/29 13:40
 */
import SelectRegion from '@/components/SelectRegion/index'
import { classroomList } from '@/api/basicConfiguration/classRoomManage'
import { getCourseTableList } from '@/api/applicationManage/activityManage'
import SchoolSelector from '@/components/SchoolSelector/index'

export default {
  name: 'CourseSelectDialog',
  components: {
    SchoolSelector,
    SelectRegion
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      loadingRoom: false,
      courseId: '', // 所选课程id
      courseItem: {}, // 所选课程相关数据对象
      schoolData: { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      },
      courseDate: [], // 排课日期查询
      ruleForm: {
        baseSchoolId: null,
        arrangeCourseDate: '', // 排课日期选择数据
        baseAreaId: null, // 用户选择的区域id
        classRoomId: '', // 教室id
      },
      rules: {
        baseAreaId: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        baseSchoolId: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ],
      },
      listData: { // 请求分页规格
        total: 0, // 总数
        pageSize: 20, // 每页显示条目个数
        pageCount: 0, // 总页数
        curPage: 1, // 当前页
        isPageing: true // 是否分页
      },
      classroomList: [],
      courseList: [],
    }
  },
  created () {
    this.getClassroomList()
  },
  watch: {
    schoolData: {
      deep: true,
      handler (val) {
        this.ruleForm.baseSchoolId = val.schoolId
      }
    },
  },
  computed: {
    isVisible: {
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
     * 查询课表排课列表
     * @returns {Promise<void>}
     */
    async query () {
      this.loading = true
      const params = {
        ...this.listData,
        areaId: this.ruleForm.baseAreaId,
        masterSchoolId: this.schoolData.schoolId,
        courseDateMax: this.courseDate[1],
        courseDateMin: this.courseDate[0]
      }
      const result = await getCourseTableList(params)
      this.courseList = result.list
      this.loading = false
    },
    /**
     * 获取教室列表
     * @returns {Promise<void>}
     */
    async getClassroomList () {
      this.loadingRoom = true
      const params = { ...this.ruleForm }
      params.baseSchoolId = this.schoolData.schoolId
      const result = await classroomList(params)
      this.classroomList = result.list
      this.loadingRoom = false
    },
    /**
     * 点击查询按钮
     * @param formName 表单值，需要验证区域、学校
     */
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.courseId = ''
          this.query()
        } else {
          return false
        }
      })
    },
    /**
     * 监听radio选择值得变化
     * @param courseItem 所选课程数据项
     */
    handleSelectionChange (courseItem) {
      this.courseItem = courseItem
    },
    /**
     * 取消弹框
     */
    cancel () {
      this.isVisible = false
    },
    /**
     * 确认弹框
     */
    confirm () {
      if (this.courseId === '') { // 未选择课程,提示要选择课程
        this.showMsgBox({
          message: '请先选择课程！',
          type: 'info'
        })
      } else { // 选择了课程
        this.cancel()
        this.$emit('handleCourseData', this.courseItem)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .course-select-dialog {
    .head-item {
      display: inline-block;
      margin-bottom: 20px;

      label:first-child {
        text-align: right;
        width: 70px;
        height: 14px;
        display: inline-block;
      }
    }
    .head-item-title {
      display: inline-block;
      width: 70px;
      text-align: right;
    }
    .dialog-btn-wrapper {
      text-align: center;
      margin-top: 40px;
    }
  }
  body .course-select-dialog /deep/ .el-dialog > .el-dialog__body {
    max-height: 450px;
  }
</style>
