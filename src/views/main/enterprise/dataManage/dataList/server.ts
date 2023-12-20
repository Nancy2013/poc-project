import request from "@/utils/axios"

/**
 * @returns 分页查询数据管理列表
 */
export const getCollectProductData = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/collect-product-data/page",
		data: params
	})
}

/**
 * @returns 创建护照数据基础模型
 */
export const createPassportBaseModel = (params: any) => {
   return request({
	  method: 'post',
	  url: import.meta.env.VITE_BASE_URL + "/dpp-platform/passport-base-model/create",
	  data: params
   })
}


/**
 * @returns 获得护照数据基础模型
 */
export const getPassportBaseModel = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/passport-base-model/get",
		data: params
	})
}

/**
 * @returns 获得护照数据详情
 */
export const getPassportBaseModelDetail = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/collect-product-data/get",
		data: params
	})
}

/**
 * 聚合分页查询数据管理列表
 */
export const getACollectProductData = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/collect-product-data/aggregatePage",
		data: params
	})
}
 