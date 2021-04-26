import {request} from "./network";

import { request_POST, request_GET } from "./network";

// 获取首页相关的多个数据
export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

// 获取首页展示的商品的相关数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}


export function toGetImages(data={}) {
  return request_GET('/shop/image', data)
}
