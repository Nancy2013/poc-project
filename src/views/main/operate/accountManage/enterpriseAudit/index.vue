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

      <template #status="{ record }">
        {{ showStatusLabel(record.checked) }}
      </template>

      <template #operate="{ record }">
        <a-button type="link" size="small" @click="detail(record)">详情</a-button>
        <template v-if="record.checked === enterpriseStatusKeys['wait']">
          <a-divider type="vertical" />
          <a-button type="link" size="small" @click="handleApprove(record)">审核</a-button>
        </template>
        <template v-if="record.checked === enterpriseStatusKeys['reject']">
          <a-divider type="vertical" />
          <a-tooltip :title='record.reason'> 
            <a-button type="link" size="small">驳回原因</a-button>
          </a-tooltip>
        </template>
      </template>
    </fc-table>

    <!-- 审核弹框 -->
    <ApproveModal v-model:visible="visible" title="审核确认" :formData="formData"  @pass='handlePass' @reject='handleReject' />
  </div>
</template>
<script lang="ts">
import Index from "./index";
export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
