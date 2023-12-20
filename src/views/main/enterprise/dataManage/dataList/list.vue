<template>
    <fc-table :columns="tableColumns" :dataSource="dataSource" :paginationConfig="pagination" @pageChange="paginationChange"
        :loading="loading" :searchRenderList="searchRenderList" :searchData="searchData" @search="handleSearch">
        <template #headerBtnArea>
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
        </template>
        <template #headerLeft>
            <a-button type="primary" @click="convertPage('createBatch')">批量生成数据</a-button>
        </template>
        <template #paramSum="{ text }">
            <span>{{ text }}/{{ text }}</span>
        </template>
        <template #index="{ index }">
            <span>{{ index + 1 }}</span>
        </template>
        <template #operate="{ record }">
            <a-button type="link" size="small" @click="convertPage('detail', { ...record })">详情</a-button>
        </template>
    </fc-table>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { searchRenderList, tableColumns } from "./config";
import { getCollectProductData } from "./server";
import { getDataCollectConfigList } from "@/views/main/enterprise/dataManage/dataCollectConfig/server"
import { usePage } from "@/hooks/usePage";
export default defineComponent({
    name: "",
    setup() {
        const {
            loading,
            dataSource,
            searchData,
            pagination,
            handleSearch,
            paginationChange,
            handleReset,
            handleJump
        } = usePage({
            sendRequest: getCollectProductData,
            searchInitData: { paramAllReady: true }
        });

        const state = reactive({
            searchRenderList
        })

        // 页面组件切换
        const convertPage = (type: string, params?: any) => {
            let path: string = "";
            switch (type) {
                case "createBatch":
                    path = "/enterprise/dataManage/dataList/createBatch";
                    break;
                case "detail":
                    path = "/enterprise/dataManage/dataList/detail";
                    break;
                default:
                    break;
            }
            handleJump(path, params);
        };

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
                        value: item.modelName
                    }
                })
            })
        }

        initData()

        return {
            searchRenderList,
            tableColumns,
            loading,
            dataSource,
            searchData,
            pagination,
            handleReset,
            handleSearch,
            paginationChange,
            convertPage
        };
    },
});
</script>
