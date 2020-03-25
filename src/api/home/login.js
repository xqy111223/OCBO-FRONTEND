import request from '@/utils/request'
import md5 from 'js-md5'
import URLS from '@/api/OCURL'

/**
 * 登陆
 * @param params
 */
export function login (params) {
  console.log('password****', md5(params.passWord))
  const data = {
    loginName: params.loginName,
    // password: md5(params.passWord)
    passWord: params.passWord
  }
  return request({
    url: URLS.login,
    method: 'post',
    data: data
  })
}

/**
 * 登出
 * @param id
 */
export function logout (id) {
  const data = {
    userId: id
  }
  return request({
    url: URLS.logout,
    method: 'get',
    params: data
  })
}

/**
 * 根据token获取用户信息
 * @param token
 */
export function getUserInfo () {
  return request({
    url: URLS.token,
    method: 'get',
  })
}
