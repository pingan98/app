import type { ConstListType } from "@/types";
import dayjs from "dayjs";
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
export function toMap(data: any[], idName?: string) {
  const id = idName || "id";
  const map = {} as any;
  data.forEach(function (item) {
    map[item[id]] = item;
  });
  return { ...map };
}
// 生成唯一标识符：
export function generateGuid(format = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now();
  }
  const uuid = format.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
// 格式化时间
export const formatTime = (date: any, format = "YYYY-MM-DD hh:mm:ss") => {
  if (date) {
    return dayjs(date).format(format);
  } else {
    return "";
  }
};
