import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref,
  onBeforeUnmount,
  watch,
  computed,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import service from "@/service";
import { pickerFormat,getSuffixName } from "@/utils/common";
import { requestDict } from "@/service/common";
import { message, Upload } from "ant-design-vue";
import { enterpriseStatus, enterpriseStatusKeys } from "@/utils/dict";
import auth_status from "@/assets/images/main/accountManage/auth_status.png";
// Form表单rules
const rules = {
  tempEnterpriseName: [
    {
      required: true,
      message: "请输入企业名称",
      trigger: "blur",
    },
  ],
  tempContractName: [
    {
      required: true,
      message: "请输入合同名称",
      trigger: "change",
    },
  ],
  tempSignTime: [
    {
      required: true,
      message: "请选择签约时间",
      trigger: "change",
    },
  ],
  tempContractFiles: [
    {
      required: true,
      message: "请选择合同附件",
      trigger: ["change", "blur"],
    },
  ],
};

// 文件类型列表
const imageSuffixNameList = [
  "jpg",
  "jpeg",
  "png",
  "bmp",
];

export default defineComponent({
  props: {},
  components: {},
  // 组件内路由守卫
  beforeRouteEnter: (to, from, next) => {
    next((vm: any) => {});
  },
  setup() {
    const formRef = ref();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      loading: false,
      rules,
      formData: {
        tenantType: 1,
      } as any,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      auth_status,
      enterpriseStatusKeys,
      statusOptions:[] as any,
      cardTypeOptions: [] as any,
      organizationTypeOptions: [] as any,
      authTypeOptions: [] as any,
      industryOptions: [] as any,
      addressOptions: [] as any,
      uploadFileList:{
        cardFontPath:{
          name: '',
          status:'',
          tips:'上传法人证件正面',
          url:'',
          file:[],
        },
        cardBackPath:{
          name: '',
          status:'',
          tips:'上传法人证件反面',
          url:'',
          file:[],
        },
        tenantBusinessScope:{
          name: '',
          status:'',
          tips:'上传工商营业执照',
          url:'',
          file:[],
        },
      } as any,
      
    });

    onMounted(() => {
      init();
    });

    /**
     * 初始化
     */
    const init = () => {
      console.log("----init-----", route);
      const storageTenantId = localStorage.getItem("tenantId"); // 本地tenantId
      const queryTenantId = route.query.tenantId; // 详情参数tenantId
      const tenantId = storageTenantId || queryTenantId;
      state.formData.tenantId = tenantId;

      if (tenantId) {
        // 编辑 | 详情
        detailEnterpriseSign();
      }

      getDicts();
    };

    /**
     * 表单禁用
     */
    const formDisabled = computed(() => {
      const { checked } = state.formData;
      const { tenantId } = route.query;
      // 详情 | 待审核 | 已认证不可编辑
      const disabled =
        tenantId ||
        checked === enterpriseStatusKeys["processs"] ||
        checked === enterpriseStatusKeys["pass"];
      return disabled;
    });

    /**
     * 显示状态
     * @param value
     */
    const showStatusLabel = (value: string | number) => {
      const current: Object = enterpriseStatus.filter(
        (item: any) => item.value === value
      )[0];
      return current ? current["label"] : value;
    };

    /**
     * 确认
     */
    const handleConfirm = () => {
      formRef.value
        .validate()
        .then((formData: any) => {
          const { accountManage } = service;
          const params = {
            ...state.formData,
            ...formData,
          };
          state.loading = true;
          console.log("---handleConfirm----", params);
          const { checked } = state.formData;
          const api =
            checked === enterpriseStatusKeys["wait"]
              ? "addEnterpriseAudit"
              : "editEnterpriseAudit";
          accountManage[`${api}`](params)
            .then((res: any) => {
              const { code } = res;
              if (code === 0) {
                router.back();
              }
              state.loading = false;
            })
            .catch((e: any) => {
              console.error(e);
              state.loading = false;
            });
        })
        .catch((e: any) => {
          console.error(e);
        });
    };

    const handleUploadChange = () => {
      console.log("---handleUploadChange----",state.uploadFileList);

    };

    /**
     *
     * @param file 选择的文件
     */
    const beforeUpload = (file: any) => {
      console.log('------beforeUpload---',file);
      
      let fileSize = file.size as unknown as number;
      // 校验文件格式
      const suffixName = getSuffixName(file.name);
      if (imageSuffixNameList.indexOf(suffixName) === -1) {
        message.error("请上传正确图片类型文件");
        return Upload.LIST_IGNORE;
      }
      if (fileSize > 1024 * 1024 * 1) {
        message.error("图片最大不能超过1M");
        return Upload.LIST_IGNORE;
      }
      
      return true;
    };

    /**
     * 取消
     */
    const handleCancel = () => {
      router.back();
    };

    /**
     * 详情
     */
    const detailEnterpriseSign = () => {
      const { detailEnterpriseSign } = service.accountManage;
      const { tenantId } = state.formData;
      const params = {
        id:tenantId,
      };
      state.loading = true;
      detailEnterpriseSign(params)
        .then((res: any) => {
          const { code, data } = res;
          if (code === 0) {
            // state.formData=data;
          }
          state.loading = false;
        })
        .catch((e: any) => {
          console.error(e);
          state.loading = false;
        });
    };


    /**
     * 查询字典
     */
    const getDicts=()=>{
      // 企业认证状态 | 组织类型 | 证件类型  | 认证类型 | 行业类型
      const codes=[
        {
          type:'dpp_enterprise_status',
          key:'status',
        },
        {
          type:'dpp_organizational_type',
          key:'organizationType',
        },
        {
          type:'dpp_id_type',
          key:'cardType',
        },
        {
          type:'dpp_authentication_type',
          key:'authType',
        },
        {
          type:'dpp_industry',
          key:'industry',
        },
      ];
      const pormises=[] as any;
    
      codes.forEach(item=>{
        const params={
          type:item.type,
        }
        pormises.push(requestDict(params))
      })
      Promise.all(pormises).then((result:any)=>{
        codes.forEach((item,index)=>{
          const {key}=item;
          const {data}=result[index];
          state[`${key}Options`]=data&&data.map((item:any)=>{
            const {label,value}=item;
            return {
              label,
              value,
            }
          })
        })
        
      }).catch(e=>{
        console.error(e)
      })
      
    }

    return {
      ...toRefs(state),
      formRef,
      handleConfirm,
      handleCancel,
      handleUploadChange,
      pickerFormat,
      formDisabled,
      showStatusLabel,
      beforeUpload,
    };
  },
});
