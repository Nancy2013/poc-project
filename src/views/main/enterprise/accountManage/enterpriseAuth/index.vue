<template>
  <div class="detail">
    <a-spin :spinning="loading">
      <div class="header">
        <div class="left">
          <img :src="auth_status"
               alt="" />
          <span>认证状态</span>
        </div>
        <div class="right">
          {{ showStatusLabel("0") }}
        </div>
      </div>
      <div class="content">
        <a-form ref="formRef"
                layout="horizontal"
                :model="formData"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol">
          <a-row>
            <a-col :span="12">
              <a-form-item label="认证类型"
                           name="tenantType">
                <a-radio-group v-model:value="formData.tenantType"
                               :disabled="formDisabled">
                  <a-radio :value="1">企业</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="证件类型"
                           name="cardType">
                <a-select placeholder="请选择证件类型"
                          :options="cardTypeOptions"
                          v-model:value="formData.cardType"
                          :disabled="formDisabled"></a-select>
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="上传图片"
                           name="pics"
                           extra="支持jpg、jpeg、png、bmp图片格式，大小不超过1M"
                           :label-col="{ span: 3 }"
                           :wrapperCol="{ span: 21 }">
                <a-form-item label=""
                             v-for="key in Object.keys(uploadFileList)"
                             class="child-item"
                             :key="key">
                  <a-upload :key="key"
                            v-model:file-list="uploadFileList[key]['file']"
                            name="file"
                            list-type="picture-card"
                            class="uploader"
                            action="/api/base/upload-file"
                            :before-upload="beforeUpload"
                            @change="handleUploadChange"
                            :disabled="formDisabled"
                            accept="image/*"
                            :maxCount="1"
                            :headers="{
                    Authorization: 'fab478d7-cb35-4172-951c-044d37fc5383',
                  }">
                    <div class="upload-btn"
                         v-if="uploadFileList[key]['file'].length<1">
                      <img src="@/components/image/fc-model/uploadIcon.png"
                           alt="" />
                      <span>{{uploadFileList[key]['tips']}}</span>
                    </div>
                  </a-upload>
                </a-form-item>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="企业名称"
                           name="tenantName">
                <a-input v-model:value="formData.tenantName"
                         placeholder="请输入企业名称"
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="企业简称"
                           name="tenantShortName">
                <a-input v-model:value="formData.tenantShortName"
                         placeholder="请输入企业简称"
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="信用代码"
                           name="tenantCreditCode">
                <a-input v-model:value="formData.tenantCreditCode"
                         placeholder="请输入信用代码"
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12"
                   v-if="formData.checked === enterpriseStatusKeys['pass']">
              <a-form-item label="区块链凭证"
                           name="blockChainCode">
                <a-input v-model:value="formData.blockChainCode"
                         placeholder=""
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="组织类型"
                           name="organizationType">
                <a-select placeholder="请选择组织类型"
                          :options="organizationTypeOptions"
                          v-model:value="formData.organizationType"
                          :disabled="formDisabled"></a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="官网地址"
                           name="website">
                <a-input v-model:value="formData.website"
                         placeholder="请输入官网地址"
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="行业类别"
                           name="industryCode">
                <a-select placeholder="请选择行业类别"
                          :options="industryOptions"
                          v-model:value="formData.industryCode"
                          :disabled="formDisabled"></a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="邮箱"
                           name="email">
                <a-input v-model:value="formData.email"
                         placeholder="请输入邮箱"
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="法定代表人"
                           name="tenantRepresentative">
                <a-input v-model:value="formData.tenantRepresentative"
                         placeholder="请输入法定代表人"
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="法人证件号"
                           name="tenantNumber">
                <a-input v-model:value="formData.tenantNumber"
                         placeholder="请输入法人证件号"
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="联系人"
                           name="contact">
                <a-input v-model:value="formData.contact"
                         placeholder="请输入联系人"
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="联系方式"
                           name="phoneNumber">
                <a-input v-model:value="formData.phoneNumber"
                         placeholder="请输入联系方式"
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="所在地"
                           name="address">
                <a-cascader placeholder="请选择所在地"
                            :options="addressOptions"
                            v-model:value="formData.address"
                            :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="地址"
                           name="tenantAddress"
                           :label-col="{ span: 3 }"
                           :wrapperCol="{ span: 21 }">
                <a-input v-model:value="formData.tenantAddress"
                         placeholder="请输入地址"
                         style="width: 100%"
                         :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="企业简介"
                           name="profile"
                           :label-col="{ span: 3 }"
                           :wrapperCol="{ span: 21 }">
                <a-textarea style="width: 100%"
                            placeholder="请输入企业简介"
                            v-model:value="formData.profile"
                            :rows="4"
                            class="textarea"
                            :disabled="formDisabled" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="经营范围"
                           name="tenantBusinessScope"
                           :label-col="{ span: 3 }"
                           :wrapperCol="{ span: 21 }">
                <a-textarea style="width: 100%"
                            placeholder="请输入经营范围"
                            v-model:value="formData.tenantBusinessScope"
                            :rows="4"
                            class="textarea"
                            :disabled="formDisabled" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-spin>
    <div class="footer">
      <a-button v-if="!formDisabled"
                type="primary"
                @click="handleConfirm"
                :loading="loading"
                class="btn-left">提交</a-button>
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

<style lang="less">
.uploader {
  .ant-upload.ant-upload-select-picture-card {
    width: 120px;
    height: 120px;
    background: #eeeeee;
  }
  .ant-upload-list-picture-card-container {
    width: 120px;
    height: 120px;
  }
}
</style>
