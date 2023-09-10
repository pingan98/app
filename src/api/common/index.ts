import type { AxiosPromise } from "axios";
import { http } from "@/utils/http";
import { ContentTypeEnum } from "@/enums/requestEnum";
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
