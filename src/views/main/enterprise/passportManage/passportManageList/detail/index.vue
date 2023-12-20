<template>
  <div class="detail">
    <fc-tabs :tabsList="tabsList" :activeKey="activeKey">
      <template v-slot:[tab.key] v-for="tab in tabsList" :key="tab.key">
        <fc-model-col>
          <fc-model
            v-for="(item, index) in modelData[tab.key]"
            :key="index"
            :modelInfo="item"
          />
        </fc-model-col>
      </template>
      <template v-slot:button>
        <a-button type="primary" @click="handleBack">返回</a-button>
      </template>
    </fc-tabs>
  </div>
</template>
<script lang="ts">
import Index from "./index";

export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
