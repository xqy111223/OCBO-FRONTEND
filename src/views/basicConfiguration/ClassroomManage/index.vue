<template>
  <div class="classroomManage">
    <header>
      <div class="item">
        <label>区域：</label>
        <select-region :value.sync="formData.baseAreaId" placeholder="请选择行政区"></select-region>
      </div>
      <div class="item">
        <label>学校：</label>
        <el-input v-model.trim="formData.baseSchoolId" size="round" placeholder="请输入学校名称"></el-input>
      </div>
      <div class="item">
        <label>创建时间：</label>
        <el-date-picker
          v-model="formData.createTime"
          type="daterange"
          align="right"
          size="round"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="item">
        <label>状态：</label>
        <el-select v-model="formData.status" size="round" placeholder="请选择状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <label>跨域：</label>
        <el-select v-model="formData.crossDomain" size="round" placeholder="请选择跨域情况">
          <el-option
            v-for="item in crossDomainList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <el-button size="mini" type="primary" round class="ml20" @click="getList(1)">搜索</el-button>
      </div>
      <div class="line"></div>
    </header>
    <div class="top-btns">
      <div class="total">共<span>{{pagination.total}}</span>条数据
        <el-checkbox v-model="formData.directOnly" @change="showDirect()" class="ml20">只显示直属校</el-checkbox>
      </div>
      <el-button size="mini" type="custom" round icon="el-icon-custom-new-add" @click="add">新增教室</el-button>
      <el-button size="mini" type="custom" round icon="el-icon-custom-addition" @click="addBatch">批量新增</el-button>
      <el-button size="mini" type="custom" round icon="el-icon-custom-export" @click="exportExcel">导出</el-button>
    </div>
    <div class="tableList">
      <el-table
        v-loading="loading"
        :data="tableData"
        min-width="1000px"
        style="width: 100%">
        <el-table-column prop="roomName" label="教室名称" min-width="120px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="schoolName" label="所在学校" min-width="120px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="areaNamePath" label="区域" min-width="120px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="semesterNames" label="学段" min-width="100px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="studentNum" label="学生人数" min-width="80"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column prop="createAt" label="创建时间" min-width="100px" :show-overflow-tooltip="tooltip">
          <template slot-scope="scope">
            <span>{{scope.row.createAt|date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人" min-width="80px"
                         :show-overflow-tooltip="tooltip"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.status?'enable-status':'disable-status'"></span>{{`${scope.row.status?'开启':'关闭'}`}}
          </template>
        </el-table-column>
        <el-table-column label="跨域">
          <template slot-scope="scope">
            <span :class="scope.row.crossDomain?'enable-status':'disable-status'"></span>{{`${scope.row.crossDomain?'支持':'不支持'}`}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          header-align="center">
          <template slot-scope="scope">
            <a type="btn" @click="edit(scope.row.baseClassroomId)">编辑</a>
            <a type="btn" color="danger" @click="del(scope.row.baseClassroomId)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, jumper" :current-page="pagination.pageNum" :pager-count="5" :page-size="pagination.pageSize"
                     :total="pagination.total"
                     @current-change="getList" :hide-on-single-page="hideSingle">
      </el-pagination>
    </div>
  </div>
</template>

<script>
/*
* Description classrommManage
* Created By admin
* Created At 2019/9/18 13:05
*/
import SelectRegion from '@/components/SelectRegion/index'
import { classroomList } from '@/api/basicConfiguration/classRoomManage'
import dayjs from 'dayjs'

export default {
  components: { SelectRegion },
  name: 'classroomManage',
  props: {},
  data () {
    return {
      loading: false,
      tooltip: true, // 当内容过长被隐藏时显示 tooltip
      hideSingle: true, // 隐藏一页
      formData: {
        baseSchoolId: '', // 学校ID，可选，前台教室管理可用
        baseAreaId: '', // 区域id
        createTime: '', // 创建时间
        schoolName: '', // 学校名称
        status: '', // 状态
        crossDomain: '', // 跨域
        directOnly: false // 只显示直属校
      },
      pagination: {
        pageNum: 1, // 当前页数
        pageSize: 20, // 每页条数
        total: 0, // 总数
        pageCount: 0, // 总页数
        isPaging: true // 是否分页
      },
      statusList: [ // 状态list
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '开启'
        },
        {
          value: 0,
          label: '关闭'
        }
      ],
      crossDomainList: [ // 跨域情况list
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '支持'
        },
        {
          value: 0,
          label: '不支持'
        }
      ],
      tableData: []
    }
  },
  methods: {
    /**
     * @description: 列表查询
     * @param params 查询参数
     * @returns {return}
     */
    async getList (pageNum) {
      this.loading = true
      this.pagination.pageNum = pageNum
      const queryData = { ...this.pagination, ...this.formData }
      queryData.createTimeStart = this.formData.createTime ? dayjs(this.formData.createTime[0]).valueOf() : ''
      queryData.createTimeEnd = this.formData.createTime ? dayjs(this.formData.createTime[1]).valueOf() : ''
      console.log(queryData)
      const result = await classroomList(queryData)
      this.tableData = result.list
      this.pagination.total = result.total
      this.loading = false
    },
    /**
     * 只显示直属校
     */
    showDirect () {
      this.directOnly = !this.directOnly
      this.getList(1)
    },
    /**
     * 新增
     */
    add () {
      console.log('add')
    },
    /**
     * 批量新增
     */
    addBatch () {
      console.log('addBatch')
    },
    /**
     * 导出
     */
    exportExcel () {
      console.log('export')
    },
    /**
     * 编辑
     */
    edit () {
      console.log('edit')
    },
    /**
     * 删除
     */
    del () {
      console.log('delete')
    },
  },
  created () {
    this.getList(1)
  }
}
</script>

<style scoped lang="scss">
  .classroomManage {
    .ml20 {
      margin-left: 20px;
    }

    header {
      .line {
        border-bottom: 1px solid #e1e7f0;
        margin-top: -5px;
      }

      .item {
        display: inline-block;
        margin-bottom: 20px;

        label {
          font-weight: normal;
          text-align: right;
          width: 80px;
          display: inline-block;
        }
      }
    }

    .top-btns {
      text-align: right;
      margin: 20px 0 10px;

      .total {
        float: left;
        line-height: 30px;

        span {
          color: #347EFF;
        }
      }
    }

    .tableList {
      span.enable-status, span.disable-status {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      span.enable-status {
        background-color: #40d688;
      }

      span.disable-status {
        background-color: #bbbbbb;
      }
    }

    .pagination {
      width: 500px;
      margin: 30px auto;
    }
  }
</style>
