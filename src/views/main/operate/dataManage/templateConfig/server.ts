import request from "@/utils/axios"

/**
 * 获取运营端模板配置列表的请求参数
 */
export interface GetTemplateConfigListRequest extends GetListRequest {
	/**
	 * 行业类别
	 */
	industryType?: string
	/**
	 * 模板Id
	 */
	templateId?: string
	/**
	 * 状态
	 */
	status?: Status
}

export interface TemplateConfigItem {
	/**
	 * ID
	 */
	id: string
	/**
	 * 模板id
	 */
	templateId: string
	/**
	 * 行业类别
	 */
	industryType: string
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
 * 获取字典值的请求数据
 */
export interface GetDictRequest {
	/**
	 * 类型
	 */
	type: string
}

/**
 * 获取行业类别字典值的响应数据
 */
export interface IndustryItem {
	/**
	 * 类型
	 */
	dictType: string
	/**
	 * id
	 */
	id: number
	/**
	 * label
	 */
	label: string
	/**
	 * 对应的值
	 */
	value: string
}

export interface PlatformItem {
	/**
	 * id
	 */
	id: string
	/**
	 * 父级id
	 */
	parentId: string
	/**
	 * 模型参数类型(1电池信息 2材料信息 3ESG信息 4产业链数据 5维修信息)
	 */
	paramCategory: ParamCategory
	/**
	 * 模型参数类型的中文描述
	 */
	paramCategoryName: string
	/**
	 * 模型参数code
	 */
	paramCode: string
	/**
	 * 该字段定义的字典
	 */
	paramDict: string
	/**
	 * 前端展示json
	 */
	showType: string
	/**
	 * 前端展示类型text,image
	 */
	paramType: string
	/**
	 * JSON Key
	 */
	paramKey: string
	/**
	 * 国际化名称Json
	 */
	paramNameI18n: string
	/**
	 * 默认名称
	 */
	paramName: string
	/**
	 * 模型参数详细注解json
	 */
	paramDescI18n: string
	/**
	 * 模型参数详细注解
	 */
	paramDesc: string
	/**
	 * 平台端制作模板使用 是否必填 1是 0否
	 */
	requireFlag: BooleanDefault
	/**
	 * 行业
	 */
	industry: string
	/**
	 * es字段类型
	 */
	esFieldType: string
	/**
	 * 排序
	 */
	sort: number
	/**
	 * 单位
	 */
	unit: string
	/**
	 * 备注
	 */
	remark: string
	/**
	 * 状态 1启用 0停用
	 */
	status: Status
	/**
	 * 创建时间
	 */
	createTime: string

	value: boolean
	children?: PlatformItem[]
}

export interface GetPlatformListResponse {
	category: {
		[index: string] : string
	}
	modelParamDefineResultList: Array<PlatformItem>
}
/**
 * 获取企业端数据管理模型配置列表
 * @returns 
 */
export const requestTemplateConfigList = (params: any) => {
	return request<GetTemplateConfigListRequest, GetListResponse<TemplateConfigItem>>({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/platformPage",
		data: params
	})
}

/**
 * 获得模型参数列表
 * @returns 
 */
export const requestGetPlatformList = () => {
	return request<unknown, GetPlatformListResponse>({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-param-define/list",
		data: {}
	})
}

/**
 * 获得模型参数列表
 * @returns 
 */
export const requestGetPlatformDetail = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/platformGet",
		data: params
	})
}

/**
 * 获得模型参数列表
 * @returns 
 */
export const requestGetPlatformListEdit = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/model-template-detail/platformList-by-template-id",
		data: params
	})
}

/**
 * 创建模型参数
 * @returns 
 */
export const requestCreatePlatform = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/platformCreate",
		data: params
	})
}

/**
 * 编辑模型参数
 * @returns 
 */
export const requestUpdatePlatform = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/platformUpdate",
		data: params
	})
}

/**
 * 更新模型参数状态
 * @returns 
 */
export const requestUpdateStatusPlatform = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-template/platformUpdateStatus",
		data: params
	})
}

