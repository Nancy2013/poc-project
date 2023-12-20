<template>
    <fc-group :groupInfo="{
        tabsList, configEventList: [
            { type: 'cancel', name: '返回', event: returnPage }
        ]
    }" />
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getPassportBaseModelDetail } from "./server";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
    props: {},
    components: {},
    setup() {
        const route = useRoute();
        const router = useRouter();

        // 返回主页
        const returnPage = () => {
            router.go(-1)
        }

        // 获得护照模板明细
        const getModelParamsDetail = (params: any) => {
            let { id } = params
            getPassportBaseModelDetail({ id }).then((res) => {
                if (res.code == 0) {
                    let {
                        data: {
                            paramCategoryList,
                            paramTree
                        },
                    } = res as unknown as any;
                    const filterMapList = (type: string) => {
                        return paramTree
                            .filter((item: any) => item.paramCategory == type)
                            .map((v: any) => {
                                return {
                                    paramId: v.id,
                                    paramKey: v.paramKey,
                                    type: "text",
                                    title: v.paramName,
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

        onMounted(() => {
            console.log('router.query', route.query)
            let { id } = route.query;
            getModelParamsDetail({ id });
        });

        const state = reactive({
            loading: false,
            tabsList: [],
        });
        return {
            ...toRefs(state),
            returnPage
        };
    },
});

</script>