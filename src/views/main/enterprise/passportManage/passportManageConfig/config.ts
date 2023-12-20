import { RenderFormItem } from "@/components/form";
import { ColumnType } from "ant-design-vue/lib/table/interface";

const searchRenderList: RenderFormItem[] = [
  {
    label: "护照模板名称",
    key: "name",
    type: "input",
    placeholder: "护照模板名称",
  },
  {
    label: "产品型号（SKU）",
    key: "productNo",
    type: "input",
    placeholder: "产品型号（SKU）",
  },
  {
    label: "行业类别",
    key: "industryType",
    type: "select",
    placeholder: "行业类别"
  },
  {
    label: "批次号",
    key: "batchNo",
    type: "input",
    placeholder: "请输入批次号"
  },
  {
    label: "状态",
    key: "status",
    type: "select",
    placeholder: "状态",
    options: [
      { label: '启用', value: 1 },
      { label: '停用', value: 0 }
    ]
  },
];

const tableColumns: ColumnType[] = [
  {
    key: "tableIndex",
    dataIndex: "tableIndex",
    title: "序号",
    width: 100,
  },
  {
    key: "name",
    dataIndex: "name",
    title: "护照模板名称",
    width: 100,
  },
  {
    key: "productNo",
    dataIndex: "productNo",
    title: "产品型号(SKU)",
    width: 100,
  },
  {
    key: "batchNo",
    dataIndex: "batchNo",
    title: "批次号",
    width: 100,
  },
  {
    key: "industryType",
    dataIndex: "industryType",
    title: "行业类别",
    width: 100,
  },
  {
    key: "tenantName",
    dataIndex: "tenantName",
    title: "企业",
    width: 200,
  },
  {
    key: "createTime",
    dataIndex: "createTime",
    title: "创建时间",
    width: 200,
  },
  {
    key: "updateTime",
    dataIndex: "updateTime",
    title: "最后更新时间",
    width: 200,
  },
  {
    key: "updater",
    dataIndex: "updater",
    title: "最后更新人",
    width: 100,
  },
  {
    key: "status",
    dataIndex: "status",
    title: "状态",
    width: 100,
  },
  {
    key: "operate",
    dataIndex: "operate",
    title: "操作",
    width: 200,
    fixed: "right",
  },
];

const modelFormRenderList: RenderFormItem[] = [
   {
      required: true,
      label: '护照模板名称：',
      type: 'input',
      key: 'name',
      width: '100%',
      placeholder: '请输入护照模板名称'
   },
   {
    required: true,
    label: '批次号：',
    type: 'input',
    key: 'batchNo',
    width: '100%',
    placeholder: '请输入批次号',
    options: []
   },
   {
      required: true,
      label: '产品型号：',
      type: 'input',
      key: 'productNo',
      width: '100%',
      placeholder: '请输入产品型号',
      options: []
   },
   {
     required: false,
     label: '模板说明：',
     type: 'textarea',
     key: 'remark',
     width: '100%',
     placeholder: '请输入模板说明',
     autoSize: {
			 minRows: 4
		 }
   }
]

export { searchRenderList, tableColumns, modelFormRenderList };
