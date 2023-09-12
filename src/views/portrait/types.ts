/*
 * @Description:
 * @Author: 辰月
 * @Date: 2023-09-08 11:20:00
 * @LastEditTime: 2023-09-12 14:30:47
 * @LastEditors: 辰月
 */
export interface ISearchForm {
  dutyPoliceName: string;
}

export interface IPersonPortraitParam {
  db33?: string;
  db33Txt?: string;
  startTime: string;
  endTime: string;
  policeHandlingCase: string;
}

export interface IPersonPortraitUnit {
  alertNum?: string;
  caseNum?: string;
  orgId?: string;
  orgName?: string;
}
