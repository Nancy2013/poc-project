import { defineComponent, reactive, ref, toRefs } from "vue";
import { modelFormRenderList } from "../config";
import { createPassportTemplate, getDetailBySkuAndBatch } from "../server";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const formRef = ref();
    // 下一步
    const handleNext = () => {
      formRef.value.validate().then(() => {
        let { formData: { productNo, batchNo } } = state as any;
        getAllModelParamsList({ productNo, batchNo })
      })
    };

    // 上一步
    const handlePrev = () => {
      state.step -= 1;
    }

    // 返回主页
    const returnPage = () => {
      router.go(-1);
    };

    // 勾选父子节点结构
    const checkParentNodes = (nodes: any, nodeType: string) => {
      let allNodes: any = [];
      nodes.forEach((node: any) => {
        let { paramId, paramKey } = node;
        if (node[nodeType]) {
          let treeNodes = node[nodeType].map((v: any) => ({
            paramId: v["id"],
            paramKey: v["paramKey"],
          }));
          allNodes = allNodes.concat(treeNodes);
        }
        allNodes.push({ paramId, paramKey });
      });
      return allNodes;
    };

    // 获得模型参数列表
    const getAllModelParamsList = (params: any) => {
      getDetailBySkuAndBatch(params).then((res) => {
        if (res.code == 0) {
          let {
            data: { passportDetailParamList, category },
          } = res as any;
          const filterMapList = (type: string) => {
            return passportDetailParamList
              .filter((item: any) => item.paramCategory == type)
              .map((v: any) => {
                return {
                  paramId: v.id,
                  paramKey: v.paramKey,
                  type: "checkBox",
                  title: v.paramName,
                  value: false,
                  desc: v.paramDesc,
                  paramValue: v.children ? null : v.paramValue,
                  treeNodes: v.children,
                };
              });
          };
          state.tabsList = Object.entries(category)
            .filter((v: any) => v[0] && v[1])
            .map((v: any, index: number) => ({
              key: `${v[0]}`,
              name: v[1],
              arr: filterMapList(`${v[0]}`),
            })) as any;
            state.step += 1;
        } else {
          message.error(res.msg)
        }
      });
    };

    // 创建护照模板
    const addPassportTemplate = () => {
      let { name, productNo, remark, batchNo } = state.formData as any;
      state.tabsList.forEach(
        (v: any) => (state.totalList = state.totalList.concat(v.arr))
      );
      let params = {
        name,
        productNo,
        remark,
        batchNo,
        passprotTemplateDetails: checkParentNodes(
          state.totalList.filter((v) => v["value"]),
          "treeNodes"
        ),
      };
      createPassportTemplate(params).then((res) => {
        if (res.code == 0) {
          message.success("护照模板创建成功!");
          router.go(-1);
        }
      });
    };

    const state = reactive({
      step: 0,
      loading: false,
      formData: {},
      tabsList: [],
      // 统计列表信息
      totalList: [],
    });

    return {
      ...toRefs(state),
      formRef,
      modelFormRenderList,
      handleNext,
      handlePrev,
      returnPage,
      addPassportTemplate,
    };
  },
});
