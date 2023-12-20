import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref,
  onBeforeMount,
  computed,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import service from "@/service";
import { message, Modal } from "ant-design-vue";
import { convertLevel } from "@/utils/function";
import { PAGE_SIZE_MAX } from "@/views/main/enterprise/passportManage/config";
export default defineComponent({
  props: {},
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      formData: {} as any,
      tabsList: [] as any,
      options: [] as any,
      loading: false,
      modelData: {},
      isBatch: false, // 是否为批量制照
      step: 0,
      passportInitData: {} as any,
    });

    /**
     * 查询模板
     */
    const queryPassportTemplate = () => {
      const { queryPassportTemplate } = service.passportManage;
      const { productNo, batchNo } = state.formData;
      const params = {
        pageNo: 1,
        pageSize: PAGE_SIZE_MAX,
        productNo,
        batchNo,
        status: 1, // 已启用
      };
      return queryPassportTemplate(params)
        .then((res: any) => {
          const { code, data } = res;
          if (code === 0) {
            const { list } = data;
            state.options = list.map((item: any) => {
              return {
                label: item.name,
                value: item.id,
              };
            });
          }
        })
        .catch((e: any) => {
          console.error(e);
        });
    };

    onBeforeMount(() => {
      // 清除缓存
      localStorage.removeItem("passportData");
    }),
      onMounted(() => {
        init();
      });

    /**
     * 初始化
     */
    const init = async () => {
      const { id, productNo, batchNo, isBatch } = route.query;
      state.formData = {
        id,
        productNo,
        batchNo,
      };
      state.isBatch = isBatch as any;
      // 加载护照模板
      await queryPassportTemplate();
      const { options } = state;
      if (options.length > 0) {
        const { value } = options[0];
        state.formData.passportTemplateId = value;
        detailPassportTemplate(value);
      } else {
        // 无模板，加载护照参数
        queryPassportData();
      }
    };

    /**
     * 是否显示tabs
     */
    const isShowTabs = computed(() => {
      const { options, formData } = state;
      return options.length <= 0 || formData.passportTemplateId;
    });

    /**
     * 选择护照模板
     * @param templateId  护照模板id
     */
    const handleSelectChange = (templateId: string | number) => {
      state.formData.passportTemplateId = templateId;
      state.passportInitData = {};
      state.step = 0;
      if (templateId) {
        detailPassportTemplate(templateId);
      }
    };

    /**
     * 获取tab列表
     */
    const getTabs = (category: Object) => {
      state.tabsList = [];
      if (category) {
        const tabs = Object.keys(category).map((item: string | number) => {
          return {
            key: `${item}`,
            name: category[item],
            value: `${item}`,
          };
        });
        if (tabs?.length > 0) {
          state.tabsList = tabs;
        }
      }
    };

    /**
     * 格式化参数
     * @param initData 初始数据
     * @param checked 复选框样式
     */
    const getPassportData = (initData: Array<any>, checked = true) => {
      state.modelData = {};
      if (initData) {
        const modelData = {};
        initData.forEach((item: any) => {
          const { paramCategory, paramName, paramDesc, requireFlag, children } =
            item;
          const newItem = {
            ...item,
            value: checked,
            type: "checkBox",
            title: paramName,
            desc: paramDesc,
            treeNodes: children,
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
      console.log("-----getPassportData-----", state.modelData);
    };

    watch(
      () => state.passportInitData,
      (newVal) => {
        if (newVal) {
          // 更新tabs
          const { category } = newVal;
          getTabs(category);

          // 更新参数
          const { passprotTemplateDetailVo, passportDetailParamList } = newVal;
          passprotTemplateDetailVo && getPassportData(passprotTemplateDetailVo); // 有模板，更新护照模板明细参数
          passportDetailParamList &&
            getPassportData(passportDetailParamList, false); // 无模板，更新全量参数
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );


    // 生成tabsGroup组件数据
    const tabsGroupList=computed(()=>{
      const {tabsList,modelData}=state;
      const tabsGroupList:Array<object>=[];
      if(tabsList){
        tabsList.forEach((item:any)=>{
          const {key,name}=item;
          tabsGroupList.push({
            key,
            name,
            arr:modelData[key]?modelData[key]:[],
          });
        })
      }
      console.log('-----tabsGroupList-----',tabsGroupList);
      
      return tabsGroupList;
    });

    /**
     * 提交
     */
    const handleSubmit = () => {
      const { passportManage } = service;
      const { formData, options, isBatch } = state;
      const sendData = sendPassportData();
      if (sendData?.length <= 0) {
        message.error('请至少勾选一个参数！');
        return;
      } else {
        const params = {
          ...formData,
          params: [...sendData],
        };
        console.log("----handleSubmit-----", params);
        state.loading = true;
        const api = isBatch ? "createPassportBatch" : "createPassport";
        passportManage[api](params)
          .then((res: any) => {
            const { code } = res;
            if (code === 0) {
              message.success("制作护照成功！");
              if (options.length > 0) {
                // 有模板,返回上一级页面
                handleBack();
              } else {
                // 无模板，生成护照模板确认
                showConfirm();
              }
            }
            state.loading = false;
          })
          .catch((e: any) => {
            console.error(e);
            state.loading = false;
          });
      }
    };

    /**
     * 生成护照模板确认
     */
    const showConfirm = () => {
      Modal.confirm({
        title: "护照模板保存",
        content: "当前已选参数是否生成护照模板",
        centered: true,
        onCancel() {
          handleBack();
        },
        onOk() {
          const sendData = sendPassportData();
          const { productNo, batchNo } = state.formData;
          const storageData = {
            passprotTemplateDetails: sendData,
            productNo,
            batchNo,
          };
          localStorage.setItem("passportData", JSON.stringify(storageData));
          const params = {
            path: "/productManage/passportGenerateTemplate",
            query: {},
          };
          router.replace(params);
        },
      });
    };

    /**
     * 预览 TODO
     */
    const handlePreview = () => {};

    /**
     * 返回
     */
    const handleBack = () => {
      router.back();
    };

    /**
     * 护照模板详情
     */
    const detailPassportTemplate = (templateId: number | string) => {
      const { detailPassportTemplate } = service.passportManage;
      const params = {
        id: templateId,
      };
      state.loading = true;
      detailPassportTemplate(params)
        .then((res: any) => {
          const { code, data } = res;
          if (code === 0) {
            if (data) {
              state.passportInitData = data;
            }
          }
          state.loading = false;
        })
        .catch((e: any) => {
          state.loading = false;
          console.error(e);
        });
    };

    /**
     * 护照参数
     */
    const queryPassportData = () => {
      const { queryPassportData } = service.passportManage;
      const { productNo, batchNo } = state.formData;
      const params = {
        productNo,
        batchNo,
      };
      state.loading = true;
      return queryPassportData(params)
        .then((res: any) => {
          const { code, data } = res;
          if (code === 0) {
            state.passportInitData = data;
          }
          state.loading = false;
        })
        .catch((e: any) => {
          console.error(e);
          state.loading = false;
        });
    };

    /**
     * 下发数据
     * @returns
     */
    const sendPassportData = () => {
      const { modelData } = state;
      const keys = Object.keys(modelData);
      const sendData: Object[] = [];
      keys.forEach((item: any) => {
        const filterData = modelData[item].filter((pInfo: any) => pInfo.value); // 过滤选中参数
        const flatData = convertLevel(filterData); // 扁平化参数数组
        flatData &&
          flatData.forEach((info: any) => {
            const { id, paramKey } = info;
            sendData.push({
              paramId: id,
              paramKey,
            });
          });
      });
      return sendData;
    };

    return {
      ...toRefs(state),
      handleBack,
      handleSelectChange,
      handleSubmit,
      handlePreview,
      isShowTabs,
      tabsGroupList,
    };
  },
});
