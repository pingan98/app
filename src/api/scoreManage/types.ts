/**
 * 查询对象类型
 */
export interface Query extends PageQuery {
  scoreType?: string;
  dutyOrgId?: string | string[];
  times?: string[];
}
/**
 * 表单类型
 */
export interface Form {
  scoreType?: string;
  dutyOrgId?: number;
  dutyPoliceName?: string;
  scoreBasic?: string;
  scoreDesc?: string;
  inputOrgId?: string; // 记分部门
  inputOrgName?: string; // 记分部门
  inputTime?: string;
  queTime?: string;
  dutyOrgName?: string; // 所在部门
  scoreTime?: string; // 记分时间
  detailsList?: string[];
}
/**
 * 列表展示
 */
export interface List {
  dutyPoliceName: string;
  scoreBasic: string;
  inputOrgName: string; // 记分部门
  dutyOrgName: string; // 所在部门
  scoreTime: string; // 记分时间
}

/**
 * 关键字
 */
export interface Key {
  id: string;
}
