<template>
    <div class="mobile">
        <div class="mobile-zl">
            <div class="mobile-zl-content">
                <!-- banner图 -->
                <div class="zl-banner">
                    <!-- 标题 -->
                    <div class="zl-banner-title">
                        <div class="banner-title-left"><span>{{ $t("home.title") }}</span></div>
                        <div class="banner-title-right">
                            <a-select v-model:value="languageValue" @change="handleChangeLanguage">
                                <a-select-option value="zh-CN">简体中文</a-select-option>
                                <a-select-option value="en">English</a-select-option>
                            </a-select>
                        </div>
                    </div>
                    <!-- 标记 -->
                    <div class="zl-banner-remark">
                        <div class="banner-remark-item" v-for="(item, index) in headerRenderList" :key="index">
                            <div><label class="remark-key">{{ languageValue == 'zh-CN' ? item.attrNameCn : item.attrNameEn }}</label></div>
                            <div><span class="remark-tag" :style="`background:${item.color}`"></span><span class="remark-value text_ellipsis2">{{ pageData[item.key] }}</span></div>
                        </div>
                    </div>
                    <!-- 图片 -->
                    <div class="zl-banner-img">
                        <img src="@/assets/mobileImages/main/home/zl_dc_img.png" />
                    </div>
                </div>
                <!-- 详情 -->
                <div class="zl-info">
                    <div class="zl-info-message">
                        <a-carousel dot-position="left" autoplay :dots="false">
                            <div v-for="item in messageList" :key="item.id" class="zl-info-message-item">
                                <img class="zl-info-message-item-icon" src="@/assets/mobileImages/main/home/zl-info-message-icon.png" />
                                <div class="zl-info-message-item-space"></div>
                                <div class="zl-info-message-item-content text_ellipsis"><span>{{ languageValue === 'zh-CN' ? '存证id: ' : 'Transaction ID: '}}</span><span>{{ item.id }}</span></div>
                                <div class="zl-info-message-item-remark">{{ item.date }}</div>
                            </div>
                        </a-carousel>

                    </div>
                    <!-- tab -->
                    <div class="zl-info-tabs">
                        <div class="zl-info-tabs-list">
                            <div :class="{ 'info-tabs-item-hide': !item.isShow, 'info-tabs-item-disabled': item.disabled }" v-for="(item, index) in tabbarRenderList" :key="index">
                                <div v-if="item.isShow" :style="{ background: tabbarIndex === index ? item.color : '' }" :class="['info-tabs-item', tabbarIndex === index ? 'active' : null]" @click="handleActiveTab(index, item)">
                                    <div class="tabs-icon"><img :src="tabbarIndex === index ? item.activeIcon : item.icon" /></div>
                                    <div class="tabs-name"><span>{{ languageValue == 'zh-CN' ? item.label : item.label_EN }}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- list -->
                    <div class="zl-info-list">
                        <!-- 电池 -->
                        <template v-if="tabbarIndex == 0">
                            <HomeItem v-for="(item, index) in batteryRenderList" :key="index" :width="item.width" :label="languageValue == 'zh-CN' ? item.attrNameCn : item.attrNameEn" :tag="item.tag" :icon="item.icon" :content="pageData[item.key]"></HomeItem></template>
                        <!-- 材料 -->
                        <template v-if="tabbarIndex == 1">
                            <HomeItem v-for="(item, index) in materialsRenderList" :key="index" :label="languageValue == 'zh-CN' ? item.attrNameCn : item.attrNameEn" :tag="item.tag" :img="item.icon" :content="pageData[item.key]"></HomeItem>
                        </template>
                        <!-- ESG -->
                        <template v-if="tabbarIndex == 2">
                            <HomeItem v-for="(item, key) in esg1RenderList" :key="key" :label="languageValue == 'zh-CN' ? item.attrNameCn : item.attrNameEn" :content="pageData[item.key]" :imgs="item.imgs" :childrenNum="item.childrenNum" :customStyle="item.customStyle"></HomeItem> 
                        <img class="zl-info-split" src="@/assets/mobileImages/main/home/split.png" alt="">
                            <HomeItem v-for="(item, key) in esg2RenderList" :key="key" :label="languageValue == 'zh-CN' ? item.attrNameCn : item.attrNameEn" :content="pageData[item.key]" :imgs="item.imgs" :title="languageValue == 'zh-CN' ? item.title_cn : item.title_en" :childrenNum="item.childrenNum" :customStyle="item.customStyle"></HomeItem>

                            <div class="esg-total">
                                <img src="@/assets/mobileImages/main/home/esg-total.png" alt="">
                                <div>
                                    <p>{{ languageValue == 'zh-CN' ? esg3RenderList[0].attrNameCn : esg3RenderList[0].attrNameEn }}<span>(kgCO2eq)</span></p>
                                    <p>{{ pageData[esg3RenderList[0].key] }}</p>
                                </div>
                            </div>
                            <div class="esg-equals">=</div>
                            <div class="esg-item">
                                <div class="esg-item-left">
                                    <img src="@/assets/mobileImages/main/home/esg-1.png" alt="">
                                    <div>{{ languageValue == 'zh-CN' ? esg3RenderList[1].attrNameCn : esg3RenderList[1].attrNameEn }}</div>
                                    <div>{{ pageData[esg3RenderList[1].key] }}</div>
                                </div>
                                <div class="esg-item-right">
                                    <Progress :width="80" :strokeWidth="12" type="circle" trailColor="#EBEEF4" :stroke-color="{ '0%': '#00A887', '100%': '#2C55C5' }" :percent="Number(pageData.percentage0)" />
                                </div>
                            </div>
                            <div class="esg-add">+</div>
                            <div class="esg-item">
                                <div class="esg-item-left">
                                    <img src="@/assets/mobileImages/main/home/esg-2.png" alt="">
                                    <div>{{ languageValue == 'zh-CN' ? esg3RenderList[2].attrNameCn : esg3RenderList[2].attrNameEn }}</div>
                                    <div>{{ pageData[esg3RenderList[2].key] }}</div>
                                </div>
                                <div class="esg-item-right">
                                    <Progress :width="80" :strokeWidth="12" type="circle" trailColor="#EBEEF4" :stroke-color="{ '0%': '#00A887', '100%': '#2C55C5' }" :percent="Number(pageData.percentage1)" />
                                </div>
                            </div>
                            <div class="esg-add">+</div>
                            <div class="esg-item">
                                <div class="esg-item-left">
                                    <img src="@/assets/mobileImages/main/home/esg-3.png" alt="">
                                    <div>{{ languageValue == 'zh-CN' ? esg3RenderList[3].attrNameCn : esg3RenderList[3].attrNameEn }}</div>
                                    <div>{{ pageData[esg3RenderList[3].key] }}</div>
                                </div>
                                <div class="esg-item-right">
                                    <Progress :width="80" :strokeWidth="12" type="circle" trailColor="#EBEEF4" :stroke-color="{ '0%': '#00A887', '100%': '#2C55C5' }" :percent="Number(pageData.percentage2)" />
                                </div>
                            </div>
                            <div class="esg-add">+</div>
                            <div class="esg-item">
                                <div class="esg-item-left">
                                    <img src="@/assets/mobileImages/main/home/esg-4.png" alt="">
                                    <div>{{ languageValue == 'zh-CN' ? esg3RenderList[4].attrNameCn : esg3RenderList[4].attrNameEn }}</div>
                                    <div>{{ pageData[esg3RenderList[4].key] }}</div>
                                </div>
                                <div class="esg-item-right">
                                    <Progress :width="80" :strokeWidth="12" type="circle" trailColor="#EBEEF4" :stroke-color="{ '0%': '#00A887', '100%': '#2C55C5' }" :percent="Number(pageData.percentage3)" />
                                </div>
                            </div>

                            <div class="esg-certificat">
                                <img src="@/assets/mobileImages/main/home/esg-img-1.png" alt="">
                                <img src="@/assets/mobileImages/main/home/esg-img-2.png" alt="">
                            </div>
                        </template>
                        <!-- 数据 -->
                        <template v-if="tabbarIndex == 3">
                            <div class="info-list-item info-process-item list-block-item" v-for="(item, index) in dataRender.list" :key="index">
                                <div class="list-process">
                                    <div class="list-process-title">
                                        <img src="@/assets/mobileImages/main/home/process_dot.png" />
                                        <span>{{ item.title }}</span>
                                    </div>
                                    <div class="list-process-line">
                                        <img src="@/assets/mobileImages/main/home/process_line.png" />
                                    </div>
                                </div>
                                <div class="list-tables">
                                    <div class="list-tables-source" v-for="(tableItem, tableIndex) in item.sources" :key="tableIndex">
                                        <div class="tables-source-key">{{ tableItem.key }}</div>
                                        <div class="tables-source-value">{{ tableItem.value }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="info-list-divide">
                                <img src="@/assets/mobileImages/main/home/process-divide.png" />
                            </div>
                            <HomeItem v-for="(item, key) in dataRender.list_no_wrap" :key="key" :label="item.key" :content="pageData[item.value]" :width="item.width"></HomeItem>
                            <HomeItem v-for="(item, key) in dataRender.list_wrap" :logo="item.logo" :key="key" :label="item.key" :content="pageData[item.value]"></HomeItem>
                        </template>

                        <template v-if="tabbarIndex == 4">
                            <HomeItem v-for="(item, index) in durabilityRenderList" :key="index" :width="item.width" :label="languageValue == 'zh-CN' ? item.attrNameCn : item.attrNameEn" :tag="item.tag" :icon="item.icon" :content="pageData[item.key]"></HomeItem>
                        </template>
                    </div>
                </div>

                <div v-if="accessToken" class="zl-logout" @click="handleLogout">安全退出</div>
            </div>

            <div @click="goValidData" class="mobile-validData">
                <img src="@/assets/mobileImages/main/home/goValidData.gif" />
                <div>{{ $t("home.goValidData") }}</div>
            </div>

            <div class="mobile-login" v-if="!accessToken">
                <div> {{ $t("home.login_tip") }}</div>
                <a-button type="primary" @click="goLogin">{{ $t("home.login") }}</a-button>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Progress } from "ant-design-vue";
import request from "@/utils/axios";
import HomeItem from "./item.vue";
import { HomeState, Language, TabbarRenderItem } from "./data";
import {
    messageList,
    data_CN_Render,
    esg1RenderList,
    esg2RenderList,
    esg3RenderList,
    tabbarRenderList,
    headerRenderList,
    batteryRenderList,
    materialsRenderList,
    durabilityRenderList,
    data_EN_Render,
} from "./config";
export default defineComponent({
    components: {
        Progress,
        HomeItem,
    },
    setup() {
        const { locale } = useI18n();
        const query = useRoute().query;
        const router = useRouter();
        const state = reactive<HomeState>({
            tabbarRenderList,
            tabbarIndex: 0,
            languageValue: "zh-CN",
            accessToken: localStorage.accessToken || "",
            pageData: {},
        });

        const dataRender: any = computed(() => {
            if (state.languageValue === "zh-CN") {
                return data_CN_Render;
            } else if (state.languageValue === "en") {
                return data_EN_Render;
            } else {
                return {};
            }
        });
        const getDetail = () => {
            request({
                url: `${
                    import.meta.env.VITE_BASE_URL
                }/dpp-platform/master-data/h5/getDetail`,
                type: "json",
                method: "post",
                data: {
                    lang: state.languageValue,
                    serialNo: query.idisCode, //"dolor",
                },
            }).then((res: any) => {
                const pageData = res.data.dataModel;
                const total = parseFloat(
                    pageData["Carbon footprint share（from cradle to tomb）"]
                );
                pageData.percentage0 = (
                    (parseFloat(
                        pageData["Raw material acquisition and pre-processing"]
                    ) /
                        total) *
                    100
                ).toFixed(2);
                pageData.percentage1 = (
                    (parseFloat(pageData["Main product production"]) / total) *
                    100
                ).toFixed(2);
                pageData.percentage2 = (
                    (parseFloat(pageData["Distribution"]) / total) *
                    100
                ).toFixed(2);
                pageData.percentage3 = (
                    (parseFloat(pageData["End of life and recycling"]) /
                        total) *
                    100
                ).toFixed(2);
                if (res.data.isShowLastTab == 1) {
                    state.tabbarRenderList[4].isShow = true;
                } else {
                    state.tabbarRenderList[4].isShow = false;
                }
                state.pageData = pageData;
            });
        };

        /**
         * 点击去login页面
         * @param
         * @return
         */
        const goLogin = () => {
            router.push({
                path: "/mobileLogin",
                query: {
                    idisCode: state.pageData["Serial number"],
                },
            });
        };

        const goValidData = () => {
            router.push({
                path: "/mobileValidData",
                query: {
                    idisCode: state.pageData["Serial number"],
                },
            });
        };

        /**
         * 处理点击tabbar事件
         * @param
         * @return
         */
        const handleActiveTab = (current: number, item: TabbarRenderItem) => {
            if (!item.disabled) {
                state.tabbarIndex = current;
            }
        };

        /**
         * 点击退出登录按钮时触发
         * @param
         * @return
         */
        const handleLogout = () => {
            localStorage.removeItem("accessToken");
            location.reload();
        };

        /**
         * 处理切换语言事件
         * @param
         * @return
         */
        const handleChangeLanguage = (event: Language) => {
            state.languageValue = event;
            if (event === "zh-CN") {
                locale.value = "cn";
            } else if (event === "en") {
                locale.value = "en";
            }
            getDetail();
        };

        getDetail();
        return {
            ...toRefs(state),
            messageList,
            dataRender,
            esg1RenderList,
            esg2RenderList,
            esg3RenderList,
            headerRenderList,
            batteryRenderList,
            materialsRenderList,
            durabilityRenderList,
            goLogin,
            goValidData,
            handleLogout,
            handleActiveTab,
            handleChangeLanguage,
        };
    },
});
// export default Home;
</script>
<style lang="less" scoped>
@import url("./home.less");
.mobile-zl {
    position: relative;
    padding-bottom: 0;
}

.mobile-zl-content {
    height: 100%;
    overflow: auto;
    padding-bottom: 50px;
}
.esg-total {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 14px;
    width: 347px;
    margin: 0 auto;
    background-color: #fff;
    img {
        width: 118px;
        height: 83px;
    }
    p {
        margin-bottom: 10px;
        font-size: 17px;
        line-height: 20px;
        color: #222222;
        span {
            font-size: 15px;
            color: #696969;
        }
    }
    p:last-child {
        margin-bottom: 0;
    }
}
.esg-equals {
    width: 100%;
    margin: 10px 0 15px;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
}

.esg-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 32px 14px 22px;
    width: 347px;
    margin: 0 auto;
    background-color: #fff;
    .esg-item-left {
        img {
            margin-bottom: 7px;
            width: 27px;
            height: 24px;
        }
        div {
            font-size: 16px;
            line-height: 22px;
            color: #222222;
        }
    }
    :deep(.ant-progress-text) {
        font-size: 14px;
    }
}

.esg-add {
    width: 100%;
    margin-bottom: 4px;
    text-align: center;
    font-size: 16px;
    line-height: 22px;
    color: #222222;
}

.esg-certificat {
    width: 100%;
    padding: 18px 22px 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > img {
        width: 153px;
    }
}

.mobile-login {
    z-index: 9;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    position: absolute;
    left: 0;
    right: 0;
    height: 50px;
    bottom: 0;
    background: rgba(0, 0, 0, 0.65);
    > div {
        font-size: 16px;
        line-height: 18px;
        color: #fff;
    }
    :deep(.ant-btn-primary) {
        width: 75px;
        background-color: #2c55c5;
        border-color: #2c55c5;
    }
}

.mobile-validData {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    position: absolute;
    right: 5px;
    bottom: 90px;
    > img {
        position: relative;
        z-index: 4;
        width: 90px;
        height: 90px;
    }
    > div {
        min-height: 22px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2px 5px;
        position: relative;
        top: -17px;
        width: 102px;
        border-radius: 22px;
        font-size: 13px;
        line-height: 14px;
        color: #fff;
        text-align: center;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
        background: linear-gradient(360deg, #2c55c5 0%, #5574ff 100%);
    }
}

.zl-logout {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 336px;
    margin: 0 auto 0;
    font-size: 16px;
    border: 1px solid #dcdcdc;
    color: #222222;
    background-color: #eeeeee;
}

@media screen and (max-width: 960px) {
    .mobile-zl-content {
        padding-bottom: 1rem;
    }
    .esg-total {
        padding: 0.28rem;
        width: 6.94rem;
        img {
            width: 2.36rem;
            height: 1.66rem;
        }
        p {
            margin-bottom: 0.2rem;
            font-size: 0.34rem;
            line-height: 0.4rem;
            span {
                font-size: 0.3rem;
            }
        }
    }

    .esg-equals {
        margin: 0.2rem 0 0.3rem;
        font-size: 0.32rem;
        line-height: 0.44rem;
    }

    .esg-item {
        padding: 0.4rem 0.64rem 0.28rem 0.44rem;
        width: 6.94rem;
        .esg-item-left {
            img {
                margin-bottom: 0.14rem;
                width: 0.54rem;
                height: 0.48rem;
            }
            div {
                font-size: 0.32rem;
                line-height: 0.44rem;
            }
        }
        :deep(.ant-progress-text) {
            font-size: 0.28rem;
        }
    }

    .esg-add {
        margin-bottom: 0.08rem;
        font-size: 0.32rem;
        line-height: 0.44rem;
    }

    .esg-certificat {
        padding: 0.36rem 0.44rem 0.8rem;
        > img {
            width: 3.06rem;
        }
    }
    .mobile-login {
        padding: 0 0.32rem;
        height: 1rem;
        > div {
            font-size: 0.32rem;
            line-height: 0.36rem;
        }
        :deep(.ant-btn-primary) {
            width: 1.5rem;
        }
    }
    .zl-logout {
        height: 0.96rem;
        width: 6.72rem;
        margin: 0 auto;
        font-size: 0.32rem;
    }
    .mobile-validData {
        right: 5px;
        bottom: 1.8rem;
        > img {
            position: relative;
            z-index: 4;
            width: 1.8rem;
            height: 1.8rem;
        }
        > div {
            min-height: 0.44rem;
            padding: 0.04rem 0.1rem;
            top: -0.34rem;
            width: 2.04rem;
            border-radius: 0.44rem;
            font-size: 0.26rem;
            line-height: 0.28rem;
        }
    }
}
</style>