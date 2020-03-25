<template>
  <el-select
    v-model="queryData.userName"
    filterable
    remote
    size="round"
    placeholder="请输入教师名称"
    :remote-method="query"
    @change="change"
    :loading="loading">
    <el-option v-for="item in optionsList"
               :key="item.id"
               :label="item.value"
               :value="item.id">
      <span class="fl">{{ item.value }}</span>
      <span class="condition-selector-span" v-if="item.isSame">{{ platformType === 0 ? item.baseSchoolName : item.loginName  }}</span>
    </el-option>
  </el-select>
</template>

<script>
/*
 * Description index
 * Created By Administrator
 * Created At 2019/11/26 14:58
 */
import { getTeacherSectorList } from '@/api/common/taecherSelectorManage'
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  props: {
    areaId: { // 区域id
      type: Number,
      default: null
    },
    schoolId: {
      type: String,
    },
    value: { // 教师数据
      type: Object
    }
  },
  data () {
    return {
      loading: false,
      optionsList: [], // 选择器选项
      queryData: {
        baseAreaId: this.areaId, // 区域id
        schoolId: this.schoolId, // 学校id
        userName: this.value.userName, // 输入用户名
        userType: 3, // 查询类型
      },
      keywords: ['老师']
    }
  },
  computed: {
    ...mapGetters(['platformType'])
  },
  created () {
  },
  methods: {
    /**
     * 查询教师
     * @param query 输入框值
     * @returns {Promise<void>}
     */
    async query (query) {
      this.queryData.userName = query
      if (!this.isQuery(query)) {
        return
      }
      this.loading = true
      this.optionsList = []
      let data = []
      data = await getTeacherSectorList(this.queryData)
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
      isUseful = query.length !== '' && query.length !== 1 && !(query.length === 2 && this.keywords.includes(query))
      return isUseful
    },
    /**
     * 处理学校数据，甄选出重复的数据
     * @param data
     */
    handleOptionsList (data) {
      this.optionsList = []
      data.map(item => {
        const hasSameUserName = this.optionsList.filter(_item => { // 过滤数组中是否已包含当前item对应的schoolName
          if (_item.value === item.userName) {
            _item.isSame = true
            return true
          }
        })
        this.optionsList.push(
          {
            value: item.userName,
            id: item.baseUserId,
            baseUserId: item.baseUserId,
            baseSchoolName: item.baseSchoolName,
            loginName: item.loginName,
            isSame: hasSameUserName.length !== 0
          }
        )
      })
    },
    /**
     * 选择下拉列表监控
     * @param value 所选项对应的id
     */
    change (value) {
      const data = {
        teacherId: value,
        userName: ''
      }
      this.optionsList.filter(item => {
        if (item.id === value) {
          data.userName = item.userName
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
