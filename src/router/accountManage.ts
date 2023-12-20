const accountManage=[
    {
        id:'accountManage',
        level: 1,
        icon: "user-filling",
        path: "#",
        name: "accountManage",
        title: "账号管理",
        ismenu: "Y",
        component: () => import("@/views/main/layout/basicLayout.vue"),
        children:[
            { 
                id:'1-1-0',
                level: 2,
                icon: "",
                path: '',
                name: "",
                title: "首页",
                meta: { title: "首页" },
                ismenu: "Y",
            },
            { 
                id:'1-1-1',
                level: 2,
                icon: "",
                path: '',
                name: "",
                title: "个人中心",
                meta: { title: "个人中心" },
                ismenu: "Y",
            },
            { // 企业身份认证
                id:'1-1-2',
                level: 2,
                icon: "",
                path: '/accountManage/enterpriseAuth',
                name: "",
                title: "企业身份认证",
                meta: { title: "企业身份认证" },
                ismenu: "Y",
                component: () => import("@/views/main/enterprise/accountManage/enterpriseAuth/index.vue"),
            },
            {
                ismenu: "Y",
                level: 2,
                title: "身份管理",
                path: '/authority/identityManage/list',
                name: "identityManageList",
                meta: { title: "身份管理" },
                component: () => import("@/views/main/authority/identityManage/list.vue")
            },
            { // 企业审核
                id:'1-1-3',
                level: 2,
                icon: "",
                path: '/accountManage/enterpriseAudit',
                name: "enterpriseAudit",
                title: "企业审核",
                meta: { title: "企业审核" },
                ismenu: "Y",
                component: () => import("@/views/main/operate/accountManage/enterpriseAudit/index.vue"),
            },
            { // 企业审核详情
                id:'1-1-4',
                level: 2,
                icon: "",
                path: '/accountManage/enterpriseAuditDetail',
                name: "enterpriseAuditDetail",
                title: "详情",
                meta: { title: "详情" },
                ismenu: "N",
                component: () => import("@/views/main/enterprise/accountManage/enterpriseAuth/index.vue"),
            },
            { // 企业签约
                id:'1-1-5',
                level: 2,
                icon: "",
                path: '/accountManage/enterpriseSign/List',
                name: "enterpriseSignList",
                title: "企业签约",
                meta: { title: "企业签约" },
                ismenu: "Y",
                component: () => import("@/views/main/operate/accountManage/enterpriseSign/list/index.vue"),
            },
            { // 企业签约- 新增 | 编辑 | 详情
                id:'1-1-6',
                level: 2,
                icon: "",
                path: '/accountManage/enterpriseSignAction/:type',
                name: "enterpriseSignAction",
                title: "新增",
                meta: { title: "新增" },
                ismenu: "N",
                component: () => import("@/views/main/operate/accountManage/enterpriseSign/add/index.vue"),
            },
        ],
    }
]
export default accountManage;