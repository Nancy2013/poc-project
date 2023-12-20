import {
  defineComponent,
  reactive,
  toRefs,
  toRef,
  onMounted,
  ref,
  computed,
  nextTick,
  h,
} from "vue";
import { usePage } from "@/hooks/usePage";
import service from "@/service";
import { pickerFormat } from "@/utils/common";
import { passportStatus, passportStatusKeys } from "@/utils/dict";
import { Modal } from "ant-design-vue";
import dayjs from "dayjs";
import CodeModal from '@/views/main/operate/passportManage/components/codeModal/index.vue'
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
    title: "产品型号",
    width: 200,
  },
  {
    key: "batchNo",
    dataIndex: "batchNo",
    title: "批次号",
    width: 200,
  },
  {
    key: "serialNo",
    dataIndex: "serialNo",
    title: "电池序列号",
    width: 200,
  },
  {
    key: "passportTemplateName",
    dataIndex: "passportTemplateName",
    title: "护照模板名称",
    width: 200,
    values: [passportStatusKeys["processs"],passportStatusKeys["reject"],passportStatusKeys["pass"],],
  },
  {
    key: "paramCount",
    dataIndex: "paramCount",
    title: "数据参数",
    width: 200,
    values: [passportStatusKeys["wait"]],
  },
  {
    key: "collectedCount",
    dataIndex: "collectedCount",
    title: "护照参数/数据参数",
    width: 200,
    values: [passportStatusKeys["processs"],passportStatusKeys["reject"],passportStatusKeys["pass"],],
  },
  {
    key: "createTime",
    dataIndex: "createTime",
    title: "创建时间",
    width: 200,
    values: [passportStatusKeys["wait"], passportStatusKeys["processs"]],
  },
  {
    key: "updateTime",
    dataIndex: "updateTime",
    title: "最后更新时间",
    width: 200,
    values: [passportStatusKeys["processs"]],
  },
  {
    key: "approveTime",
    dataIndex: "approveTime",
    title: "认证时间",
    width: 200,
    values: [passportStatusKeys["reject"], passportStatusKeys["pass"]],
  },
  {
    key: "operate",
    dataIndex: "operate",
    title: "操作",
    width: 300,
    fixed: "right",
  },
];

export default defineComponent({
  props: {},
  components: {
    CodeModal,
  },
  setup() {
    const state = reactive({
      columns,
      search: {
        passportTemplateName: "",
        serialNo: "",
        productNo: "",
        batchNo: "",
        timePicker: [],
        status: 0,
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
        {
          label: "电池序列号",
          key: "serialNo",
          type: "input",
          placeholder: "电池序列号",
        },
        {
          label: "护照模版名称",
          key: "passportTemplateName",
          type: "input",
          placeholder: "护照模版名称",
          values: [passportStatusKeys["processs"]], // 认证中
        },
        {
          label: "认证时间",
          key: "timePicker",
          type: "datePicker",
          datePickerType: "rangePicker",
          picker: "",
          valueFormat: pickerFormat.dateFormat,
          values: [passportStatusKeys["reject"], passportStatusKeys["pass"]], // 认证不通过，认证通过
        },
      ],
      visible: false,
      formData: {} as any,
      title: "电池护照二维码",
      passportStatus,
      passportStatusKeys,
    });
    const { queryPassportList } = service.passportManage;

    /**
     * 转换搜索条件
     * @param search 搜索条件
     * @returns 转换结果
     */
    const transformSearch = (search: any) => {
      const newSearch = { ...search };
      delete newSearch.timePicker;
      const { timePicker } = search;
      if (timePicker && Array.isArray(timePicker)) {
        const [beginTime, endTime] = timePicker || [];
        if (beginTime) {
          newSearch.beginTime =dayjs(beginTime).startOf('day').format(pickerFormat.timeFormat);
          newSearch.endTime = dayjs(endTime).endOf('day').format(pickerFormat.timeFormat);
        }
      } else {
        newSearch.beginTime = timePicker;
        newSearch.endTime = timePicker;
      }
      return newSearch;
    };
    const opts = {
      sendRequest: queryPassportList,
      searchInitData: state.search,
      transformSearch,
    };
    const {
      query,
      dataSource,
      loading,
      pagination,
      handleSearch,
      paginationChange,
      handleJump,
      searchData,
    } = usePage(opts);
    onMounted(() => {});

    /**
     * 获取搜索条件
     */
    const getSearch = computed(() => {
      const { searchRenderList } = state;
      const { status } = searchData.value;
      const searchRender = searchRenderList.filter((item: any) => {
        if (!item.values || item.values.includes(status)) {
          // 默认全显示，
          return item;
        }
      });
      return searchRender;
    });

    /**
     * 获取表格列
     */
    const getColumns = computed(() => {
      const { columns } = state;
      const { status } = searchData.value;
      const columnsRender = columns.filter((item: any) => {
        if (!item.values || item.values.includes(status)) {
          // 默认全显示，
          return item;
        }
      });
      return columnsRender;
    });

    /**
     * 制作护照
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
          const { id,productNo, batchNo } = item;
          const params = {
            path: "/productManage/passportMake",
            query: { 
              id,
              productNo,
              batchNo, 
            }, 
          };
          handleJump(params.path, params.query);
        },
      });
    };

    /**
     * 批量制照
     */
    const handleBatchMake = () => {
      const params = {
        path: "/productManage/passportBatchMake",
      };
      handleJump(params.path);
    };

    /**
     * 预览
     */
    const handlePreview = (item: any) => {
      state.formData = {
        ...item,
      };
      showModal();
    };

    /**
     * 详情
     */
    const detail = (item: any) => {
      const params = {
        path: "/productManage/passportManageList/detail",
        query: { id: item.id },
      };
      handleJump(params.path, params.query);
    };

    /**
     * 生命周期
     */
    const lifecycle = (item: any) => {
      const params = {
        path: "/productManage/passportLifecycle",
        query: { id: item.id },
      };
      handleJump(params.path, params.query);
    };

    /**
     * 显示弹窗
     * @param item
     */
    const showModal = () => {
      state.visible = true;
    };

    /**
     *隐藏弹窗
     *
     */
    const hideModal = () => {
      state.visible = false;
    };


    /**
     * 切换tab
     * @param activeKey 当前tab
     */
    const handleChangeTab = (activeKey: number | string) => {
      resetSearch();
      handleSearch();
    };

    /**
     * 切换tab重置搜索条件
     */
    const resetSearch = () => {
      const { searchRenderList } = state;
      const { status } = searchData.value;

      searchRenderList.forEach((item: any) => {
        const { key, values } = item;
        if (values && !values.includes(status)) {
          searchData.value[key] = key === "timePicker" ? [] : "";
        }
      });
    };

    /**
     * 重置
     */
    const handleReset = () => {
      const { status } = searchData.value;
      const search = {
        passportTemplateName: "",
        serialNo: "",
        productNo: "",
        batchNo: "",
        timePicker: [],
        status,
      };
      searchData.value = Object.assign({}, search);
    };

    return {
      ...toRefs(state),
      getColumns,
      getSearch,
      dataSource,
      loading,
      pagination,
      paginationChange,
      handleSearch,
      handlePreview,
      handleReset,
      hideModal,
      handleChangeTab,
      handleMake,
      handleBatchMake,
      detail,
      lifecycle,
      searchData,
    };
  },
});
