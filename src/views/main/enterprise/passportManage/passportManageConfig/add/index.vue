<template>
    <div class="config-form" v-if="!step">
        <fc-form ref="formRef" :renderList="modelFormRenderList" :formData="formData" layout="vertical"></fc-form>
    </div>
    <fc-group :step="step" title="新增护照模板" :groupInfo="{
        tabsList, configEventList: [
            { type: 'preview' },
            { type: 'confirm', event: addPassportTemplate },
            { type: 'cancel', event: returnPage }
        ]
    }" @prevEvent="handlePrev" v-else />
    <div class="config-operate">
        <a-button v-if="!step" type="primary" @click="handleNext">下一步</a-button>
    </div>
</template>
<script lang="ts">
import Index from "./index";
export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>