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
export default defineComponent({
  props: {},
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      loading: false,
      formData: {} as any,
      tabsList: [] as any,
      modelData: {},
      activeKey: "",
      detailtData:{} as any,
    });

    onMounted(() => {
      init();
    });

    /**
     * 初始化
     */
    const init = () => {
      const { id } = route.query;
      if (id) {
        state.formData.id = id;
        detailPassport();
      }
    };

    /**
     * 返回
     */
    const handleBack = () => {
      router.back();
    };

    /**
     * 获取tab列表
     */
    const getTabs = (category: Object) => {
      state.tabsList = [];
      if (category) {
        const tabs = Object.keys(category).map(
          (item: string | number) => {
            return {
              key: `${item}`,
              name: category[item],
              value: `${item}`,
            };
          }
        );
        if (tabs?.length > 0) {
          state.tabsList = tabs;
          state.activeKey = tabs[0].key;
        }
      }
    };

    /**
     * 格式化参数
     * @param initData 初始数据
     */
    const getPassportData = (initData: Array<any>) => {
      state.modelData={};
      if (initData) {
        const modelData = {};
        initData.forEach((item: any) => {
          const { paramCategory, paramName, paramDesc, children,paramValue } = item;
          const newItem = {
            ...item,
            type: "text",
            title: paramName,
            desc: paramDesc,
            treeNodes: children,
            paramValue,
          };
          if (!modelData[paramCategory]) {
            modelData[paramCategory] = [];
          }
          modelData[paramCategory].push(newItem);
        });

        // 排序
        const keys = Object.keys(modelData);
        keys.forEach((key: string) => {
          const data = modelData[key];
          data.sort((a: any, b: any) => a.sort - b.sort);
        });
        state.modelData = Object.assign({}, modelData);
      }    
    };

    watch(
      ()=>state.detailtData,
      (newVal)=>{
        if(newVal){
          // 更新tabs
          const {category,passportDetailParamList}=newVal;
          getTabs(category);
          
          // 更新参数
          getPassportData(passportDetailParamList);
        }
      },
      {
        deep:true,
        immediate:true,
      }
    );

    /**
     * 详情
     */
    const detailPassport = () => {
      const { detailPassport } = service.passportManage;
      const { id } = state.formData;
      const params = {
        id,
      };
      state.loading = true;
      detailPassport(params)
        .then((res: any) => {
          const { code, data } = res;
          if (code === 0) {
            state.detailtData=data;
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
      handleBack,
    };
  },
});
