/**
 * 登录用户信息
 */
export interface UserInfo {
  id: number | string;
  name: string;
  policeNo: string;
  orgName: string;
  orgId: string;
  powerOrgId?: string;
  roles?: string[];
  roleId?: string;
  menuList?: any[];
}
