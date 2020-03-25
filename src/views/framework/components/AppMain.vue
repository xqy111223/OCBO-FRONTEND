<template>
  <section class="app-main">
    <navbar></navbar>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
    </transition>
  </section>
</template>

<script>
import Navbar from './Navbar'

export default {
  name: 'AppMain',
  components: { Navbar },
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
  .app-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 70px);
    max-height: calc(100vh - 70px);
    width: 100%;
    position: relative;
    overflow: auto;
    background: #FFF;
    box-shadow: 6px 9px 10px 3px rgba(0, 0, 0, 0.08);
    padding: 15px;
  }
</style>
