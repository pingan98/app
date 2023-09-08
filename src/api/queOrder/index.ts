import type { AxiosPromise } from "axios";
import qs from "qs";
import { http } from "@/utils/http";
import type { Key, Query } from "@/api/queOrder/types";

const prefix = "/QueOrder/";

// 问题交办表分页查询
export function getQueOrderPage(data: Query): AxiosPromise {
  return http.request({
    url: prefix + "getQueOrderPage",
    method: "post",
    data: qs.stringify(data)
  });
}
