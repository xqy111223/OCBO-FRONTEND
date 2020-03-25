import Vue from 'vue'
import Router from 'vue-router'
import backStage from './modules/backStage'
import fontStage from './modules/fontStage'
import basicConfiguration from './modules/basicConfiguration'
import knowledgeNetwork from './modules/knowledgeNetwork'
import functionConfiguration from './modules/functionConfiguration'
import applicationManage from './modules/applicationManage'
import configManage from './modules/configManage'
import logManage from './modules/logManage'
import mobileManage from './modules/mobileManage'
import Layout from '@/views/framework/Layout'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }, {
    path: '/',
    component: Layout,
    redirect: '',
    name: 'home',
    meta: { title: '首页', icon: 'el-icon-custom-house' },
    children: [{
      path: '/',
      component: () => import('@/views/home/Welcome/index'),
      meta: { title: '首页' }
    }]
  }, {
    path: '/simple',
    component: Layout,
    redirect: '/',
    name: 'simple',
    meta: { title: '示例', icon: 'el-icon-custom-house' },
    children: [{
      path: '/simple',
      component: () => import('@/views/Simple.vue'),
      meta: { title: '示例' }
    }]
  }, {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  backStage,
  fontStage,
  basicConfiguration,
  knowledgeNetwork,
  functionConfiguration,
  applicationManage,
  configManage,
  mobileManage,
  logManage
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  mode: 'history',
  fallback: true,
  historyApiFallback: {
    index: 'index.html'
  }
})

export const asyncRouterMap = [
  backStage,
  fontStage,
  basicConfiguration,
  knowledgeNetwork,
  functionConfiguration,
  applicationManage,
  configManage,
  mobileManage,
  logManage
]
