<template>
  <!--    新增角色权限菜单组件-->
  <div class="module-auth-menu">
    <el-menu :default-active="activeIndex" ref="authModuleMenu" @select="handleMenuSelect" :class="{'on-scroll-top':isOnScrollTop}">
      <el-menu-item v-for="(name, index) in moduleNames"
                    :index="index.toString()"
                    :key="index"
                    class="font-small">
        <span>{{name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
/*
 * Description AuthModuleMenu
 * Created By Administrator
 * Created At 2019/11/12 11:32
 */
export default {
  name: 'AuthModuleMenu',
  props: {
    activeIndex: { // 菜单选中项index值
      type: String,
    },
    isOnScrollTop: { // 页面是否滚动到顶部
      type: Boolean
    },
    moduleNames: { // 菜单名数组
      type: Array
    }
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
    handleMenuSelect (key, keyPath) {
      this.$emit('handleMenuSelect', key, keyPath)
    }
  }
}
</script>

<style scoped lang="scss">
  .module-auth-menu {
    display: inline-block;
    margin-left: 29px;
    vertical-align: top;
    /deep/ .el-menu {
      width: 134px;
      background-color: #f3f7fd;
      border-radius: 5px;
      border: solid 1px #c6cfde;
      text-align: center;
      padding: 10px 12px 20px 12px;
      margin-top: 20px;
      &.on-scroll-top {
        position: fixed;
        top: 85px;
      }
      .el-menu-item {
        color: #515974;
        margin-top: 10px;
        height: unset;
        line-height: unset;
        border-radius: 12px;
        > span {
          height: 24px;
          line-height: 24px;
          text-align: center;
          display: block;
        }
        &.is-active {
          color: #fff;
          background: #347eff;
        }
      }
    }
  }
</style>
