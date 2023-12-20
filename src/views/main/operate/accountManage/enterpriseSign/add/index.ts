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
import { pickerFormat } from "@/utils/common";
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
      trigger: ['change', 'blur'],
    },
  ],
};

export default defineComponent({
  props: {},
  components: {},
  // 组件内路由守卫
  beforeRouteEnter: (to, from, next) => {
    next((vm: any) => {});
  },
  setup() {
    const formRef = ref();
    const route=useRoute();
    const router = useRouter();
    const state = reactive({
      loading: false,
      rules,
      formData: {} as any,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      type:'',
    });

    onMounted(() => {
      init();
    });

    /**
     * 初始化
     */
    const init = () => {
      const {id}=route.query;
      const {type}=route.params;
      console.log('----init-----',route);
      state.type=type as string;
      state.formData={
        id,
      }

      if(id){
        // 编辑 | 详情
        detailEnterpriseSign();
      }
    };

    /**
     * 表单禁用
     */
    const formDisabled=computed(()=>{
      const {type}=state;
      const disabled=type==='detail';
      return disabled;
    })


    /**
     * 确认
     */
    const handleConfirm = () => {
      formRef.value
        .validate()
        .then((formData: any) => {
          const { accountManage } = service;
          const params={
            ...state.formData,
            ...formData,
          };
          state.loading=true;
          console.log('---handleConfirm----',params);
          const api=state.type==='add'?'addEnterpriseSign':'editEnterpriseSign';
          accountManage[`${api}`](params).then((res:any)=>{
            const {code}=res;
            if(code===0){
              router.back();
            }
            state.loading=false;
          }).catch((e:any)=>{
            console.error(e)
            state.loading=false;
          });
        })
        .catch((e: any) => {
          console.error(e);
        });
    };

    const handleUploadChange=()=>{
      console.log('---handleUploadChange----');
      
    }



    /**
     * 取消
     */
    const handleCancel=()=>{
      router.back();
    }


    /**
     * 详情
     */
    const detailEnterpriseSign = () => {
      const { detailEnterpriseSign } = service.accountManage;
      const { id } = state.formData;
      const params = {
        id,
      };
      state.loading = true;
      detailEnterpriseSign(params)
        .then((res: any) => {
          const { code, data } = res;
          if (code === 0) {
            state.formData=data;
          }
          state.loading = false;
        })
        .catch((e: any) => {
          console.error(e);
          state.loading = false;
        });
    };
    

    return {
      ...toRefs(state),
      formRef,
      handleConfirm,
      handleCancel,
      handleUploadChange,
      pickerFormat,
      formDisabled,
    };
  },
});
