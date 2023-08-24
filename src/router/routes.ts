import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/score",
    name: "Score",
    component: () => import("@/views/score/index.vue"),
    meta: { title: "记分管理" }
  },
  {
    path: "/score/add",
    name: "ScoreAdd",
    component: () => import("@/views/score/scoreAdd.vue"),
    meta: { title: "记分录入" }
  },
  {
    path: "/score/detail/:id",
    name: "ScoreDetail",
    component: () => import("@/views/score/scoreDetail.vue"),
    meta: { title: "记分详情" }
  },
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: "home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        meta: { title: "首页" }
      },
      {
        path: "/portrayal",
        name: "Portrayal",
        component: () => import("@/views/portrayal/index.vue"),
        meta: { title: "画像" }
      },
      {
        path: "/mine",
        name: "Mine",
        component: () => import("@/views/mine/index.vue"),
        meta: { title: "我的", noCache: true }
      }
    ]
  }
];

export default routes;
