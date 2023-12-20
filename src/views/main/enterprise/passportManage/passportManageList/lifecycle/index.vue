<template>
  <div class="lifecycle">
    <div class="timeline">
      <a-spin :spinning="loading">
        <a-timeline>
          <a-timeline-item :class="classObject(index)" v-for="(item,index) in data" :key="item.id" class="timeline-item">
            <template #dot>
              <div class="circle"></div>
              <CheckOutlined class="icon" v-if="classObject(index).process"/>
            </template>
            <p class="title" v-if="item.title">{{item.title}}</p>
            <p class="info" v-if="item.action">{{item.action}}</p>
            <p class="time" v-if="item.time">{{item.time}}</p>
             <!-- 暂时不展示 -->
            <!-- <div class="timeline-btn">
              <img :src="arrowRight" alt="">
            </div> -->
          </a-timeline-item>
        </a-timeline>
      </a-spin>
    </div>
    <div class="footer">
      <a-button @click="handleBack">返回</a-button>
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

<style lang="less">
.timeline {
  .disabled-tail {
    .ant-timeline-item-tail {
      border-left: 2px dotted #e5e6eb;
    }
  }
}
</style>
