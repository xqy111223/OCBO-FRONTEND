import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import platform from './modules/platform'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission,
    platform,
    user
  },
  getters
})

export default store
