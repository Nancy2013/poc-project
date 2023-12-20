<template>
  <div class="detail">
    <a-spin :spinning="loading">
      <div class="content">
        <fc-form
          :renderList="modelFormRenderList"
          :formData="formData"
          layout="vertical"
          ref="formRef"
        ></fc-form>
      </div>
    </a-spin>
    <div class="footer">
        <a-button type="primary" @click="handleSave" :loading="loading">保存</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import Index from "./index";

export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
