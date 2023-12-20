<template>
  <div class="changeTag">
    <a-select
            ref="select"
            v-model:value="tag"
            style="width: 200px"
            :options="options"
            placeholder="请选择Tag"
            @change="handleSelectChange"
          ></a-select>
  </div>
</template>
<script lang="ts">
import Index from './index'

export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
