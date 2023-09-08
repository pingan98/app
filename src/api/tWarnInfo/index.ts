import type { AxiosPromise } from "axios";
import qs from "qs";
import { http } from "@/utils/http";
import type { Form, Key, Query, WarnDeal } from "@/api/tWarnInfo/types";

const prefix = "/TWarnInfo/";

// 分页
export function getTWarnInfoPage(data: Query): AxiosPromise {
  return http.request({
    url: prefix + "getTWarnInfoPage",
    method: "post",
    data: qs.stringify(data)
  });
}
// 详情
export function getWarnInfoDetail(data: Key): AxiosPromise {
  return http.request({
    url: prefix + "warnInfoDetail",
    method: "post",
    data: qs.stringify(data)
  });
}
// 预警处理
export function postWarnDeal(data: WarnDeal): AxiosPromise {
  return http.request({
    url: prefix + "warnDeal",
    method: "post",
    data: qs.stringify(data)
  });
}
