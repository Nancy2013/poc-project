<template>
    <fc-tabs :tabsList="tabsList" :activeKey="step" @tabChange="handleTabChange">
        <template v-for="(element, eleIndex) in tabsList" :key="eleIndex" #[element.key]>
            <fc-model-col>
                <fc-model v-for="(item, index) in platformData[element.key]" v-model:value="item.value" :key="index" :modelInfo="item" @success="handleUploadSuccess($event, index)" @preview="handlePreview" />
            </fc-model-col>
        </template>

        <template #button>
            <a-space v-if="step == tabsTotal">
                <a-button type="default" @click="handlePrev">上一页</a-button>
                <a-button v-if="type !== 'detail'" type="primary" @click="handleSubmit">提交</a-button>
                <a-button v-else type="primary" @click="handleBack">返回</a-button>
            </a-space>
            <a-space v-else>
                <a-button v-if="step !== 1" type="default" @click="handlePrev">上一页</a-button>
                <a-button type="primary" @click="handleNext">下一页</a-button>
            </a-space>
        </template>
    </fc-tabs>

	<a-modal v-model:visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      	<img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, watch } from "vue";
import { isEmpty } from '@/utils/common'
import { recordTypeDict } from '@/utils/dict'
import { message } from "ant-design-vue";
import dayjs from "dayjs";

export default defineComponent({
	props: {
		categoryList: {
			type: Array,
			default: ()=> {
				return []
			}
		},
		type: {
			type: String,
			default: ""
		},
		paramTree: {
			type: Array,
			default: ()=> {
				return []
			}
		}
	},
	emits: ["submit", "back"],
    setup(props, { emit }) {
		const state = reactive({
			step: 1,
			tabsTotal: 0,
			tabsList: [],
			platformData: {},
			previewVisible: false,
			previewTitle: "图片预览",
			previewImage: ""
		})

		/**
         * 获取产品数据类型
         * @param
         * @return
         */
		const getParamData = (platformData: any): any=> {
			const paramsData: any = {}
			if(platformData.recordType === recordTypeDict.artificial) {
				if(platformData.paramType === 'date') {
					paramsData.type = platformData.paramType
					if(!isEmpty(platformData.paramValue)) {
						paramsData.value = dayjs(platformData.paramValue)
					}
				} else if(platformData.paramType === 'upload') {
					paramsData.type = platformData.paramType
					if(!isEmpty(platformData.paramValue)) {
						paramsData.value = platformData.paramValue.split(',').map((item: any, index: number)=> {
							return {
								uid: `${platformData.id}-index`,
								name: 'image.png',
								status: 'done',
								url: item,
								response: {
									data: item
								}
							}
						})
					} 
					
				} else if(platformData.paramType === 'text') {
					paramsData.type = 'input'
					paramsData.value = platformData.paramValue
				} else {
					paramsData.type = 'text'
					paramsData.value = platformData.paramValue
				}
			} else  {
				paramsData.type = 'text'
				paramsData.value = platformData.paramValue
			}
			return paramsData
		}

		watch(()=> props.categoryList, (categoryList: any)=> {
			console.log('categoryList', categoryList)
			state.tabsList = categoryList.map((item: any)=> {
				return {
					key: item.value,
					name: item.label
				}
			})
			state.tabsTotal = categoryList.length
		})

		watch(()=> props.paramTree, (paramTree: any)=> {
			const platformData: any = {}
			for(let i = 0; i < paramTree.length; i++) {
				const platformItem = paramTree[i]
				if(isEmpty(platformData[platformItem.paramCategory])) {
					platformData[platformItem.paramCategory] = []
				}
				const { type, value } = getParamData(platformItem)
				const paramCategoryItem = {
					...platformItem,
					type: type,   //platformItem.paramType === 'text' ? 'input' : 'text',
					title: platformItem.paramName,
					tip: platformItem.paramDesc,
					placeholder: "请输入",
					value: value,
					disabled: props.type === "detail",
					tags: { name: recordTypeDict[platformItem.recordType], color: platformItem.recordType === recordTypeDict.system ? 'blue' : 'green' },
				}
				if(Array.isArray(platformItem.children)) {
					const { children } = platformItem
					paramCategoryItem.treeNodes = children.map((item: any)=> {
						return {
							...item,
							disabled: props.type === "detail",
							value: item.paramValue
						}
					})
				}
				platformData[platformItem.paramCategory].push(paramCategoryItem)
			}
			state.platformData = platformData
		} )


		/**
         * 点击预览按钮时触发
         * @param { Object } event 预览事件参数
         * @return
         */
		const handlePreview = (event: any)=> {
			state.previewImage = event.response.data
			state.previewVisible = true
		}


		const handleUploadSuccess = (event: any, index: number)=> {
			// console.log(event)
			// console.log(index)
			// const platformItem = state.platformData[state.step][index]
			// if(Array.isArray(platformItem.value)) {
			// 	platformItem.value.push(event)
			// } else {
			// 	platformItem.value = [event]
			// }
			// console.log(state.platformData[state.step])
			
		}

		/**
         * 点击下一步时触发
         * @param
         * @return
         */
		const handleNext = ()=> {
			state.step++
		}

		/**
         * 点击上一步时触发
         * @param
         * @return
         */
		const handlePrev = ()=> {
			state.step--
		}

		/**
         * 处理点击tab事件
         * @param
         * @return
         */
        const handleTabChange = (value: any) => {
            state.step = value;
        };

		/**
         * 点击返回按钮时触发
         * @param
         * @return
         */
		const handleBack = ()=> {
			emit("back")
		}

		/**
         * 点击提交时触发
         * @param
         * @return
         */
		const handleSubmit = ()=> {
			const paramsList: any[] = []
			console.log("state.platformData", state.platformData)
			for(let platformKey in state.platformData) {
				const platformList = state.platformData[platformKey]
				for(let i = 0; i < platformList.length; i++) {
					const { id, paramKey, value, paramValue, treeNodes, recordType, paramType } = platformList[i]
					if(recordType === recordTypeDict.artificial) {
						if(isEmpty(value) && !(Array.isArray(treeNodes) && treeNodes.length)) {
							message.error("填写信息不完整，请检查后再提交")
							return
						}
					}
					const paramsItem: any = { id, paramKey }
					if(paramType === 'date') {
						paramsItem.paramValue = dayjs(value).format("YYYY-MM-DD")
					} else if(paramType === 'upload') {
						if(Array.isArray(value)) {
							paramsItem.paramValue = value.map((item: any)=> {
								return item.response.data
							}).join(',')
						}
					} else {
						paramsItem.paramValue =  value || paramValue
					}
					paramsList.push(paramsItem)
					if(Array.isArray(treeNodes) && treeNodes.length) {
						for(let j = 0; j < treeNodes.length; j++) {
							const platformItem = treeNodes[j]
							if(recordType === recordTypeDict.artificial) {
								if(isEmpty(platformItem.value)) {
									message.error("填写信息不完整，请检查后再提交")
									return
								}
							}
							const paramsTreeItem: any = { 
								id: platformItem.id, 
								paramKey: platformItem.paramKey,
							}
							if(paramType === 'date') {
								paramsTreeItem.paramValue = dayjs(platformItem.value).format("YYYY-MM-DD")
							} else if(paramType === 'upload') {

							} else {
								paramsTreeItem.paramValue =  platformItem.value || platformItem.paramValue
							}
							paramsList.push(paramsTreeItem)
						}
					}
				}
			}
			emit("submit", {
				paramsList
			})
		}






		return {
			...toRefs(state),
			handlePreview,
			handleSubmit,
			handleNext,
			handlePrev,
			handleBack,
			handleTabChange,
			handleUploadSuccess
		}
	},
});
</script>
