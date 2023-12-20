import { defineComponent, reactive, toRefs,ref, onMounted,watch } from "vue";
import audit from '@/assets/images/main/passportManage/audit.png'
import service from "@/service";
import { message } from "ant-design-vue";
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default:false,
    },
    formData:{
      type:Object,
    },
    isBatch:{
      type:Boolean,
      default:false,
    }
  },
  components: {
    Image,
  },
  setup(props:any, { emit }) {
    const formRef = ref();
    const state = reactive({
      audit,
      initVisible:false,
    });

    onMounted(() => {});

    watch(
      ()=>props.visible,
    (newVal,oldVal)=>{
      state.initVisible=newVal;
    },{
      immediate:true,
    });


    /**
     * 通过
     */
    const handleApprovePass=()=>{
      const {isBatch}=props
      const {id,ids}=props.formData;      
      const params={
        ids:isBatch?ids:[id],
        isApprove:0, // 认证通过
      };
      const {approvePassport}=service.passportManage;
      approvePassport(params).then((res:any)=>{
        const {code}=res;
        if(code===0){
          message.success('认证通过成功！');
          handleClose();
          emit('pass',props.formData);
        }
      }).catch((e:any)=>{
        console.error(e);
      });
    }

    /**
     * 驳回
     */
    const handleApproveReject=()=>{
      const {isBatch}=props
      const {id,ids,reason}=props.formData;
      if(!reason){
        message.error('请输入驳回原因！');
        return;
      }
      const params={
        ids:isBatch?ids:[id],
        reason,
        isApprove:1, // 驳回
      };
      const {approvePassport}=service.passportManage;
      approvePassport(params).then((res:any)=>{
        const {code}=res;
        if(code===0){
          message.success('驳回成功！');
          handleClose();
          emit('reject',props.formData);
        }
      }).catch((e:any)=>{
        console.error(e);
      });
    }

    /**
     * 点击右上角关闭
     */
    const handleCancel=()=>{
      handleClose();
    }

    /**
     * 关闭弹窗
     */
    const handleClose=()=>{
      emit('update:visible',false);
    };

    /**
     * 处理弹窗之后
     */
    const handleAfterClose=()=>{
      formRef.value && formRef.value.resetFields();
      emit('handleClose',{});
    }
    

    return {
      ...toRefs(state),
      props,
      formRef,
      handleApproveReject,
      handleApprovePass,
      handleAfterClose,
      handleCancel,
    };
  },
});
