<template>
    <fc-table :columns="tableColumns" :dataSource="dataSource" :paginationConfig="pagination" @pageChange="paginationChange" :loading="loading" :searchRenderList="searchRenderList" :searchData="searchData" @search="handleSearch">
        <template #headerBtnArea>
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
        </template>
        <template #headerLeft>
            <a-button type="primary" @click="handleAdd('dataEntryBatchList')">批量手工录入</a-button>
        </template>
        <template #paramSum="{ record }">
            <span>{{ record.paramSum || 0}} / {{record.totalModelParam}}</span>
        </template>
        <template #action="{ record }">
            <a-button type="link" size="small" @click="handleEdit('dataEntryAdd',{ id: record.id },  { type: 'edit' })">手工录入</a-button>
            <a-button type="link" size="small" @click="handleEdit('dataEntryAdd',{ id: record.id },  { type: 'detail' })">详情</a-button>        
        </template>
    </fc-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { searchRenderList, tableColumns } from "./config";
import { requestGetCollectProductList } from "../server";
import { getDataCollectConfigList } from "@/views/main/enterprise/dataManage/dataCollectConfig/server"
import { usePage } from "@/hooks/usePage";
export default defineComponent({
    name: "",
    setup() {
        
        const state = reactive({
            searchRenderList
        })
        const {
            loading,
            dataSource,
            searchData,
            pagination,
            //query,
            handleSearch,
            handleAdd,
            handleEdit,
            // handleJump,
            paginationChange,
            //handleFresh,
            handleReset,
            //handleDel,
        } = usePage({
            sendRequest: requestGetCollectProductList,
        });

        /**
         * 初始化页面数据
         * @param
         * @return
         */
        const initData = ()=> {
            getDataCollectConfigList({
                pageSize: 1000
            }).then((res)=> {
                state.searchRenderList[0].options = res.data.list.map((item)=> {
                    return {
                        label: item.modelName,
                        value: item.id
                    }
                })
            })
        }

        initData()

        return {
            ...toRefs(state),
            tableColumns,
            loading,
            dataSource,
            searchData,
            pagination,
            handleAdd,
            handleEdit,
            handleReset,
            handleSearch,
            paginationChange,
        };
    },
});
</script>

<style lang="less" scoped>
</style>
