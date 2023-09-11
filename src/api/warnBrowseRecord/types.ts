/**
 * 查询对象类型
 */
export interface Query extends PageQuery {
  policeNo?: string;
}
/**
 * 列表展示
 */
export interface List {
  id: string;
  warnState: string; // 预警状态
  warnTitle: string;
  warnViewNumber: string; // 查看次数
  upperUser: string;
  browseTime?: string;
  browseUser?: string;
}
