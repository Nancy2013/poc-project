<template>
    <fc-table :columns="tableColumns" :dataSource="dataSource" :paginationConfig="pagination" @pageChange="paginationChange" :loading="loading" :searchRenderList="searchRenderList" :searchData="searchData" @search="handleSearch">
        <template #headerBtnArea>
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
        </template>
        <template #headerLeft>
            <a-button type="primary" @click="handleAdd('dataEntryBatchList')">新增</a-button>
        </template>
        <template #status="{ record }">
            <a-switch :checked="record.status == 0"/>
        </template>
        <template #action="{ record }">
            <a-button type="link" size="small" @click="handleEdit('dataEntryAdd',{ id: record.id },  { type: 'edit' })">护照查看权限</a-button>
			<a-button type="link" size="small" @click="handleChange(record)">编辑</a-button>
            <a-button type="link" size="small" @click="handleEdit('dataEntryAdd',{ id: record.id },  { type: 'detail' })">查看</a-button>
        </template>
    </fc-table>

	<a-modal v-model:visible="visible" :title="formData.id ? '编辑角色' : '新增角色' " centered @ok="handleSubmit()" @cancel="handleCancel">
        <fc-form ref="formRef" :rules="rules" :renderList="renderFormList" :formData="formData" labelAlign="right" :labelCol="{ style: {width: '112px'} }"></fc-form>
    </a-modal>
</template>


<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { searchRenderList, tableColumns, renderFormList, formRules } from "./config";
import { requestGetRoleList, requestCreateRole, requestUpdateRole } from "./server";
import { usePage } from "@/hooks/usePage";
import { requestDict } from "@/service/common";
import { message } from 'ant-design-vue'
import dayjs from "dayjs";

export default defineComponent({
    name: "",
    setup() {
		const formRef = ref()
        const state = reactive({
            searchRenderList,
			renderFormList,
			formRules,
			formData: {
				sort: 0
			} as any,
			visible: false
        });
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
            sendRequest: requestGetRoleList,
			transformSearch: (searchData)=> {
				const dates = searchData.dates
				if(Array.isArray(dates) && dates.length) {
					searchData.createTime = [dayjs(dates[0]).format("YYYY-MM-DD 00:00:00"), dayjs(dates[1]).format("YYYY-MM-DD 23:59:59")]
				}
				delete searchData.dates
				return searchData
			}
        });

        /**
         * 初始化页面数据
         * @param
         * @return
         */
        const initData = () => {
			requestDict({
				type: "common_status"
			}).then((res)=> {
				console.log('resss', res)
				renderFormList[3].options = res.data.map((item: any)=> {
					return {
						label: item.label,
						value: Number(item.value)
					}
				})
			})
            requestGetRoleList({
                pageSize: 1000,
            }).then((res: any) => {
                state.searchRenderList[0].options = res.data.list.map(
                    (item: any) => {
                        return {
                            label: item.name,
                            value: item.id,
                        };
                    }
                );
            });
        };

        initData();

		/**
         * 点击新增按钮时触发
         * @param
         * @return
         */
		const handleAdd = ()=> {
			state.visible = true
		}

		/**
         * 点击弹框取消按钮时触发
         * @param
         * @return
         */
		const handleCancel = ()=> {
			state.formData = {
				sort: 0
			}
			state.visible = false
		}

		/**
         * 点击列表编辑按钮时触发
         * @param
         * @return
         */
		const handleChange = (record: any)=> {
			const { remark, name, sort, status, id, code } = record
			state.formData = { remark, name, sort, status, id, code } as any
			state.visible = true
		}

		/**
         * 点击提交按钮时触发
         * @param
         * @return
         */
		const handleSubmit = ()=> {
			formRef.value.validate().then((formData: any)=> {
				if(state.formData.id) {
					requestUpdateRole({
						...state.formData
					}).then(()=> {
						message.success('编辑角色成功')
						handleCancel()
						handleSearch()
					})
				} else {
					requestCreateRole({
                    	...formData
					}).then((res: any)=> {
						message.success('新增角色成功')
						handleCancel()
						handleSearch()
					})
				}
                
            })
		}


        return {
            ...toRefs(state),
			formRef,
            tableColumns,
            loading,
            dataSource,
            searchData,
            pagination,
            handleAdd,
			handleChange,
			handleSubmit,
			handleCancel,
            handleEdit,
            handleReset,
            handleSearch,
            paginationChange,
        };
    },
});
</script>

