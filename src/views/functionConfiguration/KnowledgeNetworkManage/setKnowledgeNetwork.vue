<!--配置知识网络-->
<template>
  <div class="setKnowledgeNetwork">
    <div class="head-item">
      <label class="params-label">区域：</label>
      <span>{{areaPath}}</span>
    </div>
    <div class="head-item">
      <label class="params-label">主讲学校：</label>
      <span>{{schoolName}}</span>
    </div>
    <div class="cy-driver"></div>
    <div class="set-btns">
      <el-button size="mini" type="custom" round @click="visible=!visible">版本配置</el-button>
      <el-button size="mini" type="custom" round @click="visible1=!visible1">编辑知识网络</el-button>
    </div>
    <table-tree :data="treeOptions.data"
                :columns="treeOptions.columns"
                childrenProp="children"
                hasChildrenProp="hasChild"
                :isInit.sync="treeOptions.dataInit"
                idProp="id"
                @tree-icon-click="extendTree">
      <template slot="operation" slot-scope="scope">
        <a type="btn" @click="edit(scope.row)">编辑</a>
      </template>
    </table-tree>
    <div class="text-center mt-25">
      <el-button size="mini" type="custom" round @click="cancel">取消</el-button>
      <el-button size="mini" type="primary" round @click="save">保存</el-button>
    </div>
    <edition-config-dialog :visible.sync="visible" @confirm="confirm" :editionList="editionList"></edition-config-dialog>
    <edit-network-dialog :visible.sync="visible1" @confirm="confirmNetwork" :defaultNetworkList="defaultNetworkList"></edit-network-dialog>
    <custom-name-dialog :visible.sync="visible2"></custom-name-dialog>
  </div>
</template>

<script>
/*
 * Description setKnowledgeNetwork
 * Created By Administrator
 * Created At 2019/11/15 9:36
 */
import * as utils from '@/utils'
import TableTree from '@/components/TableTree/index'
import EditionConfigDialog from './editionConfigDialog'
import EditNetworkDialog from './editNetworkDialog'
import CustomNameDialog from './customNameDialog'
import {
  bindEditions,
  knowledgeTypesList,
  networkListByType,
  saveNetworkConfig
} from '@/api/functionConfiguration/knowledgeNetworkManage'
import { getKnowledgeNetworkData } from '@/api/knowledgeNetwork/knowledgeNetwork'

export default {
  name: 'SetKnowledgeNetwork',
  components: { TableTree, EditionConfigDialog, EditNetworkDialog, CustomNameDialog },
  data () {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      networkType: 'SEMESTER', // 知识网络类型值
      queryData: {
        areaId: '',
        schoolId: ''
      },
      treeOptions: { // data为要渲染的数据结构
        dataInit: true,
        data: [],
        columns: [
          {
            label: '名称',
            minWidth: '200px',
            prop: 'name',
          },
          {
            label: '自定义名称',
            prop: 'customName',
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
      editionList: [], // 版本数据
      checkedEditionList: [], // 选中的版本
      defaultNetworkList: [], // 一次性获取的默认知识网络数据
    }
  },
  mounted () {
    this.queryData.schoolId = this.$route.query.schoolId
    this.queryData.areaId = this.$route.query.areaId
    this.getNetworkListByType()
    this.getKnowledgeTypesList()
    this.getKnowledgeNetworkData()
  },
  computed: {
    areaPath () {
      return this.$route.query.areaname
    },
    schoolName () {
      return this.$route.query.schoolName
    }
  },
  methods: {
    /**
     *根据区域ID或者学校ID获取知识网络列表（按类型返回不同列表）
     * */
    async getNetworkListByType () {
      const params = { ...this.queryData, ...this.networkType }
      const loading = this.$loading({ target: '.table-tree' })
      const result = await networkListByType(params)
      this.treeOptions.data = this.filterResult(result)
      this.treeOptions.dataInit = true
      loading.close()
    },
    /**
     * 根据区域、学校id一次性获取知识网络数据结构，编辑知识网络使用的数据
     * */
    async getKnowledgeNetworkData () {
      const result = await getKnowledgeNetworkData(this.queryData)
      result[0].isFold = false // 默认展开第一级
      this.defaultNetworkList = result
    },
    /**
     * 获取版本数据
     * */
    async getKnowledgeTypesList () {
      const result = await knowledgeTypesList({ type: 'EDITION' })
      this.editionList = result
    },
    /**
     * 编辑自定义名称
     * */
    edit (data) {
      this.visible2 = true
    },
    /**
     * 展开节点树
     * @param data
     */
    async extendTree (data) { // 参数支持 data,column,columnIndex
      // 判断是否有有子集并且没有加载过子集，且当前是非折叠状态
      if (data.hasChild && !data.children && !data._isFold) {
        // 动态加载数据（如果是一次绑定所有，无需监听此事件）
        const loading = this.$loading({ target: '.table-tree' })
        // 加载完成数据，找到对应的数据并填充子集
        const currentData = utils.findTreeByProp(this.treeOptions.data, data.id, 'id', 'children')
        const result = await networkListByType()
        // 将查询到的子集塞到当前点击的项对应的数据中，最后改变this.treeOptions.data，实现展开效果
        const filterResult = this.filterResult(result)
        this.$set(currentData, 'children', filterResult)
        loading.close()
      }
    },
    /**
     * 处理版本配置弹框返回数据
     * @param data 选中版本数据
     */
    async confirm (data) {
      this.checkedEditionList = data
      const params = {
        areaId: 0,
        bindIds: this.checkedEditionList,
        schoolId: 0
      }
      const result = await bindEditions(params)
      if (result) {
        this.$message({
          message: '配置成功',
          type: 'success'
        })
      }
    },
    /**
     * 处理编辑知识网络返回数据
     * @param data 选中知识网络数据
     */
    confirmNetwork (data) {},
    cancel () {
      this.$router.push('/fn-cn/ke-nk-me')
    },
    /**
     * 保存知识网络配置的数据
     */
    async save () {
      const params = {
        areaId: 0,
        relationList: [
          {
            baseKnowledgeId: 0,
            customName: 'string',
            id: 0
          }
        ],
        schoolId: 0
      }
      const result = await saveNetworkConfig(params)
      if (result) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.cancel()
      } else {
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      }
    },
    /**
     * 临时mock数据用的 接口联调时不需要的
     * @param result
     * @returns {[]|*|string}
     */
    filterResult (result) {
      if (this.networkType === 'SEMESTER') {
        return result.semesterList
      } else if (this.networkType === 'GRADE') {
        return result.gradeList
      } else if (this.networkType === 'SUBJECT') {
        return result.subjectList
      } else if (this.networkType === 'EDITION') {
        return result.editionList
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .setKnowledgeNetwork {
    .set-btns {
      margin-top: 10px;
      text-align: right;
    }
    .head-item {
      display: inline-block;
      margin-bottom: 20px;
      label {
        font-weight: normal;
      }
      label:first-child {
        text-align: right;
        width: 100px;
        height: 14px;
        display: inline-block;
      }
    }
  }
</style>
