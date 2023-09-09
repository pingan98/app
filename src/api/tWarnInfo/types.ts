/**
 * 查询对象类型
 */
export interface Query extends PageQuery {
  warnState: string;
  warnName?: string;
}
/**
 * 列表展示
 */
export interface List {
  id: string;
  warnName: string;
  warnOrgName: string;
  warnPoliceName: string;
  warnAddredd: string;
  warnTime: string;
  warnState: string; // 预警状态
  dealResult?: string; // 处理结果
}
/**
 * 表单类型
 */
export interface Form extends List {
  remark: string;
  warnOrgId?: string;
}
/**
 * 预警处理
 */
export interface WarnDeal {
  id: string;
  remark: string;
  isOrder: string;
  dealResult: string; // 处理结果
}
/**
 * 关键字
 */
export interface Key {
  id: string;
}
export interface ReportFrom {
  connId: string;
  dutyOrgId: string;
  dutyOrgName: string;
  queTime: string;
  queDesc: string;
  dutyPeopleName: string;
}
