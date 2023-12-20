import { RouteRecordRaw } from 'vue-router'
const dataManage = [
    {
        id: 'enterprise/dataManage',
        path: "/enterprise/dataManage",
        ismenu: "Y",
        name: "enterprise/dataManage",
        title: '数据管理',
        component: () => import("@/views/main/layout/basicLayout.vue"),
        children: [
            // 企业端
            {
                ismenu: "Y",
                level: 2,
                title: "数据采集配置",
                path: '/enterprise/dataManage/dataCollectConfig/list',
                name: "dataCollectConfigList",
                meta: { title: "数据采集配置" },
                component: () => import("@/views/main/enterprise/dataManage/dataCollectConfig/list.vue")
            },
            {
                level: 2,
                title: "新增模型",
                path: '/enterprise/dataManage/dataCollectConfig/addModel/:type',
                name: "dataCollectConfigAddModel",
                meta: { title: "新增模型" },
                component: () => import("@/views/main/enterprise/dataManage/dataCollectConfig/add.vue")
            },
            {
                ismenu: "Y",
                level: 2,
                title: "数据采集录入",
                path: '/enterprise/dataManage/dataEntry/list',
                name: "dataEntryList",
                meta: { title: "数据采集录入" },
                component: () => import("@/views/main/enterprise/dataManage/dataEntry/single/list.vue")
            },
            {
                level: 2,
                title: "单个编辑",
                path: '/enterprise/dataManage/dataEntry/add/:type',
                name: "dataEntryAdd",
                meta: { title: "数据采集录入" },
                component: () => import("@/views/main/enterprise/dataManage/dataEntry/single/edit.vue")
            },
            {
                level: 2,
                title: "批量手工录入",
                path: '/enterprise/dataManage/dataEntry/batch/list',
                name: "dataEntryBatchList",
                meta: { title: "批量手工录入" },
                component: () => import("@/views/main/enterprise/dataManage/dataEntry/batch/list.vue")
            },
            {
                level: 2,
                title: "编辑数据",
                path: '/enterprise/dataManage/dataEntry/batch/entry/:type',
                name: "dataEntryBatchEntry",
                meta: { title: "编辑数据" },
                component: () => import("@/views/main/enterprise/dataManage/dataEntry/batch/entry.vue")
            },
            {
                ismenu: "Y",
                level: 2,
                title: "数据管理列表",
                path: '/enterprise/dataManage/dataList/list',
                name: "/enterprise/dataManage/dataList/list",
                meta: { title: "数据采集配置" },
                component: () => import("@/views/main/enterprise/dataManage/dataList/list.vue")
            },
            {
                level: 2,
                title: "数据管理列表",
                path: '/enterprise/dataManage/dataList/createBatch',
                name: "/enterprise/dataManage/dataList/createBatch",
                meta: { title: "数据管理列表" },
                component: () => import("@/views/main/enterprise/dataManage/dataList/createBatch.vue")
            },
            {
                level: 2,
                title: "数据管理列表",
                path: '/enterprise/dataManage/dataList/detail',
                name: "/enterprise/dataManage/dataList/detail",
                meta: { title: "数据管理列表" },
                component: () => import("@/views/main/enterprise/dataManage/dataList/detail.vue")
            },

            // 运营端
            {
                ismenu: "Y",
                level: 2,
                title: "模板配置",
                path: '/operate/dataManage/templateConfig/list',
                name: "/enterprise/dataManage/templateConfig/list",
                meta: { title: "模板配置" },
                component: () => import("@/views/main/operate/dataManage/templateConfig/list.vue")
            },
            {
                level: 2,
                title: "新增模板",
                path: '/operate/dataManage/templateConfig/addTemplate/:type',
                name: "templateConfigAdd",
                meta: { title: "数据采集配置" },
                component: () => import("@/views/main/operate/dataManage/templateConfig/add.vue")
            }
            
        ],
    },

]
export default dataManage;