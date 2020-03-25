<!--CDN服务器选择器-->
<template>
  <el-select
    size="round"
    @change="change"
    v-model="value1"
    placeholder="请选择CDN服务器">
    <el-option v-for="item in cdnServerList"
               :key="item.serverId"
               :label="item.serverName"
               :value="item.serverId"></el-option>
  </el-select>
</template>

<script>
/*
 * Description index
 * Created By Administrator
 * Created At 2019/11/14 9:19
 */
// import { getCDNManageDataList } from '@/api/configManage/cdnManage'

export default {
  name: 'index',
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      value1: this.value,
      cdnServerList: [],
    }
  },
  mounted () {
    this.getCDNManageList()
  },
  methods: {
    /**
     * 请求cdn服务器列表
     * @returns {Promise<void>}
     */
    async getCDNManageList () {
      // await getCDNManageDataList().then(response => {
      //   this.cdnServerList = response.list
      // })
      this.cdnServerList = []
    },
    change (value) {
      this.$emit('update:value', value)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
