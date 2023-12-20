<template>
	<CollectProduct :categoryList="categoryList" :paramTree="paramTree" @submit="handleSubmit" @back="handleBack" :type="paramsData.type"></CollectProduct>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import { requestGetCollectProductBatchDetail, requestBatchUpdateCollectProduct } from '../server'
import { useRoute, useRouter } from 'vue-router'
import { recordTypeDict } from '@/utils/dict'
import CollectProduct from '../components/collectProduct.vue'
import { message } from 'ant-design-vue'

export default defineComponent({
	components: {
		CollectProduct
	},
	setup() {
		const route = useRoute()
		const router = useRouter()
		const state = reactive({
			queryData: route.query || {},
			paramsData: route.params || {},
			categoryList: [],
			paramTree: []
		})

		/**
         * 初始化页面数据
         * @param
         * @return
         */
		const initData = ()=> {
			requestGetCollectProductBatchDetail({
				id: state.queryData.id,
				batchNo: state.queryData.bn,
				modelId: state.queryData.mi
			}).then((res)=> {
				const { paramCategoryList, paramTree, manualInputId, productSku } = res.data
				state.categoryList = paramCategoryList
				state.queryData.manualInputId = manualInputId
				state.queryData.productSku = productSku
				state.paramTree = paramTree.filter((item: any)=> {
					return item.recordType == recordTypeDict.artificial
				})
			})
		}

		initData()

		/**
         * 点击返回按钮时触发
         * @param
         * @return
         */
		const handleBack = ()=> {
			router.push("/enterprise/dataManage/dataEntry/batch/list")
		}

		/**
         * 点击提交时触发
         * @param
         * @return
         */
		const handleSubmit = (paramsData: any)=> {
			const { paramsList } = paramsData
			requestBatchUpdateCollectProduct({
				id: state.queryData.id,
				manualInputId: state.queryData.manualInputId,
				productSku: state.queryData.productSku,
				batchNo: state.queryData.bn,
				modelId: state.queryData.mi,
				params: paramsList.map((item: any)=> {
					return {
						paramId: item.id,
						paramKey: item.paramKey,
						paramValue: item.paramValue
					}
				})
			}).then(()=> {
				message.success("操作成功")
				handleBack()
			})
		}

		return {
			...toRefs(state),
			handleBack,
			handleSubmit
		}
	},
})
</script>
