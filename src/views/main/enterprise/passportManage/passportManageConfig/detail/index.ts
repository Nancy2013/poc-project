import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getPassportTemplateDetail } from "../server";
import { modelFormRenderList } from "../config";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  props: {},
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    // 下一步
    const handleNext = () => {
      state.step += 1;
    };
    // 上一步
    const handlePrev = () => {
      state.step -= 1;
    };

    // 返回主页
    const returnPage = () => {
      router.go(-1)
   }

    // 获得护照模板明细
    const passportTemplateDetail = (id: number) => {
      getPassportTemplateDetail({ id }).then((res) => {
        if (res.code == 0) {
          let {
            data: {
              name,
              remark,
              productNo,
              batchNo,
              category,
              passprotTemplateDetailVo,
            },
          } = res as unknown as any;
          state.formData = { name, remark, productNo, batchNo };
          const filterMapList = (type: string) => {
            return passprotTemplateDetailVo
              .filter((item: any) => item.paramCategory == type)
              .map((v: any) => {
                return {
                  paramId: v.id,
                  paramKey: v.paramKey,
                  type: "text",
                  title: v.paramName,
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
        }
      });
    };

    onMounted(() => {
      const { id } = route.query;
      if (id) passportTemplateDetail(id as unknown as number);
    });

    const state = reactive({
      step: 0,
      loading: false,
      formData: {},
      formRenderList: modelFormRenderList.map((item) =>
        Object.assign({}, item, { disabled: true })
      ),
      tabsList: [],
    });
    return {
      ...toRefs(state),
      handleNext,
      handlePrev,
      returnPage
    };
  },
});
