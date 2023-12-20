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
import {passportStatus,passportStatusKeys,} from '@/utils/dict'
import ApproveModal from './../../components/approveModal/index.vue'
import CodeModal from '@/views/main/operate/passportManage/components/codeModal/index.vue'

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
    key: "status",
    dataIndex: "status",
    title: "受理状态",
    width: 200,
    values:[1],
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
    CodeModal,
  },
  setup() {
    const state = reactive({
      columns,
      search: {
        enterpriseName: "",
        productNo: "",
        batchNo: "",
        serialNo: "",
        status:3,
      } as any,
      searchRenderList: [
        {
          label: "企业名称",
          key: "enterpriseName",
          type: "input",
          placeholder: "企业名称",
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
          label: "电池序列号",
          key: "serialNo",
          type: "input",
          placeholder: "电池序列号",
          values:[0],
        },
        {
          label: "受理状态",
          key: "status",
          type: "select",
          placeholder: "受理状态",
          options: [
            {
              label:'认证通过',
              value:passportStatusKeys['pass'],
            },
            {
              label:'认证不通过',
              value:passportStatusKeys['reject']
            }
          ],
          values:[1],
          allowClear:false,
        },
      ],
      visible: false,
      formData: {} as any,
      title:'电池护照二维码',
      tabStatusOptions:[
       {
        label:'已受理',
        value:1,
       },
       {
        label:'未受理',
        value:0,
       }
      ],
      tabStatus:1,
      passportStatusKeys,
      approveVisible:false,
    });
    const { queryPassportList } = service.passportManage;

    const opts = {
      sendRequest: queryPassportList,
      searchInitData:state.search,
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

    onMounted(() => {
      init()
    });

    /**
     * 初始化
     */
    const init=()=>{
      setOptions();
    }

    /**
     * 获取搜索条件
     */
    const getSearch=computed(()=>{
      const { tabStatus, searchRenderList } = state;
      const searchRender = searchRenderList.filter((item: any) => {
        if (!item.values || item.values.includes(tabStatus)) {
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
      const { columns,tabStatus } = state;
      const columnsRender = columns.filter((item: any) => {
        if (!item.values || item.values.includes(tabStatus)) {
          // 默认全显示，
          return item;
        }
      });
      return columnsRender;
    });

    /**
     * 显示状态
     * @param value 
     */
    const showStatusLabel=(value:string|number)=>{
      const current:Object=passportStatus.filter((item:any)=>item.value===value)[0];
      return current?current['label']:value;
    }

    /**
     * 设置状态下拉框
     */
    const setOptions=()=>{
      const {searchRenderList}=state;
      searchRenderList.forEach((item:any)=>{
        if(item.key==='status'){
          item.options=passportStatus.filter((statusItem:any)=>{
            const {key}=statusItem;
            if(key==='reject'||key==='pass'){
               return statusItem;
            }
          })
        }
      })
    }

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
      state.approveVisible=false;
    };

  /**
   * 切换tab
   * @param activeKey 当前tab
   */
    const handleChangeTab=(activeKey:number|string)=>{
      resetSearch();
      handleSearch();
    }

    /**
     * 切换tab重置搜索条件
     */
    const resetSearch=()=>{
      const {searchRenderList,tabStatus}=state
      searchRenderList.forEach((item:any)=>{
        const {key,values}=item;
        if(values&&!values.includes(tabStatus)){
          searchData.value[key]=null;
        }
      });
      if(tabStatus===1){
        searchData.value.status=passportStatusKeys['pass']; // 默认选中认证通过
      }else{
        searchData.value.status=passportStatusKeys['processs']; // 认证中
      }
    }

    /**
     * 重置
     */
    const handleReset=()=>{
      const {tabStatus}=state;
      searchData.value={
        enterpriseName: "",
        productNo: "",
        batchNo: "",
        serialNo: "",
      }
      if(tabStatus===1){
        searchData.value.status=passportStatusKeys['pass']; // 默认选中认证通过
      }else{
        searchData.value.status=passportStatusKeys['processs']; // 认证中
      }
    }

    /**
     * 批量受理
     */
    const handleBatchApprove=()=>{
      const params={
        path:'/productManage/passportHandleBatch',
      }
      handleJump(params.path);
    }
   

    /**
     * 受理
     * @param item 
     */
    const handleApprove=(item:any)=>{
      state.formData={
        ...item,
      };
      state.approveVisible=true;
    }

    /**
     * 认证通过
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
    const detail=(item:any)=>{
      const params={
        path:'/productManage/passportManageList/detail',
        query:{id:item.id},
      }
      handleJump(params.path,params.query);
    }

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
      detail,
      lifecycle,
      handleBatchApprove,
      handleApprove,
      searchData,
      showStatusLabel,
      handlePass,
      handleReject,
    };
  },
});
