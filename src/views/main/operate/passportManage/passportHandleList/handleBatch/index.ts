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
import { useRouter } from "vue-router";
import { showTime } from "@/utils/function";
import ApproveModal from "./../../components/approveModal/index.vue";
import { message } from "ant-design-vue";
import {PAGE_SIZE_MAX} from '@/views/main/enterprise/passportManage/config'
import {passportStatusKeys,} from '@/utils/dict'
const columns = [
  {
    key: "tableIndex",
    dataIndex: "tableIndex",
    title: "序号",
    width: 100,
  },
  {
    key: "enterpriseName",
    dataIndex: "enterpriseName",
    title: "企业名称",
    width: 200,
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
    key: "collectedCount",
    dataIndex: "collectedCount",
    title: "护照参数/数据参数",
    width: 200,
  },
  {
    key: "updateTime",
    dataIndex: "updateTime",
    title: "最后更新时间",
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
  components: {
    ApproveModal,
  },
  setup() {
    const tableRef = ref();
    const router = useRouter();
    const initSearch = {
      enterpriseName: "",
      productNo: "",
      batchNo: "",
      serialNo: "",
      status: null,
    };
    const state = reactive({
      columns,
      search: {
        ...initSearch,
      } as any,
      searchRenderList: [
        {
          label: "电池序列号",
          key: "serialNo",
          type: "input",
          placeholder: "电池序列号",
        },
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
          label: "企业名称",
          key: "enterpriseName",
          type: "input",
          placeholder: "企业名称",
        },
      ],
      visible: false,
      formData: {} as any,
      dataSource: [],
      loading: false,
      isBatch: false,
      selectedRowKeys: [] as any,
    });

    onMounted(() => {
      queryPassport();
    });

    /**
     * 搜索
     */
    const handleSearch = () => {
      resetTable();
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
     *隐藏弹窗
     *
     */
    const hideModal = () => {
      state.visible = false;
    };

    /**
     * 选择复选框
     * @param selectedRowKeys
     */
    const onSelectChange = (
      selectedRowKeys: string | number[],
      selectedRows: []
    ) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };

    /**
     * 批量受理
     */
    const handleBatchApprove = () => {
      const len=state.selectedRowKeys.length;
      if (len > 0) {
        state.visible = true;
        if(len===1){
          // 单个
          state.isBatch = false;
          const {dataSource}=state;
          const id=state.selectedRowKeys[0];
          const current=dataSource.filter((item:any)=>item.id===id)[0] as any;
          if(current){
            state.formData={
              ...current,
            }
          }
        }else{
          // 多个
          state.isBatch = true;
          state.formData ={
            ids:state.selectedRowKeys,
          };
        }
      } else {
        // 空
        message.error("请先选择要受理的电池护照！");
      }
    };

    /**
     * 受理
     * @param item 当前数据
     */
    const handleApprove = (item: any) => {
      state.formData = {
        ...item,
      };
      state.visible = true;
      state.isBatch = false;
    };

    /**
     * 认证通过
     */
    const handlePass = () => {
      resetTable();
    };

    /**
     * 驳回
     */
    const handleReject = () => {
      resetTable();
    };

    /**
     * 重置表格
     */
    const resetTable = () => {
      // 重置复选框
      state.selectedRowKeys = [];
      tableRef&&tableRef.value.setSelectedRowKeys([]);
      queryPassport();
    };

    /**
     * 详情
     */
    const detail = (item: any) => {
      const params = {
        path: "/productManage/passportManageList/detail",
        query: { id: item.id },
      };
      router.push(params);
    };

    /**
     * 查询护照列表
     */
    const queryPassport = () => {
      const { queryPassportList } = service.passportManage;
      const params = {
        ...state.search,
        status:passportStatusKeys['processs'],
        pageNo: 1,
        pageSize: PAGE_SIZE_MAX,
      };
      state.loading = true;
      queryPassportList(params)
        .then((res: any) => {
          const { code, data } = res;
          if (code === 200 || code === 0) {
            const { list } = data;
            state.dataSource =list&&list.map((item:any,index:number)=>{
              item.tableIndex = index + 1
              return {
                ...item,
                ...formatTime(item),
              }
            });
          }
          state.loading=false;
        })
        .catch((e: any) => {
          console.error(e);
          state.loading=false;
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
      handleReset,
      hideModal,
      detail,
      handleBatchApprove,
      handleApprove,
      handlePass,
      handleReject,
      onSelectChange,
      tableRef,
    };
  },
});
