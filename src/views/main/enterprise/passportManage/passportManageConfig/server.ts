import request from "@/utils/axios"

/**
 * 接口定义
 * @returns 数据字典
 */
const dictDataType = (params: any) => {
   return request({
      method: 'get',
      url: import.meta.env.VITE_BASE_URL + "/system/dict-data/type", 
      params
   })
}

/**
 * 接口定义
 * @returns 更新状态
 */
const updateStatus = (params: any) => {
   return request({
      method: 'post',
      url: import.meta.env.VITE_BASE_URL + "/dpp-platform/passport/template/updateStatus",
      data: params
   })
}

/**
 * 接口定义
 * @returns 删除
 */
const deletePassportTemplate = (params: any) => {
   return request({
      method: 'post',
      url: import.meta.env.VITE_BASE_URL + "/dpp-platform/passport/template/delete",
      data: params
   })
}

/**
 * 接口定义
 * @returns 无模板选择列表
 */
const getDetailBySkuAndBatch = (params: any) => {
   return request({
      method: 'post',
      url: import.meta.env.VITE_BASE_URL + "/dpp-platform/passport/detailBySkuAndBatch",
      data: params
   })
}

/**
 * 接口定义
 * @returns 护照模板配置列表
 */
const getPassportTemplateList = (params: any) => {
   return request({
      method: 'post',
      url: import.meta.env.VITE_BASE_URL + "/dpp-platform/passport/template/page",
      data: params
   })
}

/**
 * 接口定义
 * @returns 创建护照模板
 */
const createPassportTemplate = (params: any) => {
   return request({
      method: 'post',
      url: import.meta.env.VITE_BASE_URL + "/dpp-platform/passport/template/create",
      data: params
   })
}

/**
 * 接口定义
 * @returns 更新护照模板
 */
const updatePassportTemplate = (params: any) => {
   return request({
      method: 'post',
      url: import.meta.env.VITE_BASE_URL + "/dpp-platform/passport/template/update",
      data: params
   })
}

/**
 * 接口定义
 * @returns 护照模板明细
 */
const getPassportTemplateDetail = (params: any) => {
   return request({
      method: 'post',
      url: import.meta.env.VITE_BASE_URL + "/dpp-platform/passport/template/passprot-template-detail/list-by-template-id",
      data: params
   })
}

/**
 * 接口定义
 * @returns 获得模型参数列表
 */
const getModelParamDefineList = () => {
   return request({
      method: 'post',
      url: import.meta.env.VITE_BASE_URL + "/dpp-platform/model-param-define/list",
      data: {}
   })
}

export {
  dictDataType,
  getDetailBySkuAndBatch,
  getPassportTemplateDetail,
  getPassportTemplateList,
  getModelParamDefineList,
  createPassportTemplate,
  updatePassportTemplate,
  updateStatus,
  deletePassportTemplate
}