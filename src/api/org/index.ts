import type { AxiosPromise } from "axios";
import { http } from "@/utils/http";
const prefix = "/org/"; // 前缀

export function getOrgList(): AxiosPromise {
  return http.request({
    url: prefix + "getOrgList",
    method: "post"
  });
}
