<template>
    <fc-table :columns="tableColumns" :dataSource="dataSource" :paginationConfig="pagination" @pageChange="paginationChange" :loading="loading" :searchRenderList="searchRenderList" :searchData="searchData" @search="handleSearch">
        <template #headerBtnArea>
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
        </template>
        <template #headerLeft>
            <a-button type="primary" @click="handleAdd('templateConfigAdd', { type: 'add' })">新增模板</a-button>
        </template>
        <template #status="{ record }">
            <a-switch :checked="record.status == statusDict.enable" @click="handleChangeStatus(record)" />
        </template>
        <template #action="{ record }">
            <!-- <a-button v-if="record.status == statusDict.enable" type="link" size="small">下发企业</a-button> -->
            <a-button type="link" size="small" @click="handleEdit('templateConfigAdd',{ id: record.id },  { type: 'edit' })">编辑</a-button>
            <a-button type="link" size="small" @click="handleEdit('templateConfigAdd',{ id: record.id },  { type: 'detail' })">详情</a-button>
        </template>
    </fc-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { searchRenderList, tableColumns } from "./config";
import { requestDict } from "@/service/common";
import {
    requestTemplateConfigList,
    TemplateConfigItem,
    GetTemplateConfigListRequest,
    requestUpdateStatusPlatform,
} from "./server";
import { usePage } from "@/hooks/usePage";
import { statusDict } from "@/utils/dict";
import { message } from "ant-design-vue";
export default defineComponent({
    name: "",
    setup() {
        const {
            loading,
            dataSource,
            searchData,
            pagination,
            query,
            handleSearch,
            handleAdd,
            handleEdit,
            // handleJump,
            paginationChange,
            //handleFresh,
            handleReset,
            //handleDel,
        } = usePage<GetTemplateConfigListRequest, TemplateConfigItem>({
            sendRequest: requestTemplateConfigList,
        });

        const state = reactive({
            searchRenderList
        })

        /**
         * 初始化页面数据
         * @param
         * @return
         */
        const initData = () => {
            requestDict<any, any>({
                type: "dpp_industry",
            }).then((res) => {
                state.searchRenderList[1].options = res.data.map(
                    (item) => {
                        return {
                            label: item.label,
                            value: item.value,
                        };
                    }
                );
            });
        };

        initData()

        /**
         * 更改状态
         * @param { Object } record 列表项数据
         * @return
         */
        const handleChangeStatus = (record: TemplateConfigItem) => {
            requestUpdateStatusPlatform({
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
            handleAdd,
            handleEdit,
            handleReset,
            handleSearch,
            handleChangeStatus,
            paginationChange,
        };
    },
});
</script>

<style lang="less" scoped>
</style>
