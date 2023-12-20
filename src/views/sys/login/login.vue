<template>
    <div class="gym-login">
        <div class="login-img">
            <img src="@/assets/images/sys/login/login-background.png" />
        </div>
        <div class="login-main">
            <div class="login-card">
                <div class="login-card-title"><label>中国产品数字护照平台</label></div>
                <div :class="[active == '1' ? 'login-card-form' : 'register-card-form']">
                    <div class="login-card-header">
                        <a-tabs v-model:activeKey="active">
                            <a-tab-pane key="1" tab="账号登录">
                                <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
                                    @finishFailed="onFinishFailed">
                                    <a-form-item :rules="[
                                        { required: true, message: '请输入账号' },
                                    ]">
                                        <a-input v-model:value="formState.username" placeholder="请输入账号" />
                                    </a-form-item>

                                    <a-form-item :rules="[
                                        { required: true, message: '请输入密码' },
                                    ]">
                                        <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
                                    </a-form-item>

                                    <a-form-item>
                                        <a-checkbox>记住密码</a-checkbox>
                                    </a-form-item>

                                    <a-form-item>
                                        <a-button :disabled="disabled" :loading="isLoading" type="primary"
                                            html-type="submit" class="login-form-button" @click="interfaceLogin(formState)">
                                            登录
                                        </a-button>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="用户注册" force-render>
                                <a-form :model="registerState" name="normal_login" class="login-form" @finish="onFinish"
                                    @finishFailed="onFinishFailed">
                                    <a-form-item :rules="[
                                        { required: true, message: '请输入手机号' },
                                    ]">
                                        <a-input v-model:value="registerState.phoneNumber" placeholder="请输入手机号" />
                                    </a-form-item>

                                    <a-form-item :rules="[
                                        { required: true, message: '请输入验证码' },
                                    ]">
                                        <a-input class="register-verify-input" v-model:value="registerState.verifyCode"
                                            placeholder="请输入验证码" />
                                        <a-button class="register-verify-button" type="primary">获取验证码</a-button>
                                    </a-form-item>

                                    <a-form-item :rules="[
                                        { required: true, message: '请填写姓名' },
                                    ]">
                                        <a-input v-model:value="registerState.username" placeholder="请填写姓名" />
                                    </a-form-item>

                                    <a-form-item :rules="[
                                        { required: true, message: '请设置8到30位数字和字母的登录密码' },
                                    ]">
                                        <a-input-password v-model:value="registerState.password"
                                            placeholder="请设置8到30位数字和字母的登录密码" />
                                    </a-form-item>

                                    <a-form-item :rules="[
                                        { required: true, message: '请再次确认密码' },
                                    ]">
                                        <a-input-password v-model:value="registerState.confirmPassword"
                                            placeholder="请再次确认密码" />
                                    </a-form-item>

                                    <a-form-item>
                                        <a-button :disabled="registerDisabled" type="primary"
                                            html-type="submit" class="register-form-button"
                                            >
                                            注册
                                        </a-button>
                                    </a-form-item>

                                    <a-form-item>
                                        <a-checkbox>同意《DPP电池服务运营平台用户协议》</a-checkbox>
                                    </a-form-item>

                                </a-form>
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { message } from "ant-design-vue";
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import request from "@/utils/axios";
import { throttleFnc } from "@/utils/common";
interface FormState {
    username: string;
    password: string;
}
interface RegisterState {
    phoneNumber: string;
    verifyCode: string;
    username: string;
    password: string;
    confirmPassword: string;
}
export default defineComponent({
    setup() {
        const formState = reactive<FormState>({
            username: "",
            password: ""
        });

        const registerState = reactive<RegisterState>({
            phoneNumber: '',
            verifyCode: '',
            username: '',
            password: '',
            confirmPassword: ''
        })

        const router = useRouter();
        const active = ref<string>('1');
        const isLoading = ref<boolean>(false);
        const onFinish = (values: any) => {
            console.log("Success:", values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log("Failed:", errorInfo);
        };
        const disabled = computed(() => {
            return !(formState.username && formState.password);
        });

        const registerDisabled = computed(() => {
            return !(
                registerState.phoneNumber && 
                registerState.verifyCode && 
                registerState.username &&
                registerState.password &&
                registerState.confirmPassword
            )
        })

        onMounted(() => {
            if (localStorage.getItem("accessToken")) {
                router.push({ path: '/productManage/passportManageList' })
            }
        })

        // 接口
        const interfaceLogin = throttleFnc(function (callback: Function, data: any) {
            isLoading.value = true
            request({
                url: `${import.meta.env.VITE_BASE_URL}/system/auth/login`,
                type: "json",
                method: "post",
                data: data,
            }).then((res: any) => {
                if (res.code == 0) {
                    localStorage.setItem("userId", res.data.userId);
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    router.push({ path: '/productManage/passportManageList' })
                    isLoading.value = false
                    callback()
                    message.success({
                        content: "登录成功!",
                        duration: 0.4,
                    });
                }
            }).catch(() => {
                isLoading.value = false
                callback()
            })
        }) as any

        // 注册
        const interfaceRegister = () => {

        }

        return {
            formState,
            registerState,
            isLoading,
            active,
            onFinish,
            onFinishFailed,
            interfaceLogin,
            disabled,
            registerDisabled
        };
    },
});
</script>
<style lang="less" scoped>
@num: 14;

/deep/ .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #212326;
    // text-shadow: 0 0 0.25px currentcolor;
    font-weight: 600;
}

.gym-login {
    margin: 0 auto;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
}

.login-img {
    width: 57%;
    height: 100%;

    >img {
        width: 100%;
        height: 100%;
    }
}

.login-main {
    position: relative;
    width: 43%;
    height: 100%;

    .login-card {
        position: absolute;
        top: calc(50% - calc(calc(550em / @num) / 2));
        left: calc(50% - calc(calc(440em / @num) / 2));

    }

    .login-card-title {
        font-size: calc(23em / @num);
        font-weight: 600;
        color: #333;
        padding: 0 calc(10em / @num);
        line-height: calc(30em / @num);
    }

    .login-card-form {
        width: calc(440em / @num);
        height: calc(468em / @num);
        padding: calc(20em / @num);
        background: url('@/assets/images/sys/login/login-card.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .register-card-form {
        width: calc(440em / @num);
        height: calc(572em / @num);
        padding: calc(20em / @num);
        background: url('@/assets/images/sys/login/login-card.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .login-card-header {
        margin: calc(10em / @num) calc(20em / @num);
        font-weight: 400;
        font-size: calc(20em / @num);
        border-bottom: 0px;
        color: #ffffff;
        margin-bottom: calc(10em / @num);
        letter-spacing: 1px;
    }

    .login-card-header span {
        font-size: calc(16em / @num);
        color: #878789;
    }

    .login-form {
        position: relative;
        padding: calc(10em / @num) 0 0;
    }

    .login-form .ant-input-affix-wrapper {
        border-radius: 5px;
        height: calc(35em / @num);
        background: #F7F8FA;
    }

    /deep/ .ant-input-affix-wrapper>input.ant-input {
        background: #F7F8FA;
    }

    /deep/ .ant-tabs-ink-bar {
        background: #38C585;
    }

    .login-form input {
        // background-color: #f2f2f2;
        height: calc(40em / @num);
        background: #F7F8FA;
    }

    .register-verify-input {
        width: 60%;
    }

    .register-verify-button {
        width: calc(40% - 10px);
        margin: 0 0 0 10px;
        height: calc(35em / @num);
        background: #38C585;
        border-color: #38C585;
    }

    .login-form .login-form-button {
        margin: calc(30em / @num) 0;
        height: calc(35em / @num);
        width: 100%;
    }

    .login-form .register-form-button {
        height: calc(35em / @num);
        width: 100%;
    }
}
</style>