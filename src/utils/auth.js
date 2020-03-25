/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2020/1/13 11:28
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  请求token存放方式
 */
import Cookies from 'js-cookie'

const TokenKey = 'Codyy-Token'

export function getToken () {
  return getCookie(TokenKey)
}

export function setToken (token) {
  return setCookie(TokenKey, token)
}

export function removeToken () {
  return removeCookie(TokenKey)
}

export function getCookie (key) {
  return Cookies.get(key)
}

export function setCookie (key, value) {
  return Cookies.set(key, value)
}

export function removeCookie (key) {
  return Cookies.remove(key)
}

export function getSession (key) {
  return sessionStorage.getItem(key)
}

export function setSession (key, value) {
  return sessionStorage.setItem(key, value)
}

export function removeSession (key) {
  return sessionStorage.removeItem(key)
}

export function clearSession () {
  return sessionStorage.clear()
}
