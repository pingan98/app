/**
 * 登录用户信息
 */
export interface UserInfo {
  userId: number | string;
  nickname: string;
  avatar: string;
  roles: string[];
  menus: string[] | number[];
}
