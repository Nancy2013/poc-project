export  const formRenderList=[
    {
       required: true,
       label: '企业名称',
       type: 'input',
       key: 'tempEnterpriseName',
       width: '100%',
       block: 'inline-block',
       placeholder: '请输入企业名称',
    },
    {
       required: true,
       label: '合同名称',
       type: 'input',
       key: 'tempContractName',
       block: 'inline-block',
       width: '100%',
       placeholder: '请输入合同名称',
    },
    {
      required: true,
      label: '签约时间',
      type: 'datePicker',
      key: 'tempSignTime',
      block: 'inline-block',
      width: '100%',
      placeholder: '',
      datePickerType: "rangePicker",
   },
    {
      required: true,
      label: '合同附件',
      type: 'upload',
      key: 'tempContractFiles',
      width: '100%',
      placeholder: '请选择合同附件',
      title:'上传合同',
    },
    {
      required: false,
      label: '合同关键条款',
      type: 'textarea',
      key: 'tempKeyTerms',
      width: '100%',
      placeholder: '请输入合同关键条款',
      autoSize: {
        minRows: 4
      }
    }
 ];