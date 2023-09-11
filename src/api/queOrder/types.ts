/**
 * 查询对象类型
 */
export interface Query extends PageQuery {
  state: string;
  warnName?: string;
  dutyPeopleName?: string;
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
 * 关键字
 */
export interface Key {
  id: string;
}
