import type { ConstListType } from "@/types";

/**
 * 获取本地图
 * @param name // 文件名 如 doc.png
 * @returns {*|string}
 */
export const getAssetsFile = (url: string) => {
  return new URL(`/src/assets/tabbar/${url}`, import.meta.url).href;
};

/**
 * 将status转换成数组
 * @param status // 对象
 *
 */
type Params = {
  [key: string]: string | number;
};

// 将status转换成数组 格式：[{code: 'current', label: '本月'}]
export function toList(status: Params, txts: Params) {
  return <ConstListType>Object.keys(status).map(v => {
    const code = status[v];
    return {
      code,
      label: txts[code]
    };
  });
}
