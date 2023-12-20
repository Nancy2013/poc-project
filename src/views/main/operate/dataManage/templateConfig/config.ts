import { RenderFormItem } from "@/components/form";
import { ColumnType } from 'ant-design-vue/lib/table/interface'
import { industryOptions, statusOptions } from '@/utils/config'
import { sortArray, isEmpty } from "@/utils/common";
import { recordTypeDict, booleanDict } from "@/utils/dict";


export const searchRenderList: RenderFormItem[] = [
	{
		label: '模板名称',
		key: 'templateName',
		type: 'input',
		placeholder: '请输入'
	},
	{
		label: '行业类别',
		key: 'industryType',
		type: 'select',
		placeholder: '请选择',
		options: industryOptions
	},
	{
		label: '状态',
		key: 'status',
		type: 'select',
		placeholder: '请选择',
		options: statusOptions
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
		key: "templateName",
		title: "模版名称",
		dataIndex: "templateName",
		width: 120
	},
	{
		key: "industryType",
		title: "行业类别",
		dataIndex: "industryType",
		width: 100,
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
		width: 120
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
		width: 120,
	},
]

export const addTemplateFormRenderList: RenderFormItem[] = [
	{
		required: true,
		label: '模板名称: ',
		type: 'input',
		key: 'templateName',
		width: "100%",
		placeholder: '请输入模板名称'
	},
	{
		required: true,
		label: '行业类别: ',
		type: 'select',
		key: 'industryType',
		width: "100%",
		placeholder: '请选择行业类别',
		options: []
	},
	{
		required: false,
		label: '模板说明',
		type: 'textarea',
		key: 'remark',
		width: "100%",
		placeholder: '请输入模板说明',
		autoSize: {
			minRows: 4
		}
	}
]

export const tabsList =  [
	{ key: 'battery', name: '电池信息' },
	{ key: 'material', name: '材料信息' },
	{ key: 'esg', name: 'ESG信息' },
	{ key: 'industry', name: '产业链数据' },
	{ key: 'service', name: '维修信息' }
]

export const modelList = [
	{ type: 'checkBox', title: '电池型号', desc: '电池型号的简单描述，可能还包含对应的电动汽车', 
	  value: true,
	  radios: {
		selected: true,
		options: [{ name: '系统对接', value: true }, { name: '人工录入', value: false }]
	  }
	},
	{ type: 'checkBox', title: '电池型号', desc: '电池型号的简单描述，可能还包含对应的电动汽车' },
	{ type: 'text', title: '电池护照ID', desc: '88.555.6008/0H9PE2260202B3D00060', 
	  tags: { name: '系统对接', color: 'blue' },
	  statistic: { name: '已有数据', current: 100, total: 500 } 
	},
	{ type: 'input', value: '', title: '电池型号', placeholder: '请输入电池型号', 
	  tags: { name: '人工输入', color: 'green' },
	  statistic: { name: '已有数据', current: 100, total: 500 } 
	},
  //   { type: 'upload', title: '图片类型附件' }
]
  

/**
 * 转换模板数据
 * @param
 * @return
 */
export const transformModelData = (params: any) => {
	const { category, modelList, templateIdData = {}, type } = params
	return new Promise((resolve, reject) => {
		const platformList: any[] = sortArray(
				modelList,
				"paramCategory"
			),
			platformData: { [index: string]: Array<any> } = {},
			tabsList = [];
		for (let i = 0; i < platformList.length; i++) {
			const platformItem = platformList[i];
			if (isEmpty(platformData[platformItem.paramCategory])) {
				platformData[platformItem.paramCategory] = [
					{
						...platformItem,
						type: type === "detail" ? "text" : "checkBox",
						title: platformItem.paramName,
						tip: platformItem.paramDesc,
						value: !isEmpty(templateIdData[platformItem.id]) ||  platformItem.requireFlag == booleanDict.yes,
						treeNodes: platformItem.children,
						disabled: platformItem.requireFlag == booleanDict.yes,
						radios: {
							selected: isEmpty(templateIdData[platformItem.id]) ? platformItem.recordType || recordTypeDict.system : templateIdData[platformItem.id].recordType,
							options: [
								{
									name: "系统对接",
									value: recordTypeDict.system,
								},
								{
									name: "人工录入",
									value: recordTypeDict.artificial,
								},
							],
						},
					},
				];
			} else {
				platformData[platformItem.paramCategory].push({
					...platformItem,
					type: type === "detail" ? "text" : "checkBox",
					title: platformItem.paramName,
					tip: platformItem.paramDesc,
					value: !isEmpty(templateIdData[platformItem.id]) ||  platformItem.requireFlag == booleanDict.yes,
					disabled:
						platformItem.requireFlag == booleanDict.yes,
					treeNodes: platformItem.children,
					radios: {
						selected:isEmpty(templateIdData[platformItem.id]) ? platformItem.recordType || recordTypeDict.system : templateIdData[platformItem.id].recordType,
						options: [
							{
								name: "系统对接",
								value: recordTypeDict.system,
							},
							{
								name: "人工录入",
								value: recordTypeDict.artificial,
							},
						],
					},
				});
			}
		}
		for (let key in category) {
			tabsList.push({
				key: key,
				name: category[key],
			});
		}
		resolve({
			tabsTotal: Object.keys(category).length,
			platformData,
			tabsList,
		});
	});
};