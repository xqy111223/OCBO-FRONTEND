<!--为学校选择器、教师选择器、学生选择器开发的公共组件-->
<template>
  <el-select
    v-model="selectorId"
    filterable
    remote
    size="round"
    :placeholder="placeholder"
    :remote-method="query"
    @change="change"
    :loading="loading">
    <el-option v-for="item in optionsList"
               :key="item.id"
               :label="item.value"
               :value="item.id">
      <span class="fl">{{ item.value }}</span>
      <span class="condition-selector-span" v-if="item.isSame">{{ item.extroInfo }}</span>
    </el-option>
  </el-select>
</template>

<script>
/*
 * Description index
 * Created By Administrator
 * Created At 2019/11/12 17:18
 */
import { getSelectorSchoolList } from '@/api/common/schoolSectorManage'
import { getTeacherSectorList } from '@/api/common/taecherSelectorManage'

export default {
  name: 'index',
  props: {
    value: {
      type: String
    },
    selectorType: { // 选择器类型 school、teacher、student
      type: String
    },
    areaId: { // 区域id
      type: String,
      default: null
    },
    schoolId: { // 学校id
      type: String,
      default: null
    },
    teacherId: { // 教师id
      type: String,
      default: null
    },
  },
  data () {
    return {
      selectorId: this.value, // 选择器选择项对应id
      loading: false,
      optionsList: [], // 选择器选项
    }
  },
  mounted () {
  },
  computed: {
    /**
     * 根据查询类型 返回placeholder
     */
    placeholder () {
      if (this.selectorType === 'school') {
        return '请输入学校名称'
      } else if (this.selectorType === 'teacher') {
        return '请输入教师名称'
      } else {
        return '请输入'
      }
    }
  },
  created () {
  },
  methods: {
    /**
     * 查询学校
     * @param query 输入框值
     * @returns {Promise<void>}
     */
    async query (query) {
      if (!this.isQuery(query)) {
        return
      }
      this.loading = true
      this.optionsList = []
      let data = []
      if (this.selectorType === 'school') {
        data = await getSelectorSchoolList(this.getPrams(query))
        this.handleOptionsList(data.list, 'school')
      } else if (this.selectorType === 'teacher') {
        data = await getTeacherSectorList(this.getPrams(query))
        this.handleOptionsList(data, 'teacher')
      } else if (this.selectorType === 'student') {
      }
      this.loading = false
    },
    /**
     * 判断输入后是否进行查询
     * @param query 输入内容
     * @returns {Promise<void>} true 可以查询
     */
    isQuery (query) {
      let isUseful = true
      if (this.selectorType === 'school') { // 输入一个字或指定字符 不查询学校
        const str = '实验、初中、小学、中学、高中、学校、幼小、完小、完中'
        isUseful = query.length !== '' && query.length !== 1 && !(query.length === 2 && str.includes(query))
      } else if (this.selectorType === 'teacher') { // 输入一个字\输入两个字且为‘老师’，不查询
        const str = '老师'
        isUseful = query.length !== '' && query.length !== 1 && !(query.length === 2 && str.includes(query))
      } else if (this.selectorType === 'student') { // 输入一个字不查询
        isUseful = query.length !== '' && query.length !== 1
      }
      return isUseful
    },
    handleOptionsList (data, type) {
      this.optionsList = []
      if (type === 'school') {
        data.map(item => {
          const hasSameSchool = this.optionsList.filter(_item => { // 过滤数组中是否已包含当前item对应的schoolName
            if (_item.value === item.schoolName) {
              _item.isSame = true
              return true
            }
          })
          this.optionsList.push(
            {
              value: item.schoolName,
              id: item.baseSchoolId,
              extroInfo: item.areaName,
              isSame: hasSameSchool.length !== 0
            }
          )
        })
      } else if (type === 'teacher') {
        data.map(item => {
          const hasSameUserName = this.optionsList.filter(_item => { // 过滤数组中是否已包含当前item对应的username
            if (_item.value === item.userName) {
              _item.isSame = true
              return true
            }
          })
          // const obj = {
          //   value: item.userName,
          //   id: item.baseUserId,
          // }
          // hasSameUserName.length !== 0
          this.optionsList.push(
            {
              value: item.userName,
              id: item.baseUserId,
              // extroInfo: item.areaPath,
              // schoolName: item.baseSchoolName,
              isSame: hasSameUserName.length !== 0
            }
          )
        })
      }
    },
    /**
     * 获取接口查询条件
     * @param queryText 用户输入的查询条件
     */
    getPrams (queryText) {
      let params = {}
      if (this.selectorType === 'school') {
        params = {
          baseAreaId: this.areaId, // 查询学校列表只需要传areaid
          schoolName: queryText // 用户输入查询条件
        }
      } else if (this.selectorType === 'teacher') {
        params = {
          areaId: this.areaId,
          schoolId: this.schoolId,
          userName: queryText,
          userType: 3
        }
      } else if (this.selectorType === 'student') {
      }
      return params
    },
    /**
     * 选择下拉列表监控
     * @param value 所选项对应的id
     */
    change (value) {
      this.$emit('update:value', value)
    },
  }
}
</script>

<style scoped lang="scss">
  .condition-selector-span {
    float: right;
    color: #8492a6;
    font-size: 13px
  }
</style>
