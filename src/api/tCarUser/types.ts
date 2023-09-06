import { POLICE_TYPE } from "@/const";

/**
 * 获取警员数据
 */
export interface Police {
  // @ts-ignore
  type: POLICE_TYPE.min | POLICE_TYPE.fu | "-1";
  orgId: string;
}
