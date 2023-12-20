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
import { pickerFormat } from "@/utils/common";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
const columns = [
  {
    key: "tableIndex",
    dataIndex: "tableIndex",
    title: "序号",
    width: 100,
  },
  {
    key: "tempEnterpriseName",
    dataIndex: "tempEnterpriseName",
    title: "企业名称",
    width: 200,
  },
  {
    key: "tempContractName",
    dataIndex: "tempContractName",
    title: "合同名称",
    width: 200,
  },
  {
    key: "tempSignTime",
    dataIndex: "tempSignTime",
    title: "签约时间",
    width: 200,
  },
  {
    key: "tempCreator",
    dataIndex: "tempCreator",
    title: "创建人",
    width: 200,
  },
  {
    key: "tempCreateTime",
    dataIndex: "tempCreateTime",
    title: "创建时间",
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
  components: { },
  setup() {
    const router = useRouter();
    const state = reactive({
      columns,
      search: {
        tempContractName: "",
        timePicker:[],
      } as any,
      searchRenderList: [
        {
          label: "合同名称",
          key: "tempContractName",
          type: "input",
          placeholder: "合同名称",
        },
        {
          label: "签约时间",
          key: "timePicker",
          type: "datePicker",
          datePickerType: "rangePicker",
          picker: "",
          valueFormat: pickerFormat.dateFormat,
        },
      ],
      formData: {} as any,
    });
    const { queryEnterpriseSignList } = service.accountManage;

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
      sendRequest: queryEnterpriseSignList,
      searchInitData:state.search,
      transformSearch,
    };
    const {
      query,
      dataSource,
      loading,
      pagination,
      handleSearch,
      paginationChange,
      searchData,
      handleReset,
    } = usePage(opts);

    onMounted(() => {
      init()
    });

    /**
     * 初始化
     */
    const init=()=>{}

    /**
     * 新增
     */
    const add=(item:any)=>{
      const params={
        name:'enterpriseSignAction',
        params:{
          type:'add',
        }
      }
      router.push({...params});
    }

    /**
     * 编辑
     */
    const edit=(item:any)=>{
      const params={
        name:'enterpriseSignAction',
        query:{id:item.id},
        params:{
          type:'edit',
        }
      }
      router.push({...params});
    }

    /**
     * 详情
     */
    const detail=(item:any)=>{
      const params={
        name:'enterpriseSignAction',
        query:{id:item.id},
        params:{
          type:'detail',
        }
      }
      router.push({...params});
    }

    return {
      ...toRefs(state),
      dataSource,
      loading,
      pagination,
      paginationChange,
      handleSearch,
      handleReset,
      add,
      detail,
      edit,
      searchData,
    };
  },
});
