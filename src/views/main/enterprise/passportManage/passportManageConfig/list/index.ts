import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { searchRenderList, tableColumns } from "../config";
import {
  getPassportTemplateList,
  dictDataType,
  updateStatus,
  deletePassportTemplate,
} from "../server";
import { usePage } from "@/hooks/usePage";
import { message } from "ant-design-vue";

export default defineComponent({
  props: {},
  components: {},
  setup() {
    const state = reactive({
      searchRenderList,
    });

    const {
      loading,
      dataSource,
      searchData,
      pagination,
      handleSearch,
      paginationChange,
      handleJump,
      handleReset,
      query,
    } = usePage({
      sendRequest: getPassportTemplateList,
    });

    // 页面组件切换
    const convertPage = (type: string, id: number) => {
      let path: string = "";
      switch (type) {
        case "add":
          path = "/passportManage/passportManageConfig/add";
          break;
        case "edit":
          path = "/passportManage/passportManageConfig/edit";
          break;
        case "detail":
          path = "/passportManage/passportManageConfig/detail";
          break;
        default:
          break;
      }
      handleJump(path, { id });
    };

    // 数据字典
    const getDictDataType = () => {
      dictDataType({ type: "dpp_industry" }).then((res: any) => {
        console.log("获取数据字典值", res);
        state.searchRenderList = state.searchRenderList.map((v: any) => {
          if (v["key"] == "industryType")
            v["options"] = res.data.map((v: any) => ({
              label: v["label"],
              value: v["value"],
            }));
          return v;
        });
      });
    };

    // 更新状态
    const getUpdateStatus = (status: number, id: number) => {
      updateStatus({ status, id }).then((res) => {
        if (res.code == 0) {
          message.success("更新状态成功!");
          query();
        }
      });
    };

    // 删除
    const removePassportTemplate = (id: number) => {
      deletePassportTemplate({ id }).then((res) => {
        if (res.code == 0) {
          message.success("删除模板成功!");
          query();
        }
      });
    };

    onMounted(() => {
      getDictDataType();
    });

    return {
      ...toRefs(state),
      tableColumns,
      loading,
      dataSource,
      searchData,
      pagination,
      handleReset,
      handleSearch,
      paginationChange,
      convertPage,
      getDictDataType,
      getUpdateStatus,
      removePassportTemplate,
    };
  },
});
