import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Login from '@/views/sys/login/login.vue'
import Layout from '@/views/main/layout/index.vue'
import accountManage from './accountManage' // 账号管理
import dataManage from './dataManage' // 数据管理
import passportManage from './passportManage' // 护照管理
import identityManage from './identityManage' // 标识管理
import mobileRoute from './mobile'
console.log('mobileRoute', mobileRoute)

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/layout',
            name: 'layout',
            component: Layout,
            children: [
                ...accountManage,
                ...dataManage,
                ...passportManage,
                ...identityManage,
            ]
        },
        ...mobileRoute
    ]
})

export default router
