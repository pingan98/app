import type { AxiosPromise } from "axios";
import type { LoginData, LoginResult } from "./types";
import { ContentTypeEnum } from "@/enums/requestEnum";
import { http } from "@/utils/http";
/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);

  return http.request({
    url: "/moveLogin",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": ContentTypeEnum.FORM_DATA
    }
  });
}

/**
 * 注销API
 */
export function logoutApi() {
  return http.request({
    url: "/logout",
    method: "get"
  });
}
