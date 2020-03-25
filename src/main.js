import 'babel-polyfill'
import Vue from 'vue'
import http from '@/utils/request'
import { errorHandle } from './utils/error'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import 'normalize.css/normalize.css' // reset CSS
import Element from 'element-ui'
import '@/theme/index.css'
import directive from './directive'

import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons/iconfont/iconfont.css' // icon
// import './errorLog' // error log
import './permission' // permission control
import * as filters from './filters' // global filters
import MessageMixin from './components/mixins/message'
import config from './config/config'

Vue.config.errorHandler = errorHandle
try {
  Sentry.init({
    dsn: config.sentryDNS,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  })
} catch (e) {
  console.error(e)
}

// import './mock' // simulation data
Vue.use(Element, {
  size: Cookies.get('size') || 'medium'// set element-ui default size
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.filter('date', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return value ? dayjs(value).format(formatString) : '--'
})

if (process.env.NODE_ENV === 'development') { // 开发环境下
  require('./mock')
}
Vue.use(directive)
Vue.config.productionTip = false
Vue.prototype.axios = http
Vue.mixin(MessageMixin)
window.$vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
