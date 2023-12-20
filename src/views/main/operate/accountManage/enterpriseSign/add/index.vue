<template>
  <div class="detail">
    <a-spin :spinning="loading">
      <div class="content">
        <a-form
          ref="formRef"
          layout="horizontal"
          :model="formData"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row>
            <a-col :span="12">
              <a-form-item label="企业名称" name="tempEnterpriseName">
                <a-input
                  v-model:value="formData.tempEnterpriseName"
                  placeholder="请输入企业名称"
                  style="width: 100%"
                  :disabled="formDisabled"
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="合同名称" name="tempContractName">
                <a-input
                  v-model:value="formData.tempContractName"
                  placeholder="请输入合同名称"
                  style="width: 100%"
                  :disabled="formDisabled"
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="签约时间" name="tempSignTime">
                <a-range-picker v-model:value="formData.tempSignTime" :valueFormat="pickerFormat.dateFormat"  style="width: 100%" :disabled="formDisabled"/>
              </a-form-item>
            </a-col>

             <a-col :span="12">
            </a-col>
            <a-col :span="12">
              <a-form-item label="合同附件" name="tempContractFiles">
                <a-upload
                  v-model:file-list="formData.tempContractFiles"
                  name="file"
                  action="/api/base/upload-file"
                  :headers="{
                    Authorization: 'fab478d7-cb35-4172-951c-044d37fc5383',
                  }"
                  @change="handleUploadChange"
                >
                  <a-button :disabled="formDisabled">上传合同</a-button>
                </a-upload>
              </a-form-item>
            </a-col>
           

            <a-col :span="24">
              <a-form-item
                label="合同关键条款"
                name="tempKeyTerms"
                :label-col="{span:3}"
                :wrapperCol="{ span: 21 }"
              >
                <a-textarea
                  style="width: 100%"
                  placeholder="请输入合同关键条款"
                  v-model:value="formData.tempKeyTerms"
                  :rows="6"
                  class="textarea"
                  :disabled="formDisabled"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-spin>
    <div class="footer">
        <a-button type="primary" @click="handleConfirm" :loading="loading" class="btn-left" v-if="!formDisabled">确认</a-button>
        <a-button @click="handleCancel">取消</a-button>
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
