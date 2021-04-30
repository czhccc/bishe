import {request} from "./network";
import { request_POST, request_GET } from "./network";


export function getCategory() {
  return request({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}



export function toGetCategoryType(data={}) {
  return request_GET('/shop/type', data)
}

export function toGetCategoryTypeGoods(data={}) {
  return request_GET('/shop/shopStreet', data)
}
