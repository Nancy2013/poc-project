<template>
    <div class="fc-card">
        <div class="fc-card-header" :class="needSplitLine && 'split-line'" v-if="isHeader">
            <h3 class="fc-card-header-title">{{ props.title }}</h3>

            <div class="fc-card-header-options">
                <!-- 按钮区域 -->
                <slot name="options"></slot>
            </div>
        </div>
        <div class="fc-card-content">
            <!-- 内容区域 -->
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
    const props = defineProps({
        title: { // 卡片标题
            type: String,
            required: true,
        },
        needSplitLine: {
            type: Boolean,
            default: false
        },
        isHeader:{
            type: Boolean,
            default: false,
        },

    })
</script>

<style lang="less" scoped>
.fc-card {
    background: #FFF;
    border-radius: @border-radius-card;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 18px;
        &.split-line {
            border-bottom: 1px solid #efefef;
            padding-bottom: 15px;
        }
        &-title {
            font-size: 20px;
            font-weight: 400;
            color: rgba(0,0,0,0.9);
            line-height: 28px;
            margin-bottom: 0;
        }
        &-options {
            text-align: right;
            .ant-btn {
                &+.ant-btn  {
                    margin-left: 8px;
                }
            }
        }
    }
    &+.fc-card {
        margin-top:22px ;
    }
}
</style>