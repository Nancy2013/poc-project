import { RenderFormItem } from "@/components/form";
import { ColumnType } from 'ant-design-vue/lib/table/interface'


export const searchRenderList: RenderFormItem[] = [
	{
		label: '模型名称',
		key: 'modelId',
		type: 'select',
		placeholder: '请选择',
		options: []
	},
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
		width: 140
	},
	{
		key: "batchNo",
		title: "批次号",
		dataIndex: "batchNo",
		width: 120
	},
	{
		key: "sn",
		title: "电池序列号",
		dataIndex: "sn",
		width: 120
	},
	{
		key: "modelName",
		title: "模型名称",
		dataIndex: "modelName",
		width: 140
	},
	{
		key: "paramSum",
		title: "已有参数数量",
		dataIndex: "paramSum",
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
		width: 140,
	},
]