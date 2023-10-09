import type { AxiosPromise } from "axios";
import type { LoginData, LoginResult } from "./types";
import { http } from "@/utils/http";
import qs from "qs";

const env = import.meta.env.VITE_APP_ENV;

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  return http.request({
    // 后端不改接口 登录接口需要区分环境
    url: env === "prod" ? "/moveLogin" : "/login",
    method: "post",
    data: qs.stringify(data)
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
