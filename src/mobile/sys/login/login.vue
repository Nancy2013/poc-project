<template>
    <FcPage title="登录">
        <div class="login">
            <img class="login-left-icon" src="@/assets/mobileImages/sys/login/login-left-icon.png" alt="">
            <img class="login-right-icon" src="@/assets/mobileImages/sys/login/login-right-icon.png" alt="">
            <img class="login-bottom-icon" src="@/assets/mobileImages/sys/login/login-bottom-icon.png" alt="">
            <div class="login-header">
                <div class="login-header-welcome">欢迎登录</div>
                <div class="login-header-title">中国产品数据护照平台</div>
            </div>

            <div class="login-content">
                <div class="login-item">
                    <div class="login-inputBox">
                        <img :src="usernameImg" alt="">
                        <input type="text" placeholder="请输入用户名" maxlength="11" v-model="phone" @input="handleInput($event, 'phone')">
                    </div>
                </div>

                <div class="login-item">
                    <div class="login-inputBox">
                        <img :src="codeImg" alt="">
                        <input type="text" placeholder="请输入密码" v-model="password" @input="handleInput($event, 'validateCode')">
                    </div>
                </div>

                <!-- <div class="login-item">
                    <div class="login-inputBox">
                        <img :src="codeImg" alt="">
                        <input type="text" placeholder="短信验证码" maxlength="6" v-model="validateCode" @input="handleInput($event, 'validateCode')">
                        <div class="login-getCode color" @click="getCode">{{ countDown === 0 ? '获取验证码' : countDown+ ' s' }}</div>
                    </div>
                    <div class="login-getCode">
                        <FcButton :text="countDown === 0 ? '获取' : countDown+ ' s'" @click="getCode"></FcButton>
                    </div>
                </div> -->

                <div class="login-forget" @click="handleForget">
                    <img v-if="!isForget" src="@/assets/mobileImages/sys/login/forget.png" alt="">
                    <img v-else src="@/assets/mobileImages/sys/login/forget-active.png" alt="">
                    <div class="color">记住账号</div>
                </div>

                <div style="clear: both;"></div>

                <div class="login-submit">
                    <a-button type="primary" @click="handleSubmit">登录</a-button>
                    <!-- <FcButton customStyle="letter-spacing: 0.04rem;" text="登录" @click="handleSubmit"></FcButton> -->
                </div>
                <!-- <div class="login-apply color">暂无账号，立即申请</div> -->
            </div>

        </div>
    </FcPage>

</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import FcPage from "@/mobile/components/page/page.vue";
import codeImg from "@/assets/mobileImages/sys/login/code.png";
import usernameImg from "@/assets/mobileImages/sys/login/username.png";
import passwordImg from "@/assets/mobileImages/sys/login/password.png";
import { throttleFnc } from "@/utils/common";
import request from "@/utils/axios";
import { validPhone, validCode } from "@/utils/reg";
import { message } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";

let codeTimer: number | null = null;
const isForget = ref<boolean>(Boolean(localStorage.getItem("username")));
const countDown = ref<number>(0);
const phone = ref<string>(localStorage.getItem("username") || ""); // 手机号
const password = ref<string>(""); // 密码
const query = useRoute().query;
const router = useRouter();
const validateCode = ref<string>(""); // 验证码

/**
    点击获取验证码时触发
    @param 
    @return
*/
const getCode = throttleFnc(function (callback: Function) {
    if (validPhone(phone.value)) {
        // this.$axios({
        //     url: "/getValidateCode",
        //     method: "GET",
        //     data: {
        //         phoneNumber: phone.value,
        //     },
        //     baseUrl: "/api/base",
        // }).then((res) => {
        //         message.success("验证码已发送");
        //         if (codeTimer) {
        //             clearInterval(codeTimer);
        //             codeTimer = null;
        //         }
        //         countDown.value = 60;
        //         codeTimer = setInterval(() => {
        //             countDown.value = countDown.value - 1;
        //             if (countDown.value <= 0) {
        //                 clearInterval(codeTimer ? codeTimer : undefined);
        //                 codeTimer = null;
        //                 callback();
        //             }
        //         }, 1000);
        //     })
        //     .catch(() => {
        //         callback();
        //     });
    } else {
        message.error("请输入正确的账号");
        callback();
    }
});

/**
    输入框输入事件处理函数
    @param { Event } event input事件参数
    @param { String } type 类型 phone || code
    @return
*/
const handleInput = (event: Event, type: "phone" | "validateCode") => {};

/**
	点击记住账号时触发
	@param 
	@return
*/
const handleForget = () => {
    isForget.value = !isForget.value;
};

/**
    提交的事件处理方法
    @param 
    @return
*/
const handleSubmit = () => {
    if (!phone.value) {
        message.error("账号校验不能为空!");
        return;
    }
    if (!password.value) {
        message.error("密码校验不能为空!");
        return;
    } else {
        request({
            url: `${import.meta.env.VITE_BASE_URL}/system/auth/login`,
            type: "json",
            method: "post",
            data: {
                password: password.value,
                username: phone.value,
            },
        }).then((res: any) => {
            if (res.code == 0) {
                if (isForget.value) {
                    localStorage.setItem("username", phone.value);
                } else {
                    localStorage.removeItem("username");
                }
                localStorage.setItem("accessToken", res.data.accessToken);
                router.replace({
                    path: "/mobileHome",
                    query: { idisCode: query.idisCode },
                });
            }
        });
    }
};
</script>

<style lang="less" scoped>
:deep(.fc-page-content) {
    height: 100%;
}

.login {
    height: 100%;
    position: relative;
    padding-bottom: 0.64rem;
    overflow: hidden;
    background-image: url(@/assets/mobileImages/sys/login/login-bg.png);
    background-size: 100% 100%;
}
.login-left-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 1.21rem;
    height: 2.08rem;
}
.login-right-icon {
    position: absolute;
    top: 0.2rem;
    right: 0rem;
    width: 3.88rem;
    height: 4.36rem;
}
.login-bottom-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 5.68rem;
    height: 6.88rem;
}
.login-header {
    z-index: 2;
    position: relative;
    padding-top: 0.8rem;
    //height: 5.56rem;
    .login-header-welcome {
        margin-left: 0.24rem;
        font-size: 0.52rem;
        line-height: 0.72rem;
        font-weight: bold;
        color: #222;
    }
    .login-header-title {
        margin: 0.4rem 0 0 0.4rem;
        font-size: 0.32rem;
        line-height: 0.44rem;
        color: #222;
    }

    .login-header-bg {
        width: 100%;
        height: 100%;
    }
    .login-header-text {
        position: absolute;
        left: 0;
        right: 0;
        top: 1.2rem;
        width: 4.74rem;
        height: 2.08rem;
        margin: 0 auto;
    }
}

.login-title {
    text-align: left;
    font-size: 0.32rem;
    line-height: 0.44rem;
    .login-title-line {
        position: relative;
        margin-top: 0.18rem;
        margin-bottom: 0.7rem;
        height: 1px;
        width: 100%;
        background: rgba(0, 0, 0, 0.1);
        div {
            left: 0;
            top: 0;
            bottom: 0;
            width: 1.28rem;
            height: 0.04rem;
            margin: auto 0;
            background: #333333;
        }
    }
}

.login-content {
    z-index: 2;
    position: relative;
    //top: -1.68rem;
    overflow: hidden;
    margin: 1.46rem 0.28rem 0;
    padding: 0 0.28rem 0.72rem 0.28rem;
    border-radius: 0.18rem;
    .login-item:first-child {
        margin-top: 0;
    }
    .login-item {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.4rem;
        .login-inputBox {
            display: flex;
            flex-direction: row;
            align-items: center;
            position: relative;
            flex: 1;
            height: 1.24rem;
            padding-left: 0.78rem;
            border-radius: 0.08rem;
            background-color: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(0.06rem);
            img {
                display: block;
                position: absolute;
                width: 0.56rem;
                height: 0.56rem;
                left: 0.22rem;
                top: 0;
                bottom: 0;
                margin: auto 0;
            }
            input {
                width: 100%;
                height: 100%;
                padding-left: 0.2rem;

                border: none;
                font-size: 0.3rem;
                outline: none;
                color: #333;
                background-color: transparent;
            }
        }
        .login-getCode {
            position: absolute;
            right: 0.24rem;
            top: 0;
            bottom: 0;
            font-size: 0.3rem;
            line-height: 1.24rem;
            color: @primary-color;
        }
    }

    .login-forget {
        float: left;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.44rem;
        height: 0.4rem;
        > img {
            width: 0.36rem;
            height: 0.36rem;
        }
        > div {
            margin-left: 0.2rem;
            font-size: 0.28rem;
            color: #696969;
        }
    }

    .login-apply {
        float: right;
        margin-top: 0.2rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        text-decoration: underline;
    }
}

.login-submit {
    width: 5.7rem;
    height: 0.84rem;
    margin: 1.4rem auto 0;
    button {
        width: 100%;
        height: 100%;
    }
}
.dialog-item {
    padding: 0.2rem;
    display: flex;
    justify-content: center;
    text-align: center;
    &:last-child {
        padding-bottom: 0.5rem;
    }
    > p {
        margin: 0;
        width: 200px;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        border: 1px solid #e2e2e2;
    }
}
</style>
