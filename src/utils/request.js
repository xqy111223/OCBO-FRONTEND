import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import * as RESPONSE_STATUS from '@/constants/RESPONSE_CODE'
import { MessageBox } from 'element-ui'

// axios.defaults.headers.post['Content-Type'] = 'Content-Type:application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
const service = axios.create({
  baseURL: '/api',
  timeout: 15 * 1000, // request timeout
})

/**
 * 请求发送
 */
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status === RESPONSE_STATUS.USER_UNCERTIFIED) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeToken()
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    } else if (res.status !== RESPONSE_STATUS.SUCCESS) {
      return Promise.reject(res)
    } else {
      return res.result
    }
  },
  error => {
    console.log('err' + error) // for debug
    MessageBox({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
