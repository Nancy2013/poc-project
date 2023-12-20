import { RenderFormItem } from "@/components/form";
import { ColumnType } from 'ant-design-vue/lib/table/interface'
import { statusOptions } from '@/utils/config'


export const searchRenderList: RenderFormItem[] = [
	{
		label: '模型名称',
		key: 'modelName',
		type: 'input',
		placeholder: '请输入'
	},
	{
		label: '状态',
		key: 'status',
		type: 'select',
		placeholder: '请选择',
		options: statusOptions
	},
	{
		label: '模版名称',
		key: 'templateId',
		type: 'select',
		options: [],
		placeholder: '请选择'
	}
]

export const tableColumns: ColumnType[] = [
	{
		dataIndex: "tableIndex",
		key: "tableIndex",
		title: "序号",
		width: 80,
	},
	{
		dataIndex: "modelName",
		key: "modelName",
		title: "模型名称",
		width: 140,
	},
	{
		key: "templateName",
		title: "模版名称",
		dataIndex: "templateName",
		width: 140
	},
	{
		key: "num",
		title: "已选参数数量",
		dataIndex: "num",
		width: 100
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
		key: "updater",
		title: "最后更新人",
		dataIndex: "updater",
		width: 100
	},
	{
		key: "status",
		title: "状态",
		dataIndex: "status",
		width: 100
	},
	{
		key: "action",
		title: "操作",
		dataIndex: "action",
		width: 140,
	},
]

export const addModelFormRenderList: RenderFormItem[] = [
	{
		required: true,
		label: '模型名称: ',
		type: 'input',
		key: 'modelName',
		width: "100%",
		placeholder: '请输入模型名称'
	},
	// {
	// 	required: true,
	// 	label: '电池型号(SKU): ',
	// 	type: 'input',
	// 	key: 'batterySku',
	// 	width: "100%",
	// 	placeholder: '请输入电池型号(SKU)'
	// },
	{
		required: true,
		label: '选择模板',
		type: 'select',
		key: 'templateId',
		width: "100%",
		options: [],
		placeholder: '请选择模板'
	}
]