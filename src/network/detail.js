import { request_POST, request_GET } from "./network";

export function toGetGoodsDetails(data={}) {
	return request_GET('/shop/shop', data)
}