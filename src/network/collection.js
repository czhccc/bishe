import { request_POST, request_GET } from "./network";

export function toGetCollectionList(data={}) {
  return request_GET('/mine/collection', data)
}

export function toAddCollection(data={}) {
  return request_GET('/mine/insertCol', data)
}

export function toCancelCollection(data={}) {
  return request_GET('/mine/removeCol', data)
}

export function toCheckCollectionStatus(data={}) {
  return request_GET('/mine/isCol', data)
}