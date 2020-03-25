<template>
  <!-- 学科管理-->
  <div class="module-subject-manage">
    <el-row class="pb16 mb36 bd-bottom">
      <el-col :span="24">
        <label>学科名称：</label>
        <el-input v-model="queryData.inputSubject" size="round" placeholder="请输入内容"></el-input>
        <el-button class="ml15" size="mini" type="primary" round @click="getSubjectList()">查询</el-button>
      </el-col>
    </el-row>
    <el-row class="mb5">
      <span class="font-small">共<span class="color-primary">{{ total }}</span>条数据</span>
    </el-row>
    <el-table
      :data="subjectList"
      v-loading="loading"
      row-class-name="table-body-default"
      header-row-class-name="table-header-default"
      style="width: 100%">
      >
      <el-table-column prop="name" label="学科名称"></el-table-column>
      <el-table-column prop="code" label="学科代码"></el-table-column>
      <el-table-column label="设置默认显示" width="110">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.isDefault === 1?'primary':'border-primary'"
            round
            @click="setDefault(scope.$index, scope.row.id, scope.row.isDefault)">默认显示
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/*
* Description subjectManage
* Created By admin
* Created At 2019/9/18 13:20
*/
import { getSubjectList, setSubjectDefault } from '@/api/knowledgeNetwork/subjectManage'

export default {
  name: 'SubjectManage',
  props: {},
  data () {
    return {
      loading: false,
      total: 0,
      subjectList: [],
      queryData: {
        inputSubject: '',
      }
    }
  },
  created () {
  },
  mounted () {
    this.getSubjectList()
  },
  methods: {
    // 获取学科列表
    async getSubjectList () {
      this.loading = true
      const params = { ...this.queryData, ...{ type: 'SUBJECT' } }
      const result = await getSubjectList(params)
      this.subjectList = result
      this.loading = false
    },
    /**
     * 设置默认学科
     * @param index 设置项index
     * @param id 学科id
     * @param isDefault 默认状态
     * @returns {Promise<void>}
     */
    async setDefault (index, id, isDefault) {
      this.subjectList[index].isDefault = (isDefault === 1) ? 0 : 1
      await setSubjectDefault({ id: id }).then(res => {
        this.$message({
          message: '设置成功',
          type: 'success'
        })
      })
    },
  }
}
</script>

<style scoped lang="scss">
  .pb16 {
    padding-bottom: 16px;
  }

  .mb36 {
    margin-bottom: 36px;
  }

  mb5 {
    margin-bottom: 5px;
  }

  .bd-bottom {
    border-bottom: 1px solid #e1e7f0;
  }

  .ml15 {
    margin-left: 15px;
  }

  .subjectManage {
  }
</style>
