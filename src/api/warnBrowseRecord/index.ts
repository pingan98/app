import type { AxiosPromise } from "axios";
import { http } from "@/utils/http";
import type { Query } from "@/api/warnBrowseRecord/types";

const prefix = "/moveWarnBrowseRecord/"; // 前缀

export function getWarnBrowseRecordPage(data: Query): AxiosPromise {
  return http.request({
    url: prefix + "getWarnBrowseRecordPage",
    method: "post",
    data
  });
}
