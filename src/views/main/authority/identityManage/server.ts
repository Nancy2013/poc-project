import request from "@/utils/axios"
import qs from 'qs'

/**
 * 获取角色列表
 * @returns 
 */
export const requestGetRoleList = (params: any) => {
	return request({
		method: 'get',
		url: import.meta.env.VITE_BASE_URL + "/system/role/page",
		params: params,
		paramsSerializer: function (params: any) {
			return qs.stringify(params, { arrayFormat: 'brackets' })
		}
	}) as any
}

/**
 * 获取角色列表
 * @returns 
 */
export const requestCreateRole = (params: any) => {
	return request({
		method: 'post',
		url: import.meta.env.VITE_BASE_URL + "/system/role/create",
		data: params,
	}) as any
}

/**
 * 获取角色列表
 * @returns 
 */
export const requestUpdateRole = (params: any) => {
	return request({
		method: 'put',
		url: import.meta.env.VITE_BASE_URL + "/system/role/update",
		data: params,
	}) as any
}

