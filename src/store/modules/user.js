/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2020/1/13 11:34
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  用户信息 + token
 */
import { getCookie, removeCookie, removeToken, setCookie, setToken } from '@/utils/auth'

const userInfo = JSON.parse(getCookie('userInfo') || '{}') // 刷新获取cookie中的缓存信息(刷新完接口请求header中token依旧在cookie中getToken()取，userInfo其他页面取store中值)

const user = {
  state: {
    userInfo: userInfo,
    adminUserId: userInfo.adminUserId,
    loginName: userInfo.loginName,
    userName: userInfo.userName,
    permission: userInfo.permission,
    token: '',
  },
  getters: {
    userInfo: state => state.userInfo,
    adminUserId: state => state.adminUserId,
    loginName: state => state.loginName,
    userName: state => state.userName,
    permission: state => state.permission,
    token: state => state.token,
  },
  mutations: {
    SET_USER_INFO (state, userInfo) {
      state.adminUserId = userInfo.adminUserId
      state.loginName = userInfo.loginName
      state.userName = userInfo.userName
      state.permission = userInfo.permission
      state.userInfo = userInfo
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    LOGOUT (state) {
      state.userInfo = {}
      state.token = ''
    },
  },
  actions: {
    /**
     * cookie中插入token，刷新不失效 登录成功注入用户信息
     * @param commit
     * @param userInfo
     * @constructor
     */
    SET_USER_INFO ({ commit }, userInfo) {
      setCookie('userInfo', JSON.stringify(userInfo))
      commit('SET_USER_INFO', userInfo)
    },
    /**
     * 登出
     * @param commit
     * @constructor
     */
    LOGOUT ({ commit }) {
      removeToken()
      removeCookie('userInfo')
      commit('LOGOUT')
    },
    /**
     * token
     * @param commit
     * @param userInfo
     * @constructor
     */
    SET_TOKEN ({ commit }, token) {
      setToken(token)
      commit('SET_TOKEN', token)
    }
  }
}

export default user
