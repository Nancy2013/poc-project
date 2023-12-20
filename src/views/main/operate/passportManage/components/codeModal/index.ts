import { defineComponent, reactive, toRefs,ref, onMounted,watch,nextTick } from "vue";
import { convertCode } from "@/utils/function";
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default:false,
    },
    formData:{
      type:Object,
    },
  },
  components: {},
  setup(props:any, { emit }) {
    const state = reactive({
      title:'电池护照二维码',
      initVisible:false,
    });

    onMounted(() => {});

    watch(
      ()=>props.visible,
    (newVal,oldVal)=>{
      state.initVisible=newVal;
      nextTick(() => {
        if(newVal){ 
          const { serialNo } = props.formData;
          convertCode("qrcode", serialNo);
        }
      });
    },{
      immediate:true,
    });

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
    

    return {
      ...toRefs(state),
      handleCancel,
      handleClose,
    };
  },
});
