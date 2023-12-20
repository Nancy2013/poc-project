<template>
  <!-- 受理弹框 -->
  <div class="modal">
     <!-- 二维码弹窗 -->
     <a-modal
      v-model:visible="initVisible"
      :title="title"
      :maskClosable="false"
      :afterClose="handleClose"
      :footer="null"
      wrapClassName="pony-modal-wrapper"
      centered
    >
      <div class="modal">
        <div class="modal-content">
          <div class="modal-code">
            <div
              class="code"
              id="qrcode"
              v-if="formData.serialNo"
              :key="formData.serialNo"
            ></div>
            <div class="bottom">
              <div class="text">电池序列号：{{ formData.serialNo }}</div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import Index from './index'

export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
