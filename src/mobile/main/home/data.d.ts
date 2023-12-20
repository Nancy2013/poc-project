import { StyleValue } from "vue";

export interface TabbarRenderItem {
	icon: any,
	activeIcon: any,
	label: string,
	isShow: boolean,
	disabled?: boolean
	color: string,
	label_EN: string
}

export type Language = 'zh-CN' | 'en'

export interface HomeState {
	tabbarRenderList: TabbarRenderItem[]
	/**
	 * 选择tab的下标
	 */
	tabbarIndex: number
	/**
	 * 语言类型
	 */
	languageValue: Language
	/**
	 * 用户token
	 */
	accessToken: string
	/**
	 * 页面数据
	 */
	pageData: {
		[index: string]: string
	}
}

export interface RenderItem {
	attrNameCn: string
	attrNameEn: string
	key: string
	color?: string
	tag?: boolean
	icon?: any
	width?: string
	title_cn?: string
	title_en?: string
	childrenNum?: number
	imgs?: any[]
	customStyle?: StyleValue
	fcLogo?: any
}

export interface GetDetailRequest {

}

export interface GetDetailRequest {
	
}