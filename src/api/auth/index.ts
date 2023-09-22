import type { AxiosPromise } from "axios";
import type { LoginData, LoginResult } from "./types";
import { http } from "@/utils/http";
import qs from "qs";
/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  return http.request({
    url: "/login",
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
