declare interface ResponseData<T> {
	code: number;
	msg: string;
	data: T;
	rows: Array<T>;
	total?: number
}

declare interface Pagination {
	/**
	 * 总数
	 */
	total: number
	/**
	 * 当前页
	 */
	current: number
	/**
	 * 页数数量
	 */
	pageSize: number
}

/**
 * 获取列表参数的公共请求体
 */
declare interface GetListRequest {
	/**
	 * 当前页
	 */
	pageNo?: number
	/**
	 * 分页数量
	 */
	pageSize?: number
}

/**
 * 获取列表参数的公共响应体
 */
declare interface GetListResponse<T> {
	/**
	 * 列表数据
	 */
	list: Array<T>
	/**
	 * 总数量
	 */
	total: number
}

/**
 * 状态可选值 1启用 0 禁用
 */
declare type Status = 0 | 1

/**
 * 私是否 1是 0 否
 */
declare type BooleanDefault = 0 | 1

/**
 * 模型参数类型(1电池信息 2材料信息 3ESG信息 4产业链数据 5维修信息)
 */
declare type ParamCategory = 1 | 2 | 3 | 4 | 5