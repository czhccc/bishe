import { request_POST, request_GET } from "./network";

export function toGetCategoryType(data={}) {
  return request_GET('/shop/type', data)
}

export function toGetCategoryTypeGoods(data={}) {
  return request_GET('/shop/shopStreet', data)
}
