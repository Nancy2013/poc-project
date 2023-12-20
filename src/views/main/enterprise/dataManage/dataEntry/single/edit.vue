<template>
	<CollectProduct :categoryList="categoryList" :paramTree="paramTree" @submit="handleSubmit" @back="handleBack" :type="paramsData.type"></CollectProduct>
</template>


<script lang="ts">
import CollectProduct from '../components/collectProduct.vue'
import { defineComponent, reactive, toRefs } from "vue";
import { requestGetCollectProductDetail, requestUpdateCollectProduct } from "../server"
import { useRoute, useRouter } from 'vue-router'
import { message } from "ant-design-vue";

export default defineComponent({
	components: {
		CollectProduct
	},
    setup() {
		const route = useRoute()
        const state = reactive({
            categoryList: [],
			paramTree: [],
			paramsData: route.params
        });

		const { query } = route
		const router = useRouter()

		

		/**
         * 获取产品数据详情
         * @param
         * @return
         */
		const getProductDetail = ()=> {
			requestGetCollectProductDetail({
				id: query.id
			}).then((res: any)=> {
				const { paramCategoryList, paramTree } = res.data
				state.categoryList = paramCategoryList
				state.paramTree = paramTree
			})
		}



		getProductDetail()



		/**
         * 点击返回按钮时触发
         * @param
         * @return
         */
		const handleBack = ()=> {
			router.push("/enterprise/dataManage/dataEntry/list")
		}

		/**
         * 点击提交时触发
         * @param
         * @return
         */
		const handleSubmit = (paramsData: any)=> {
			requestUpdateCollectProduct({
				id: query.id,
				params: paramsData.paramsList
			}).then(()=> {
				message.success("操作成功")
				handleBack()
			})
		}

        return {
            ...toRefs(state),
			handleBack,
			handleSubmit
        };
    },
});
</script>
