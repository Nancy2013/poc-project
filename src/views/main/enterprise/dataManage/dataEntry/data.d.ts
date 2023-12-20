import { CreateSkuRequest } from './server'
import { RenderFormItem } from "@/components/form";

export interface CreateSkuFormData {
	/**
	 *  产品型号
	 */
	sku?: string
	/**
	 * 批次号
	 */
	batchNo?: string
	/**
	 * 模型名称
	 */
	modelId?: string
}

export interface BatchState {
	/**
	 * 是否显示新增弹框
	 */
	visible: boolean
	/**
	 * 新增弹框表单数据
	 */
	formData: CreateSkuFormData
	/**
	 * 渲染搜索
	 */
	searchRenderList: RenderFormItem[]
}

