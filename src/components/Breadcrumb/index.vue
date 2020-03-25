<template>
  <el-breadcrumb class="app-breadcrumb" separator="-" :class="navClass">
    <transition-group name="breadcrumb">
      <template v-for="(item,index) in levelList">
        <el-breadcrumb-item v-if="item.meta.title&&item.meta.breadcrumb!==false"
                            :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1"
              class="no-redirect">{{item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data () {
    return {
      levelList: null
    }
  },
  computed: {
    navClass () {
      return {
        single: this.levelList.length === 1,
        many: this.levelList.length > 1
      }
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      const matched = this.$route.matched.filter(item => {
        if (item.name) {
          return true
        }
      })
      // const first = matched[0]
      // if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
      //   debugger
      //   matched = [{ path: '/dashboard', meta: { title: 'dashboard' } }].concat(matched)
      // }
      this.levelList = matched
      if (this.levelList.every(n => n.name === 'home')) {
        this.$emit('hide', true)
      } else {
        this.$emit('hide', false)
      }
    },
    pathCompile (path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      const toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 45px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
