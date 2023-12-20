import { TabbarRenderItem, RenderItem } from './data'
import zlDcIcon from "@/assets/mobileImages/main/home/zl_dc_icon.png";
import zlClIcon from "@/assets/mobileImages/main/home/zl_cl_icon.png";
import zlEsgIcon from "@/assets/mobileImages/main/home/zl_esg_icon.png";
import zlSjIcon from "@/assets/mobileImages/main/home/zl_sj_icon.png";
import zlNjxIcon from "@/assets/mobileImages/main/home/zlNjxIcon.png";
import zlDcActive from "@/assets/mobileImages/main/home/zl_dc_active.png";
import zlClActive from "@/assets/mobileImages/main/home/zl_cl_active.png";
import zlEsgActive from "@/assets/mobileImages/main/home/zl_esg_active.png";
import zlSjActive from "@/assets/mobileImages/main/home/zl_sj_active.png";
import zlNjxActive from "@/assets/mobileImages/main/home/zlNjxActive.png";

import chinaIcon from "@/assets/mobileImages/main/home/zl_wxhj_img.png"

import successTip from "@/assets/mobileImages/main/home/success_tip.png";
import greenIcon1 from "@/assets/mobileImages/main/home/mobile-home-green-1.png";
import greenIcon2 from "@/assets/mobileImages/main/home/mobile-home-green-2.png";


import fcLogo from "@/assets/mobileImages/main/home/fc-logo.png";





/**
 * 渲染tabbar的数据
 */
export const tabbarRenderList: TabbarRenderItem[] = [
	{
		icon: zlDcIcon,
		activeIcon: zlDcActive,
		label: '电池',
		label_EN: 'battery',
		isShow: true,
		color: '#2C55C5'
	},
	{
		icon: zlClIcon,
		activeIcon: zlClActive,
		label: '材料',
		label_EN: 'material',
		isShow: true,
		color: '#00A887'
	},
	{
		icon: zlEsgIcon,
		activeIcon: zlEsgActive,
		label: 'ESG',
		label_EN: 'esg',
		isShow: true,
		color: '#F96822'
	},
	{
		icon: zlSjIcon,
		activeIcon: zlSjActive,
		label: '数据',
		label_EN: 'data',
		isShow: true,
		color: '#4CAAEA',
		disabled: false
	},
	{
		icon: zlNjxIcon,
		activeIcon: zlNjxActive,
		label: '耐久性',
		label_EN: 'durability',
		isShow: true,
		color: '#3D44F6'
	}
]


export const headerRenderList: RenderItem[] = [
	{
		attrNameCn: '电池序列号',
		attrNameEn: "Serial number",
		key: 'Serial number',
		color: '#F96822'
	},
	{
		attrNameCn: '电池型号',
		attrNameEn: "Battery Model",
		key: 'Battery Model',
		color: '#4DC3FF'
	},
	{
		attrNameCn: '电池护照 ID',
		attrNameEn: "Battery PassportID",
		key: 'Battery PassportID',
		color: '#00A887'
	}
]

export const batteryRenderList: RenderItem[] = [
	{
		attrNameCn: '制造日期',
		attrNameEn: "Date of manufacture",
		width: '50%',
		key: 'Date of manufacture'
	},
	{
		attrNameCn: '重量',
		attrNameEn: "Weight",
		width: '50%',
		key: 'Weight'
	},
	{
		attrNameCn: '总能量',
		attrNameEn: "Total energy",
		width: '50%',
		key: 'Total energy'
	},
	{
		attrNameCn: '能量密度',
		attrNameEn: "Energy density",
		width: '50%',
		key: 'Energy density'
	},
	{
		attrNameCn: '额定容量',
		attrNameEn: "Rated Capacity",
		width: '50%',
		key: 'Rated Capacity'
	},
	// {
	// 	attrNameCn: '循环次数',
	// 	attrNameEn: "",
	// 	width: '50%',
	// 	key: ''
	// },
	{
		attrNameCn: '电池状态',
		attrNameEn: "Battery Status",
		width: '50%',
		key: 'Battery Status'
	},
	{
		attrNameCn: '电压',
		attrNameEn: "Voltage(min-nominal-max)",
		width: '50%',
		key: 'Voltage(min-nominal-max)'
	},
	{
		attrNameCn: '工作温度范围',
		attrNameEn: "Temperature range(min-max)",
		width: '50%',
		key: 'Temperature range(min-max)'
	},
	
	{
		attrNameCn: '电池类型',
		attrNameEn: "Battery cell type",
		width: '50%',
		key: 'Battery cell type'
	},
	// {
	// 	attrNameCn: '重量（kg）',
	// 	attrNameEn: "WEIGHT",
	// 	width: '50%',
	// 	key: ''
	// },
	{
		attrNameCn: '电池尺寸',
		attrNameEn: "Battery size",
		width: '50%',
		key: 'Battery size'
	},
	{
		attrNameCn: '电池生产商',
		attrNameEn: "Battery Producer",
		width: '50%',
		tag: true,
		key: 'Battery Producer'
	},
	{
		attrNameCn: '电池生产国',
		attrNameEn: "Country of battery production",
		width: '50%',
		icon: chinaIcon,
		key: 'Country of battery production'
	},
	{
		attrNameCn: '注册商品名或注册商标',
		attrNameEn: "Battery brand",
		width: '50%',
		tag: true,
		key: 'Battery Brand'
	},
	{
		attrNameCn: '联系电话',
		attrNameEn: "Contact Number",
		width: '50%',
		key: 'Contact Number'
	},
	{
		attrNameCn: '邮政地址',
		attrNameEn: "Postal Address",
		width: '100%',
		icon: chinaIcon,
		key: 'Postal Address'
	},
	
	{
		attrNameCn: '网址或电子邮件',
		attrNameEn: "website and E-mail",
		width: '100%',
		key: 'website and E-mail'
	},
	{
		attrNameCn: '电芯生产商',
		attrNameEn: "Battery Producer",
		width: '50%',
		tag: true,
		key: 'Battery Producer'
	},
	{
		attrNameCn: '电芯生产国',
		attrNameEn: "Country of cell production",
		width: '50%',
		icon: chinaIcon,
		key: 'Country of cell production'
	}, {
		attrNameCn: '电动汽车制造商',
		attrNameEn: "EV Manufacturer",
		width: '50%',
		tag: true,
		key: 'EV Manufacturer'
	}, {
		attrNameCn: '电动汽车组装国家/地区',
		attrNameEn: "Country of Assembly",
		width: '50%',
		icon: chinaIcon, 
		key: 'Country of Assembly'
	}, {
		attrNameCn: '主要化学体系',
		attrNameEn: "Chemistry",
		width: '50%',
		key: 'Chemistry'
	}, {
		attrNameCn: '电芯数',
		width: '50%',
		attrNameEn: "Number of cells per battery",
		key: 'Number of cells per battery'
	}, {
		attrNameCn: '电芯内阻',
		width: '50%',
		attrNameEn: "internal  battery  cell  resistance",
		key: 'Internal battery cell resistance'
	}, {
		attrNameCn: '电池组电阻',
		width: '50%',
		attrNameEn: "pack  resistance",
		key: 'Pack resistance'
	}, {
		attrNameCn: '可再生材料的占比',
		attrNameEn: "the  share  of renewable  content",
		width: '50%',
		key: 'Share of renewable content'
	}, {
		attrNameCn: '初始最大功率',
		attrNameEn: "Original power capability (in Watts)",
		width: '50%',
		key: 'Original power capability (in Watts)'
	}, {
		attrNameCn: '极限功率',
		attrNameEn: "Power capability Limits",
		width: '50%',
		key: 'Power capability Limits'
	}, 
	// {
	// 	attrNameCn: '相关的温度范围',
	// 	attrNameEn: "TEMPERATURE RANGE",
	// 	width: '50%',
	// 	key: 'Temperature range'
	// },
	{
		attrNameCn: '预期电池寿命（循环数）',
		attrNameEn: "expected  battery  lifetime  expressed  in  cycles, and reference test used",
		width: '100%',
		key: 'Expected battery lifetime expressed in cycles, and reference test used'
	},
	// {
	// 	attrNameCn: '使用的参考试验',
	// 	attrNameEn: "",  
	// 	width: '50%',
	// 	key: ''
	// },
	{
		attrNameCn: '耗尽容量阈值（仅适用于电动汽车电池）',
		attrNameEn: " capacity  threshold  for  exhaustion  (only  for  electric vehicle batteries)",
		key: 'Capacity threshold for exhaustion (only for electric vehicle batteries)'
	}, {
		attrNameCn: '不使用时可承受温度范围（参考测试）',
		attrNameEn: " temperature  range  the battery  can withstand when not in use  (reference test);",
		key: 'Temperature range the battery can withstand when not in use (reference test)'
	}, {
		attrNameCn: '日历寿命的商业保修期',
		attrNameEn: "period  for which the commercial warranty for the calendar life applies",
		width: '100%',
		key: 'Period for which the commercial warranty for the calendar life applies'
	}, {
		attrNameCn: '初始能量转换效率',
		attrNameEn: "Initial round trip energy efficiency",
		width: '100%',
		key: 'Initial round trip energy efficiency'
	}, {
		attrNameCn: '50%循环寿命时的能量转换效率',
		attrNameEn: "round  trip  energy  efficiency and at  50 %  of cycle-life",
		key: 'Round trip energy efficiency and at 50 % of cycle-life'
	}, {
		attrNameCn: '相关循环寿命测试的c-比率（c-rate）',
		attrNameEn: "c-rate of relevant cycle-life test",
		key: 'c-rate of relevant cycle-life test'
	},
]

export const materialsRenderList: RenderItem[] = [
	{
		attrNameCn: '回收材料名称',
		attrNameEn: "RecycledRawMaterials",
		key: 'RecycledRawMaterials'
	}, {
		attrNameCn: '可追溯材料的质量占电池总重',
		attrNameEn: "MaterialsTraceability",
		key: 'MaterialsTraceability'
	}, {
		attrNameCn: '产业链GBA会员覆盖率',
		attrNameEn: "GBA Membership coverage",
		key: 'GBA Membership coverage'
	}, {
		attrNameCn: '第一追溯材料名称',
		attrNameEn: "FirstTracedMaterial",
		key: 'FirstTracedMaterial'
	}, {
		attrNameCn: '每块电池的物理量',
		attrNameEn: "FirstPhysicalAmountPerBattery",
		key: 'FirstPhysicalAmountPerBattery'
	}, {
		attrNameCn: '第一材料来源',
		attrNameEn: "FirstRawMaterialProvenance",
		tag: true,
		key: 'FirstRawMaterialProvenance'
	}, {
		attrNameCn: '第二追溯材料名称',
		attrNameEn: "SecondTracedMaterial",
		key: 'SecondTracedMaterial'
	}, {
		attrNameCn: '每块电池的物理量',
		attrNameEn: "SecondPhysicalAmountPerBattery",
		key: 'SecondPhysicalAmountPerBattery'
	}, {
		attrNameCn: '第二材料来源',
		attrNameEn: "SecondRawMaterialProvenance",
		tag: true,
		key: 'SecondRawMaterialProvenance'
	}, {
		attrNameCn: '电池中存在的除汞、镉或铅以外的有害物质',
		attrNameEn: "The hazardous substances present in the battery, other than mercury, cadmium or lead",
		key: 'The hazardous substances present in the battery, other than mercury, cadmium or lead'
	}, {
		attrNameCn: '可用灭火剂',
		attrNameEn: "Usable extinguishing agent",
		key: 'Usable extinguishing agent'
	}, {
		attrNameCn: '电池中存在的关键原材料，其浓度按重量计超过0.1%的',
		attrNameEn: "Critical raw materials present in the battery in a concentration of more than 0,1 % weight by weight",
		key: 'Critical raw materials present in the battery in a concentration of more than 0,1 % weight by weight'
	}, {
		attrNameCn: '活性材料中的回收的钴的百分比份额',
		attrNameEn: "The percentage share of cobalt in active materials and that has been recovered from battery manufacturing waste or post-consumer waste",
		key: 'The percentage share of cobalt in active materials and that has been recovered from battery manufacturing waste or post-consumer waste'
	}, {
		attrNameCn: '活性材料中的回收的锂的百分比份额',
		attrNameEn: "The percentage share of lithium in active materials that has been recovered from battery manufacturing waste or post-consumer waste",
		key: 'The percentage share of lithium in active materials that has been recovered from battery manufacturing waste or post-consumer waste'
	}, {
		attrNameCn: '活性材料中的回收的镍的百分比份额',
		attrNameEn: "The percentage share of nickel that in active materials that has been recovered from battery manufacturing waste or post-consumer waste",
		key: 'The percentage share of nickel that in active materials that has been recovered from battery manufacturing waste or post-consumer waste'
	}, {
		attrNameCn: '每年、每个制造厂的每个电池型号的电池中存在的以及已经从废料中回收的铅的百分比份额',
		attrNameEn: "the percentage share of lead that is present in the battery and that has been recovered from waste, for each battery model per year and per manufacturing plant.",
		key: 'the percentage share of lead that is present in the battery and that has been recovered from waste, for each battery model per year and per manufacturing plant.'
	}
]

export const esg1RenderList: RenderItem[] = [
	{
		attrNameCn: '童工平均得分',
		attrNameEn: "Child Labor",
		key: 'Child Labor',
		childrenNum: 0,
		imgs: [successTip]
	},
	{
		attrNameCn: '回答必答题的数量 / 必答题最高分',
		attrNameEn: "Questions answered",
		key: 'Questions answered'
	},
	{
		attrNameCn: '提交相关报告的公司数量',
		attrNameEn: "Number of companies",
		key: 'Number of companies'
	},
	{
		attrNameCn: '人权平均得分',
		attrNameEn: "Human rights",
		key: 'Human rights',
		imgs: [successTip]
	},
	{
		attrNameCn: '回答必答题的数量 / 必答题最高分',
		attrNameEn: "Questions answered_1",
		key: 'Questions answered_1'
	},
	{
		attrNameCn: '提交相关报告的公司数量',
		attrNameEn: "Number of companies_1",
		key: 'Number of companies_1'
	},
	{
		attrNameCn: '电池相关的温室气体排放，包括基于 HMA 方法的计算电力排放',
		attrNameEn: "BCF (HMA)",
		key: 'BCF (HMA)'
	},
	{
		attrNameCn: '电池相关的温室气体排放，包括基于 PMA 方法的计算电力排放',
		attrNameEn: "BCF (PMA)",
		key: 'BCF (PMA)'
	},
	{
		attrNameCn: 'BCF (HMA)中的主要数据份额',
		attrNameEn: "RecycledRawMaterials",
		key: 'PRIMARY DATA'
	},
	{
		attrNameCn: 'BCF(HMA)(#4)中的次要数据份额',
		attrNameEn: "RecycledRawMaterials",
		key: 'SECONDARY DATA'
	},
	{
		attrNameCn: '提交温室气体报告的公司数量',
		attrNameEn: "Number of companies",
		key: 'Number of companies',
		customStyle: { paddingBottom: 0 }
	}
]

export const esg2RenderList: RenderItem[] = [
	{
		attrNameCn: '',
		attrNameEn: "",
		key: '',
		title_cn: '碳足迹',
		title_en: 'Carbon Footprint(From cradle to gate)',
		imgs: [greenIcon2]
	},
	{
		attrNameCn: '制造商的管理信息',
		attrNameEn: "Administrative information about the manufacturer",
		key: 'Administrative information about the manufacturer'
	},
	{
		attrNameCn: '电池型号信息',
		attrNameEn: "Battery Model",
		key: 'Battery Model'
	},
	{
		attrNameCn: '电池制造厂的地理位置信息',
		attrNameEn: "Location of the battery manufacturing plant",
		key: 'Location of the battery manufacturing plant'
	},
	{
		attrNameCn: '电池欧盟合格声明的识别号',
		attrNameEn: "Battery EU Declaration of Conformity identification number",
		key: 'Battery EU Declaration of Conformity identification number'
	},
	
]

export const esg3RenderList: RenderItem[] = [
	{
		attrNameCn: '碳足迹份额',
		attrNameEn: "Carbon footprint share（from cradle to tomb）",
		key: 'Carbon footprint share（from cradle to tomb）',
	},
	{
		attrNameCn: '原材料获取和预处理阶段',
		attrNameEn: "Raw material acquisition and pre-processing",
		key: 'Raw material acquisition and pre-processing'
	},
	{
		attrNameCn: '主要产品生产阶段',
		attrNameEn: "Main product production",
		key: 'Main product production'
	},
	{
		attrNameCn: '分销阶段',
		attrNameEn: "Distribution",
		key: 'Distribution'
	},
	{
		attrNameCn: '报废和回收阶段',
		attrNameEn: "End of life and recycling",
		key: 'End of life and recycling'
	},
	
]

export const durabilityRenderList: RenderItem[] = [
	{
		attrNameCn: '额定容量（Ah）',
		attrNameEn: "Rated capacity (in Ah)",
		key: 'Rated capacity (in Ah)',
		width: "50%"
	},
	{
		attrNameCn: '容量衰减（%）',
		attrNameEn: "Capacity fade (in %)",
		key: 'Capacity fade (in %)',
		width: "50%"
	},
	{
		attrNameCn: '功率（W）',
		attrNameEn: "Power (in W)",
		key: 'Power (in W)',
		width: "50%"
	},
	{
		attrNameCn: '功率衰减（%）',
		attrNameEn: "Power fade (in %)",
		key: 'Power fade (in %)',
		width: "50%"
	},
	{
		attrNameCn: '内阻（以a计）',
		attrNameEn: "Internal resistance (in a) and internal resistance increase (in %)",
		key: 'Internal resistance (in a) and internal resistance increase (in %)',
		width: "50%"
	},
	{
		attrNameCn: '内阻增加（以%计）',
		attrNameEn: "Internal resistance increase (in %)",
		key: 'Internal resistance increase (in %)',
		width: "50%"
	},
	{
		attrNameCn: '在适用的情况下，能量转换效率及其衰减（单位：%)',
		attrNameEn: "Where applicable, energy round trip efficiency and its fade (in %)",
		key: 'Where applicable, energy round trip efficiency and its fade (in %)',
	},
	{
		attrNameCn: '电池在其设计的参考条件下的预期寿命，以循环次数和使用日历年限为单位，非循环使用电池除外。',
		attrNameEn: "The expected life-time of the battery under the reference conditions for which it has been designed, in terms of cycles, except for non-cycle applications, and calendar years.",
		key: 'The expected life-time of the battery under the reference conditions for which it has been designed, in terms of cycles, except for non-cycle applications, and calendar years.',
	},
]


export const data_CN_Render =  {
	list: [
		{
			title: "采矿",
			sources: [
				{
					key: "身份ID",
					value: "已知",
				},
				{
					key: "物料/物料流",
					value: "未授权披露",
				},
				{
					key: "ESG",
					value: "估计",
				},
			],
		},
		{
			title: "精炼",
			sources: [
				{
					key: "身份ID",
					value: "已知",
				},
				{
					key: "物料/物料流",
					value: "未授权披露",
				},
				{
					key: "ESG",
					value: "估计",
				},
			],
		},
		{
			title: "阴极活性材料",
			sources: [
				{
					key: "身份ID",
					value: "已知",
				},
				{
					key: "物料/物料流",
					value: "未授权披露",
				},
				{
					key: "ESG",
					value: "估计",
				},
			],
		},
		{
			title: "阳极活性材料",
			sources: [
				{
					key: "身份ID",
					value: "已知",
				},
				{
					key: "物料/物料流",
					value: "未授权披露",
				},
				{
					key: "ESG",
					value: "估计",
				},
			],
		},
		{
			title: "阴极",
			sources: [
				{
					key: "身份ID",
					value: "已知",
				},
				{
					key: "物料/物料流",
					value: "未授权披露",
				},
				{
					key: "ESG",
					value: "估计",
				},
			],
		},
		{
			title: "阳极",
			sources: [
				{
					key: "身份ID",
					value: "已知",
				},
				{
					key: "物料/物料流",
					value: "未授权披露",
				},
				{
					key: "ESG",
					value: "估计",
				},
			],
		},
		{
			title: "电芯",
			sources: [
				{
					key: "身份ID",
					value: "已知",
				},
				{
					key: "物料/物料流",
					value: "未授权披露",
				},
				{
					key: "ESG",
					value: "估计",
				},
			],
		},
		{
			title: "模块",
			sources: [
				{
					key: "身份ID",
					value: "已知",
				},
				{
					key: "物料/物料流",
					value: "未授权披露",
				},
				{
					key: "ESG",
					value: "估计",
				},
			],
		},
		{
			title: "电池",
			sources: [
				{
					key: "身份ID",
					value: "已知",
				},
				{
					key: "物料/物料流",
					value: "未授权披露",
				},
				{
					key: "ESG",
					value: "估计",
				},
			],
		},
	],
	list_no_wrap: [
		{
			type: "text",
			key: "数据验证",
			value: "Data verification",
			width: "50%"
		},
		{
			type: "text",
			key: "数据追溯/可追溯性",
			value: "Traceability",
			width: "50%"
		},
		{
			type: "text",
			key: "数据交互/可交互性",
			value: "Interoperability",
			width: "50%"
		},
		{
			type: "text",
			key: "物料流聚合",
			value: "Material flow aggregation",
			width: "50%"
		},
	],
	list_wrap: [
		{
			type: "text",
			key: "物料流数据收集开始时间",
			value: "Start of period",
		},
		{
			type: "text",
			key: "物料流数据收集结束时间",
			value: "End of period",
		},
		{
			type: "text",
			key: "供应商/数据收集供应商",
			value: "Data collection assured by",
			logo: fcLogo
		}
	],
}

export const data_EN_Render =  {
	list: [
		{
			title: "Mine",
			sources: [
				{
					key: "IDENTITY",
					value: "known",
				},
				{
					key: "MATERIAL FLOW",
					value: "Unauthorized to disclose",   
				},
				{
					key: "ESG DATA",
					value: "reported",
				},
			],
		},
		{
			title: "Refine",
			sources: [
				{
					key: "IDENTITY",
					value: "known",
				},
				{
					key: "MATERIAL FLOW",
					value: "Unauthorized to disclose",
				},
				{
					key: "ESG DATA",
					value: "reported",
				},
			],
		},
		{
			title: "Cathodic active material",
			sources: [
				{
					key: "IDENTITY",
					value: "known",
				},
				{
					key: "MATERIAL FLOW",
					value: "Unauthorized to disclose",
				},
				{
					key: "ESG DATA",
					value: "reported",
				},
			],
		},
		{
			title: "Anodic active material",
			sources: [
				{
					key: "IDENTITY",
					value: "known",
				},
				{
					key: "MATERIAL FLOW",
					value: "Unauthorized to disclose",
				},
				{
					key: "ESG DATA",
					value: "reported",
				},
			],
		},
		
		{
			title: "Cathode",
			sources: [
				{
					key: "IDENTITY",
					value: "known",
				},
				{
					key: "MATERIAL FLOW",
					value: "Unauthorized to disclose",
				},
				{
					key: "ESG DATA",
					value: "reported",
				},
			],
		},
		{
			title: "Anode",
			sources: [
				{
					key: "IDENTITY",
					value: "known",
				},
				{
					key: "MATERIAL FLOW",
					value: "Unauthorized to disclose",
				},
				{
					key: "ESG DATA",
					value: "reported",
				},
			],
		},
		{
			title: "Cell",
			sources: [
				{
					key: "IDENTITY",
					value: "known",
				},
				{
					key: "MATERIAL FLOW",
					value: "Unauthorized to disclose",
				},
				{
					key: "ESG DATA",
					value: "reported",
				},
			],
		},
		{
			title: "Module",
			sources: [
				{
					key: "IDENTITY",
					value: "known",
				},
				{
					key: "MATERIAL FLOW",
					value: "Unauthorized to disclose",
				},
				{
					key: "ESG DATA",
					value: "reported",
				},
			],
		},
		{
			title: "Battery",
			sources: [
				{
					key: "IDENTITY",
					value: "known",
				},
				{
					key: "MATERIAL FLOW",
					value: "Unauthorized to disclose",
				},
				{
					key: "ESG DATA",
					value: "reported",
				},
			],
		},
	],
	list_no_wrap: [
		{
			type: "text",
			key: "DATA VERIFICATION",
			value: "Data verification",
			width: '50%'
		},
		{
			type: "text",
			key: "TRACEABILITY",
			value: "Traceability",  
			width: '50%'
		},
		{
			type: "text",
			key: "INTEROPERABILITY",
			value: "Interoperability",
			width: '50%'
		},
		{
			type: "text",
			key: "MATERIAL FLOW AGGREGATION",
			value: "Material flow aggregation",
			width: '50%'
		},
	],
	list_wrap: [
		{
			type: "text",
			key: "START OF PERIOD",
			value: "Start of period",
		},
		{
			type: "text",
			key: "END OF PERIOD",
			value: "End of period",
		},
		{
			type: "text",
			key: " DATA COLLECTION ASSURED BY",
			value: "Data collection assured by",
			logo: fcLogo
		}
	],
}

export const messageList = [
	{
		id: '2cd87183b4cea3b9c0928993dd4de39fa3a2c398bf3aad07b3baa1d30f3549bc',
		date: '2023-11-29 16:55:36'
	},
	{
		id: 'be67d7d38f36ce6228a6d5ae66cf189e9097ad95223bd4cf7765a911de4f76c2 ',
		date: '2023-11-29 16:50:21'
	},
	{
		id: '325836a46cd9d9f07ce3347d9205e2953d0560248a5a646c5ea0c9c8b49ed6a6',
		date: '2023-11-29 16:21:25'
	},
	{
		id: 'df41f59f79fc02a83c5cc975b6a74e83f681f77129844a68e9f4cfbe38b7dc87 ',
		date: '2023-11-29 16:09:32'
	}
]
