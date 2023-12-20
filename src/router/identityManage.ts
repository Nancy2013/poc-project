const identityManage=[
    {
        id:'1-2',
        level: 1,
        icon: "scan",
        path: "#",
        name: "identityManage",
        title: "标识管理",
        ismenu: "Y",
        component: () => import("@/views/main/layout/basicLayout.vue"),
        children:[
            { 
                id:'1-2-0',
                level: 2,
                icon: "",
                path: '',
                name: "",
                title: "标识规则",
                meta: { title: "标识规则" },
                ismenu: "Y",
            },
            { 
                id:'1-2-1',
                level: 2,
                icon: "",
                path: '',
                name: "",
                title: "标识生成",
                meta: { title: "标识生成" },
                ismenu: "Y",
            },
            { 
                id:'1-2-2',
                level: 2,
                icon: "",
                path: '',
                name: "",
                title: "标识明细",
                meta: { title: "标识明细" },
                ismenu: "Y",
            },
        ],
    }
]
export default identityManage;