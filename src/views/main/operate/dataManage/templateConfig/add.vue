<template>
    <div class="addTemplate-form" v-show="step === 0">
        <fc-form ref="formRef" :renderList="addTemplateFormRenderList" :formData="formData" layout="vertical"></fc-form>
    </div>

    <fc-tabs :tabsList="tabsList" :activeKey="step" @tabChange="handleTabChange" v-show="step !== 0">
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

    <div class="addTemplate-operate">
        <a-button v-show="step === 0" type="primary" @click="handleNext">下一步</a-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import {
    addTemplateFormRenderList,
    modelList,
    transformModelData,
} from "./config";
import { requestDict } from "@/service/common";
import {
    GetDictRequest,
    IndustryItem,
    requestGetPlatformList,
    PlatformItem,
    requestCreatePlatform,
    requestGetPlatformDetail,
    requestGetPlatformListEdit,
    requestUpdatePlatform,
} from "./server";
import { modelDict } from "@/utils/dict";
import { RenderFormItem } from "@/components/form";
import { message } from "ant-design-vue";
import useRouter from "@/hooks/useRouter";
import { useRoute } from "vue-router";
import router from "@/router";

interface TemplateConfigState {
    formData: {
        [index: string]: string;
    };
    activeKey: string;
    step: number;
    tabStep: number;
    tabsTotal: number;
    platformData: {
        [index: string]: Array<PlatformItem>;
    };
    paramsData: any;
    addTemplateFormRenderList: RenderFormItem[];
    tabsList: any[];
}

export default defineComponent({
    setup() {
        const formRef = ref();
        const state = reactive<TemplateConfigState>({
            formData: {},
            step: 0,
            tabStep: 0,
            tabsTotal: 0,
            activeKey: "1",
            platformData: {},
            tabsList: [],
            paramsData: useRoute().params || {},
            addTemplateFormRenderList: addTemplateFormRenderList,
        });

        const { handleJumpRouter } = useRouter();

        const query = useRoute().query || {};

        /**
         * 初始化页面数据
         * @param
         * @return
         */
        const initData = () => {
            if (query.id) {
                if (state.paramsData.type === "detail") {
                    state.addTemplateFormRenderList[0].disabled = true;
                    state.addTemplateFormRenderList[1].disabled = true;
                    state.addTemplateFormRenderList[2].disabled = true;
                }
                Promise.all([requestDict({ type: "dpp_industry", }), requestGetPlatformList(), requestGetPlatformListEdit({ id: query.id })]).then((result)=> {
                    const [industryList, platformData, templateData] = result as any, templateIdData = {}
                    const { modelTemplateDetailVoList, templateName, industryType, remark, id } =  templateData.data;
                    const { modelParamDefineResultList, category } = platformData.data
                    state.addTemplateFormRenderList[1].options = industryList.data.map((item: any) => {
                            return {
                                label: item.label,
                                value: item.value,
                            };
                        }
                    );
                    state.formData = { templateName, industryType, remark, id };
                    for(let i = 0; i < modelTemplateDetailVoList.length; i++) {
                        const { recordType, id } = modelTemplateDetailVoList[i]
                        templateIdData[id] = {
                            recordType
                        }
                    }
                    transformModelData({ category, modelList: modelParamDefineResultList, templateIdData: templateIdData, type: state.paramsData.type } )
                    .then((res: any) => {
                        const { tabsTotal, platformData, tabsList } = res;
                        state.tabsTotal = tabsTotal;
                        state.platformData = platformData;
                        state.tabsList = tabsList;
                    });
                })
            } else {
                requestDict<GetDictRequest, IndustryItem>({
                    type: "dpp_industry",
                }).then((res) => {
                    state.addTemplateFormRenderList[1].options = res.data.map(
                        (item) => {
                            return {
                                label: item.label,
                                value: item.value,
                            };
                        }
                    );
                });
                requestGetPlatformList().then((res) => {
                    const { modelParamDefineResultList, category } = res.data;
                    transformModelData( { category, modelList: modelParamDefineResultList }).then((res: any) => {
                        const { tabsTotal, platformData, tabsList } = res;
                        state.tabsTotal = tabsTotal;
                        state.platformData = platformData;
                        state.tabsList = tabsList;
                    });
                });
            }
        };

        initData();

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
         * 点击重置按钮时触发
         * @param
         * @return
         */
        const handleReset = () => {
            state.formData = {};
        };

        /**
         * 点击下一步时触发
         * @param
         * @return
         */
        const handleNext = () => {
            formRef.value.validate().then(() => {
                state.step++;
            });
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

        /**
         * 点击提交按钮时触发
         * @param
         * @return
         */
        const handleSubmit = () => {
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
                            platformItem.children.forEach((item)=> {
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
            if (formData.id) {
                requestUpdatePlatform({
                    ...formData,
                }).then((res: any) => {
                    message.success("编辑成功");
                    handleJumpRouter("/operate/dataManage/templateConfig/list");
                });
            } else {
                requestCreatePlatform({
                    ...formData,
                }).then((res) => {
                    message.success("新增成功");
                    handleJumpRouter("/operate/dataManage/templateConfig/list");
                });
            }
        };
        return {
            ...toRefs(state),
            formRef,
            handleBack,
            modelDict,
            handleReset,
            handleNext,
            handlePrev,
            handleTabsNext,
            handleSubmit,
            handleTabChange,
            transformModelData,
            modelList,
        };
    },
});
</script>

<style lang="less" scoped>
.addTemplate-form {
    float: left;
    width: 33.3%;
}

@media screen and (max-width: 1280px) {
    .addTemplate-form {
        float: left;
        width: 50%;
    }
}

.addTemplate-operate {
    position: absolute;
    bottom: @space-lg;
    right: @space-lg;
}
</style>