<template>
  <!--课程回收站-->
  <div class="module-course-recycle">
    <div class="">
      <div class="head-item">
        <label class="params-label">区域：</label>
        <select-region :area-id="queryData.areaId" :value.sync="queryData.areaId" :areaCode="areaCode" :filterable="true"></select-region>
      </div>
      <div class="head-item">
        <label class="params-label">主讲学校：</label>
        <school-selector :areaId="queryData.areaId" :value.sync="schoolData"></school-selector>
      </div>
      <div class="head-item">
        <label class="params-label">主讲教师：</label>
        <teacher-selector :areaId="queryData.areaId" :schoolId="queryData.schoolId" :value.sync="teacherData"></teacher-selector>
      </div>
      <div class="head-item">
        <label class="params-label">排课时间：</label>
        <el-date-picker
          type="daterange"
          v-model="courseDate"
          align="right"
          size="round"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="head-item">
        <label class="params-label ml-20">实际上课时间：</label>
        <el-date-picker
          v-model="realStartTime"
          type="daterange"
          align="right"
          size="round"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="head-item">
        <label class="params-label">删除时间：</label>
        <el-date-picker
          v-model="deleteTime"
          type="daterange"
          align="right"
          size="round"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="head-item">
        <label class="params-label">删除人：</label>
        <el-input v-model="queryData.deleteBy" size="round" placeholder="请输入删除名或用户名"></el-input>
      </div>
      <el-button size="mini" type="primary" round @click="query()">查询</el-button>
    </div>
    <div class="cy-driver mb-15"></div>
    <div>
      <el-row>
        <el-col>
          <span class="font-small table-total">共<span class="color-primary">{{ total }}</span>条数据</span>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        :data="courseList"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        style="width: 100%">
        <el-table-column prop="masterAreaNamePath" label="区域名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="schoolName" label="主讲学校" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="courseDate" label="排课时间">
          <template slot-scope="scope">
            {{scope.row.courseDate|date('YYYY-MM-DD hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column prop="realStartTime" label="实际上课时间">
          <template slot-scope="scope">
            {{scope.row.realStartTime|date('YYYY-MM-DD hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column prop="gradeBaseName" label="年级"></el-table-column>
        <el-table-column prop="subjectBaseName" label="学科"></el-table-column>
        <el-table-column prop="masterTeacherName" label="主讲教师"></el-table-column>
        <el-table-column label="删除人">
          <template slot-scope="scope">{{scope.row.videoDeleteUserName}}({{scope.row.videoDeleteLoginName}})</template>
        </el-table-column>
        <el-table-column prop="deleteTime" label="删除时间">
          <template slot-scope="scope">
            {{scope.row.videoDeleteTime|date('YYYY-MM-DD hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <a type="btn" @click="revert(scope.row.courseId,0)">恢复</a>
            <a type="btn" @click="permanentDelete(scope.row.courseId,2)" color="danger">彻底删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, jumper" :pager-count="5" :total="listData.total" :page-size="listData.pageSize"
                     @current-change="query" :hide-on-single-page="hideSingle">
      </el-pagination>
    </div>
  </div>
</template>

<script>
/*
* Description courseRecyclingBin
* Created By admin
* Created At 2019/9/18 13:39
*/
import { changeCourseDelete, getCourseRecycleList } from '@/api/applicationManage/courseRecyleBin'
import SelectRegion from '@/components/SelectRegion/index'
import TeacherSelector from '@/components/TeacherSelector/index.vue'
import SchoolSelector from '@/components/SchoolSelector/index'
import { mapGetters } from 'vuex'

export default {
  name: 'CourseRecyclingBin',
  components: { SelectRegion, SchoolSelector, TeacherSelector },
  props: {},
  data () {
    return {
      hideSingle: true,
      areaCode: '000000', // 全国areacode
      loading: false,
      courseDate: [], // 排课日期查询
      realStartTime: [], // 实际开始时间查询
      deleteTime: [], // 删除时间查询
      total: 0,
      schoolData: { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      },
      teacherData: { // 教师数据
        teacherId: '', // 教师id
        userName: '', // 教师用户名
      },
      queryData: {
        areaId: null,
        courseDateMin: '', // 计划上课时间最小
        courseDateMax: '', // 计划上课时间最大
        realStartDateMax: '', // 实际上课时间最大
        realStartDateMin: '', // 实际上课时间最小
        deleteDateMin: '', // 删除时间最小
        deleteDateMax: '', // 删除时间最大
        deleteBy: '',
        videoDelete: 1, // 1：前台逻辑删
        videoExistFlag: 1, // 是否只查询有录播视频的课程 是：1
      },
      listData: { // 请求分页规格
        total: 0, // 总数
        pageSize: 20, // 每页显示条目个数
        pageCount: 0, // 总页数
        pageNum: 1, // 当前页
        isPaging: true // 是否分页
      },
      courseList: [],
    }
  },
  computed: {
    ...mapGetters(['baseUserId'])
  },
  created () {
    this.query()
  },
  // mounted () {
  //   this.query()
  // },
  watch: {
    /**
     * 监测排课时间的变化
     * @params val newVal 改变后的数据
     */
    courseDate (val) {
      this.queryData.courseDateMin = val[0]
      this.queryData.courseDateMax = val[1]
    },
    /**
     * 监测实际上课时间的变化
     * @params val newVal 改变后的数据
     */
    realStartTime (val) {
      this.queryData.realStartDateMax = val[0]
      this.queryData.courseDateMin = val[1]
    },
    /**
     * 监测删除时间的变化
     * @params val newVal 改变后的数据
     */
    deleteTime (val) {
      this.queryData.realStartDateMax = val[0]
      this.queryData.courseDateMin = val[1]
    }
  },
  methods: {
    /**
     * 获取课程列表数据
     * @returns {Promise<void>}
     */
    async query () {
      this.loading = true
      this.courseList = []
      this.queryData = { ...this.queryData, ...this.listData, schoolName: this.schoolData.schoolName, realname: this.teacherData.userName }
      const response = await getCourseRecycleList(this.queryData)
      // this.courseList = response.list.map((n) => {
      //   let arr1 = n.attentdeeList.filter((item) => { // 过滤每一组list中的attentdeeList的数据
      //     return item.attendeeType === 'MASTER' // 返回类型为Master的一组数据
      //   })
      //   let obj = { ...arr1[0], ...n.courseExt, courseDate: n.courseDate, realStartTime: n.realStartTime } // 拼接获得一个新的数据对象
      //   return obj // 最后map会将遍历后拼接得到的对象组合成一个新的数组
      // })
      this.courseList = response.list
      this.total = response.total
      this.listData.total = response.total
      this.listData.pageCount = response.pages
      this.loading = false
    },
    /**
     * 恢复
     * @param courseId 课程id
     * @params status 课程删除状态
     */
    revert (courseId, status) {
      this.showConfirmBox({
        message: '是否确定删除该资源？',
        title: '删除',
        type: 'warning',
        style: 2 || 0
      }).then(r => {
        this.changeCourseDelete(courseId, status)
      }).catch(e => console.log('取消', e))
    },
    /**
     * 更改删除课程状态
     * @param courseId 课程id
     * @param status 0 恢复， 1,前台删除 2永久删除
     * @returns {Promise<void>}
     */
    async changeCourseDelete (courseId, status) {
      const courseIdList = [
        {
          courseId: courseId,
          deleteBy: this.baseUserId,
          videoDelete: status
        }
      ]
      await changeCourseDelete(courseIdList)
    },
    /**
     * 永久删除
     * @param courseId
     * @param deleteId
     * @param status
     */
    permanentDelete (courseId, status) {
      this.showConfirmBox({
        message: '课程删除后不可恢复，确认要删除吗？',
        title: '删除',
        type: 'warning',
        style: 2
      }).then(r => {
        this.changeCourseDelete(courseId, status)
      }).catch(e => console.log('取消', e))
    },
    /**
     * 接收教师选择器返回的所选教师id
     * @param value 所选教师userid
     */
    selectTeacher (value) {
      this.queryData.teacherId = value
    },
  },
  filters: {
    filterMaster (value) {
      if (value === 'MASTER') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .module-course-recycle {
    label {
      font-weight: normal;
    }
    .pagination {
      text-align: center;
      margin-top: 20px;
    }
    .head-item {
      display: inline-block;
      margin-bottom: 20px;

      label:first-child {
        text-align: right;
        width: 100px;
        height: 14px;
        display: inline-block;
      }
    }

    .table-total {
      margin-bottom: 5px;
      display: inline-block;
    }

    .recycle-search-params {
      padding-bottom: 16px;
      border-bottom: 1px solid #e1e7f0;
      margin-bottom: 34px;

      .params-label {
        width: 110px;
        text-align: right;
        display: inline-block;
      }
    }
  }
</style>
