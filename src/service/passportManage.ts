import request from "@/utils/axios";
import { formatData } from './utils'


export default {
    // 护照管理接口
    // 查询护照管理列表
    queryPassportList:(params:any) => request(formatData('/dpp-platform/passport/list','post',params)),
    // 批量查询护照列表-聚合
    queryPassportBatch:(params:any) => request(formatData('/dpp-platform/passport/batchMakePassportList','post',params)),
    // 护照详情
    detailPassport:(params:any) => request(formatData('/dpp-platform/passport/passportDetail','post',params)),
    // 创建护照-单个
    createPassport:(params:any) => request(formatData('/dpp-platform/passport/makePassport','post',params)), 
    // 创建护照-批量
    createPassportBatch:(params:any) => request(formatData('/dpp-platform/passport/batchMakePassport','post',params)), 
    // 无模板，查询护照全量参数
    queryPassportData:(params:any) => request(formatData('/dpp-platform/passport/detailBySkuAndBatch','post',params)),
    // 受理护照
    approvePassport:(params:any) => request(formatData('/dpp-platform/passport/passportApproval','post',params)),
    // 护照生命周期
    lifecyclePassport:(params:any) => request(formatData('/dpp-platform/passport/passportLifestyle','post',params)),

    // 护照模板接口
    // 查询护照模板列表
    queryPassportTemplate:(params:any) => request(formatData('/dpp-platform/passport/template/page','post',params)), 
    // 创建护照模板
    createPassportTemplate:(params:any) => request(formatData('/dpp-platform/passport/template/create','post',params)), 
    // 护照模板详情
    detailPassportTemplate:(params:any) => request(formatData('/dpp-platform/passport/template/passprot-template-detail/list-by-template-id','post',params)),
}