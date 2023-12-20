<template>
    <div class="fc-steps">
        <div class="fc-steps-end" v-if="currentStep == steps">
            <a-space>
                <a-button v-for="(item, index) in stepEndArr" :key="index" :type="item.color" @click="item.event">{{
                    item.name }}</a-button>
            </a-space>
        </div>
        <div class="fc-steps-next" v-else>
            <a-space>
                <a-button v-for="(item, index) in stepNextArr" :key="index" :type="item.color" @click="item.event">{{
                    item.name }}</a-button>
            </a-space>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import { BtnConfigType } from "@/components/fc-steps/interface"

const enum BtnSelectType {
    PREVIEW = 'preview',
    CONFIRM = 'confirm',
    CANCEL = 'cancel',
    PREV = 'prev',
    NEXT = 'next'
}

const props = defineProps({
    steps: {
        type: Number,
        deault: 0
    },
    currentStep: {
        type: Number,
        default: 0
    },
    configEventList: {
        type: Array<BtnConfigType>,
        default: () => {
            return []
        }
    }
})

const configList: Array<BtnConfigType> = [
    { type: BtnSelectType.PREVIEW, name: '预览', color: 'primary' },
    { type: BtnSelectType.CONFIRM, name: '确认', color: 'primary' },
    { type: BtnSelectType.CANCEL, name: '取消', color: 'default' },
    { type: BtnSelectType.PREV, name: '上一页', color: 'default' },
    { type: BtnSelectType.NEXT, name: '下一页', color: 'primary' }
]

const currentStep = ref<Number>(props.currentStep)

const stepEndArr = ref<Array<BtnConfigType>>([])
const stepNextArr = ref<Array<BtnConfigType>>([])

// 定义配置方法
const defineConfigEvent = (configBtns: Array<BtnSelectType>, eventList: Array<BtnConfigType>) => {
    return configList
        .filter(v => configBtns.some(n => Object.is(n, v.type)))
        .map(w => {
            if (eventList.some(n => n['type'] == w['type'])) {
                let object: BtnConfigType = eventList.find(n => n['type'] == w['type']) as unknown as any;
                w = Object.assign({}, w, { ...object })
            }
            return w;
        }).filter(d => eventList.some(b => Object.is(b.type, d.type)))
}

watch(() => props.currentStep, (value) => {
    currentStep.value = value
}, {
    immediate: true
})

watch(() => props.configEventList, (value) => {
    // 最终提交按钮
    stepEndArr.value = defineConfigEvent([BtnSelectType.PREVIEW, BtnSelectType.CONFIRM, BtnSelectType.CANCEL], value as unknown as any)
    // 下一步提交按钮
    stepNextArr.value = defineConfigEvent([BtnSelectType.NEXT, BtnSelectType.PREV], value as unknown as any)
}, {
    immediate: true
})

</script>