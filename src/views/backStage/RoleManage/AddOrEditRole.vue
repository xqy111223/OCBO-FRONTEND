<template>
  <div class="module-add">
    <div class="module-add-swapper" ref="scroll">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="角色名称：" prop="roleName" class="module-form-item">
          <el-input
            v-model="ruleForm.roleName"
            size="round"
            maxlength="10"
            show-word-limit
            placeholder="请输入角色名称">
          </el-input>
          <!--          <div class="name-count">-->
          <!--            <span class="color-primary">{{nameCount}}</span>/10-->
          <!--          </div>-->
        </el-form-item>
        <el-form-item label="备注：" prop="comment" class="module-form-item">
          <el-input
            type="textarea"
            :rows="4"
            resize="false"
            maxlength="30"
            show-word-limit
            placeholder="请输入备注"
            class="input-comment"
            v-model="ruleForm.remark">
          </el-input>
          <!--          <div class="comment-count">-->
          <!--            <span class="color-primary">{{commentCount}}</span>/30-->
          <!--          </div>-->
        </el-form-item>
        <el-form-item label="功能：" prop="permissionIds">
          <span class="color-disable font-small">至少选择一个功能</span>
          <div class="functions-wrapper">
            <div class="functions-wrapper-collapse">
              <el-collapse v-model="activeNames" ref="functionCollapse">
                <el-collapse-item ref="collapseItem"
                                  v-for="(item, index) in authList"
                                  @click.native="handleCollapse(item)"
                                  :name="index.toString()"
                                  :key="index">
                  <div slot="title" class="collapse-title">
                    <el-checkbox
                      v-model="item.checkAll"
                      :indeterminate="item.isIndeterminate"
                      @change="handleCheckAllChange(item, index)">{{item.moduleName}}
                    </el-checkbox>
                    <span class="collapse-title-icon"
                          :class="{'color-primary':item.isCollapsed, 'color-disable':!item.isCollapsed}">
                    <i class="header-icon el-icon-custom-spread font-small ml-5"
                       :class="{'is-active':!item.isCollapsed}"></i>
                    <span v-if="item.isCollapsed">展开</span>
                    <span v-else>收起</span>
                  </span>
                  </div>
                  <el-checkbox-group v-model="checkedModules[index]" @change="handleGroupChecked($event, item)">
                    <el-checkbox
                      class="checkbox-level2"
                      v-for="(item2, index2) in item.children"
                      :label="item2.adminPermissionId"
                      :checked="item2.isChecked"
                      @change="handleCheckedModules(item2, item, index)"
                      :key="index2">
                      <span class="module-name">{{item2.moduleName}}</span>
                      <el-button
                        size="mini"
                        type="border"
                        round
                        v-for="(item3, index3) in item2.authArray"
                        :code="item3.code"
                        :class="{'module-choose':item3.isChecked }"
                        :key="index3"
                        @click.stop="handleBtn(item3, item2, item,index)">
                        {{item3.name}}
                      </el-button>
                    </el-checkbox>
                  </el-checkbox-group>
                </el-collapse-item>
              </el-collapse>
            </div>
            <auth-module-menu
              :activeIndex="activeIndex"
              ref="authModuleMenu"
              :isOnScrollTop="isOnScrollTop"
              @handleMenuSelect="handleMenuSelect"
              :moduleNames="firstModuleNameList">
            </auth-module-menu>
          </div>
        </el-form-item>
      </el-form>
      <el-row class="module-confirms">
        <el-col :span="12">
          <el-button size="mini" type="primary" round @click="confirm">确定</el-button>
          <el-button size="mini" type="info" round>取消</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
/*
 * Description AddOrEditRole 新增编辑角色
 * Created By Administrator
 * Created At 2019/10/15 11:35
 */
import AuthModuleMenu from './AuthModuleMenu'
import { addRole, editRole, getAllPermissions, getRoleDetail } from '@/api/backStage/roleManage'

export default {
  name: 'AddOrEditRole',
  components: {
    AuthModuleMenu
  },
  props: {},
  data () {
    const validateRoleName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入角色名称'))
      } else if (value.length > 10) {
        callback(new Error('最多可输入10个字符'))
      } else {
        callback()
      }
    }
    const validatePermission = (rule, value, callback) => {
      if (value.length === 0 || value === undefined) {
        callback(new Error('至少选择一个功能'))
      } else {
        callback()
      }
    }
    return {
      activeIndex: '0', // 右侧菜单选中项index值
      isOnScrollTop: false, // 功能滚动到顶部状态
      activeNames: [], // 当前激活面板name值数组
      checkedModules: [
        { checkedModules0: [] }, // 第一组checkboxgroup选中值
        { checkedModules1: [] }, // 第一组checkboxgroup选中值
        { checkedModules2: [] }, // 第一组checkboxgroup选中值
        { checkedModules3: [] }, // 第一组checkboxgroup选中值
        { checkedModules4: [] }, // 第一组checkboxgroup选中值
        { checkedModules5: [] }, // 第一组checkboxgroup选中值
        { checkedModules6: [] }, // 第一组checkboxgroup选中值
        { checkedModules7: [] }, // 第一组checkboxgroup选中值
      ],
      authList: [],
      ruleForm: {
        roleName: '',
        remark: '',
        permissionIds: [],
      },
      rules: {
        roleName: [
          { validator: validateRoleName, required: true, trigger: 'blur' }
        ],
        permissionIds: [
          { validator: validatePermission, required: true, trigger: 'blur' }
        ],
      },
      functionOffHeight: 275, // 设定页面菜单固定需要滚动的距离
      allPermissionList: [], // 所有权限数组 一维数组
    }
  },
  created () {
  },
  mounted () {
    this.getAllPermissions()
    if (this.pageType === 'edit') {
      this.getRoleDetailData()
    }
    // 监听页面滚动
    const scroll = this.$refs.scroll
    setTimeout(() => {
      scroll.addEventListener('scroll', (event) => {
        this.watchScroll()
      }, false)
    }, 2000)
  },
  computed: {
    adminRoleId () {
      return this.$route.query.adminRoleId
    },
    pageType () { // 页面类型，路由传递
      return this.$route.query.type
    },
    /**
     * 获取有路由权限的模块名
     * **/
    firstModuleNameList () {
      const list = this.authList.map(item => {
        return item.moduleName
      })
      return list
    },
    /**
     * 计算角色名称输入长度
     * **/
    nameCount () {
      return this.ruleForm.roleName.length
    },
    /**
     * 计算备注输入长度
     * **/
    commentCount () {
      return this.ruleForm.remark.length
    }
  },
  methods: {
    /**
     * 获取角色详情
     * @returns {Promise<void>}
     */
    async getRoleDetailData () {
      const result = await getRoleDetail(this.adminRoleId)
      this.ruleForm.roleName = result.roleName
      this.ruleForm.remark = result.remark
      this.matchSelectedPermission(result.permissionList)
      this.handlePermissionList()
    },
    /**
     * 拿用户拥有的权限数据匹配所有权限数据，得到有选中状态的所有权限数组
     * @param list 用户拥有的权限数据
     */
    matchSelectedPermission (list) {
      const permissionIds = list.map(item => { // 获取用户拥有权限的id数组
        return item.adminPermissionId
      })
      this.allPermissionList = this.allPermissionList.map(item => {
        if (permissionIds.includes(item.adminPermissionId)) { // 所有权限数组中，匹配的设置CheckBox选中属性
          item.isChecked = true
        } else {
          item.isChecked = false
        }
        return item
      })
      this.allPermissionList.forEach(item => {
        if (item.pid === null && item.type === 0) { // 该项为第一级菜单
          const children = this.allPermissionList.filter(item2 => { // 获取当前第一级菜单的所有子权限
            return item2.pid === item.adminPermissionId
          })
          item.checkAll = children.every(item3 => { // 当该菜单所有子权限均为选中状态时，该项为全选状态
            return item3.isChecked
          })
        }
      })
    },
    /**
     *获取可选权限
     */
    async getAllPermissions () {
      const result = await getAllPermissions()
      if (this.pageType !== 'edit') { // 如果是新增，直接处理所有权限数据
        this.allPermissionList = result.map(item => {
          item.isChecked = false
          return item
        })
        this.handlePermissionList()
      } else {
        this.allPermissionList = result
      }
    },
    /**
     * 设置全选功能
     * @param moduleItem 按钮权限数据 moduleItem的checkAll属性与checkbox选中状态同步
     * @para index 被设置全选的权限index值
     */
    handleCheckAllChange (moduleItem, index) {
      if (moduleItem.isIndeterminate || !moduleItem.isChecked) { // 变成全选状态
        moduleItem.isChecked = true
        moduleItem.checkAll = true
        moduleItem.isIndeterminate = false
      } else { // 变成全不选状态
        moduleItem.isChecked = false
        moduleItem.checkAll = false
        moduleItem.isIndeterminate = false
      }
      const isAllChecked = moduleItem.checkAll
      this.checkedModules[index] = []
      moduleItem.children.forEach(item => { // 修改二级模块选中状态
        if (isAllChecked) { // 一级全选
          this.checkedModules[index].push(item.adminPermissionId)
          item.isChecked = true
        } else {
          item.isChecked = false
        }
        item.authArray.forEach(itemAuth => { // 修改三级按钮选中状态
          if (item.isChecked) { // 选中二级
            itemAuth.isChecked = true // 同步二级下面的按钮状态为二级的选中状态
          } else { // 取消选中二级
            itemAuth.isChecked = false // 同步二级下面的按钮状态为二级的选中状态
          }
        })
      })
    },
    /**
     * 监听checkbox选中事件
     * @param secondItem 当前选择的二级checkbox数据
     * @param item 当前对应的一级checkbox数据
     * @param index 当前checkbox对应的模块的index值
     */
    handleCheckedModules (secondItem, item, index) {
      secondItem.isChecked = !secondItem.isChecked
      secondItem.authArray.forEach((itemAuth) => { // 遍历按钮权限数组
        if (secondItem.isChecked) { // 选中二级
          itemAuth.isChecked = true // 同步二级下面的按钮状态为二级的选中状态
        } else { // 取消选中二级
          itemAuth.isChecked = false // 同步二级下面的按钮状态为二级的选中状态
        }
      })
      this.syncGroupChecked(item, index)
    },
    /**
     *  修改按钮或者二级权限选中状态时同步全选的状态
     * @param value change函数默认参数，选中的CheckBox的label值，数组类型
     * @param item 当前对应的一级checkbox数据
     */
    syncGroupChecked (item, index) {
      this.checkedModules[index] = []
      const checkdValue = []
      item.children.forEach(checkItem => {
        if (checkItem.isChecked) {
          checkdValue.push(checkItem.moduleName)
          this.checkedModules[index].push(checkItem.adminPermissionId) // 需要对应更改v-model绑定的CheckBox选中数组的值，才能更改选中checkbox的状态
        }
      })
      this.handleGroupChecked(checkdValue, item)
    },
    /**
     * 监听checkbox-group中二级checkbox的改变，只有改变选择项时才会触发
     * @param value change函数默认参数，选中的CheckBox的label值，数组类型
     * @param item 当前对应的一级checkbox数据
     */
    handleGroupChecked (value, item) {
      const moduleLength = item.children.length
      const checkedCount = value.length
      item.checkAll = checkedCount === moduleLength // 设置一级checkbox的选中状态
      item.isIndeterminate = checkedCount > 0 && checkedCount < moduleLength // 二级部分选中时一级为聚焦状态
    },
    /**
     * 选择按钮时一级和二级checkbox的状态
     * @param authItem 当前选择的按钮数据
     * @param secondItem 当前按钮对应二级数据
     * @param item 当前按钮对应一级权限数据
     */
    handleBtn (authItem, secondItem, item, index) {
      authItem.isChecked = !authItem.isChecked
      let checkBtnCount = 0
      secondItem.authArray.forEach((thirdItem) => {
        if (thirdItem.isChecked) {
          checkBtnCount++ // 获取选中按钮个数
        }
      })
      secondItem.isChecked = checkBtnCount > 0 // 存在按钮被选择，二级选中
      this.syncGroupChecked(item, index)
    },
    /**
     * 折叠面板折叠事件监控
     */
    handleCollapse (itemData) {
      itemData.isCollapsed = !itemData.isCollapsed
    },
    /**
     *页面滚动事件监控
     */
    watchScroll () {
      const wrapperScrollTop = this.$refs.scroll.scrollTop // 内容区域滚动高度
      this.isOnScrollTop = wrapperScrollTop >= this.functionOffHeight // 页面滚动到功能区，固定菜单位置
      const authItemTops = this.getAuthItemTop(true)
      for (let i = 0; i < authItemTops.length; i++) {
        const authItemTop = authItemTops[i] + this.functionOffHeight - 20
        if (wrapperScrollTop >= this.functionOffHeight && wrapperScrollTop <= authItemTop) { // 根据滚动距离设置选中菜单
          this.activeIndex = i.toString() //
          break
        }
      }
    },
    /**
     * 菜单选中事件
     * @param key 选中菜单项的 index
     * @param keyPath 选中菜单项的 index path
     */
    handleMenuSelect (key, keyPath) {
      this.activeIndex = key
      if (this.activeNames.indexOf(key) === -1) { // 添加与所选菜单对应的折叠面板展开项
        this.activeNames.push(key.toString())
      }
      this.authList.forEach((item, index) => {
        if (key === index.toString()) { // 页面滚动匹配到被选菜单
          item.isCollapsed = false // 打开当前项
          const scroll = this.$refs.scroll
          const authItemTops = this.getAuthItemTop(false)
          const authTop = authItemTops[index]
          scroll.scrollTop = authTop + this.functionOffHeight - 50
        }
      })
    },
    /**
     * 获取功能区域每一项距离页面顶部的距离+ 该区域高度
     * @param isNeedClientHeight 是否需要计算区域本身高度
     * @returns {[]} 返回距离数组
     */
    getAuthItemTop (isNeedClientHeight) {
      const authItemTops = []
      this.$refs.collapseItem.forEach((item) => {
        const itemTop = item.$el.offsetTop + (isNeedClientHeight ? item.$el.clientHeight : 0)
        authItemTops.push(itemTop)
      })
      return authItemTops
    },
    /**
     * 保存编辑
     */
    confirm () {
      this.ruleForm.permissionIds = this.creatPostpermissionIds()
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.saveRole()
        } else {
          return false
        }
      })
    },
    /**
     * 组建二级模块树结构
     * @param secondModules 二级权限数组
     * @para menus 三级菜单数组
     * @returns {[]} 二级权限和三级菜单组成的数据，处理接口的一维数组，按照组件之前使用的树状结构从新生成
     */
    createSecondModuleData (secondModules, menus) {
      const array = []
      secondModules.forEach((itemSecond, indexSecond) => {
        array.push({
          pid: itemSecond.pid,
          moduleName: itemSecond.name,
          code: itemSecond.code,
          adminPermissionId: itemSecond.adminPermissionId,
          isChecked: itemSecond.isChecked,
          authArray: []
        })
        menus.forEach(itemThird => {
          if (itemSecond.adminPermissionId === itemThird.pid) {
            array[indexSecond].authArray.push({
              pid: itemThird.pid,
              code: itemThird.code,
              name: itemThird.name,
              adminPermissionId: itemThird.adminPermissionId,
              isChecked: itemThird.isChecked
            })
          }
        })
      })
      return array
    },
    /**
     * 组建权限数据渲染所需的树结构
     * @param modules 一级权限数组
     * @param secondModuleArray 二级权限数组
     * @returns {[]}
     */
    createModuleTree (modules, secondModuleArray) {
      const moduleArray = []
      modules.forEach((item, index) => {
        this.activeNames.push(index.toString()) // 默认展开所有权限模块
        moduleArray.push({
          moduleName: item.name,
          code: item.code,
          adminPermissionId: item.adminPermissionId,
          isChecked: item.isChecked,
          isIndeterminate: false, // checkbox聚焦标志
          checkAll: item.checkAll || false, // CheckBox全选标志
          isCollapsed: false, // 折叠面板标志
          children: []
        })
        secondModuleArray.forEach(itemArray => {
          if (itemArray.pid === item.adminPermissionId) {
            moduleArray[index].children.push(itemArray)
          }
        })
      })
      return moduleArray
    },
    /**
     * 处理接口返回的权限数据，组合成组件所需树结构
     */
    handlePermissionList () {
      const modules = this.allPermissionList.filter(item => { // 获取一级模块
        return item.pid === null && item.type === 0
      })
      const secondModules = this.allPermissionList.filter(item => { // 获取二级权限
        return item.pid !== null && item.type === 0
      })
      const menus = this.allPermissionList.filter(item => { // 获取三级菜单
        return item.pid !== null && item.type === 1
      })
      const secondModuleArray = this.createSecondModuleData(secondModules, menus)
      const moduleArray = this.createModuleTree(modules, secondModuleArray)
      this.authList = moduleArray
      console.log(this.authList, 'this.authList')
    },
    /**
     * 保存角色
     */
    saveRole () {
      if (this.pageType === 'edit') {
        const params = { ...this.ruleForm, adminRoleId: this.adminRoleId }
        this.editRole(params)
      } else {
        this.addRole(this.ruleForm)
      }
    },
    /**
     * 新增角色
     * @param params
     * @returns {Promise<void>}
     */
    async addRole (params) {
      const result = await addRole(params)
      if (result) {
        this.$router.push({ name: 'RoleManage' })
      }
    },
    /**
     * 编辑角色
     * @param params
     * @returns {Promise<void>}
     */
    async editRole (params) {
      const result = await editRole(params)
      if (result || result === null) {
        this.$router.push({ name: 'RoleManage' })
      }
    },
    /**
     * 生成返回给后台的权限id数组
     * @returns {[]}
     */
    creatPostpermissionIds () {
      const list1 = this.authList.filter(item => {
        return (item.isChecked || item.isIndeterminate)
      })
      const permissionIds = []
      list1.map(item1 => {
        if (item1.isChecked) {
          permissionIds.push(item1.adminPermissionId)
        }
        const item2 = item1.children.filter(itemChildren => {
          return itemChildren.isChecked
        })
        item2.map(item2 => {
          if (item2.isChecked) {
            permissionIds.push(item2.adminPermissionId)
          }
          item2.authArray.filter(itemAuth => {
            if (itemAuth.isChecked) {
              permissionIds.push(itemAuth.adminPermissionId)
            }
            return itemAuth.isChecked
          })
        })
      })
      return permissionIds
    }
  },
  filters: {}
}
</script>

<style scoped lang="scss">
  .module-add {
    position: absolute;
    left: 0;
    top: 45px;
    bottom: 0;
    right: 0;
    li {
      list-style: none;
    }
    /deep/ label {
      font-weight: normal;
    }
    .module-add-swapper {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: auto;
      .functions-wrapper {
        width: 1366px;
        .functions-wrapper-collapse {
          width: 942px;
          display: inline-block;
        }
        .functions-menu {
          display: inline-block;
          margin-left: 29px;
        }
      }
      .module-form-item {
        position: relative;
        &:first-child {
          margin-top: 30px;
        }
        margin-bottom: 30px;
        .input-comment {
          width: 400px;
        }
        .name-count {
          position: absolute;
          left: 169px;
          bottom: -27px;
        }
        .comment-count {
          position: absolute;
          left: 373px;
          bottom: -27px;
        }
      }
      .module-choose {
        color: #347eff;
        border: 1px solid #347eff;;
      }
      .module-name {
        display: inline-block;
        width: 112px;
      }
      .collapse-title-icon {
        position: absolute;
        top: 0;
        right: 14px;
      }
      .el-icon-custom-spread {
        transition: transform .3s;
        &.is-active {
          transform: rotate(180deg);
        }
      }
      .module-confirms {
        text-align: center;
        margin-bottom: 40px;
      }
    }
    /*折叠面板样式修改*/
    /deep/ .el-collapse {
      border-top: none;
      border-bottom: none;
    }

    /deep/ .el-collapse-item__header {
      border-bottom: none;
      height: 40px;
      background-color: #f3f7fd;
      width: 100%;
      line-height: 40px;
      padding-left: 15px;
    }

    /deep/ .el-collapse-item {
      /*width: 716px;*/
      background-color: #ffffff;
      border: dashed 1px #c6cfde;
      box-sizing: border-box;
      margin-top: 20px;
    }

    /deep/ .el-collapse-item__wrap {
      border-bottom: none;
    }

    /deep/ .checkbox-level2.el-checkbox {
      display: block;
      height: 60px;
      line-height: 60px;
      box-sizing: border-box;
      border-top: 1px dashed #e1e7f0;
      padding-left: 15px;
    }

    .checkbox-level2 /deep/ .el-checkbox:first-child {
      border-top: none
    }

    /deep/ .el-checkbox-group {
      padding: 0 20px;
    }

    /deep/ .el-button {
      margin-left: 10px;
    }

    /deep/ .el-icon-arrow-right:before {
      content: "\e61c";
    }

    /deep/ .el-collapse-item__arrow {
      display: none;
    }

    /deep/ .el-collapse-item__header {
      position: relative;
    }
  }
</style>
