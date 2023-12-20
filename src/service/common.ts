import request from "@/utils/axios";
import { formatData } from './utils'

/**
 * 
 * @param params 获取字典接口
 * @returns 
 */
export const requestDict =  <T, K>(params: T) => request<T, Array<K>>(formatData('/system/dict-data/type', 'get', params))
