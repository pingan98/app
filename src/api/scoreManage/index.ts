import type { AxiosPromise } from "axios";
import qs from "qs";
import { http } from "@/utils/http";
import type { Query, Form, Key } from "./types";
import { ContentTypeEnum } from "@/enums/requestEnum";
const prefix = "/moveScoreManage/";

// 新增记分管理
export function addScoreManage(data: Form): AxiosPromise {
  return http.request({
    url: prefix + "addScoreManage",
    method: "post",
    headers: {
      "Content-Type": ContentTypeEnum.JSON
    },
    data
  });
}
// 编辑
export function editScoreManage(data: Form): AxiosPromise {
  return http.request({
    url: prefix + "scoreManageEdit",
    method: "post",
    headers: {
      "Content-Type": ContentTypeEnum.JSON
    },
    data
  });
}

// 删除记分管理
export function removeScoreManage(data: Key): AxiosPromise {
  return http.request({
    url: prefix + "removeScoreManage",
    method: "delete",
    headers: {
      "Content-Type": ContentTypeEnum.JSON
    },
    data
  });
}

// 分页查询记分管理
export function getScoreManagePage(data: any): AxiosPromise {
  return http.request({
    url: prefix + "getScoreManagePage",
    method: "post",
    data: qs.stringify(data)
  });
}

// 记分管理详情
export function getScoreManageDetail(data: Key): AxiosPromise<Form> {
  return http.request({
    url: prefix + "getScoreManageDetail",
    method: "post",
    data: qs.stringify(data)
  });
}

// 记分条款
export function getTreeList(): AxiosPromise {
  return http.request({
    url: "/tBusQuestionType/treeList",
    method: "post"
  });
}
// 记分条款
export function getUserConcernTreeList(): AxiosPromise {
  return http.request({
    url: "/questionType/treeList",
    method: "post"
  });
}
