import request from "@/utils/axios";
import { formatData } from './utils'


export default {
    // 企业认证审核
    // 新增企业认证 TODO
    addEnterpriseAudit:(params:any) => request(formatData('/dpp-platform/passport/list','post',params)), // /dpp-platform/tenant-info/create
    // 编辑企业认证 TODO
    editEnterpriseAudit:(params:any) => request(formatData('/dpp-platform/passport/list','post',params)), // /dpp-platform/tenant-info/update
    // 详情企业认证 TODO
    detailEnterpriseAudit:(params:any) => request(formatData('/dpp-platform/passport/list','post',params)), // /dpp-platform/tenant-info/getBytenantId
    // 查询审核企业列表 TODO
    queryEnterpriseAuditList:(params:any) => request(formatData('/dpp-platform/passport/list','post',params)), // /dpp-platform/tenant-info/page
    // 受理企业 TODO
    approveEnterprise:(params:any) => request(formatData('/dpp-platform/passport/passportApproval','post',params)), // /dpp-platform/tenant-info/updateStatus


    // 企业签约
    // 查询签约企业列表 TODO
    queryEnterpriseSignList:(params:any) => request(formatData('/dpp-platform/passport/list','post',params)), 
    // 签约企业-新增 TODO
    addEnterpriseSign:(params:any) => request(formatData('/dpp-platform/passport/batchMakePassportList','post',params)),
    // 签约企业-编辑 TODO
    editEnterpriseSign:(params:any) => request(formatData('/dpp-platform/passport/batchMakePassportList','post',params)),
    // 签约企业-详情 TODO
    detailEnterpriseSign:(params:any) => request(formatData('/dpp-platform/passport/batchMakePassportList','post',params)),
}