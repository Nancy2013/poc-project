import { RenderFormItem } from "@/components/form";
import { ColumnType } from 'ant-design-vue/lib/table/interface'
import { Rules } from '@/components/form/index'


export const searchRenderList: RenderFormItem[] = [
	{
		label: '所属角色',
		key: 'modelId',
		type: 'select',
		placeholder: '请选择',
		options: []
	},
	{
		label: '创建时间',
		key: 'dates',
		type: 'datePicker',
		datePickerType: 'rangePicker'
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
		dataIndex: "name",
		key: "name",
		title: "所属身份",
		width: 140
	},
	{
		key: "creator",
		title: "创建人",
		dataIndex: "creator",
		width: 120
	},
	{
		key: "createTime",
		title: "创建时间",
		dataIndex: "createTime",
		width: 140
	},
	{
		key: "status",
		title: "状态",
		dataIndex: "status",
		width: 120
	},
	{
		key: "action",
		title: "操作",
		dataIndex: "action",
		width: 210
	},
]

/**
 * 新增SKU的表单渲染数据
 */
export const renderFormList: RenderFormItem[] = [
	{
		required: true,
		label: '角色名称',
		key: 'name',
		type: 'input',
		placeholder: '请输入角色名称',
		width: '100%'
	},
	{
		required: true,
		label: '角色标识',
		key: 'code',
		type: 'input',
		maxlength: 30,
		width: '100%',
		placeholder: '请输入角色标识'
	},
	{
		required: true,
		label: '角色顺序',
		key: 'sort',
		type: 'input',
		inputType: 'int',
		maxlength: 30,
		width: '100%',
		placeholder: '请输入角色顺序'
	},
	{
		required: false,
		label: '状态',
		key: 'status',
		type: 'select',
		width: '100%',
		placeholder: '请选择状态',
		options: []
	},
	{
		required: false,
		label: '备注',
		key: 'remark',
		type: 'textarea',
		maxlength: 300,
		width: '100%',
		placeholder: '请输入备注'
	},
]

export const formRules: Rules = {
	name: [
		{ required: true, message: '请输入角色名称', trigger: 'blur' }
	],
	code: [
		{ required: true, message: '请输入角色标识', trigger: 'blur' },
	],
	sort: [
		{ required: true, message: '请输入角色顺序', trigger: 'blur' },
	]
}