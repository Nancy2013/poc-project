import request from "@/utils/axios"

export interface CreateSkuRequest {
	/**
	 * modelId
	 */
	sku: string
	/**
	 * 批次号
	 */
	batchNo: string
	/**
	 * 模型名称
	 */
	modelId: string
}

/**
 * 获取产品数据列表
 * @returns 
 */
export const requestGetCollectProductList = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/collect-product-data/page",
		data: {...params, paramAllReady: false}
	}) as any
}

/**
 * 获取产品数据详情
 * @returns 
 */
export const requestGetCollectProductDetail = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/collect-product-data/get",
		data: params
	}) as any
}

/**
 * 单个录入产品数据
 * @returns 
 */
export const requestUpdateCollectProduct = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/collect-product-data/update",
		data: params
	}) as any
}

/**
 * 获取Sku列表
 * @returns 
 */
export const requestGetSkuList = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/manual-input/page",
		data: params
	}) as any
}

/**
 * 新增sku
 * @returns 
 */
export const createSkuRequest = (params: CreateSkuRequest) => {
	return request<CreateSkuRequest, unknown>({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/manual-input/create",
		data: params
	})
}

/**
 * 获取产品数据详情
 * @returns 
 */
export const requestGetCollectProductBatchDetail = (params: any) => {
	return request<any, any>({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/collect-manual-input-detail/list",
		data: params
	})
}

/**
 * 批量录入产品数据
 * @returns 
 */
export const requestBatchUpdateCollectProduct = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/collect-manual-input-detail/update",
		data: params
	}) as any
}