import type { SelectProps } from 'ant-design-vue/lib/select/index';

/**
 * 状态的选项数据
 */
export const statusOptions: SelectProps['options'] = [
	{
		label: '启用',
		value: 1
	},
	{
		label: '禁用',
		value: 0
	}
]

/**
 * 行业的选项数据
 */
export const industryOptions: SelectProps['options'] = [
	{
		label: '其他',
		value: 0
	},
	{
		label: '电池',
		value: 1
	}
]