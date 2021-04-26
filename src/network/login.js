import { request_POST } from './network'

export function getSms(data={}) {
  return request_POST('/login/mail', data)
}

export function signUp(data={}) {
  return request_POST('/login/register', data)
}

export function login(data={}) {
  return request_POST('/login/login', data)
}

export function modifyPassword(data={}) {
  return request_POST('/login/modify', data)
}