<template>
  <el-select
    v-model="queryData.schoolName"
    filterable
    remote
    size="round"
    placeholder="请输入学校名称"
    :remote-method="query"
    @change="change"
    :loading="loading">
    <el-option v-for="item in optionsList"
               :key="item.baseSchoolId"
               :label="item.schoolName"
               :value="item.baseSchoolId">
      <span class="fl">{{ item.schoolName }}</span>
      <span class="condition-selector-span" v-if="item.isSame">{{ item.areaName }}</span>
    </el-option>
  </el-select>
</template>

<script>
/*
 * Description index
 * Created By Administrator
 * Created At 2019/11/26 14:58
 */
import { getSelectorSchoolList } from '@/api/common/schoolSectorManage'

export default {
  name: 'index',
  props: {
    areaId: { // 区域id
      type: Number,
    },
    value: { // 学校数据
      type: Object
    }
  },
  data () {
    return {
      loading: false,
      optionsList: [], // 选择器选项
      queryData: {
        baseAreaId: null, // 查询学校列表只需要传areaid
        schoolName: this.value.schoolName // 用户输入查询条件
      },
      keywords: ['实验', '初中', '小学', '中学', '高中', '学校', '幼小', '完小', '完中']
    }
  },
  computed: {},
  created () {
  },
  watch: {
    areaId (val) {
      this.queryData.baseAreaId = val
      this.query(this.queryData.schoolName)
    }
  },
  methods: {
    /**
     * 查询学校
     * @param query 输入框值
     * @returns {Promise<void>}
     */
    async query (query) {
      this.queryData.schoolName = query
      if (!this.isQuery(query)) {
        return
      }
      this.loading = true
      this.optionsList = []
      let data = []
      data = await getSelectorSchoolList(this.queryData)
      this.handleOptionsList(data)
      this.loading = false
    },
    /**
     * 判断输入后是否进行查询
     * @param query 输入内容
     * @returns {Promise<void>} true 可以查询
     */
    isQuery (query) {
      let isUseful = true
      isUseful = query.length > 1 && !(query.length === 2 && this.keywords.includes(query))
      return isUseful
    },
    /**
     * 处理学校数据，甄选出重复的数据
     * @param data
     */
    handleOptionsList (data) {
      this.optionsList = []
      data.map(item => {
        const hasSameSchool = this.optionsList.filter(_item => { // 过滤数组中是否已包含当前item对应的schoolName
          if (_item.schoolName === item.schoolName) {
            _item.isSame = true
            return true
          }
        })
        this.optionsList.push(
          {
            schoolName: item.schoolName,
            baseSchoolId: item.baseSchoolId,
            areaName: item.areaName,
            isSame: hasSameSchool.length !== 0
          }
        )
      })
      console.log(this.optionsList, '-')
    },
    /**
     * 选择下拉列表监控
     * @param value 所选项对应的id
     */
    change (value) {
      const data = {
        schoolId: value,
        schoolName: ''
      }
      this.optionsList.filter(item => {
        if (item.baseSchoolId === value) {
          data.schoolName = item.schoolName
        }
      })
      this.$emit('update:value', data)
    },
  }
}
</script>

<style scoped lang="scss">
  .condition-selector-span {
    float: right;
  }
</style>
