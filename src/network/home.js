import { request_POST, request_GET } from "./network";

export function toGetImages(data={}) {
  return request_GET('/shop/image', data)
}

export function toGetGoodsList(data={}) {
  return request_GET('/shop/shopStreet', data)
}
