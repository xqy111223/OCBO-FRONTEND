<template>
  <div class="dialog">
    <el-dialog
      width="500px"
      :before-close="cancel"
      title="关联学校"
      :visible.sync="visibleDialog">
      <el-form ref="form" class="demo-ruleForm">
        <el-form-item label="学校：">
          <school-selector :value.sync="schoolData" :visibleChild="visibleChild" placeholder="请输入学校名称"></school-selector>
          <el-button size="mini" type="primary" round class="ml20" @click="add()">添加</el-button>
        </el-form-item>
      </el-form>
      <div class="tableList">
        <el-table
          v-loading="loading"
          :data="tableData"
          min-width="1000px"
          style="width: 100%">
          <el-table-column prop="schoolName" label="学校" min-width="120px"
                           :show-overflow-tooltip="tooltip"></el-table-column>
          <el-table-column prop="namePath" label="区域" min-width="200px"
                           :show-overflow-tooltip="tooltip"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <a type="btn" @click="del(scope.row.baseSchoolId)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="mini" round @click="cancel('form')">取 消</el-button>
        <el-button type="primary" size="mini" round @click="confirm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description dialog
* Created By codyy
* Created At 2019/10/12 10:16
*/
import { delRelatedSchool, relatedSchoolList, relateSchool } from '@/api/basicConfiguration/schoolPlatformManage'
import SchoolSelector from '@/components/SchoolSelector/index'

export default {
  components: { SchoolSelector },
  name: 'AddOrUpdateDialog',
  props: ['schoolId', 'visible'],
  data () {
    return {
      visibleChild: '',
      tooltip: true,
      tableData: [],
      loading: false,
      schoolData: { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      },
      baseSchoolId: ''
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
    cancel (formName) {
      this.schoolData = { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      }
      this.visibleChild = false
      this.$emit('update:visible', false) // 双向绑定
    },
    /**
     *   @description: 弹窗确认时重置form中数据
     *   @param formName form名称
     *   @returns {}
     */
    confirm (formName) {
      this.schoolData = { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      }
      this.visibleChild = false
      this.$emit('click', 'confirm') // 父级向子级传值
    },
    /**
     * 删除关联学校
     * @param id
     */
    async del (id) {
      const params = {
        schoolId: this.schoolId,
        relateSchoolId: id
      }
      this.showConfirmBox({
        message: '是否确认删除？',
        title: '删除',
        type: 1 || 'warning',
        style: 0
      }).then(r => {
        this.delRelatedSchool(params)
      }).catch(e => console.log('取消', e))
    },
    async delRelatedSchool (params) {
      try {
        await delRelatedSchool(params)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        await this.getList()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     * 获取已关联学校列表
     * @returns {Promise<void>}
     */
    async getList () {
      this.loading = true
      const params = { currentSchoolId: this.baseSchoolId }
      try {
        this.tableData = await relatedSchoolList(params)
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      this.loading = false
    },
    /**
     * 关联学校
     * @param id
     */
    async add () {
      try {
        const params = {
          schoolId: this.baseSchoolId,
          relateSchoolId: this.schoolData.schoolId
        }
        await relateSchool(params)
        this.$message({
          message: '关联成功',
          type: 'success'
        })
        await this.getList()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
  },
  watch: {
    visible (val) {
      if (val) {
        this.visibleChild = true
      }
      this.schoolData = { // 学校数据
        schoolId: '', // 学校id
        schoolName: '', // 学校名称
      }
      this.baseSchoolId = this.schoolId
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
  .dialog {
    .title {
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
      position: relative;
      .titleName {
        i {
          top: -2px;
          position: absolute;
          width: 2px;
          height: 18px;
          background-color: #347EFF;
        }
        span {
          margin-left: 10px;
        }
      }
    }
    .tips {
      color: #999;
      font-size: 12px;
      line-height: 20px;
      &::before {
        color: #2f71e6;
        font-size: 15px;
        margin-right: 5px;
      }
    }
  }
</style>
