/*
 * @Description:
 * @Author: 辰月
 * @Date: 2023-09-20 10:28:28
 * @LastEditTime: 2023-11-03 14:06:21
 * @LastEditors: 辰月
 */
/**
 * 查询对象类型
 */

import type { E_BASIC_TYPE, E_POLICE_TYPE } from "@/enums";
export interface Query extends PageQuery {
  scoreType?: string;
  dutyOrgId?: string | string[];
  times?: string[];
  dutyPoliceName?: string;
}

/**
 * 民警|辅警 类型 只列出了会用的类型
 */
export interface IPolice {
  idcard?: string;
  jycode?: string;
  jyname: string;
  policeType: E_POLICE_TYPE;
  zid?: string;
}

/**
 * 表单类型
 */
export interface Form {
  id?: string;
  dutyOrgName?: string; // 所在部门
  dutyOrgId?: string;
  dutyPoliceName?: string;
  dutyPoliceNo?: string;
  scoreBasic?: string;
  scoreBasicId?: string;
  scoreNum?: string;
  inputOrgId?: string; // 记分部门ID
  inputOrgName?: string; // 记分部门
  queTime?: string;
  scoreTime?: string; // 记分时间
  scoreType?: E_POLICE_TYPE; // 扣分人是民警还是辅警
  basicType?: E_BASIC_TYPE; // 是否是其他还是记分条款
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

/**
 * 记分条款 只列出了会用的字段
 */
export interface IScore {
  id: string | number;
  ids: Array<string | number>; // 自定义的
  labels: Array<string>;
  ids_txt: string;
  labels_txt: string; // 自定义的  这四个是前端自定义的，后端没有
  name: string;
  score: string;
  child: Array<IScore>;
}
