const passportManage=[
    {
        id:'1-0',
        level: 1,
        icon: "detail",
        path: "#",
        name: "passportManage",
        title: "护照管理",
        ismenu: "Y",
        component: () => import("@/views/main/layout/basicLayout.vue"),
        children:[
            { // 护照模板配置
                id:'1-0-0',
                level: 2,
                icon: "",
                path: '/passportManage/passportManageConfig',
                name: "",
                title: "护照模版配置",
                meta: { title: "护照模版配置" },
                ismenu: "Y",
                component: () => import("@/views/main/enterprise/passportManage/passportManageConfig/list/index.vue"),
            },
            { // 护照模板配置-详情
                id: '1-0-1',
                level: 2,
                icon: "",
                path: '/passportManage/passportManageConfig/detail',
                name: '',
                title: '护照模板详情',
                meta: { title: '护照模板详情' },
                ismenu: "N",
                component: () => import("@/views/main/enterprise/passportManage/passportManageConfig/detail/index.vue"),
            },
            { // 护照模板配置-添加
                id: '1-0-2',
                level: 2,
                icon: "",
                path: '/passportManage/passportManageConfig/add',
                name: '',
                title: '新增护照模板',
                meta: { title: '新增护照模板' },
                ismenu: "N",
                component: () => import("@/views/main/enterprise/passportManage/passportManageConfig/add/index.vue")
            },
            { // 护照模板配置-编辑
                id: '1-0-2',
                level: 2,
                icon: "",
                path: '/passportManage/passportManageConfig/edit',
                name: '',
                title: '编辑护照模板',
                meta: { title: '编辑护照模板' },
                ismenu: "N",
                component: () => import("@/views/main/enterprise/passportManage/passportManageConfig/edit/index.vue")
            },



            { // 护照管理列表
                id:'1-0-5',
                level: 2,
                icon: "",
                path: '/productManage/passportManageList',
                name: "passportManageList",
                title: "护照管理列表",
                meta: { title: "护照管理列表" },
                ismenu: "Y",
                component: () => import("@/views/main/enterprise/passportManage/passportManageList/list/index.vue"),
            },
            // 护照管理列表-详情
            {
                id:'1-0-6',
                level: 2,
                icon: "",
                path: '/productManage/passportManageList/detail',
                name: "passportManageListDetail",
                title: "详情",
                meta: { title: "详情" },
                ismenu: "N",
                component: () => import("@/views/main/enterprise/passportManage/passportManageList/detail/index.vue"),
            },
            { // 批量制照
                id:'1-0-7',
                level: 2,
                icon: "",
                path: '/productManage/passportBatchMake',
                name: "passportBatchMake",
                title: "批量制照",
                meta: { title: "批量制照" },
                ismenu: "N",
                component: () => import("@/views/main/enterprise/passportManage/passportManageList/batchMake/index.vue"),
            },
            { // 制作护照(有模板、无模板)
                id:'1-0-8',
                level: 2,
                icon: "",
                path: '/productManage/passportMake',
                name: "passportMake",
                title: "制作护照",
                meta: { title: "制作护照",isFluidPage: true, },
                ismenu: "N",
                component: () => import("@/views/main/enterprise/passportManage/passportManageList/passportMake/index.vue"),
            },
            { // 生成护照模板
                id:'1-0-9',
                level: 2,
                icon: "",
                path: '/productManage/passportGenerateTemplate',
                name: "passportGenerateTemplate",
                title: "生成护照模板",
                meta: { title: "生成护照模板" },
                ismenu: "N",
                component: () => import("@/views/main/enterprise/passportManage/passportManageList/generateTemplate/index.vue"),
            },
            { // 护照生命周期
                id:'1-0-10',
                level: 2,
                icon: "",
                path: '/productManage/passportLifecycle',
                name: "passportLifecycle",
                title: "护照生命周期",
                meta: { title: "护照生命周期" },
                ismenu: "N",
                component: () => import("@/views/main/enterprise/passportManage/passportManageList/lifecycle/index.vue"),
            },
            { // 护照受理列表
                id:'1-0-11',
                level: 2,
                icon: "",
                path: '/productManage/passportHandleList',
                name: "passportHandleList",
                title: "护照受理列表",
                meta: { title: "护照受理列表" },
                ismenu: "Y",
                component: () => import("@/views/main/operate/passportManage/passportHandleList/list/index.vue"),
            },
            { // 批量受理
                id:'1-0-12',
                level: 2,
                icon: "",
                path: '/productManage/passportHandleBatch',
                name: "passportHandleBatch",
                title: "批量受理",
                meta: { title: "批量受理" },
                ismenu: "N",
                component: () => import("@/views/main/operate/passportManage/passportHandleList/handleBatch/index.vue"),
            },
        ],
    }
]
export default passportManage;