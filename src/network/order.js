import { request_POST, request_GET } from "./network";

export function toGetOrderList(data={}) {
	return request_GET('/mine/selectRecord', data)
}