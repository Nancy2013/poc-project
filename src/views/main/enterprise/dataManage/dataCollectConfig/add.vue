<template>
    <div v-if="step === 0">
        <div class="addModel-form">
            <fc-form ref="formRef" :renderList="addModelFormRenderList" :formData="formData" layout="vertical"></fc-form>
            <a-button type="primary" @click="handleNext">下一步</a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
        </div>

        <div class="addModel-preview">
            <div class="addModel-preview-phone">
                <iframe src="/dpp-platform/#/mobileHome?idisCode=08WPEA2010001CD4T0000001" frameborder="0"></iframe>
            </div>
        </div>
    </div>

    <fc-tabs :tabsList="tabsList" :activeKey="step" @tabChange="handleTabChange" v-if="step !== 0">
        <template v-for="(element, eleIndex) in tabsList" :key="eleIndex" #[element.key]>
            <fc-model-col>
                <fc-model v-for="(item, index) in platformData[element.key]" v-model:value="item.value" :key="index" :modelInfo="item" />
            </fc-model-col>
        </template>

        <template #button>
            <a-space v-if="step == tabsTotal">
                <a-button type="default" @click="handlePrev">上一页</a-button>
                <a-button v-if="paramsData.type !== 'detail'" type="primary" @click="handleSubmit">提交</a-button>
                <a-button v-else type="primary" @click="handleBack">返回</a-button>
            </a-space>
            <a-space v-else>
                <a-button type="default" @click="handlePrev">上一页</a-button>
                <a-button type="primary" @click="handleTabsNext">下一页</a-button>
            </a-space>
        </template>
    </fc-tabs>

</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { addModelFormRenderList } from "./config";
import useRouter from "@/hooks/useRouter";
import { useRoute } from "vue-router";
import router from "@/router";
import {
    requestTemplateConfigList,
    requestGetPlatformListEdit,
} from "@/views/main/operate/dataManage/templateConfig/server";
import { requestCreateModel, requestUpdateModel, requestGetModelDetail, requestGetModelPlatformList } from './server'
import { message } from "ant-design-vue";
import { transformModelData } from "@/views/main/operate/dataManage/templateConfig/config";

export default defineComponent({
    setup() {
        const formRef = ref<any>(null);
        const state = reactive({
            addModelFormRenderList,
            step: 0,
            tabsTotal: 0,
            platformData: {},
            tabsList: [],
            formData: {},
            paramsData: useRoute().params || {},
        });

        const { handleJumpRouter } = useRouter();

        const query = useRoute().query || {};

        /**
         * 初始化页面数据
         * @param
         * @return
         */
        const initData = () => {
            requestTemplateConfigList({
                pageSize: 100,
            }).then((res: any) => {
                state.addModelFormRenderList[1].options = res.data.list.map(
                    (item: any) => {
                        return {
                            label: item.templateName,
                            value: item.id,
                        };
                    }
                );
            });
			if(query.id) {
				if (state.paramsData.type === "detail") {
                    state.addModelFormRenderList[0].disabled = true;
                    state.addModelFormRenderList[1].disabled = true;
                }
				requestGetModelDetail({
					id: query.id
				}).then((res: any)=> {
					const { modelName, templateId, id } = res.data;
                    state.formData = { modelName, templateId, id };
				})
			} 
        };

        initData();

        /**
         * 点击下一步时触发
         * @param
         * @return
         */
        const handleNext = () => {
            formRef.value.validate().then(() => {
                state.step++;
				if(query.id) {
					Promise.all([requestGetPlatformListEdit({ id: (state.formData as any).templateId }), requestGetModelPlatformList({ id: query.id })]).then((result: any)=> {
						const [templateData, modelData] = result, templateIdData = {}
						const { modelTemplateDetailVoList, category } = templateData.data;
						for(let i = 0; i <  modelData.data.modelTemplateDetailVoList.length; i++) {
							const { id, recordType } = modelData.data.modelTemplateDetailVoList[i]
							templateIdData[id] = {
								recordType
							}
						}
						transformModelData( { category, modelList: modelTemplateDetailVoList, templateIdData, type: state.paramsData.type }
						).then((res: any) => {
							const { tabsTotal, platformData, tabsList } = res;
							state.tabsTotal = tabsTotal;
							state.platformData = platformData;
							state.tabsList = tabsList;
						});
					})
				} else {
					requestGetPlatformListEdit({
                    	id: (state.formData as any).templateId,
					}).then((res: any) => {
						const { modelTemplateDetailVoList, category } = res.data as any;
						transformModelData( { category, modelList: modelTemplateDetailVoList, type: state.paramsData.type }
						).then((res: any) => {
							const { tabsTotal, platformData, tabsList } = res;
							state.tabsTotal = tabsTotal;
							state.platformData = platformData;
							state.tabsList = tabsList;
						});
					});
				}
                
            });
        };

		/**
         * 点击提交按钮时触发
         * @param
         * @return
         */
		const handleSubmit = ()=> {
			const formData = {
                ...state.formData,
                modelTemplateDetails: [] as any[],
            } as any;
            for (let key in state.platformData) {
                const platformList = state.platformData[key];
                for (let i = 0; i < platformList.length; i++) {
                    const platformItem = platformList[i];
                    if (platformItem.value) {
                        formData.modelTemplateDetails.push({
                            paramId: platformItem.id,
                            paramKey: platformItem.paramKey,
                            recordType: (platformItem as any).radios.selected,
                        });
						if(Array.isArray(platformItem.children) && platformItem.children.length) {
                            platformItem.children.forEach((item: any)=> {
                                formData.modelTemplateDetails.push({ 
                                    paramId: item.id,
                                    paramKey: item.paramKey,
                                    recordType: (platformItem as any).radios.selected,
                                });
                            })
                        }
                    }
                }
            }
            if (formData.id){
				requestUpdateModel({
					...formData
				}).then(() => {
                    message.success("编辑成功");
                    handleJumpRouter("/enterprise/dataManage/dataCollectConfig/list");
                });
			} else {
				requestCreateModel({
					...formData
				}).then(() => {
                    message.success("新增成功");
                    handleJumpRouter("/enterprise/dataManage/dataCollectConfig/list");
                });
			}
		}

        /**
         * 点击重置按钮时触发
         * @param
         * @return
         */
        const handleReset = () => {
            state.formData = {};
        };

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
        const handleBack = () => {
            router.go(-1);
        };

		/**
         * tabs点击下一步时触发（不需要校验表单）
         * @param
         * @return
         */
        const handleTabsNext = () => {
            state.step++;
        };

        /**
         * 点击上一步时触发
         * @param
         * @return
         */
        const handlePrev = () => {
            state.step--;
        };

        return {
            ...toRefs(state),
            formRef,
			handleSubmit,
            handleNext,
			handleBack,
			handlePrev,
            handleReset,
			handleTabChange,
			handleTabsNext
        };
    },
});
</script>

<style lang="less" scoped>
.addModel-form {
    float: left;
    width: 374px;
}
.addModel-preview {
    float: left;
    padding: 20px 100px 40px;
    &-phone {
        padding: 56px 14px 20px;
        width: 336px;
        height: 700px;

        overflow: hidden;
        background: url("@/assets/images/main/dataCollectConfig/mobile.png")
            no-repeat;
        background-size: 100% 100%;
        iframe {
            border-radius: 0 0 16px 16px;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
