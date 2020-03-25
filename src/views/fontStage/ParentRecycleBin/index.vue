<template>
  <div class="parentRecycleBin">
    <div class="head mb15">
      <div class="head-item">
        <span>区域：</span>
        <select-region :value.sync="listQuery.areaId" :areaCode="areaCode" :filterable="true" clearble></select-region>
      </div>
      <div class="head-item">
        <span>所在学校：</span>
        <school-selector :area-id="listQuery.areaId" :value.sync="schoolData"></school-selector>
      </div>
      <div class="head-item">
        <span>年级：</span>
        <el-input v-model.trim="listQuery.gradeId" size="round" placeholder="请输入年级"></el-input>
      </div>
      <div class="head-item">
        <span>用户名：</span>
        <el-input v-model.trim="listQuery.loginName" size="round" placeholder="请输入用户名"></el-input>
      </div>
      <div class="head-item">
        <span>学生姓名：</span>
        <el-input v-model.trim="listQuery.stuName" size="round" placeholder="请输入姓名"></el-input>
      </div>
      <div class="head-item">
        <span>删除时间：</span>
        <el-date-picker v-model="listQuery.deleteTime" type="daterange" align="right" size="round" unlink-panels
          range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="head-item">
        <span>删除人：</span>
        <el-input v-model.trim="listQuery.deleter" size="round" placeholder="请输入删除人"></el-input>
      </div>
      <div class="head-item">
        <span>状态：</span>
        <el-select v-model="listQuery.status" size="round" placeholder="请选择状态" clearble>
          <el-option v-for="item in statusType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <el-button size="mini" class="ml20" round type="primary">查询</el-button>
    </div>
    <div class="line mb18"></div>
    <div class="middle">
      <span>共<span class="color-primary">{{ total }}</span>条数据</span>
      <el-checkbox class="ml20" @change="isShowLevel" v-model="listQuery.isThisLevel" label="只显示直属校用户"></el-checkbox>
    </div>
    <div class="main">
      <el-table
        :data="list"
        v-loading="loading"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default">
        <el-table-column :show-overflow-tooltip="true" prop="loginName" label="用户名"></el-table-column>
        <el-table-column prop="userName" label="家长姓名"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="删除时间">
          <template slot-scope="scope">
            <span>{{scope.row.deleteTime|date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deleter" label="删除人"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="areaPath" label="区域"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="baseSchoolName" label="所在学校"></el-table-column>
        <el-table-column prop="section" label="学段">
          <template slot-scope="scope">
            <span>{{getDetailedInfo(scope.row.semesterInfo,'section')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span class="status-point" :class="{ isActive : scope.row.status }"></span>
            <span>{{ getStatusCode(scope.row.status,statusType) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作"
                         width="120">
          <template slot-scope="scope">
            <a type="btn" @click="view(scope.row.baseUserId)">查看</a>
            <a type="btn" @click="restore(2)">恢复</a>
          </template>
        </el-table-column>
      </el-table>
      <!--      查看弹窗-->
      <view-dialog
        :visible.sync="visible"
        :dialog-title="dialogTitle"
        :user-info="userInfo"
        :user-id="userInfo.userId"
        ref="userInfo">
      </view-dialog>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, jumper" :pager-count="5" :total="total"
                     :current-page="listQuery.pageNum" :page-size="listQuery.pageSize"
                     @current-change="getList" :hide-on-single-page="hideSingle">
      </el-pagination>
    </div>
  </div>
</template>

<script>
/*
* Description parentRecycleBin
* Created By admin
* Created At 2019/9/18 14:09
*/
import { getParentRecycleDataList, viewParentInfo } from '@/api/fontStage/parentRecycleBin'
import SelectRegion from '@/components/SelectRegion/index'
import SchoolSelector from '@/components/SchoolSelector/index'
import ViewDialog from './ViewDialog'
import dayjs from 'dayjs'

export default {
  name: 'parentRecycleBin',
  components: { ViewDialog, SelectRegion, SchoolSelector },
  props: {},
  data () {
    return {
      total: 0, // 总数据数
      hideSingle: true,
      areaCode: '000000',
      schoolData: { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      },
      statusType: [{ // 状态码
        id: ' ',
        name: '全部'
      }, {
        id: 1,
        name: '开启'
      }, {
        id: 0,
        name: '关闭'
      }],
      loading: false, // 加载遮罩
      visible: false, // 查看弹窗
      dialogTitle: '', // 弹窗标题
      list: [], // 列表数据
      userInfo: {}, // 查看用户数据
      listQuery: { // 列表请求参数
        pageNum: 1,
        isPaging: true,
        pageSize: 20,
        status: '',
        userType: 5,
        gradeId: '',
        areaId: '',
        deleteTime: '',
        stuName: '',
        userName: '',
        loginName: '',
        deleter: '',
        schoolName: '',
        isThisLevel: 0,
        isRecycleBin: 1
      },
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     *   @description: 处理需要的数据并返回
     *   @param info 需要处理的数据 type 需要获得的具体字段
     *   @returns {}
     */
    getDetailedInfo (info, type) {
      if (info) {
        let detailedInfo = ''
        const detailedInfoList = []
        info.forEach(item => {
          let itemInfo
          if (type === 'grade') {
            itemInfo = item.gradeName
          } else if (type === 'class') {
            itemInfo = item.className
          } else if (type === 'section') {
            itemInfo = item.semesterName
          } else if (type === 'headTeacher') {
            itemInfo = item.gradeName + item.className + (item.status === 0 ? '' : (item.status === 1 ? '已毕业' : '已解散'))
          } else if (type === 'subjectInfo') {
            itemInfo = item.gradeName + item.className + (item.status === 0 ? '' : (item.status === 1 ? '已毕业' : '已解散')) + '-' + item.subjectName
          } else if (type === 'stuName') {
            itemInfo = item.stuName
          } else if (type === 'stuLoginName') {
            itemInfo = item.stuLoginName
          }
          detailedInfoList.push(itemInfo)
        })
        if (detailedInfoList.length > 1) {
          detailedInfo = detailedInfoList.join('、')
        } else {
          detailedInfo = detailedInfoList.join('')
        }
        return detailedInfo
      } else {
        return '--'
      }
    },
    /**
     *   @description: 是否只显示直属校用户
     *   @param arguments 描述
     *   @returns {}
     */
    showDirectSchool () {
      if (this.listQuery.showDirectSchool) {
        console.log(1)
      } else {
        console.log(2)
      }
    },
    isShowLevel () {
      if (this.listQuery.areaId === '') {
        this.showMsgBox({
          message: '查询本级数据时，请先选择区域',
          type: 'warning'
        })
        return
      }
      debugger
      this.listQuery.isThisLevel = this.listQuery.isThisLevel === 1 ? 0 : 1
      debugger
      this.getList()
    },
    /**
     *   @description: 获取列表数据
     *   @param arguments 描述
     *   @returns {}
     */
    async getList (newVal) {
      this.listQuery.createStartTime = this.listQuery.createTime ? dayjs(this.listQuery.createTime[0]).valueOf() : ''
      this.listQuery.createEndTime = this.listQuery.createTime ? dayjs(this.listQuery.createTime[1]).valueOf() : ''
      this.loading = true
      if (newVal) {
        this.listQuery.pageNum = newVal
      }
      try {
        const result = await getParentRecycleDataList(this.listQuery)
        this.list = result.list
        this.total = result.total
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      this.loading = false
    },
    /**
     *   @description: 根据状态码获得对应的类型名
     *   @param state,data 状态码和类型列表
     *   @returns {result} 对应类型名
     */
    getStatusCode (state, data) {
      let result = ''
      data.forEach(v => {
        if (state === v.id) {
          result = v.name
        }
      })
      return result
    },
    /**
     *   @description: 查看弹窗
     *   @param userId 用户ID
     *   @returns {}
     */
    async view (userIds) {
      this.userInfo.userId = userIds
      this.dialogTitle = '查看用户'
      this.visible = true
      try {
        const result = await viewParentInfo(userIds)
        this.userInfo = result.length ? result[0] : []
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     *   @description: 恢复用户
     *   @param userId 用户ID
     *   @returns {}
     */
    async restore (style, type) {
      this.showConfirmBox({
        message: '是否确定恢复该资源？',
        title: '恢复',
        type: type || 'warning',
        style: style || 0
      }).then(r => console.log('确定', r)).catch(e => console.log('取消', e))
    },
    change () {}
  }
}
</script>

<style scoped lang="scss">
  .parentRecycleBin {
    ul li {
      list-style: none;
      margin-bottom: 20px;
    }

    .mb15 {
      margin-bottom: 15px;
    }

    .mb18 {
      margin-bottom: 18px;
    }

    .ml20 {
      margin-left: 20px;
    }

    .ml50 {
      margin-left: 50px;
    }

    .middle-button {
      display: inline-block;
      float: right;
    }

    .line {
      height: 1px;
      background-color: #e1e7f0;
      margin-top: -20px;
    }

    .head-item {
      display: inline-block;
      margin-bottom: 20px;

      span:first-child {
        text-align: right;
        width: 100px;
        height: 17px;
        display: inline-block;
      }
    }

    .middle {
      height: 36px;
      width: 100%;

      span {
        line-height: 36px;
      }
    }

    .status-point {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #D3D3D3;
      vertical-align: middle;
      margin-right: 5px
    }

    .isActive {
      background-color: #90EE90;
    }

    .pagination {
      margin-top: 30px;
      width: 500px;
      left: 50%;
      margin-left: -250px;
      position: relative;
    }
  }

  body .el-dialog > /deep/ .el-dialog__body {
    max-height: none;
  }
</style>
