import { request_POST, request_GET } from "./network";

export function toGetAddressList(data={}) {
  return request_GET('/mine/addressList', data)
}

export function toAddAddress(data={}) {
  return request_GET('/mine/insertAddress', data)
}

export function toUpdateAddress(data={}) {
  return request_GET('/mine/updateAddress', data)
}

export function toDeleteAddress(data={}) {
  return request_GET('/mine/removeAddress', data)
}