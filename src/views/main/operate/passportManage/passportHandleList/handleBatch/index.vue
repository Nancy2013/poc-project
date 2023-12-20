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
      needRowSelection
      @selectedRowChange='onSelectChange'
      ref="tableRef"
      
    >
      <template #headerBtnArea>
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </template>
      <template #headerLeft>
        <a-button type="primary" @click="handleBatchApprove">批量受理</a-button>
      </template>
      <template #operate="{ record }">
        <a-button type="link" size="small" @click="detail(record)"
          >详情</a-button
        >
        <a-divider type="vertical" />
        <a-button type="link" size="small" @click="handleApprove(record)"
          >受理</a-button
        >
      </template>
    </fc-table>
    <!-- 受理弹框 -->
    <ApproveModal v-model:visible="visible" :formData="formData" :isBatch='isBatch' @pass='handlePass' @reject='handleReject'/>
  </div>
</template>
<script lang="ts">
import Index from "./index";
export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
