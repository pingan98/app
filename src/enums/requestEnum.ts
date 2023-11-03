/*
 * @Description:
 * @Author: 辰月
 * @Date: 2023-09-09 09:56:03
 * @LastEditTime: 2023-11-02 17:02:45
 * @LastEditors: 辰月
 */
/**
 * @description: ContentType
 */
export enum ContentTypeEnum {
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data upload
  FORM_DATA = "multipart/form-data;charset=UTF-8",
  // json
  JSON = "application/json;charset=UTF-8"
}

/**
 * @description: 与后端协定的状态 code
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1
}
