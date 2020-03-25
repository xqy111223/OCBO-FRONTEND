<template>
  <div class="app-wrapper">
    <header-bar></header-bar>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <app-main/>
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar } from './components'
import HeaderBar from './components/HeaderBar'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    HeaderBar
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
</style>
