/*
 * @Description:
 * @Author: 辰月
 * @Date: 2023-09-09 09:56:03
 * @LastEditTime: 2023-11-03 12:46:09
 * @LastEditors: 辰月
 */
declare global {
  interface INativeObj {
    getZjhm: () => string;
    getUserInfo: () => string;
    getUserId: () => string;
    getAddress: () => string;
    getUserCredential: () => string;
  }

  interface Window {
    nativeObj: INativeObj;
  }

  /**
   * 分页查询参数
   */
  interface PageQuery {
    page: number;
    size: number;
  }

  /**
   * 分页响应对象
   */
  interface PageResult<T> {
    /**
     * 数据列表
     */
    list: T;
    /**
     * 数据总数
     */
    total: number;
  }

  /**
   * 弹窗属性
   */
  interface DialogOption {
    /**
     * 弹窗标题
     */
    title?: string;
    /**
     * 是否显示
     */
    visible: boolean;
  }
}
export {};
