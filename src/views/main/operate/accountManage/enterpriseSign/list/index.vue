<template>
  <div class="list">
    <fc-table
      :columns="columns"
      :dataSource="dataSource"
      :paginationConfig="pagination"
      @pageChange="paginationChange"
      :loading="loading"
      :searchRenderList="searchRenderList"
      :searchData="searchData"
      @search="handleSearch"
    >
      <template #headerBtnArea>
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </template>

      <template #headerRight>
        <a-button type="primary" @click="add">新增</a-button>
      </template>

      <template #operate="{ record }">
        <a-button type="link" size="small" @click="edit(record)">编辑</a-button>
        <a-divider type="vertical" />
        <a-button type="link" size="small" @click="detail(record)">详情</a-button>
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
