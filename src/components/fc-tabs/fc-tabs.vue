<template>
    <div class="fc-tabs">
        <div class="fc-tabs_header">
            <div v-for="(item, index) in tabsList" :key="index" @click="convertTabChange(item)"
                :class="`header-item ${item.key == activeKey ? 'active-color' : ''}`">
                <div class="header-item_name">{{ item.name }}</div>
            </div>
        </div>
        <div class="fc-tabs_content">
            <div class="content-title" v-if="title">{{ title }}</div>
            <div class="content-slots">
                <slot :name="activeKey"></slot>
            </div>
        </div>
        <div class="fc-tabs_footer">
            <slot name="button"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, getCurrentInstance, type PropType, useAttrs, useSlots, watch } from "vue";
import { type RenderTabItem } from "@/components/fc-tabs/interface"
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    activeKey: {
        type: String,
        required: true
    },
    tabsList: {
        type: Array as PropType<RenderTabItem[]>,
        default: () => {
            return [];
        }
    }
})

const emits = defineEmits([
    "tabChange"
])

const activeKey = ref<string>(props.activeKey)
/**
 * tab切换
 */
const convertTabChange = (e: RenderTabItem) => {
    activeKey.value = e.key
    emits("tabChange", e.key)
}

watch(() => props.activeKey, (value) => {
    activeKey.value = value
}, {
    immediate: true
})

</script>
<style lang="less" scoped>
.fc-tabs {
    height: 100%;

    &_header {
        height: 48px;
        width: 100%;
        border: 1px solid #E7E7E7;
        border-bottom: none;
        background: #F3F3F3;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .active-color {
            background: #FFF;
            color: #005685;
            border-bottom: 1px solid #E7E7E7;
        }

        .header-item {
            width: 88px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            border-right: 1px solid #E7E7E7;
            cursor: pointer;
        }
    }

    &_content {
        border: 1px solid #E7E7E7;
        padding: 0 20px;
        height: calc(100% - 148px);
        overflow: auto;

        .content-title {
            padding: 32px 0 0;
            font-size: 18px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.9);
        }

        .content-slots {
            overflow: auto;
        }
    }

    &_footer {
        height: 100px;
        padding: 32px 0;
        text-align: right;
    }
}</style>