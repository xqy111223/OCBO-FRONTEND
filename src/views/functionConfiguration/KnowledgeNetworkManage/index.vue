<template>
  <div class="module-knowledge-manage">
    <div class="top-tips">
      <div>
        可以选择某个区域或者学校平台配置知识网络，若某个区域或者学校平台没有配置知识网络，则采用上级中关系最接近的区域平台配置，若上级平台都没有配置知识网络，则采用系统默认的知识网络
      </div>
      <div class="set-btns">
        <el-button size="mini" type="custom" round @click="setKnowledgeNetwork()">配置知识网络</el-button>
      </div>
    </div>
    <table-tree :data="treeOptions.data"
                :columns="treeOptions.columns"
                childrenProp="children"
                hasChildrenProp="hasChild"
                :isInit.sync="treeOptions.dataInit"
                idProp="baseAreaId">
      <template slot="operation" slot-scope="scope">
        <a type="btn" @click="setKnowledgeNetwork(scope.row.id)">编辑</a>
        <a type="btn" color="danger" @click="del(scope.row.id)">删除</a>
      </template>
    </table-tree>
    <network-area-school-dialog :visible.sync="visible" @confirm="confirm"></network-area-school-dialog>
  </div>
</template>

<script>
/*
* Description knowledgeNetworkManage
* Created By admin
* Created At 2019/9/18 13:32
*/
// import * as utils from '@/utils'
import TableTree from '@/components/TableTree/index'
import { getPlatFormData } from '@/api/functionConfiguration/knowledgeNetworkManage'
import NetworkAreaSchoolDialog from './netWorkAreaSchoolDialog'

export default {
  name: 'KnowledgeNetworkManage',
  components: { TableTree, NetworkAreaSchoolDialog },
  props: {},
  data () {
    return {
      visible: false,
      treeOptions: { // 树形结构
        dataInit: true,
        data: [],
        columns: [
          {
            label: '区域/学校',
            minWidth: '200px',
            prop: 'areaName',
          },
          {
            label: '操作',
            width: '120px',
            type: 'template',
            template: 'operation',
            textAlign: 'center'
          },
        ],
      },
      queryData: {
        areaId: '',
        schoolId: '',
        type: '',
      }
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    async query () {
      const list = await getPlatFormData(this.queryData)
      this.treeOptions.data = list
    },
    /**
     * 删除
     * @param id
     */
    del (id) {
      this.showConfirmBox({
        message: '是否确定删除该知识网络？',
        title: '删除',
        type: 'warning',
      }).then((r) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.query()
      }).catch(e => console.log('取消', e))
    },
    /**
     * 配置知识网路
     */
    setKnowledgeNetwork (id) {
      if (id === null || id === undefined) { // 配置知识网络
        this.visible = true
      } else { // 编辑知识网络

      }
    },
    /**
     * 配置知识网络选择区域学校弹框confirm
     * @param data 区域、学校数据
     */
    confirm (data) {
      this.$router.push({
        path: '/fn-cn/set-nk',
        query: {
          areaId: data.baseAreaId,
          areaName: '',
          schoolId: data.schoolId,
          schoolName: data.schoolName
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .module-knowledge-manage {
    .top-tips {
      font-size: 12px;
      .effective-time {
        color: #999;
        span {
          color: #347eff;
        }
        margin-bottom: 10px;
      }
      .set-btns {
        margin-top: 10px;
        text-align: right;
      }
    }
  }
</style>
