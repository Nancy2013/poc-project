/**
 * 护照认证状态
 */

export const passportStatus:Array<Object>=[
    {
        label:'待生成',
        key:'wait',
        value:0,
    },
    {
        label:'认证中',
        key:'processs',
        value:1,
    },
    {
        label:'认证不通过',
        key:'reject',
        value:2,
    },
    {
        label:'认证通过',
        key:'pass',
        value:3,
    },
];

/**
 * 护照认证状态 keys
 */
export const passportStatusKeys:Object={
    wait:0,
    processs:1,
    reject:2,
    pass:3,
};


/**
 * 行业类别
 */
export const industryCategory:Array<Object>=[
    {
        label:'其他',
        value:0,
    },
    {
        label:'电池',
        value:1,
    },
];


/**
 * 状态的说明
 */
export const statusDict = {
    /**
     * 启用
     */
    enable: 1,
    /**
     * 禁用
     */
    disabled: 0
}

/**
 * 
 */
export const modelDict = {
    /**
     * 电池信息
     */
    battery: 1,
    /**
     * 材料信息
     */
    material: 2,
    /**
     * ESG信息
     */
    esg: 3,
    /**
     * 产业链数据
     */
    industry: 4,
    /**
     * 维修信息
     */
    service: 5
}

/**
 * 录入类型的说明
 */
export const recordTypeDict = {
    /**
     * 系统对接
     */
    system: 1,
    /**
     * 人工录入
     */
    artificial: 2,
    /**
     * 系统对接
     */
    '1': '系统对接',
    /**
     * 人工录入
     */
    '2': '人工录入'
}

/**
 * 布尔值的说明
 */
export const booleanDict = {
    /**
     * 是
     */
    yes: 1,
    /**
     * 否
     */
    no: 0
}

/**
 * 企业审核状态
 */

export const enterpriseStatus:Array<Object>=[
    {
        label:'待提交审核',
        key:'wait',
        value:'0',
    },
    {
        label:'待审核',
        key:'processs',
        value:'1',
    },   
    {
        label:'已认证',
        key:'pass',
        value:'2',
    },
    {
        label:'已驳回',
        key:'reject',
        value:'3',
    },
];

/**
 * 企业审核状态 keys
 */
export const enterpriseStatusKeys:Object={
    wait:'0', // 待提交审核
    processs:'1', // 待审核
    pass:'2', // 已认证
    reject:'3', // 已驳回
};