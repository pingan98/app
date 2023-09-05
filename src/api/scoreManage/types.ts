/**
 * 查询对象类型
 */
export interface Query extends PageQuery {
  scoreType?: string;
  dutyOrgId?: number;
  startTime?: number;
  endTime?: number;
}
/**
 * 表单类型
 */
export interface Form {
  scoreType?: string;
  dutyOrgId?: number;
  startTime?: number;
  endTime?: number;
}
/**
 * 列表展示
 */
export interface List {
  dutyPoliceName: string;
  dutyOrgName: string;
  scoreBasic: string;
  inputOrgName: string; // 记分部门
  scoreTime: string; // 记分时间
}
