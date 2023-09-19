import { defineStore } from "pinia";
import { ref } from "vue";

// 在vue3 组合式api中尝试使用name+params去路由跳转并传递参数的时候，出现警告信息，并且接收不到params的参数
// 警告信息为：[Vue Router warn]: Discarded invalid param(s) "warnState" when navigating.
export const useRouteParamsStore = defineStore("route-params", () => {
  const routeParams = ref<any>({});

  const setParams = (u: any) => {
    routeParams.value = u;
  };
  const getParams = () => {
    return routeParams.value;
  };
  const resetParams = () => {
    routeParams.value = {};
  };

  return {
    routeParams,
    setParams,
    getParams,
    resetParams
  };
});
