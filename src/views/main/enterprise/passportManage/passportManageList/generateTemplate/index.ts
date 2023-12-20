import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref,
  onBeforeUnmount,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import service from "@/service";
// Form表单rules
const rules = {
  name: [
    {
      required: true,
      message: "请输入护照模版名称",
      trigger: "blur",
    },
  ],
  productNo: [
    {
      required: true,
      message: "请输入产品型号",
      trigger: "change",
    },
  ],
  batchNo: [
    {
      required: true,
      message: "请输入批次号",
      trigger: "change",
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
    const router = useRouter();
    const state = reactive({
      loading: false,
      formData: {} as any,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      rules,
      modelFormRenderList:[
        {
           required: true,
           label: '护照模板名称：',
           type: 'input',
           key: 'name',
           width: '100%',
           block: 'inline-block',
           placeholder: '请输入护照模板名称',
        },
        {
           required: true,
           label: '产品型号：',
           type: 'input',
           key: 'productNo',
           block: 'inline-block',
           width: '100%',
           placeholder: '请输入产品型号',
           disabled:true,
        },
        {
          required: true,
          label: '批次号',
          type: 'input',
          key: 'batchNo',
          block: 'inline-block',
          width: '100%',
          placeholder: '请输入批次号',
          disabled:true,
       },
        {
          required: false,
          label: '模板说明：',
          type: 'textarea',
          key: 'remark',
          width: '100%',
          placeholder: '请输入模板说明',
          autoSize: {
            minRows: 4
          }
        }
     ],
    });

    onMounted(() => {
      init();
    });

    /**
     * 初始化
     */
    const init = () => {
      const storageData=localStorage.getItem('passportData') as any;
      if(storageData){
        const passportData=JSON.parse(storageData);
        const {passprotTemplateDetails}=passportData
        passprotTemplateDetails.forEach((item:any)=>{
          item.status=1;
        });
        state.formData={
          ...passportData,
        };
      }
    };


    /**
     * 保存
     */
    const handleSave = () => {
      formRef.value
        .validate()
        .then((formData: any) => {
          const { createPassportTemplate } = service.passportManage;
          const params={
            ...state.formData,
            ...formData,
          };
          state.loading=true;
          console.log('---handleSave----',params);
          createPassportTemplate(params).then((res:any)=>{
            const {code}=res;
            if(code===0){
              router.replace({path:'/productManage/passportManageList'});
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
    onBeforeUnmount(()=>{
      // 清除缓存
      localStorage.removeItem('passportData');
    });

    return {
      ...toRefs(state),
      formRef,
      handleSave,
    };
  },
});
