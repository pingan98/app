import {
  createRouter,
  createWebHashHistory,
  type RouteLocationNormalized
} from "vue-router";
import routes from "./routes";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import NProgress from "@/utils/progress";
import setPageTitle from "@/utils/set-page-title";

NProgress.configure({
  showSpinner: false
});

// 如何得到路由实例 createRouter()
// 如何设置路由模式 history
// history 模式 createWebHistory()
// hash 模式 createWebHashHistory()
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    noCache?: boolean;
  };
}

router.beforeEach((to: toRouteType, from, next) => {
  if (from.path === "/" && to.path === "/home") {
    // 第一次打开的时候 先跳转到备案页 再自动跳转到首页
    return next({ path: "/about" });
  }
  NProgress.start();
  // 路由缓存
  useCachedViewStoreHook().addCachedView(to);
  // 页面 title
  setPageTitle(to.meta.title);
  next();
});

router.afterEach(() => {
  NProgress.done();
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/home" });
}

export default router;
