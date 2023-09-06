import type { AxiosPromise } from "axios";
import qs from "qs";
import { http } from "@/utils/http";
import type { Query, Form, Key } from "./types";
const prefix = "/ScoreManage/";

// 新增记分管理
export function addScoreManage(data: Form): AxiosPromise {
  return http.request({
    url: prefix + "addScoreManage",
    method: "post",
    data
  });
}
// 编辑
export function editScoreManage(data: Form) {
  return http.request({
    url: "/ScoreManage/scoreManageEdit",
    method: "post",
    data
  });
}

// 删除记分管理
export function removeScoreManage(data: Key) {
  return http.request({
    url: "/ScoreManage/removeScoreManage",
    method: "delete",
    data
  });
}

// 分页查询记分管理
export function getScoreManagePage(data: Query): AxiosPromise {
  return http.request({
    url: "/ScoreManage/getScoreManagePage",
    method: "post",
    data: qs.stringify(data)
  });
}

// 记分管理详情
export function getScoreManageDetail(data: Key): AxiosPromise {
  return http.request({
    url: "/ScoreManage/getScoreManageDetail",
    method: "post",
    data: qs.stringify(data)
  });
}

// 记分条款
export function getTreeList(data: Form) {
  return http.request({
    url: "/tBusQuestionType/treeList",
    method: "post",
    data: qs.stringify(data)
  });
}
