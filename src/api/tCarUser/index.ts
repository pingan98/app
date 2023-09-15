import type { AxiosPromise } from "axios";
import qs from "qs";
import { http } from "@/utils/http";
import type { Police } from "@/api/tCarUser/types";
const prefix = "/moveTCarUser/";

// 获取警员数据
export function getPoliceByOrgId(data: Police): AxiosPromise {
  return http.request({
    url: prefix + "userListByDept",
    method: "post",
    data: qs.stringify(data)
  });
}
