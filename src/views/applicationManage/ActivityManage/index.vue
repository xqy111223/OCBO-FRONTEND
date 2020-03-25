<template>
  <div class="activityManage">
    <div class="">
      <div class="head-item">
        <label class="params-label">活动主题：</label>
        <el-input v-model="queryData.actvityName" size="round" placeholder="请输入活动主题"></el-input>
      </div>
      <div class="head-item">
        <label class="params-label">CDN服务器：</label>
        <cdn-selector :value.sync="queryData.cdnStr"></cdn-selector>
      </div>
      <div class="head-item">
        <label class="params-label">区域：</label>
        <select-region :areaCode="areaCode" :area-id="queryData.areaId" :value.sync="queryData.areaId" :filterable="true"></select-region>
      </div>
      <div class="head-item">
        <label class="params-label">主讲学校：</label>
        <school-selector :areaId="queryData.areaId" :value.sync="schoolData"></school-selector>
      </div>
      <div class="head-item">
        <label class="params-label">主讲教师：</label>
        <teacher-selector :areaId="queryData.areaId" :schoolId="schoolData.schoolId" :value.sync="teacherData"></teacher-selector>
      </div>
      <div class="head-item">
        <label class="params-label">状态：</label>
        <el-select
          v-model="queryData.status"
          size="round"
          placeholder="请选择状态">
          <el-option v-for="(item) in statusList"
                     :key="item.code"
                     :label="item.name"
                     :value="item.code"></el-option>
        </el-select>
        <el-button size="mini" type="primary" round @click="getActivityList()">查询</el-button>
      </div>
      <div class="cy-driver mb-15"></div>
    </div>
    <div>
      <el-row>
        <span class="font-small table-total">共<span class="color-primary">{{ listData.total }}</span>条数据</span>
        <el-button type="custom" size="mini" round class="fr" @click="addOrEditActivity" icon="el-icon-custom-new-add">新增活动</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="activityList"
        stripe
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        width="100%">
        <el-table-column prop="" type="index" label="序号" fixed :index="indexMethod"></el-table-column>
        <el-table-column prop="activityName" :show-overflow-tooltip="true" label="活动主题" width="168"></el-table-column>
        <el-table-column prop="cdnServerName" :show-overflow-tooltip="true" label="CDN服务器" width="240"></el-table-column>
        <el-table-column prop="areaPath" label="区域" :show-overflow-tooltip="true" width="152"></el-table-column>
        <el-table-column prop="schoolName" :show-overflow-tooltip="true" label="主讲学校" width="152"></el-table-column>
        <el-table-column prop="courseDate" label="计划排课时间" width="152">
          <template slot-scope="scope">
            {{scope.row.beginTime|date('YYYY-MM-DD hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column prop="realStartTime" label="实际上课时间" width="152">
          <template slot-scope="scope">
            {{scope.row.realBeginTime|date('YYYY-MM-DD hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column prop="classlevelName" label="年级"></el-table-column>
        <el-table-column prop="subjectName" label="学科"></el-table-column>
        <el-table-column prop="realname" label="主讲教师" width="152"></el-table-column>
        <el-table-column prop="receiveSchoolName" label="听讲学校" :show-overflow-tooltip="true" width="152"></el-table-column>
        <el-table-column prop="viewerLimit" label="人数上限"></el-table-column>
        <el-table-column prop="openComment" label="交流">
          <template slot-scope="scope">{{scope.row.openComment|filterComment}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{scope.row.status|filterStatus}}</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="314"
        >
          <template slot-scope="scope">
            <a type="btn" @click="handleOperation(scope.row.liveActivityId, 0)">查看</a>
            <a v-if="scope.row.status==='INIT' || scope.row.status==='PROGRESS'" type="btn" @click="handleOperation(scope.row.liveActivityId, 1)">编辑</a>
            <a v-if="scope.row.viewerLimit <=3000" type="btn" @click="handleOperation(scope.row.liveActivityId, 2)">活动统计</a>
            <a type="btn" @click="handleOperation(scope.row.liveActivityId, 3)" color="danger">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, jumper" :pager-count="5" :total="listData.pageCount" :page-size="listData.pageSize"
                     @current-change="getActivityList" :hide-on-single-page="hideSingle">
      </el-pagination>
    </div>
  </div>
</template>

<script>
/*
* Description activityManage
* Created By admin
* Created At 2019/9/18 13:40
*/

import { deleteActivity, getActivityList } from '@/api/applicationManage/activityManage'
import SelectRegion from '@/components/SelectRegion/index'
import SchoolSelector from '@/components/SchoolSelector/index'
import CdnSelector from '@/components/CDNSelector/index'
import TeacherSelector from '@/components/TeacherSelector/index.vue'

export default {
  name: 'activityManage',
  components: {
    SelectRegion,
    SchoolSelector,
    CdnSelector,
    TeacherSelector
  },
  props: {},
  data () {
    return {
      hideSingle: true,
      areaCode: '000000', // 全国areacode
      schoolSelector: 'school', // 查询学校选择器类型
      loading: false,
      statusList: [
        {
          name: '未开始',
          code: 'INIT'
        }, {
          name: '进行中',
          code: 'PROGRESS'
        }, {
          name: '已结束',
          code: 'END'
        }
      ],
      activityList: [], // 活动列表
      schoolData: { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      },
      teacherData: { // 教师数据
        teacherId: '', // 教师id
        userName: '', // 教师用户名
      },
      queryData: {
        areaId: null, // 区域id
        cdnStr: '', // cdn服务器code
        status: '', // 活动状态
        activityName: '', // 活动主题
      },
      listData: { // 请求分页规格
        total: 0, // 总数
        pageSize: 20, // 每页显示条目个数
        pageCount: 0, // 总页数
        pageNum: 1, // 当前页
        isPaging: true // 是否分页
      },
    }
  },
  created () {
  },
  mounted () {
    this.getActivityList()
  },
  watch: {
    queryData: {
      deep: true,
      handler (val) {
        console.log(val.areaId, '----query')
      }
    }
  },
  methods: {
    /**
     * 活动列表获取
     * @returns {Promise<void>}
     */
    async getActivityList () {
      this.loading = true
      const params = { ...this.listData, ...this.queryData, schoolName: this.schoolData.schoolName, realname: this.teacherData.userName }
      const response = await getActivityList(params)
      this.activityList = response.list
      this.listData.total = response.rowCount
      this.listData.pageCount = response.pageCount
      this.loading = false
    },
    /**
     * 处理操作
     * @param avtivId 活动id‘
     * @param type 0查看 1编辑 2活动统计 3删除
     */
    handleOperation (avtivId, type) {
      if (type === 0) {
        this.$router.push({
          name: 'ViewActivity',
          query: {
            avtivId: avtivId
          }
        })
      } else if (type === 1) {
        this.addOrEditActivity(1, avtivId)
      } else if (type === 2) {
        this.$router.push({
          name: 'ActivityStastic',
          query: {
            avtivId: avtivId
          }
        })
      } else if (type === 3) {
        this.showConfirmBox({
          message: '是否确定删除该活动？',
          title: '删除',
          type: 'warning',
        }).then((r) => {
          this.deleteActivity(avtivId)
        }).catch(e => console.log('取消', e))
      }
    },
    /**
     * 删除活动
     * @param avtivId 活动id‘
     */
    async deleteActivity (avtivId) {
      try {
        const result = await deleteActivity({ liveActivityId: avtivId })
        if (result) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        }
      } catch (err) {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      }
    },
    /**
     * 自定义索引，处理index作为序号
     * @param index table当前行行号（从0开始）
     * @returns {*}
     */
    indexMethod (index) {
      return index + 1
    },
    /**
     * 新增、编辑活动
     * @param avtivId 活动id‘
     * @param type 0 新增， 1编辑
     */
    addOrEditActivity (type, avtivId) {
      if (type === 1) {
        this.$router.push({
          name: 'AddActivity',
          query: {
            type: 1,
            avtivId: avtivId
          }
        })
      } else {
        this.$router.push({
          name: 'AddActivity'
        })
      }
    },
  },
  filters: {
    /**
     * 过滤交流状态
     * @param value
     * @returns {string}
     */
    filterComment (value) {
      if (value === 'Y') {
        return '启用'
      } else if (value === 'N') {
        return '不启用'
      } else {
        return '-'
      }
    },
    /**
     * 过滤状态
     * @param value
     * @returns {string}
     */
    filterStatus (value) {
      switch (value) {
        case 'INIT':
          return '未开始'
        case 'PROGRESS':
          return '进行中'
        case 'END':
          return '已结束'
        default:
          return '-'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .activityManage {
    .head-item {
      display: inline-block;
      margin-bottom: 20px;
      label:first-child {
        text-align: right;
        width: 100px;
        height: 14px;
        display: inline-block;
      }
      .params-label {
        font-weight: normal;
      }
    }
    .pagination {
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
