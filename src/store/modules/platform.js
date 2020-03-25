/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/27 11:24
 *   @Author wangqiaozhen (wangqiaozheng@codyy.com)
 *   @Description 当前域名平台状态信息
 */

const platform = {
  state: {
    platformId: '', // 平台ID
    baseUserId: '', // 登录用户id
    platformType: 0, // 平台类型（0：区域平台，1：校级平台）
    status: 0, // 平台状态 1 开启 0 关闭
  },
  getters: {
    platformId: state => state.platformId,
    baseUserId: state => state.baseUserId,
    platformType: state => state.type,
  },
  mutations: {
    setPlatformId (platformId) {
      this.state.platformId = platformId
    },
  },
  actions: {
    setPlatformId: ({ commit }, platformId) => {
      commit('setPlatformId', platformId)
    }
  }
}

export default platform
