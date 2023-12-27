import type { AxiosPromise } from "axios";
import qs from "qs";
import { http } from "@/utils/http";
import type { Query, Key, Form } from "@/api/warnMaterial/types";
import { ContentTypeEnum } from "@/enums/requestEnum";

const prefix = "/moveWarnMaterial/";

// 分页
export function getWarnMaterialPage(data: Query): AxiosPromise {
  return http.request({
    url: prefix + "getWarnMaterialPage",
    method: "post",
    data: qs.stringify(data)
  });
}
// 新增
export function addWarnMaterial(data: Form): AxiosPromise {
  return http.request({
    url: prefix + "addWarnMaterial",
    method: "post",
    headers: {
      "Content-Type": ContentTypeEnum.JSON
    },
    data
  });
}
// 修改
export function updateWarnMaterial(data: Form): AxiosPromise {
  return http.request({
    url: prefix + "updateWarnMaterial",
    method: "post",
    headers: {
      "Content-Type": ContentTypeEnum.JSON
    },
    data
  });
}
// 删除
export function removeWarnMaterial(data: string[]): AxiosPromise {
  return http.request({
    url: prefix + "removeWarnMaterial",
    method: "post",
    headers: {
      "Content-Type": ContentTypeEnum.JSON
    },
    data
  });
}
// 详情
export function warnMaterialDetail(data: Key): AxiosPromise {
  return http.request({
    url: prefix + "warnMaterialDetail",
    method: "post",
    data: qs.stringify(data)
  });
}
// 警示材料批量上下架
export function batchUpdateWarnMaterial(
  data: string[],
  warnState: string
): AxiosPromise {
  return http.request({
    url: prefix + "batchUpdateWarnMaterial",
    method: "post",
    headers: {
      "Content-Type": ContentTypeEnum.JSON
    },
    data,
    params: {
      warnState: warnState
    }
  });
}
