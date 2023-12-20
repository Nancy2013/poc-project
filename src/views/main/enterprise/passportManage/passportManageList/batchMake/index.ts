import {
  defineComponent,
  reactive,
  toRefs,
  toRef,
  onMounted,
  ref,
  h,
} from "vue";
import service from "@/service";
import { passportStatusKeys } from "@/utils/dict";
import { useRouter } from "vue-router";
import { showTime } from "@/utils/function";
import { Modal } from "ant-design-vue";
const columns = [
  {
    key: "tableIndex",
    dataIndex: "tableIndex",
    title: "序号",
    width: 100,
  },
  {
    key: "productNo",
    dataIndex: "productNo",
    title: "产品型号(SKU)",
    width: 200,
  },
  {
    key: "batchNo",
    dataIndex: "batchNo",
    title: "批次号",
    width: 200,
  },
  {
    key: "count",
    dataIndex: "count",
    title: "护照数量",
    width: 200,
  },
  {
    key: "paramCount",
    dataIndex: "paramCount",
    title: "数据参数",
    width: 200,
  },
  {
    key: "operate",
    dataIndex: "operate",
    title: "操作",
    width: 200,
    fixed: "right",
  },
];

export default defineComponent({
  props: {},
  components: {},
  setup() {
    const initSearch = {
      productNo: "",
      batchNo: "",
      passportTemplateName: "",
      status: passportStatusKeys["wait"], // 待生成
    };
    const router = useRouter();
    const state = reactive({
      columns,
      search: {
        ...initSearch,
      } as any,
      searchRenderList: [
        {
          label: "产品型号",
          key: "productNo",
          type: "input",
          placeholder: "产品型号",
        },
        {
          label: "批次号",
          key: "batchNo",
          type: "input",
          placeholder: "批次号",
        },
      ],
      formData: {} as any,
      dataSource: [],
      loading: false,
    });

    onMounted(() => {
      queryPassportBatch();
    });

    /**
     * 生成护照
     */
    const handleMake = (item: any) => {
      Modal.confirm({
        title: "提示",
        content: () =>
          h("div", {}, [
            h("p", "请确认您提交的数据是否准确"),
            h("p", `生成护照数据参数 ${item.paramCount}`),
          ]),
        centered: true,
        onOk() {
          state.formData = {
            ...item,
          };
          const { productNo, batchNo } = item;
          const query = {
            productNo,
            batchNo,
            isBatch: true,
          } as any;
          router.push({ path: "/productManage/passportMake", query});
        },
      });
    };

    /**
     * 搜索
     */
    const handleSearch = () => {
      queryPassportBatch();
    };

    /**
     * 重置
     */
    const handleReset = () => {
      state.search = {
        ...initSearch,
      };
    };

    /**
     * 查询护照列表
     */
    const queryPassportBatch = () => {
      const { queryPassportBatch } = service.passportManage;
      const params = {
        ...state.search,
      };
      state.loading = true;
      queryPassportBatch(params)
        .then((res: any) => {
          const { code, data } = res;
          if (code === 0) {
            state.dataSource =
              data &&
              data.map((item: any, index: number) => {
                item.tableIndex = index + 1;
                return {
                  ...item,
                  ...formatTime(item),
                };
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
     * 格式化时间
     * @param item 数据
     */
    const formatTime = (item: any) => {
      const { createTime, updateTime } = item;
      if (createTime) {
        // 创建时间
        item.createTime = showTime(createTime);
      }
      if (updateTime) {
        // 更新时间
        item.updateTime = showTime(updateTime);
      }
      return item;
    };

    return {
      ...toRefs(state),
      handleSearch,
      handleMake,
      handleReset,
    };
  },
});
