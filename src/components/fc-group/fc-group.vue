<template>
    <fc-tabs :tabsList="tabsList" :activeKey="activeKey" :title="title" @tabChange="tabChange">
        <template v-for="(element, eleIndex) in tabsList" :key="eleIndex" #[element.key]>
            <fc-model-col>
                <fc-model v-for="(item, index) in element['arr']" :key="index" :modelInfo="item" />
            </fc-model-col>
        </template>
        <template #button>
            <fc-steps :steps="total" :currentStep="step" :configEventList="configEventList" />
        </template>
    </fc-tabs>
</template>
<script setup lang="ts">
import { ref, PropType, watch } from "vue";
import { RenderGroup, ModelItem, BtnConfigType } from "@/components/fc-group/interface"
import { message } from "ant-design-vue";
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    step: {
        type: Number,
        default: 0
    },
    outers: {
        type: Number,
        default: 1
    },
    groupInfo: {
        type: Object as PropType<RenderGroup>,
        default: () => {
            return {}
        }
    }
})

const emits = defineEmits([
    'prevEvent'
])

const total = ref<any>(0);
const activeKey = ref<any>('');

const step = ref<any>(props.step);
const outers = ref<any>(props.outers);
const tabsList = ref<Array<ModelItem>>(props.groupInfo.tabsList);
const configEventList = ref<Array<BtnConfigType>>(props.groupInfo.configEventList);

// 下一步
const handleNext = () => {
    step.value += 1;
    activeKey.value = tabsList.value[step.value]['key']
}

// 上一步
const handlePrev = () => {
    step.value -= 1;
    if (step.value >= 0) {
        activeKey.value = tabsList.value[step.value]["key"]
    } else {
        emits('prevEvent')
    }
}

// tab切换
const tabChange = (e: any) => {
    tabsList.value.forEach((element: any, index: number) => {
        if (element.key == e) {
            activeKey.value = element.key
            step.value = index
        }

    })
}

// 事件校验
const verifyEvent = (type: string, item: any) => {
    let copyAllList: any = [];
    switch (type) {
        case 'confirm':
            let eventFuc = item['event'];
            item['event'] = () => {
                tabsList.value.forEach((n: any) => copyAllList = copyAllList.concat(n.arr))
                if (copyAllList.some((n1: any) => n1.value == true)) {
                    eventFuc();
                } else {
                    message.error('数据列表项不能为空!')
                }
            }
            break;
    }
}

// 合并数组
const compareConfigEvent = (list: any, step: number) => {
    let arr = list.filter((b: any) => ['prev', 'next'].includes(b['type']));
    return [
        {

            type: 'prev',
            name: '上一页',
            color: 'default',
            event: handlePrev
        },
        {
            type: 'next',
            name: '下一页',
            color: 'primary',
            event: handleNext
        }
    ]
        .map((w: any) => {
            if (arr.some((n: any) => n['type'] == w['type'])) {
                let object: BtnConfigType = arr.find((n: any) => n['type'] == w['type']);
                w = Object.assign({}, w, { ...object })
            }
            return w;
        })
        .filter(n => step == 0 ? n['type'] != 'prev' : n['type']).concat(list.filter((v: any) => !['prev', 'next'].includes(v['type'])) as unknown as any)
        .map((v: any) => {
            verifyEvent(v['type'], v)
            return v
        })
}

watch(() => props.groupInfo.tabsList, (value) => {
    if (value.length) {
        step.value = props.step ? props.step - outers.value : 0;
        tabsList.value = value
        total.value = value.length - 1;
        activeKey.value = value[0]["key"]
    }
}, {
    immediate: true
})

watch(() => step.value, (value) => {
    let currentStep: number = props.step ? props.step : value
    configEventList.value = compareConfigEvent(configEventList.value, currentStep)
}, {
    immediate: true
})



</script>