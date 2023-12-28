import type { AxiosPromise } from "axios";
import { http } from "@/utils/http";
import { ContentTypeEnum } from "@/enums/requestEnum";
import { useAppStore } from "@/store/modules/app";
const prefix = "/view/minio/"; // 前缀
export function uploadFile(data: any) {
  return http.request({
    url: prefix + "upload",
    method: "post",
    data,
    headers: {
      "Content-Type": ContentTypeEnum.FORM_DATA
    }
  });
}

/**
 * @description: 获取文件
 * @Author: 辰月
 * @Date: 2022-10-27 18:29:27
 * @LastEditTime: 2022-10-27 18:29:27
 * @LastEditors: 辰月
 * @param {string} orderId，交办id
 * @param {string} busType， 业务类型
 */
export function getFiles(params: any): AxiosPromise {
  return http.request({
    url: prefix + "gainAttachs",
    method: "get",
    params
  });
}

/**
 * @description: 删除文件
 * @Author: 辰月
 * @Date: 2022-10-27 18:29:27
 * @LastEditTime: 2022-10-27 18:29:27
 * @LastEditors: 辰月
 * @param {string} attachId，文件id
 */
export function delFile(data: any) {
  return http.request({
    url: prefix + "delete",
    method: "post",
    data
  });
}

/**
 * @description: 经过总线去获取音视频
 * @Author: 辰月
 * @Date: 2023-12-08 15:52:34
 * @LastEditTime: Do not edit
 * @LastEditors: 辰月
 * @param {any} data
 */
export function getAudiovisual(data: any) {
  const url = data.split("/警示教育/").pop();
  const env = import.meta.env;
  const str = env.VITE_APP_ENV === "prod" ? "/yunling" : "/teambuild";

  return http.request({
    url: str + "/cautionAdd/警示教育/" + url,
    matchUrl: "/cautionAdd/警示教育/",
    method: "get",
    responseType: "blob"
  });
}
// 预警图片
export function getWarnServeUrl(data: any) {
  const url = data.split("/pic?").pop();

  return http.request({
    url: "/pic?" + url,
    matchUrl: "/pic",
    method: "get",
    responseType: "blob"
  });
}
