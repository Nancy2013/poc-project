import { RenderFormItem } from "@/components/form";
import { Rules } from '@/components/form/index'
import { ColumnType } from 'ant-design-vue/lib/table/interface'


export const searchRenderList: RenderFormItem[] = [
	{
		label: '产品型号',
		key: 'productSku',
		type: 'input',
		placeholder: '请输入'
	},
	{
		label: '批次号',
		key: 'batchNo',
		type: 'input',
		placeholder: '请输入'
	},
	{
		label: '模型名称',
		key: 'modelId',
		type: 'select',
		placeholder: '请选择',
		options: []
	}
]

export const tableColumns: ColumnType[] = [
	{
		dataIndex: "tableIndex",
		key: "tableIndex",
		title: "序号",
		width: 80
	},
	{
		dataIndex: "productSku",
		key: "productSku",
		title: "产品型号",
		width: 120,
	},
	{
		key: "batchNo",
		title: "批次号",
		dataIndex: "batchNo",
		width: 120
	},
	{
		key: "modelName",
		title: "模型名称",
		dataIndex: "modelName",
		width: 140,
	},
	{
		key: "collectSum",
		title: "已采集数据量",
		dataIndex: "collectSum",
		width: 140
	},
	{
		key: "createTime",
		title: "创建时间",
		dataIndex: "createTime",
		width: 140
	},
	{
		key: "updateTime",
		title: "最后更新时间",
		dataIndex: "updateTime",
		width: 140
	},
	{
		key: "action",
		title: "操作",
		dataIndex: "action",
		width: 100,
	},
]

/**
 * 新增SKU的表单渲染数据
 */
export const renderFormList: RenderFormItem[] = [
	{
		required: true,
		label: '产品型号',
		key: 'productSku',
		type: 'input',
		placeholder: '请输入产品型号',
		width: '100%'
	},
	{
		required: true,
		label: '批次号',
		key: 'batchNo',
		type: 'input',
		inputType: 'word',
		maxlength: 30,
		width: '100%',
		placeholder: '请输入批次号'
	},
	{
		required: true,
		label: '模型名称',
		key: 'modelId',
		type: 'select',
		width: '100%',
		placeholder: '请选择模型名称',
		options: []
	}
]

export const formRules: Rules = {
	sku: [
		{ required: true, message: '请输入产品型号', trigger: 'blur' }
	],
	batchNo: [
		{ required: true, message: '请输入批次号', trigger: 'blur' },
	],
	modelId: [
		{ required: true, message: '请选择模型名称', trigger: 'blur' },
	]
}