<template>
    <fc-table :columns="tableColumns" :dataSource="dataSource" :paginationConfig="pagination" @pageChange="paginationChange" :loading="loading" :searchRenderList="searchRenderList" :searchData="searchData" @search="handleSearch">
        <template #headerBtnArea>
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
        </template>
        <template #headerLeft>
            <a-button type="primary" @click="handleAdd">新增</a-button>
            <a-button :style="{marginLeft: '15px'}" type="primary" @click="handleBack">返回</a-button>
        </template>
        <template #action="{ record }">
            <a-button type="link" size="small" @click="handleEdit('dataEntryBatchEntry',{ id: record.id, bn: record.batchNo, mi: record.modelId  }, { type: 'edit' })">录入</a-button>
            <a-button type="link" size="small" @click="handleEdit('dataEntryBatchEntry',{ id: record.id, bn: record.batchNo, mi: record.modelId  }, { type: 'detail' })">详情</a-button>
        </template>
    </fc-table>

    <a-modal v-model:visible="visible" :title="formData.id ? '编辑SKU' : '新增SKU' " centered @ok="handleSubmit()" @cancel="handleCancel">
        <fc-form ref="formRef" :rules="rules" :renderList="renderFormList" :formData="formData" labelAlign="right" :labelCol="{ style: {width: '112px'} }"></fc-form>
    </a-modal>

</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { searchRenderList, tableColumns, renderFormList, formRules } from "./config";
import { requestGetSkuList, createSkuRequest } from "../server";
import { getDataCollectConfigList } from "@/views/main/enterprise/dataManage/dataCollectConfig/server"
import { BatchState } from '../data.d'
import { message } from 'ant-design-vue'
import { CreateSkuRequest } from '../server'
import { usePage } from "@/hooks/usePage";
import useRoute from "@/hooks/useRouter";
export default defineComponent({
    name: "",
    setup() {

        const formRef = ref();
        const state = reactive({
            visible: false,
            formData: {},
            searchRenderList,
            renderFormList
        })

        const {
            loading,
            dataSource,
            searchData,
            pagination,
            //query,
            handleSearch,
            handleEdit,
            // handleJump,
            paginationChange,
            //handleFresh,
            handleReset,
            //handleDel,
        } = usePage({
            sendRequest: requestGetSkuList,
        });

        const { handleReplaceRouter } = useRoute();

        /**
         * 初始化页面数据
         * @param
         * @return
         */
        const initData = ()=> {
            getDataCollectConfigList({
                pageSize: 1000
            }).then((res)=> {
                if(Array.isArray(res.data.list)) {
                    const modelList = res.data.list.map((item)=> {
                        return {
                            label: item.modelName,
                            value: item.id
                        }
                    })
                    state.renderFormList[2].options = modelList
                    state.searchRenderList[2].options = modelList
                }
            })
        }

        initData()
        /**
         * 点击新增按钮时触发
         * @param
         * @return
         */
        const handleAdd = () => {
            state.visible = true
        };

        /**
         * 点击提交按钮时触发
         * @param
         * @return
         */
        const handleSubmit = ()=> {
            formRef.value.validate().then((formData: CreateSkuRequest)=> {
                createSkuRequest({
                    ...formData
                }).then((res)=> {
                    message.success('新增成功')
                    handleCancel()
                    handleSearch()
                })
            })
        }

        /**
         * 点击取消按钮时触发
         * @param
         * @return
         */
        const handleCancel = ()=> {
            state.formData = {}
            state.visible = false
        }

        /**
         * 点击返回主页面时触发
         * @param
         * @return
         */
        const handleBack = () => {
            handleReplaceRouter("/enterprise/dataManage/dataEntry/list");
        };

        return {
            formRef,
            ...toRefs(state),
            formRules,
            tableColumns,
            loading,
            dataSource,
            searchData,
            pagination,
            handleEdit,
            handleBack,
            handleAdd,
            handleReset,
            handleSearch,
            handleSubmit,
            handleCancel,
            paginationChange,
        };
    },
});
</script>

<style lang="less" scoped>
</style>
