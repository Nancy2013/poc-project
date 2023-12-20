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
      :key="searchData.status"
    >
      <template #headerBtnArea>
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </template>
      <template #headerLeft>
        <a-tabs v-model:activeKey="searchData.status"  @change="handleChangeTab">
          <a-tab-pane :key="item.value" :tab="item.label" v-for="item in passportStatus"></a-tab-pane>
        </a-tabs>
      </template>
      <template #headerRight v-if="searchData.status===0">
        <a-button type="primary" @click="handleBatchMake">批量制作护照</a-button>
      </template>
      <template #operate="{ record }">
        <template v-if="record.status===passportStatusKeys['wait']">
          <a-button type="link" size="small" @click="handleMake(record)"
          >制作护照</a-button>
          <a-divider type="vertical" />
        </template>
        
        <template v-if="record.status===passportStatusKeys['pass']">
          <a-button type="link" size="small" @click="handlePreview(record)"
          >二维码</a-button>
          <a-divider type="vertical" />
        </template>

          <a-button type="link" size="small" @click="detail(record)">详情</a-button>

          <template  v-if="record.status===passportStatusKeys['pass']">
            <a-divider type="vertical" />
            <a-button type="link" size="small" @click="lifecycle(record)">护照生命周期</a-button>
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
  </div>
</template>
<script lang="ts">
import Index from "./index";
export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
