import type { AxiosPromise } from "axios";
import qs from "qs";
import { http } from "@/utils/http";
import type { Query } from "@/api/queOrder/types";
import type { ReportFrom } from "@/api/tWarnInfo/types";

const prefix = "/QueOrder/";

// 问题交办表分页查询
export function getQueOrderPage(data: Query): AxiosPromise {
  return http.request({
    url: prefix + "getQueOrderPage",
    method: "post",
    data: qs.stringify(data)
  });
}
// 新增问题交办表
export function addQueOrder(data: ReportFrom): AxiosPromise {
  return http.request({
    url: prefix + "addQueOrder",
    method: "post",
    data: qs.stringify(data)
  });
}
// 交办详情
export function orderDetail(data: any): AxiosPromise {
  return http.request({
    url: prefix + "orderDetail",
    method: "post",
    data: qs.stringify(data)
  });
}
