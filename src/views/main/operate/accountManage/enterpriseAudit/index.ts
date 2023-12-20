import {
  defineComponent,
  reactive,
  toRefs,
  toRef,
  onMounted,
  ref,
  computed,
  nextTick,
} from "vue";
import { usePage } from "@/hooks/usePage";
import service from "@/service";
import { enterpriseStatus, enterpriseStatusKeys } from "@/utils/dict";
import ApproveModal from "@/views/main/operate/accountManage/components/approveModal/index.vue";
import { pickerFormat } from "@/utils/common";
import dayjs from "dayjs";
const columns = [
  {
    key: "tableIndex",
    dataIndex: "tableIndex",
    title: "序号",
    width: 100,
  },
  {
    key: "tenantName",
    dataIndex: "tenantName",
    title: "企业名称",
    width: 200,
  },
  {
    key: "tenantShortName",
    dataIndex: "tenantShortName",
    title: "企业简称",
    width: 200,
  },
  {
    key: "tenantRepresentative",
    dataIndex: "tenantRepresentative",
    title: "法定代表人",
    width: 200,
  },
  {
    key: "organizationType",
    dataIndex: "organizationType",
    title: "组织类型",
    width: 200,
  },
  {
    key: "contact",
    dataIndex: "contact",
    title: "联系人",
    width: 200,
  },
  {
    key: "phoneNumber",
    dataIndex: "phoneNumber",
    title: "联系电话",
    width: 200,
  },
  {
    key: "checked",
    dataIndex: "checked",
    title: "审核状态",
    width: 200,
  },
  {
    key: "createTime",
    dataIndex: "createTime",
    title: "申请时间",
    width: 200,
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
    ApproveModal,
  },
  setup() {
    const state = reactive({
      columns,
      search: {
        tenantName: "",
        tenantShortName: "",
        checked: null,
        timePicker: [],
      } as any,
      searchRenderList: [
        {
          label: "企业名称",
          key: "tenantName",
          type: "input",
          placeholder: "企业名称",
        },
        {
          label: "企业简称",
          key: "tenantShortName",
          type: "input",
          placeholder: "企业简称",
        },
        {
          label: "状态",
          key: "checked",
          type: "select",
          placeholder: "状态",
          options: [],
        },
        {
          label: "申请时间",
          key: "timePicker",
          type: "datePicker",
          datePickerType: "rangePicker",
          picker: "",
          valueFormat: pickerFormat.dateFormat,
        },
      ],
      visible: false,
      formData: {} as any,
      enterpriseStatusKeys,
    });
    const { queryEnterpriseAuditList } = service.accountManage;
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
          newSearch.beginTime = dayjs(beginTime)
            .startOf("day")
            .format(pickerFormat.timeFormat);
          newSearch.endTime = dayjs(endTime)
            .endOf("day")
            .format(pickerFormat.timeFormat);
        }
      } else {
        newSearch.beginTime = timePicker;
        newSearch.endTime = timePicker;
      }
      return newSearch;
    };
    const opts = {
      sendRequest: queryEnterpriseAuditList,
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
      handleReset,
    } = usePage(opts);

    onMounted(() => {
      init();
    });

    /**
     * 初始化
     */
    const init = () => {
      setOptions();
    };

    /**
     * 显示状态
     * @param value
     */
    const showStatusLabel = (value: string | number) => {
      const current: Object = enterpriseStatus.filter(
        (item: any) => item.value === value
      )[0];
      return current ? current["label"] : value;
    };

    /**
     * 设置状态下拉框
     */
    const setOptions = () => {
      const options = enterpriseStatus.filter(
        (item: any) => item.key !== "wait"
      );
      const { searchRenderList } = state;
      searchRenderList.forEach((item: any) => {
        if (item.key === "checked") {
          item.options = options;
        }
      });
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
     * 受理
     * @param item
     */
    const handleApprove = (item: any) => {
      state.formData = {
        ...item,
      };
      showModal();
    };

    /**
     * 通过
     */
    const handlePass = () => {
      handleSearch();
    };

    /**
     * 驳回
     */
    const handleReject = () => {
      handleSearch();
    };

    /**
     * 详情
     */
    const detail = (item: any) => {
      const params = {
        path: "/accountManage/enterpriseAuditDetail",
        query: { tenantId: item.tenantId },
      };
      handleJump(params.path, params.query);
    };

    return {
      ...toRefs(state),
      dataSource,
      loading,
      pagination,
      paginationChange,
      handleSearch,
      handleReset,
      hideModal,
      detail,
      handleApprove,
      searchData,
      showStatusLabel,
      handlePass,
      handleReject,
    };
  },
});
