/**
 * 查询对象类型
 */
export interface Query extends PageQuery {
  scoreType?: string;
  dutyOrgId?: string | string[];
  times?: string[];
  dutyPoliceName?: string;
}

/**
 *
 */
export interface PoliceMan {
  dutyOrgId: "";
  dutyOrgName: "";
  dutyPoliceName: "";
  dutyPoliceNo: "";
  idcard: "";
  scoreNum: "";
  questionName: "";
  questionTypeId: "";
  scoreType?: string;
}
/**
 * 表单类型
 */
export interface Form {
  dutyOrgName: string; // 所在部门
  dutyOrgId: string;
  dutyPoliceName?: string;
  scoreBasic?: string;
  scoreDesc?: string;
  inputOrgId: string; // 记分部门
  inputOrgName: string; // 记分部门
  queTime: string | Date;
  scoreTime: string | Date; // 记分时间
  police?: PoliceMan[];
  auxPolice?: PoliceMan[];
}
/**
 * 列表展示
 */
export interface List {
  id: string;
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
