/**
 * 获取本地图
 * @param name // 文件名 如 doc.png
 * @returns {*|string}
 */
export const getAssetsFile = (url: string) => {
  return new URL(`/src/assets/tabbar/${url}`, import.meta.url).href;
};
