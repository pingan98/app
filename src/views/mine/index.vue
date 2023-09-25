<script setup lang="ts" name="Myself">
import { useRoute, RouterLink, RouterView } from "vue-router";
import { MINE_NAV, MINE_NAV_TXT } from "@/const";
import { toList } from "@/utils";
import { useUserStore } from "@/store/modules/user";

const route = useRoute();
const userStore = useUserStore();
const species = MINE_NAV;
const speciesList = toList(MINE_NAV, MINE_NAV_TXT);
const getRouterName = (code: any) => {
  const compNames = {
    [species.audit]: "AuditRecord",
    [species.upload]: "UploadRecord",
    [species.history]: "BrowseHistory"
  };
  return compNames[code];
};
</script>

<template>
  <div class="mine-page detail-bg">
    <nav-bar :title="route.meta.title" />

    <div class="avatar-box flex items-center">
      <div class="w-[64px] h-[54px] pr-[10px] rounded-full">
        <img src="@/assets/avatar_bg@3x.png" alt="" />
      </div>
      <div class="name-box">
        <div class="name">{{ userStore?.userInfo?.name }}</div>
        <div class="dep flex">
          <div>
            <svg-icon name="tree" class="inline-block mr-[4px]" />{{
              userStore?.userInfo?.orgName
            }}
          </div>
        </div>
      </div>
    </div>

    <div class="nav-box">
      <router-link
        v-for="(item, ind) in speciesList"
        class="nav-item"
        :key="ind"
        :to="{ name: getRouterName(item.code) }"
        exact
      >
        <div class="top-bg" :class="[`bg${ind + 1}`]"></div>
        <div>{{ item.label }}</div>
      </router-link>
    </div>

    <RouterView />
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.mine-page {
  position: relative;
  padding: 56px 10px 10px;
  .avatar-box {
    position: relative;
    width: 100%;
    padding: 16px 20px;
    background: #fff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
    margin-bottom: 10px;
    .name-box {
      .name {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 5px;
      }
      .dep {
        color: var(--text-color2);
      }
    }
  }

  .nav-box {
    position: relative;
    .flex(space-between, center);
    padding: 10px 16px;
    width: 100%;
    background: #fff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
    margin-bottom: 10px;
    .nav-item {
      .flex(center, center);
      flex-direction: column;
      padding: 8px 10px;
      .top-bg {
        width: 42px;
        height: 42px;
        margin-bottom: 4px;
        &.bg1 {
          background: url("@/assets/audit@3x.png") no-repeat center / 100%;
        }
        &.bg2 {
          background: url("@/assets/share@3x.png") no-repeat center / 100%;
        }
        &.bg3 {
          background: url("@/assets/footer@3x.png") no-repeat center / 100%;
        }
      }
      &.router-link-exact-active {
        border-radius: 10px;
        background: #e0f3ff;
        color: #1472f9;
        font-weight: bold;
      }
    }
  }
}
</style>
