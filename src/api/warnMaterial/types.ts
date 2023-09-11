import { batchUpdateWarnMaterial } from "@/api/warnMaterial/index";

/**
 * 查询对象类型
 */
export interface Query extends PageQuery {
  warnState?: string;
  warnTitle?: string;
  upperUser?: string;
  times?: string[];
  createUser?: string;
}
// 图片列表
export type Image = {
  /** 图片ID */
  id: string;
  /** 图片地址 */
  url: string;
};
/**
 * 列表展示
 */
export interface List {
  id: string;
  warnState: string; // 预警状态
  warnTitle: string;
  warnViewNumber: string; // 查看次数
  upperUser: string;
  upperTime?: string;
  createUser?: string;
}
// Partial<T> 把一个对象的属性转换成可选
// Required<T> 把一个对象的属性转换成必选
type PartialList = Partial<List>;
export interface Form extends PartialList {
  id?: string;
  warnContent: string;
  warnTime: string;
  // pictures
}
/**
 * 关键字
 */
export interface Key {
  id: string;
}
