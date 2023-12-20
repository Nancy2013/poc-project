<template>
    <fc-table 
      :columns="tableColumns" 
      :dataSource="dataSource" 
      :paginationConfig="pagination" 
      @pageChange="paginationChange" 
      :loading="loading"
      :searchRenderList="searchRenderList"
      :searchData="searchData"
      @search="handleSearch"
    >
      <template #headerBtnArea>
        <a-button @click="handleReset">重置</a-button>
        <a-button type="primary" @click="handleSearch">查询</a-button>
      </template>
      <template #headerLeft>
        <a-button type="primary"  @click="convertPage('add')">新增模板</a-button>
      </template>
      <template #tableIndex="{ index }">
         <span>{{ index + 1 }}</span>
      </template>
      <template #status="{ record }">
        <a-switch v-model:checked="record.status" :checkedValue="1" :unCheckedValue="0" @change="getUpdateStatus(record.status, record.id)" />
      </template>
      <template #operate="{ record }">
        <a-button type="link" size="small" @click="convertPage('edit', record.id)">编辑</a-button>
        <a-divider type="vertical" />
        <a-button type="link" size="small" @click="convertPage('detail', record.id)">详情</a-button>
        <a-divider type="vertical" />
        <a-button type="link" danger size="small" @click="removePassportTemplate(record.id)">删除</a-button>
      </template>
    </fc-table>
</template>
<script lang="ts">
import Index from "./index";
export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>