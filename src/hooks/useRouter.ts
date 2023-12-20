/*
 * @Description: 跳转方法
 * @Author: zhang zhen
 * @Date: 2023-08-21 14:46:43
 * @LastEditors: zhang zhen
 * @LastEditTime: 2023-08-21 14:50:39
 * @FilePath: /zhiyun-outsource-web/src/hooks/useRouter.ts
 */
import { useRouter } from 'vue-router'

/**
 * @description: 路由方法集合
 * @return {*}
 */
const RouterFunc = () => {
    const { push, replace } = useRouter()

    /**
     * @description: 路由跳转的方法
     * @param {string} url
     * @return {*}
     */    
    const handleJumpRouter = (url: string) => {
        push(url)
    }

     /**
     * @description: 路由跳转的方法
     * @param {string} url
     * @return {*}
     */    
     const handleReplaceRouter = (url: string) => {
        replace(url)
    }


    return {
        handleJumpRouter,
        handleReplaceRouter
    }
}

export default RouterFunc