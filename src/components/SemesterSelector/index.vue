<template>
    <el-select v-model="semesterId" placeholder="请选择学段" size="round" @focus="getList()" clearable>
      <el-option v-for="item in optionsList"
                 :key="item.baseKnowledgeId"
                 :label="item.name"
                 :value="item.baseKnowledgeId">
      </el-option>
    </el-select>
</template>

<script>
/*
* Description index
* Created By codyy
* Created At 2020/3/3 15:27
*/
import { getSemesterList } from '@/api/common/semesterSelector'

export default {
  name: 'index',
  props: {
    areaId: {
      type: Number
    },
    schoolId: {
      type: Number
    },
    value: {
      type: Number
    }
  },
  watch: {
    areaId (newVal) {
      this.listQuery.areaId = newVal
    },
    schoolId (newVal) {
      this.listQuery.schoolId = newVal
    },
    semesterId () {
      this.$emit('update:value', this.semesterId)
    }
  },
  data () {
    return {
      loading: false,
      listQuery: {
        areaId: null,
        schoolId: null,
        types: 'SEMESTER'
      },
      semesterId: null,
      optionsList: []
    }
  },
  methods: {
    async getList () {
      try {
        const result = await getSemesterList(this.listQuery)
        this.optionsList = result
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .index {
    }
</style>
