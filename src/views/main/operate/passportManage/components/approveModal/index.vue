<template>
  <!-- 受理弹框 -->
  <div class="modal">
    <a-modal
      v-model:visible="initVisible"
      title="受理"
      :footer="null"
      :maskClosable="false"
      wrapClassName="pony-modal-wrapper"
      :afterClose="handleAfterClose"
      centered
      @cancel='handleCancel'
    >
      <div class="modal">
        <div class="modal-content">
          <div class="modal-approve">
            <div class="modal-img">
              <img :src="audit" />
            </div>
            <div v-if='props.isBatch'>
              <p class="modalName-tip">是否认证所选的{{formData.ids?.length}}条电池护照</p>
            </div>
            <div v-else>
                <p class="modalName-tip">是否认证所选企业：{{ formData.enterpriseName }}</p>
                <p>电池序列号：{{ formData.serialNo }} 电池护照</p>
            </div>
            <a-form :model="formData" ref='formRef'>
              <a-form-item name="reason">
                <div class="textarea">
                  <a-textarea
                    style="width: 100%"
                    placeholder=""
                    v-model:value="formData.reason"
                    :rows="2"
                  ></a-textarea>
                  <div class="placeholder" v-if="!formData.reason">
                    请输入驳回原因<span>（驳回时必填）</span>
                  </div>
                </div>
              </a-form-item>
            </a-form>
          </div>
        </div>
        <div class="modal-btns">
          <a-button
            type="default"
            class="default-btn"
            @click="handleApproveReject"
            >驳回</a-button
          >
          <a-button type="primary" class="btn-right" @click="handleApprovePass"
            >认证通过</a-button
          >
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
