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
    path: "/score/add/:id?",
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
    path: "/caution",
    name: "Caution",
    component: () => import("@/views/caution/index.vue"),
    meta: { title: "警示教育" }
  },
  {
    path: "/caution/add/:id?",
    name: "CautionAdd",
    component: () => import("@/views/caution/cautionAdd.vue"),
    meta: { title: "新增警示材料" }
  },
  {
    path: "/caution/detail/:id",
    name: "CautionDetail",
    component: () => import("@/views/caution/cautionDetail.vue"),
    meta: { title: "警示教育" }
  },
  {
    path: "/warning",
    name: "Warning",
    component: () => import("@/views/warning/index.vue"),
    meta: { title: "预警管理" }
  },
  {
    path: "/warning/detail/:id",
    name: "WarnDetail",
    component: () => import("@/views/warning/warnDetail.vue"),
    meta: { title: "预警详情" }
  },
  {
    path: "/warning/relate/:id",
    name: "RelateWarn",
    component: () => import("@/views/warning/relateWarn.vue"),
    meta: { title: "相关预警信息" }
  },
  {
    path: "/warning/report/:id",
    name: "ReportWarn",
    component: () => import("@/views/warning/reportWarn.vue"),
    meta: { title: "上报" }
  },
  {
    path: "/portrait/unit",
    name: "UnitPortrait",
    component: () => import("@/views/portrait/unitPortrait.vue"),
    meta: { title: "单位画像" }
  },
  {
    path: "/portrait/person",
    name: "PersonPortrait",
    component: () => import("@/views/portrait/personPortrait.vue"),
    meta: { title: "个人画像" }
  },
  {
    path: "/audit/detail/:id",
    name: "AuditDetail",
    component: () => import("@/views/mine/auditDetail.vue"),
    meta: { title: "审核详情" }
  },
  {
    path: "/mock",
    name: "Mock",
    component: () => import("@/views/mock/index.vue"),
    meta: { title: "mock" }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/about/index.vue"),
    meta: { title: "关于" }
  },
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        meta: { title: "首页" }
      },
      {
        path: "/portrait",
        name: "Portrait",
        component: () => import("@/views/portrait/index.vue"),
        meta: { title: "画像" }
      },
      {
        path: "/mine",
        name: "Mine",
        component: () => import("@/views/mine/index.vue"),
        meta: { title: "我的", noCache: true },
        // redirect: "/mine/audit",
        children: [
          {
            path: "audit",
            name: "AuditRecord",
            component: () => import("@/views/mine/components/auditRecord.vue")
          },
          {
            path: "upload",
            name: "UploadRecord",
            component: () => import("@/views/mine/components/uploadRecord.vue")
          },
          {
            path: "history",
            name: "BrowseHistory",
            component: () => import("@/views/mine/components/browseHistory.vue")
          },
          {
            path: "about",
            name: "AboutIndex",
            component: () => import("@/views/mine/components/about.vue")
          }
        ]
      }
    ]
  }
];

export default routes;
