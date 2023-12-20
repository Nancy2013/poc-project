<template>
  <div class="detail">
    <FcCard v-if="options.length > 0" class="top-fc-card">
      <div class="top-card">
        <div class="left">
          <span class="text"><span class="error">*</span>护照模板：</span>
          <a-select
            ref="select"
            v-model:value="formData.passportTemplateId"
            style="width: 279px"
            :options="options"
            placeholder="请选择模板"
            @change="handleSelectChange"
          ></a-select>
        </div>
        <div class="right">
          <!-- TODO  护照模板预览效果-->
          <!-- <div class="preview">
            <iframe src="/#/mobileHome?idisCode=08WPEA2010001CD4T0000001" frameborder="0"></iframe>
          </div> -->
        </div>
      </div>
    </FcCard>
    <!-- 无模板或者选择模板时显示  -->
    <a-spin :spinning="loading" v-if="isShowTabs">
      <FcCard>
        <fc-group
          :step="step"
          :groupInfo="{
            tabsList:tabsGroupList,
            configEventList: [
              { type: 'preview' },
              { type: 'confirm', event: handleSubmit },
              { type: 'cancel', event: handleBack },
            ],
          }"
        />
      </FcCard>
    </a-spin>
  </div>
</template>
<script lang="ts">
import Index from "./index";

export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
