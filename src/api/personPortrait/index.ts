/*
 * @Description:
 * @Author: 辰月
 * @Date: 2023-09-08 22:58:13
 * @LastEditTime: 2023-09-09 09:14:23
 * @LastEditors: 辰月
 */
import type { AxiosPromise } from "axios";
// import qs from "qs";
import { http } from "@/utils/http";

// 个人画像列表
export function getGRHX(params: any): AxiosPromise {
  return http.request({
    url: "/secondaryScreen/getGRHX",
    method: "get",
    params
  });
}

// 单位画像列表
export function getDWHX(params: any): AxiosPromise {
  return http.request({
    url: "/secondaryScreen/getDWHX",
    method: "get",
    params
  });
}

// 个人画像 & 单位画像
export function getZJ(params: any): AxiosPromise {
  return http.request({
    url: "/secondaryScreen/getZJ",
    method: "get",
    params
  });
}
