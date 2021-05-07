import { request_POST, request_GET } from "./network";

export function toSelectCart(data={}) {
  return request_GET('/ShopCar/selectCar', data)
}

export function toAddIntoCart(data={}) {
  return request_GET('/ShopCar/insert', data)
}

export function toAddCartNumber(data={}) {
  return request_GET('/ShopCar/add', data)
}

export function toSubCartNumber(data={}) {
  return request_GET('/ShopCar/reduce', data)
}

export function toRemoveCartGood(data={}) {
  return request_GET('/ShopCar/remove', data)
}
