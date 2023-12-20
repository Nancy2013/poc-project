<template>
  <div class="list">
    <fc-table
      :columns="getColumns"
      :dataSource="dataSource"
      :paginationConfig="pagination"
      @pageChange="paginationChange"
      :loading="loading"
      :searchRenderList="getSearch"
      :searchData="searchData"
      @search="handleSearch"
      :key="tabStatus"
    >
      <template #headerBtnArea>
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </template>
      <template #headerLeft>
        <a-tabs v-model:activeKey="tabStatus" @change="handleChangeTab">
          <a-tab-pane
            :key="item.value"
            :tab="item.label"
            v-for="item in tabStatusOptions"
          ></a-tab-pane>
        </a-tabs>
      </template>
      <template #headerRight v-if="tabStatus === 0">
        <a-button type="primary" @click="handleBatchApprove">批量受理</a-button>
      </template>

      <template #status="{ record }">
        {{ showStatusLabel(record.status) }}
      </template>

      <template #operate="{ record }">
        <template v-if="record.status === passportStatusKeys['pass']">
          <a-button type="link" size="small" @click="handlePreview(record)"
            >二维码</a-button
          >
          <a-divider type="vertical" />
        </template>

        <a-button type="link" size="small" @click="detail(record)">详情</a-button>

        <template v-if="record.status === passportStatusKeys['pass']">
          <a-divider type="vertical" />
          <a-button type="link" size="small" @click="lifecycle(record)">护照生命周期</a-button>
        </template>

        <template v-if="record.status === passportStatusKeys['processs']">
          <a-divider type="vertical" />
          <a-button type="link" size="small" @click="handleApprove(record)"
            >受理</a-button
          >
        </template>

        <template v-if="record.status === passportStatusKeys['reject']">
          <a-divider type="vertical" />
          <a-tooltip :title='record.reason'> 
            <a-button type="link" size="small">驳回原因</a-button>
          </a-tooltip>
        </template>
      </template>
    </fc-table>

    <!-- 二维码弹窗 -->
    <CodeModal v-model:visible="visible" :formData="formData" v-if="visible"/>
    <!-- 受理弹框 -->
    <ApproveModal v-model:visible="approveVisible" :formData="formData"  @pass='handlePass' @reject='handleReject'/>
  </div>
</template>
<script lang="ts">
import Index from "./index";
export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
