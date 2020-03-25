<template>
  <!--知识网络管理-->
  <div class="module-knowledge-network">
    <table-tree :data="treeOptions.data"
                :columns="treeOptions.columns"
                v-loading="loading"
                childrenProp="children"
                idProp="id">
      <template slot="status" slot-scope="scope">
        <el-button
          size="mini"
          class="fr el-btn-mt"
          v-if="scope.row.type === 'GRADE'"
          :type="scope.row.isDefaultShow?'primary':'border-primary'"
          @click="setDefaultShow(scope.row)"
          round>默认显示
        </el-button>
      </template>
    </table-tree>
    <div class="bottom-tips el-icon-custom-tips color-disable">默认年级会影响到新添加行政区、学校的初始知识网络</div>
  </div>
</template>
<script>
/*
* Description knowledgeNetworkManage
* Created By admin
* Created At 2019/9/18 13:19
*/
import TableTree from '@/components/TableTree/index'
import { getKnowledgeNetworkData, setDefault } from '@/api/knowledgeNetwork/knowledgeNetwork'

export default {
  name: 'KnowledgeNetwork',
  components: { TableTree },
  props: {},
  data () {
    return {
      loading: 'false',
      treeOptions: { // data为要渲染的数据结构
        data: [],
        columns: [ // 表格要的列名配置
          {
            label: '名称',
            prop: 'name', // 对应data中的name属性值
          }, {
            label: '设置默认显示',
            type: 'template',
            template: 'status',
            width: 110
          },
        ]
      }
    }
  },
  created () {
  },
  mounted () {
    this.getKnowledgeNetworkData()
  },
  methods: {
    async getKnowledgeNetworkData () {
      this.loading = true
      const result = await getKnowledgeNetworkData()
      result[0].isFold = false // 默认展开第一级
      result.map(item => {
        item.children.map(_item => {
          if (_item.type === 'GRADE') {
            _item.isDefaultShow = false
          }
        })
      })
      this.treeOptions.data = result
      this.loading = false
    },
    async setDefaultShow (data) {
      const params = {
        isDefault: true,
        knowledgeId: data.id,
      }
      const result = await setDefault(params)
      if (result) {
        this.$message({
          message: '设置成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .module-knowledge-network {
    .el-icon-custom-tips:before {
      color: #347eff;
      margin-right: 5px;
    }
    .el-btn-mt {
      margin-top: -5px;
    }

    .bottom-tips {
      position: fixed;
      width: 88%;
      height: 38px;
      bottom: 10px;
      left: 220px;
      line-height: 38px;
      padding-left: 20px;
      background: #fff;
      box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.09);
    }
  }
</style>
