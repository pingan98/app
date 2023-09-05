import type { AxiosPromise } from "axios";
import { http } from "@/utils/http";
import type { UserInfo } from "./types";
/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getCurrentAccount(): AxiosPromise<UserInfo> {
  return http.request({
    url: "/user/getCurrentAccount",
    method: "get"
  });
}
