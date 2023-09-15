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
  dutyOrgId: string;
  dutyOrgName: string;
  dutyPoliceName: string;
  dutyPoliceNo: string;
  idcard: string;
  scoreNum: string;
  questionName: string;
  questionTypeId: string;
  scoreType?: string;
}
/**
 * 表单类型
 */
export interface Form {
  id?: string;
  dutyOrgName: string; // 所在部门
  dutyOrgId: string;
  dutyPoliceName?: string;
  dutyPoliceNo?: string;
  scoreBasic?: string;
  scoreDesc?: string;
  inputOrgId: string; // 记分部门
  inputOrgName: string; // 记分部门
  queTime: string | Date;
  scoreTime: string | Date; // 记分时间
  police?: any[];
  auxPolice?: any[];
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
