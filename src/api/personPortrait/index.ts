/*
 * @Description:
 * @Author: 辰月
 * @Date: 2023-09-08 22:58:13
 * @LastEditTime: 2023-09-11 16:58:46
 * @LastEditors: 辰月
 */
import type { AxiosPromise } from "axios";
// import qs from "qs";
import { http } from "@/utils/http";

const prefix = "/moveSecondaryScreen/";
// 个人画像列表
export function getGRHX(params: any): AxiosPromise {
  return http.request({
    url: prefix + "getGRHX",
    method: "get",
    params
  });
}

// 单位画像列表
export function getDWHX(params: any): AxiosPromise {
  return http.request({
    url: prefix + "getDWHX",
    method: "get",
    params
  });
}

// 个人画像 & 单位画像
export function getZJ(params: any): AxiosPromise {
  return http.request({
    url: prefix + "getZJ",
    method: "get",
    params
  });
}

// 个人画像 记分
export function getPerScoreList(params: any): AxiosPromise {
  return http.request({
    url: prefix + "getPerScoreList",
    method: "get",
    params
  });
}

// 单位画像 违规违纪
export function getBreakRuleScore(params: any): AxiosPromise {
  return http.request({
    url: prefix + "getBreakRuleScore",
    method: "get",
    params
  });
}

// 单位画像 信访投诉
export function getXfTsNumRep(params: any): AxiosPromise {
  return http.request({
    url: prefix + "getXfTsNumRep",
    method: "get",
    params
  });
}

// 单位画像 信访投诉列表查询
export function getXfTsListRep(params: any) {
  return http.request({
    url: prefix + "getXfTsListRep",
    method: "get",
    params
  });
}

// 单位画像 饮酒报备
export function getYJBBDW(params: any) {
  return http.request({
    url: prefix + "getYJBBDW",
    method: "get",
    params
  });
}
