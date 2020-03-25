import request from '@/utils/request'
import md5 from 'js-md5'
import URLS from '@/api/OCURL'

export function changePassword (confirmPassword, newPassword, oldPassword) {
  const data = {
    confirmPassword: md5(confirmPassword),
    newPassword: md5(newPassword),
    oldPassword: md5(oldPassword)
  }
  return request({
    url: URLS.changePassword,
    method: 'get',
    params: data
  })
}
