import request from "@/utils/axios"

/**
 * 获取企业端数据管理模型配置列表的请求参数
 */
export interface GetDataCollectConfigListRequest extends GetListRequest {
	/**
	 * 模型名称
	 */
	modelName?: string
	/**
	 * 模板名称
	 */
	templateName?: string
	/**
	 * 状态
	 */
	status?: Status
}

export interface DataCollectConfigItem {
	/**
	 * ID
	 */
	id: string
	/**
	 * 模板id
	 */
	templateId: string
	/**
	 * 模板名称
	 */
	templateName: string
	/**
	 * 电池型号
	 */
	batterySku: string
	/**
	 * 模型名称
	 */
	modelName: string
	/**
	 * 已参选数量
	 */
	num: string
	/**
	 * 状态
	 */
	status: Status
	/**
	 * 创建者
	 */
	creator: string
	/**
	 * 创建时间
	 */
	createTime: string
	/**
	 * 最后更新时间
	 */
	updateTime: string
	/**
	 * 更新人
	 */
	updater: string
}


/**
 * 
 * @returns 获取企业端数据管理模型配置列表
 */
export const getDataCollectConfigList = (params: GetDataCollectConfigListRequest) => {
	return request<GetDataCollectConfigListRequest, GetListResponse<DataCollectConfigItem>>({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/page",
		data: params
	})
}

/**
 * 获取模型详情
 * @returns 
 */
export const requestUpdateModelStatus = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/updateStatus",
		data: params
	})
}


/**
 * 创建模型
 * @returns 
 */
export const requestCreateModel = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/create",
		data: params
	})
}

/**
 * 创建模型
 * @returns 
 */
export const requestUpdateModel = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/update",
		data: params
	})
}

/**
 * 获取模型详情
 * @returns 
 */
export const requestGetModelDetail = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/get",
		data: params
	})
}

/**
 * 获取模型对应的参数列表
 * @returns 
 */
export const requestGetModelPlatformList = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/model-template-detail/list-by-template-id",
		data: params
	})
}