<template>
  <div class="logManage">
    <div class="head mb15">
      <div class="head-item">
        <span>时间：</span>
        <el-date-picker
          v-model="listQuery.time"
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
        <span>操作者：</span>
        <el-input v-model.trim="listQuery.operator" size="round" placeholder="请输入操作者"></el-input>
      </div>
      <div class="head-item">
        <span>用户名：</span>
        <el-input v-model.trim="listQuery.userName" size="round" placeholder="请输入用户名"></el-input>
      </div>
      <div class="head-item">
        <span>操作：</span>
        <el-input v-model.trim="listQuery.operating" size="round" placeholder="请输入操作"></el-input>
      </div>
      <div class="head-item">
        <span>模块：</span>
        <el-input v-model.trim="listQuery.model" size="round" placeholder="请输入模块"></el-input>
      </div>
      <div class="head-item">
        <span>IP：</span>
        <el-input v-model.trim="listQuery.IP" size="round" placeholder="请输入IP"></el-input>
      </div>
      <el-button size="mini" class="ml20" round type="primary" @click="getList()">查询</el-button>
    </div>
    <div class="line mb18"></div>
    <div class="middle">
      <span>共<span class="color-primary">{{ total }}</span>条数据</span>
      <div class="middle-button">
        <el-button type="custom" @click="exp()" round v-auth:teacher-export>导出</el-button>
      </div>
    </div>
    <div class="main">
      <el-table
        :data="list"
        v-loading="loading"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default">
        <el-table-column :show-overflow-tooltip="true" prop="time" label="时间"></el-table-column>
        <el-table-column prop="operator" label="操作者"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="operating" label="操作"></el-table-column>
        <el-table-column prop="model" label="模块"></el-table-column>
        <el-table-column prop="IP" label="IP"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <a type="btn" @click="view(scope.row.baseUserId)">请求参数</a>
          </template>
        </el-table-column>
      </el-table>
      <!--      <view-dialog-->
      <!--        :userId="userInfo.userId"-->
      <!--        :userInfo="userInfo"-->
      <!--        :visible.sync="visible"-->
      <!--        :dialog-title="dialogTitle"-->
      <!--        ref="userInfo">-->
      <!--      </view-dialog>-->
      <!--      导出-->
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, jumper" :pager-count="5" :total="pagination.pageCount" :page-size="pagination.pageSize"
                     @current-change="getList()">
      </el-pagination>
    </div>
  </div>
</template>

<script>
/*
* Description logManage
* Created By admin
* Created At 2019/9/18 13:59
*/
export default {
  name: 'logManage',
  props: {},
  data () {
    return {
      total: '',
      pagination: {},
      listQuery: {
        time: '',
        operator: '',
        operating: '',
        userName: '',
        model: '',
        IP: ''
      }
    }
  },
  methods: {
    getList () {
      console.log('getlist')
    },
    view () {
      console.log('view')
    }
  }
}
</script>

<style scoped lang="scss">
  .logManage {
    ul li {
      list-style: none;
      margin-bottom: 20px;
    }

    .mb18 {
      margin-bottom: 18px;
    }

    .mb15 {
      margin-bottom: 15px;
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
        width: 80px;
        height: 14px;
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
