<template>
    <div class="homeItem" :style="Object.assign({width: width}, customStyle)">
        <div v-if="label" class="homeItem-label">{{ label }}</div>
        <div v-if="title" class="homeItem-title">{{ title }}</div>
        <div v-if="content || logo" class="homeItem-content">
            <div class="homeItem-content-tag" v-if="tag"></div>
            <img class="homeItem-content-icon" v-if="icon" :src="icon" alt="">
            <img class="homeItem-content-logo" v-if="logo" :src="logo" alt="">
            <span class="homeItem-content-text">{{ content }}</span>
        </div>

        <div class="homeItem-imgs" v-if="Array.isArray(imgs) && imgs.length">
            <img v-for="(img, key) in imgs" :key="key" :src="img" alt="">
        </div>

        <div class="homeItem-childrenList" v-if="childrenNum > -1">
            <img v-for="children in childrenNum" :key="children" src="@/assets/mobileImages/main/home/children_active.png" alt="">
            <img v-for="children in 5 - childrenNum" :key="children" src="@/assets/mobileImages/main/home/children_gray.png" alt="">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, StyleValue } from "vue";
export type HomeItemType = "title" | "text";
export default defineComponent({
    name: "homeItem",
    props: {
        label: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            default: "",
        },

        width: {
            type: String,
            default: "",
        },
        tag: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: "",
        },
        imgs: {
            type: Array as PropType<Array<any>>,
            default: () => {
                return [];
            },
        },
        childrenNum: {
            type: Number,
            default: -1,
        },
        customStyle: {
            type: Object as PropType<StyleValue>,
        },
        logo: {
            type: Object as PropType<any>,
        },
    },
    setup() {
        return {};
    },
});
</script>

<style lang="less" scoped>
.homeItem {
    position: relative;
    width: 100%;
    padding: 0 0 38px 32px;
    &-label {
        margin-bottom: 6px;
        font-size: 14px;
        line-height: 20px;
        color: #222222;
    }
    &-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        word-break: break-all;
        &-tag {
            margin-right: 7px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #00a887;
        }
        &-icon {
            margin-right: 8px;
            width: 30px;
            height: 20px;
        }
        &-logo {
            margin-top: 9px;
            width: 78px;
            height: 29px;
        }
        &-text {
            font-size: 18px;
            line-height: 21px;
            color: #222222;
        }
    }
    &-imgs {
        position: absolute;
        right: 20px;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
            margin-left: 36px;
            width: 60px;
            height: 60px;
        }
    }
    &-childrenList {
        position: absolute;
        right: 107px;
        top: 15px;
        > img {
            height: 32px;
        }
    }
    &-title {
        position: relative;
        padding-right: 72px;
        left: -16px;
        font-size: 20px;
        line-height: 24px;
        color: #222222;
    }
}
@media screen and (max-width: 960px) {
    .homeItem {
        padding: 0 0 0.76rem 0.64rem;
        &-label {
            margin-bottom: 0.12rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #8f8d8d;
        }
        &-content {
            &-tag {
                margin-right: 0.14rem;
                width: 0.3rem;
                height: 0.3rem;
            }
            &-icon {
                margin-right: 0.16rem;
                width: 0.6rem;
                height: 0.4rem;
            }
            &-logo {
                margin-top: .18rem;
                width: 1.56rem;
                height: .58rem;
            }
            &-text {
                font-size: 0.36rem;
                line-height: 0.42rem;
                //white-space: pre-line;
            }
        }
        &-imgs {
            right: 0.4rem;
            img {
                margin-left: 0.72rem;
                width: 1.2rem;
                height: 1.2rem;
            }
        }
        &-childrenList {
            right: 2.14rem;
            top: 0.3rem;
            > img {
                height: 0.64rem;
            }
        }
        &-title {
            padding-right: 1.44rem;
            left: -0.32rem;
            font-size: 0.4rem;
            line-height: 0.48rem;
        }
    }
}
</style>
