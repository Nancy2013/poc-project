import { defineComponent, reactive, toRefs, onMounted, computed } from "vue";
import { CheckOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from "vue-router";
import service from "@/service";
import arrowRight from '@/assets/images/main/passportManage/arrow-right.png'
import { showTime } from "@/utils/function";

export default defineComponent({
  props: {},
  components: {
    CheckOutlined,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      id:'',
      loading:false,
      data:[] as any,
      arrowRight,
    });

    onMounted(() => {
      init();
    });

    /**
     * 初始化
     */
    const init=()=>{
      const route = useRoute();
      const {id}=route.query
      if(id){
        state.id=id as string;
        lifecyclePassport();
      }
    }


    // 样式名称
    const classObject=computed(()=>{
      return function(index:number){
        let classObject={};
        const {data}=state;
        const doneIndex=data.findIndex((item:any)=>item.flag);
        if(doneIndex>-1){
          if(index<doneIndex){
            // 护照认证之前 
            classObject={
              'process':true,
            }
          }

          if(index===doneIndex){
            // 护照认证
            classObject={
              'done':true,
              'disabled-tail':true,
            }
          }

          if(index>doneIndex){
            // 护照认证之后
            classObject={
              'disabled':true,
              'disabled-tail':true,
            }
          }
        }
        return classObject;
      };
    });
    
    

    /**
     * 护照生命周期
     */
    const lifecyclePassport = () => {
      const { lifecyclePassport } = service.passportManage;
      const { id } = state;
      const params = {
        id,
      };
      state.loading = true;
      lifecyclePassport(params)
        .then((res: any) => {
          const { code, data } = res;
          if (code === 0) {
            state.data=data&&data.map((item:any)=>{
              const {time}=item;
              return {
                ...item,
                time:time?showTime(time):time,
              }
            });
          }
          state.loading = false;
        })
        .catch((e: any) => {
          console.error(e);
          state.loading = false;
        });
    };

     /**
     * 返回
     */
     const handleBack = () => {
      router.back();
    };
    return {
      ...toRefs(state),
      handleBack,
      classObject,
    };
  },
});
