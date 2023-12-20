<template>
    <div class="config-form" v-if="!step">
        <fc-form :renderList="formRenderList" :formData="formData" layout="vertical"></fc-form>
    </div>
    <fc-group :step="step" title="护照模板详情" :groupInfo="{
        tabsList, configEventList: [
            { type: 'preview' },
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