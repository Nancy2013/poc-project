import { RenderFormItem } from "@/components/form";
import { ColumnType } from "ant-design-vue/lib/table/interface";

const searchRenderList: RenderFormItem[] = [
  {
    label: "模型名称",
    key: "modelName",
    type: "select",
    placeholder: "请选择",
    options: []
  },
  {
    label: "产品型号",
    key: "productSku",
    type: "input",
    placeholder: "请输入",
  },
  {
    label: "批次号",
    key: "batchNo",
    type: "input",
    placeholder: "请输入",
  },
];

const tableColumns: ColumnType[] = [
  {
    dataIndex: "index",
    key: "index",
    title: "序号",
    width: 100,
  },
  {
    dataIndex: "productSku",
    key: "productSku",
    title: "产品型号",
    width: 100,
  },
  {
    dataIndex: "batchNo",
    key: "batchNo",
    title: "批次号",
    width: 100,
  },
  {
    dataIndex: "sn",
    key: "sn",
    title: "电池序列号",
    width: 100,
  },
  {
    dataIndex: "modelName",
    key: "modelName",
    title: "模型名称",
    width: 200,
  },
  {
    dataIndex: "paramSum",
    key: "paramSum",
    title: "已有参数数量",
    width: 200,
  },
  {
    dataIndex: "createTime",
    key: "createTime",
    title: "创建时间",
    width: 200,
  },
  {
    dataIndex: "updateTime",
    key: "updateTime",
    title: "最后更新时间",
    width: 200,
  },
  {
    key: "operate",
    title: "操作",
    dataIndex: "operate",
    width: 200,
    fixed: "right",
  },
];

const tableAColumns: ColumnType[] = [
  {
    dataIndex: "index",
    key: "index",
    title: "序号",
    width: 100,
  },
  {
    dataIndex: "productSku",
    key: "productSku",
    title: "产品型号",
    width: 100,
  },
  {
    dataIndex: "batchNo",
    key: "batchNo",
    title: "批次号",
    width: 100,
  },
  {
    dataIndex: "modelName",
    key: "modelName",
    title: "模型名称",
    width: 200,
  },
  {
    dataIndex: "collectSum",
    key: "collectSum",
    title: "已采集数量",
    width: 100,
  },
  {
    dataIndex: "paramSum",
    key: "paramSum",
    title: "已有参数数量",
    width: 200,
  },
  {
    dataIndex: "createTime",
    key: "createTime",
    title: "创建时间",
    width: 200,
  },
  {
    dataIndex: "updateTime",
    key: "updateTime",
    title: "最后更新时间",
    width: 200,
  },
  {
    key: "operate",
    title: "操作",
    dataIndex: "operate",
    width: 200,
    fixed: "right",
  },
];

export { searchRenderList, tableColumns, tableAColumns };
