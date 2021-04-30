import { request_POST, request_GET } from "./network";

export function toSelectCart(data={}) {
  return request_GET('/ShopCar/selectCar', data)
}

export function toAddIntoCart(data={}) {
  return request_GET('/ShopCar/insert', data)
}
