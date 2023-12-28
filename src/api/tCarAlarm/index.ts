import type { AxiosPromise } from "axios";
import qs from "qs";
import { http } from "@/utils/http";
import type { Query } from "@/api/tCarAlarm/types";

const prefix = "/moveTCarAlarm/";

// 获取警员数据
export function getTCarAlarmPage(data: Query): AxiosPromise {
  return http.request({
    url: prefix + "getTCarAlarmPage",
    method: "post",
    data: qs.stringify(data)
  });
}
// 图片转为流
export function imageToStream(data: any): AxiosPromise {
  return http.request({
    url: prefix + "imageToStream",
    method: "post",
    data: data,
    responseType: "blob"
  });
}
