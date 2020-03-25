<template>
  <div class="module-view-role">
    <el-dialog
      width="507px"
      title="查看角色"
      :before-close="cancel"
      :visible.sync="isVisible">
      <el-form>
        <el-form-item>
          <label class="item-label-name">角色名称：</label>
          <span class="color-label">{{roleDetailData.roleName}}</span>
        </el-form-item>
        <el-form-item>
          <label class="item-label-name">备注：</label>
          <span class="color-label">{{roleDetailData.remark}}</span>
        </el-form-item>
        <el-form-item>
          <label class="item-label-name">功能：</label>
          <div class="role-auth-box">
            <el-row v-for="item in authData" :key="item.adminPermissionId">
              <el-checkbox
                disabled
                checked
                class="item-checkbox-first">
                {{item.name}}
              </el-checkbox>
              <el-col class="ml-20"
                      v-for="secondItem in item.children"
                      :key="secondItem.adminPermissionId">
                <el-checkbox
                  disabled
                  checked
                  class="item-checkbox-second">
                  {{secondItem.name}}
                </el-checkbox>
                <el-col class="ml-20">
                  <el-checkbox
                    v-for="thirdItem in secondItem.authArray"
                    :key="thirdItem.adminPermissionId"
                    disabled
                    checked
                    class="item-checkbox-third">
                    {{thirdItem.name}}
                  </el-checkbox>
                </el-col>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/*
 * Description ViewUser
 * Created By Administrator
 * Created At 2019/9/26 11:38
 */

export default {
  name: 'ViewRole',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleDetailData: {
      type: Object,
    },
  },
  data () {
    return {
      checkList: [],
      authData: [],
      defaultKeys: [],
      defaultProps: { // 设置和data中对应的属性值，来渲染el-tree
        children: 'permissions',
        label: 'name'
      }
    }
  },
  mounted () {
  },
  computed: {
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    }
  },
  watch: {
    /**
     * 监听角色数据
     * @param newVal 新的值
     * @param oldVal 旧的值
     */
    roleDetailData (newVal, oldVal) {
      this.creatPermissionTree(newVal)
    }
  },
  methods: {
    creatPermissionTree (roleData) {
      if (roleData.permissionList.length > 0) {
        this.handlePermissionList(roleData.permissionList)
      }
    },
    /**
     * 处理接口返回的权限数据，组合成组件所需树结构
     * @param list
     */
    handlePermissionList (list) {
      const modules = list.filter(item => { // 获取一级模块
        return item.pid === null && item.type === 0
      })
      const secondModules = list.filter(item => { // 获取二级权限
        return item.pid !== null && item.type === 0
      })
      const menus = list.filter(item => { // 获取三级菜单
        return item.pid !== null && item.type === 1
      })
      const secondModuleArray = this.createSecondModuleData(secondModules, menus)
      const moduleArray = this.createModuleTree(modules, secondModuleArray)
      this.authData = moduleArray
      console.log(this.authData, '======')
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
          name: itemSecond.name,
          code: itemSecond.code,
          adminPermissionId: itemSecond.adminPermissionId,
          authArray: []
        })
        menus.forEach(itemThird => {
          if (itemSecond.adminPermissionId === itemThird.pid) {
            array[indexSecond].authArray.push({
              pid: itemThird.pid,
              code: itemThird.code,
              name: itemThird.name,
              adminPermissionId: itemThird.adminPermissionId,
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
        moduleArray.push({
          name: item.name,
          code: item.code,
          adminPermissionId: item.adminPermissionId,
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
    cancel () {
      this.isVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
  .module-view-role {
    .el-form-item {
      margin-bottom: 0;
      .item-label-name {
        width: 70px;
        text-align: right;
        display: inline-block;
        color: #6e758f;
        font-weight: normal;
      }
    }
    .role-auth-box {
      border: 1px dashed #c6cfde;
      height: 335px;
      overflow-y: auto;
      overflow-x: hidden;
      margin-left: 29px;
      margin-top: 9px;
      padding: 15px 18px 50px;
      box-sizing: border-box;
      .item-checkbox-first {
        /deep/ .el-checkbox__label {
          color: #293152;
        }
      }
      .item-checkbox-second {
        /deep/ .el-checkbox__label {
          color: #515974;
          font-size: 12px;
        }
      }
      .item-checkbox-third {
        width: 70px;
        /deep/ .el-checkbox__label {
          color: #6e758f;
          font-size: 12px;
        }
      }
    }
    /deep/ .el-dialog > .el-dialog__body {
      max-height: 497px;
    }
  }
</style>
