<template>
  <div class="navbar" ref="navbar">
    <breadcrumb class="breadcrumb-container" @hide="hide"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    hide (isHide) {
      this.$nextTick(() => {
        this.$refs.navbar.style.display = isHide ? 'none' : 'block'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 45px;
    line-height: 45px;
    border-radius: 0px !important;

    .breadcrumb-container {
      float: left;
    }

    padding-left: 15px;
    margin: -15px -15px 15px -15px;
    border-bottom: 1px solid #ECECEC;
  }
</style>
