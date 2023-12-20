<template>
    <div class="fc-model">
        <!-- text -->
        <div class="fc-model-text" v-if="selectType == 'text'">
            <div class="model-common">
                <div class="model-common-left">
                    <p>
                        {{ modelInfo.title }}
                        <template v-if="modelInfo.tip">
                            <a-tooltip placement="right" :title="modelInfo.tip">
                                <img :src="circleIcon" />
                            </a-tooltip>
                        </template>
                        <!-- 显示value -->
                        <span class="model-common-value" v-if="modelInfo.paramValue">{{ modelInfo.paramValue }}</span>
                        
                    </p>
                    <p v-if="modelInfo.desc" class="desc">{{ modelInfo.desc }}</p>
                    <div class="model-common-treeNodes" v-if="modelInfo.treeNodes">
                        <div class="model-treeNodes-item" v-for="(item, index) in modelInfo.treeNodes" :key="index">
                            <p>
                                <label>{{ item.paramName }}：&nbsp;</label>
                                <template v-if="item.paramDesc">
                                    <a-tooltip placement="right" :title="item.paramDesc">
                                        <img :src="circleIcon" />
                                    </a-tooltip>
                                </template>
                            </p>
                            <p class="desc" v-if="item.paramValue">{{ item.paramValue }}</p>
                        </div>

                    </div>
                </div>
                <div class="model-common-right">
                    <div class="right-tag" v-if="modelInfo.tags">
                        <a-tag :color="modelInfo.tags['color']">{{ modelInfo.tags['name'] }}</a-tag>
                    </div>
                    <div class="right-info" v-if="modelInfo.statistic">
                        <p>{{ modelInfo.statistic['name'] }}</p>
                        <p><span class="right-info-curent">{{ modelInfo.statistic['current'] }}</span><span class="right-info-total">&nbsp;/&nbsp;{{ modelInfo.statistic['total'] }}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- input -->
        <div class="fc-model-input" v-if="selectType == 'input' || selectType == 'date'">
            <div class="model-common">
                <div class="model-common-left">
                    <p>
                        {{ modelInfo.title }}
                        <template v-if="modelInfo.tip">
                            <a-tooltip placement="right" :title="modelInfo.tip">
                                <img :src="circleIcon" />
                            </a-tooltip>
                        </template>
                    </p>
                    <div class="model-common-treeNodes" v-if="modelInfo.treeNodes">
                        <div class="model-treeNodes-item" v-for="(item, index) in modelInfo.treeNodes" :key="index">
                            <div>
                                <label>{{ item.paramName }}:&nbsp;</label>
                                <span>{{ item.paramDesc }}</span>
                            </div>
                            <div>
                                <a-input :disabled="item.disabled" style="width: 250px" :placeholder="item.placeholder" v-model:value="item.value" />
                            </div>
                        </div>
                    </div>
                    <p v-else>
                        <a-input v-if="selectType == 'input'" style="width: 250px" :placeholder="modelInfo.placeholder" :disabled="modelInfo.disabled" v-model:value="modelInfo.value" />
                        <a-date-picker v-if="selectType == 'date'" style="width: 250px" :placeholder="modelInfo.placeholder" :disabled="modelInfo.disabled" v-model:value="modelInfo.value" />
                    </p>
                </div>
                <div class="model-common-right">
                    <div class="right-tag" v-if="modelInfo.tags">
                        <a-tag :color="modelInfo.tags['color']">{{ modelInfo.tags['name'] }}</a-tag>
                    </div>
                    <div class="right-info" v-if="modelInfo.statistic">
                        <p>{{ modelInfo.statistic['name'] }}</p>
                        <p><span class="right-info-curent">{{ modelInfo.statistic['current'] }}</span><span class="right-info-total">&nbsp;/&nbsp;{{ modelInfo.statistic['total'] }}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- upload -->
        <div class="fc-model-input" v-if="selectType == 'upload'">
            <div class="model-common">
                <div class="model-common-left">
                    <p>
                        {{ modelInfo.title }}
                        <template v-if="modelInfo.tip">
                            <a-tooltip placement="right" :title="modelInfo.tip">
                                <img :src="circleIcon" />
                            </a-tooltip>
                        </template>
                    </p>
                    <div class="model-common-treeNodes" v-if="modelInfo.treeNodes">
                        <div class="model-treeNodes-item" v-for="(item, index) in modelInfo.treeNodes" :key="index">
                            <div>
                                <label>{{ item.paramName }}:&nbsp;</label>
                                <span>{{ item.paramDesc }}</span>
                            </div>
                            <div>
                                <a-input :disabled="item.disabled" style="width: 250px" :placeholder="item.placeholder" v-model:value="item.value" />
                            </div>
                        </div>
                    </div>
                    <p v-else>
                        <a-upload accept="image/*" :disabled="modelInfo.disabled" v-if="selectType == 'upload'" v-model:file-list="modelInfo.value" name="file" list-type="picture-card" class="avatar-uploader" :headers="{ Authorization: 'fab478d7-cb35-4172-951c-044d37fc5383' }" action="/api/base/upload-file" :before-upload="handleBeofreUpload" @preview="handlePreview">
                            <div class="model-upload">
                                <img src="@/components/image/fc-model/uploadIcon.png" alt="">
                                <span>选择图片</span>
                            </div>
                        </a-upload>
                    </p>
                </div>
                <div class="model-common-right">
                    <div class="right-tag" v-if="modelInfo.tags">
                        <a-tag :color="modelInfo.tags['color']">{{ modelInfo.tags['name'] }}</a-tag>
                    </div>
                    <div class="right-info" v-if="modelInfo.statistic">
                        <p>{{ modelInfo.statistic['name'] }}</p>
                        <p><span class="right-info-curent">{{ modelInfo.statistic['current'] }}</span><span class="right-info-total">&nbsp;/&nbsp;{{ modelInfo.statistic['total'] }}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- checkBox -->
        <div class="fc-model-checkBox" v-if="selectType == 'checkBox'">
            <div class="model-common">
                <div class="model-common-left">
                    <p>
                        <a-checkbox :disabled="modelInfo.disabled" v-model:checked="modelInfo.value">{{ modelInfo.title
                        }}</a-checkbox>
                        <template v-if="modelInfo.tip">
                            <a-tooltip placement="right" :title="modelInfo.tip">
                                <img :src="circleIcon" />
                            </a-tooltip>
                        </template>
                    </p>
                    <p v-if="modelInfo.desc">{{ modelInfo.desc }}</p>
                    <div class="model-common-treeNodes" v-if="modelInfo.treeNodes">
                        <p class="model-treeNodes-item" v-for="(item, index) in modelInfo.treeNodes" :key="index">
                            <p>
                                <label>{{ item.paramName }}&nbsp;</label>
                                <template v-if="item.paramDesc">
                                    <a-tooltip placement="right" :title="item.paramDesc">
                                        <img :src="circleIcon" />
                                    </a-tooltip>
                                </template>
                            </p>
                            <p class="desc" v-if="item.paramValue">{{ item.paramValue }}</p>
                        </p>
                    </div>
                </div>
                <div class="model-common-right" v-if="modelInfo.radios">
                    <a-radio-group v-model:value="modelInfo.radios['selected']">
                        <a-radio v-for="(item, index) in modelInfo.radios['options']" :key="index" :value="item.value">{{
                            item.name }}</a-radio>
                    </a-radio-group>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, type PropType } from "vue";
import { type RenderModel } from "@/components/fc-model/interface";
import circleIcon from "@/assets/images/common/circleIcon.png";
import { message, Upload } from "ant-design-vue";
import { getSuffixName } from "@/utils/common";
const props = defineProps({
    modelInfo: {
        type: Object as PropType<RenderModel>,
        default: () => {
            return {};
        },
    },
});

const emit = defineEmits(["success", "preview"]);

// 文件类型列表
const imageSuffixNameList = [
    "xbm",
    "tif",
    "pjp",
    "apng",
    "svgz",
    "jpg",
    "jpeg",
    "ico",
    "tiff",
    "gif",
    "svg",
    "jfif",
    "webp",
    "png",
    "bmp",
    "pjpng",
    "avif",
];
/**
 * 文件上传前处理
 */
const handleBeofreUpload = (file: any) => {
    let fileSize = file.size as unknown as number;
    // 校验文件格式
    const suffixName = getSuffixName(file.name);
    if (imageSuffixNameList.indexOf(suffixName) === -1) {
        message.error("请上传图片类型文件");
        return Upload.LIST_IGNORE;
    }
    if (fileSize > 1024 * 1024 * 2) {
        message.error("图片最大不能超过2M");
        return Upload.LIST_IGNORE;
    }
};

/**
 * 点击预览按钮时触发
 * @param { Object } event 事件参数
 * @return
 */
const handlePreview = async (event: any) => {
    emit("preview", event);
};

const selectType = ref<String>(props.modelInfo.type);
</script>
<style lang="less" scoped>
.fc-model {
    p {
        margin: 0;
    }
    width: calc(50% - 25px);

    &:nth-child(2n + 1) {
        padding: 0 25px 0 0;
    }

    &:nth-child(2n) {
        padding: 0 0 0 25px;
    }

    .model-common {
        display: flex;
        justify-content: space-between;
        margin: 32px 0 0;

        &-left {
            > p {
                margin: 0 0 10px;

                &:first-child {
                    > img {
                        width: 15px;
                        vertical-align: -2px;
                    }
                }

                &:last-child {
                    // color: rgba(0, 0, 0, 0.6);
                }
            }
            .desc {
                color: rgba(0, 0, 0, 0.6);
            }
        }

        &-right {
            display: inline-flex;

            .right-tag {
                padding: 5px 5px 0 0;
            }

            .right-info {
                padding: 0 8px 0 0;

                &-current {
                }

                &-total {
                    color: #898787d6;
                }

                > p {
                    margin: 0 0 10px;
                }
            }
        }

        .model-common-value {
            display: block;
            margin-top: 5px;
            color: rgba(0, 0, 0, 0.6);
        }

        &-treeNodes {
            padding: 0 10px 0 24px;

            .model-treeNodes-item {
                margin-bottom: 16px;
                .desc {
                    margin-top: 10px;
                    line-height: 22px;
                }
                > label {
                    padding: 0 10px 0 0;
                    line-height: 16px;
                }

                > span {
                    color: rgba(0, 0, 0, 0.6);
                }
                img {
                    width: 15px;
                    vertical-align: -2px;
                }
            }
        }
    }

    .model-upload {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
            margin-bottom: 10px;
            width: 24px;
            height: 24px;
        }
        span {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.4);
        }
    }
}
</style>