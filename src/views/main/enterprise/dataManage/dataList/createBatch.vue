<template>
    <fc-table v-if="!step" :columns="tableAColumns" :dataSource="dataSource" :paginationConfig="pagination"
        @pageChange="paginationChange" :loading="loading" :searchRenderList="searchRenderList" :searchData="searchData"
        @search="handleSearch">
        <template #headerBtnArea>
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
        </template>
        <template #paramSum="{ text }">
            <span>{{ text }}/{{ text }}</span>
        </template>
        <template #operate="{ record }">
            <a-button type="link" size="small" @click="handleNext(record)">生成数据</a-button>
        </template>
    </fc-table>
    <fc-group :step="step" :groupInfo="{
        tabsList, configEventList: [
            { type: 'confirm', event: createBatchs },
            { type: 'cancel', event: returnPage }
        ]
    }" @prevEvent="handlePrev" v-else></fc-group>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { searchRenderList, tableAColumns } from "./config";
import { getACollectProductData, getPassportBaseModel, createPassportBaseModel } from "./server";
import { usePage } from "@/hooks/usePage";
import { useRouter } from "vue-router";
import { message, Modal } from "ant-design-vue";
export default defineComponent({
    setup() {
        const {
            loading,
            dataSource,
            searchData,
            pagination,
            handleSearch,
            paginationChange,
            handleReset,
        } = usePage({
            sendRequest: getACollectProductData,
        });
        const router = useRouter();

        const state = reactive({
            step: 0,
            tabsList: [],
            totalList: [],
            params: {
                productSku: '',
                batchNo: '',
                modelId: 0
            }
        })

        // 下一步
        const handleNext = (params: any) => {
            state.step += 1
            let { productSku, batchNo, modelId } = params;
            state.params = {
                productSku,
                batchNo,
                modelId
            };
            getAllModelParamsList();
        }

        // 上一步
        const handlePrev = () => {
            state.step -= 1
        }

        // 返回主页
        const returnPage = () => {
            router.go(-1);
        };

        // 勾选父子节点结构
        const checkParentNodes = (nodes: any, nodeType: string) => {
            let allNodes: any = [];
            nodes.forEach((node: any) => {
                let { paramId, paramKey } = node;
                if (node[nodeType]) {
                    let treeNodes = node[nodeType].map((v: any) => ({
                        paramId: v["id"],
                        paramKey: v["paramKey"],
                    }));
                    allNodes = allNodes.concat(treeNodes);
                }
                allNodes.push({ paramId, paramKey });
            });
            return allNodes;
        };

        // 获得模型参数列表
        const getAllModelParamsList = () => {
            let { productSku, batchNo, modelId } = state.params
            getPassportBaseModel({
                productSku,
                batchNo,
                modelId
            }).then((res: { code: number; }) => {
                if (res.code == 0) {
                    let {
                        data: { paramTree, paramCategoryList },
                    } = res as any;
                    const filterMapList = (type: string) => {
                        return paramTree
                            .filter((item: any) => item.paramCategory == type)
                            .map((v: any) => {
                                return {
                                    paramId: v.id,
                                    paramKey: v.paramKey,
                                    type: "checkBox",
                                    title: v.paramName,
                                    value: false,
                                    desc: v.paramDesc,
                                    paramValue: v.children ? null : v.paramValue,
                                    treeNodes: v.children,
                                };
                            });
                    };
                    state.tabsList = paramCategoryList
                        .map((v: any) => ({
                            key: `${v['value']}`,
                            name: v['label'],
                            arr: filterMapList(`${v['value']}`),
                        })) as any;
                }
            });
        };

        // 批量生成
        const createBatchs = () => {
            let { productSku, batchNo, modelId } = state.params
            state.tabsList.forEach(
                (v: any) => (state.totalList = state.totalList.concat(v.arr))
            );
            let params = {
                productSku,
                batchNo,
                modelId,
                paramKeyList: checkParentNodes(
                    state.totalList.filter((v: { [x: string]: any; }) => v["value"]),
                    "treeNodes"
                ),
            };
            Modal.confirm({
                title: '是否确认生成护照?',
                onOk() {
                    createPassportBaseModel(params).then((res: { code: number; }) => {
                        if (res.code == 0) {
                            message.success("数据批量生成成功!");
                            router.go(-1);
                        }
                    });
                }
            })
        };

        // onMounted(() => {
        //     getAllModelParamsList();
        // });

        return {
            ...toRefs(state),
            searchRenderList,
            tableAColumns,
            loading,
            dataSource,
            searchData,
            pagination,
            handleReset,
            handleSearch,
            paginationChange,
            handleNext,
            handlePrev,
            returnPage,
            createBatchs
        }
    }
})
</script>