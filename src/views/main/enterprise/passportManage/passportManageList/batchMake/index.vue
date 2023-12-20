<template>
  <div class="list">
    <fc-table
      :columns="columns"
      :dataSource="dataSource"
      :paginationConfig="false"
      :loading="loading"
      :searchRenderList="searchRenderList"
      :searchData="search"
      @search="handleSearch"
    >
      <template #headerBtnArea>
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </template>
      <template #headerLeft></template>
      <template #operate="{ record }">
        <a-button type="link" size="small" @click="handleMake(record)"
          >生成护照</a-button
        >
      </template>
    </fc-table>
  </div>
</template>
<script lang="ts">
import Index from "./index";
export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
