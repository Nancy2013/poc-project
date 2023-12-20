<template>
    <fc-table :columns="tableColumns" :dataSource="dataSource" :paginationConfig="pagination" @pageChange="paginationChange" :loading="loading" :searchRenderList="searchRenderList" :searchData="searchData" @search="handleSearch">
        <template #headerBtnArea>
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
        </template>
        <template #headerLeft>
            <a-button type="primary" @click="handleAdd('dataCollectConfigAddModel', { type: 'add' })">新增模型</a-button>
        </template>
        <template #status="{ record }">
            <a-switch :checked="record.status == statusDict.enable" @click="handleChangeStatus(record)" />
        </template>
        <template #action="{ record }">
            <a-button v-if="record.status == statusDict.disabled" type="link" size="small" @click="handleEdit('dataCollectConfigAddModel',{ id: record.id },  { type: 'edit' })">编辑</a-button>
            <a-button type="link" size="small" @click="handleEdit('dataCollectConfigAddModel',{ id: record.id },  { type: 'detail' })">详情</a-button>
        </template>
    </fc-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { searchRenderList, tableColumns } from "./config";
import { getDataCollectConfigList, requestUpdateModelStatus } from "./server";
import { requestTemplateConfigList } from '@/views/main/operate/dataManage/templateConfig/server'
import { statusDict } from "@/utils/dict";
import { message } from "ant-design-vue";
import { usePage } from "@/hooks/usePage";
export default defineComponent({
    name: "",
    setup() {
        const {
            loading,
            query,
            dataSource,
            searchData,
            pagination,
            handleSearch,
            handleEdit,
            paginationChange,
            handleReset,
            handleAdd,
        } = usePage({
            sendRequest: getDataCollectConfigList,
        });

        const state = reactive({
            searchRenderList,
        })

        /**
         * 初始化页面数据
         * @param
         * @return
         */
        const initData = ()=> {
            requestTemplateConfigList({
                pageSize: 100
            }).then((res:any)=> {
                state.searchRenderList[2].options = res.data.list.map((item: any)=> {
                    return {
                        label: item.templateName,
                        value: item.id
                    }
                })
            })
        }

        initData()

        /**
         * 更改状态
         * @param { Object } record 列表项数据
         * @return
         */
        const handleChangeStatus = (record: any) => {
            requestUpdateModelStatus({
                id: record.id,
                status:
                    record.status === statusDict.enable
                        ? statusDict.disabled
                        : statusDict.enable,
            }).then(() => {
                message.success("操作成功");
                query();
            });
        };

        return {
            ...toRefs(state),
            statusDict,
            tableColumns,
            loading,
            dataSource,
            searchData,
            pagination,
            handleReset,
            handleEdit,
            handleSearch,
            handleAdd,
            paginationChange,
            handleChangeStatus,
        };
    },
});
</script>

<style lang="less" scoped>
</style>
