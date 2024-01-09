<script setup lang="ts" name="Myself">
import { ref, onMounted, watch } from "vue";
import { useRoute, RouterLink, RouterView, useRouter } from "vue-router";
import { MINE_NAV, MINE_NAV_TXT } from "@/const";
import { useUserStore } from "@/store/modules/user";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const species = MINE_NAV;
const navList = ref([]);

watch(
  () => userStore.menuList,
  menuList => {
    navList.value = [];
    // 部门审核
    if (userStore.getSomeMenu("deptAuditMenu")) {
      navList.value.push({
        code: MINE_NAV.audit,
        label: MINE_NAV_TXT[MINE_NAV.audit]
      });
    }
    // 我的上传
    if (userStore.getSomeMenu("mineUploadMenu")) {
      navList.value.push({
        code: MINE_NAV.upload,
        label: MINE_NAV_TXT[MINE_NAV.upload]
      });
    }
    const defaultNav = [
      { code: MINE_NAV.history, label: MINE_NAV_TXT[MINE_NAV.history] },
      { code: MINE_NAV.about, label: MINE_NAV_TXT[MINE_NAV.about] }
    ];
    navList.value = [...navList.value, ...defaultNav];
  },
  { immediate: true, deep: true }
);
onMounted(() => {
  // 默认跳到第一个
  const firstMenu = navList.value[0];
  router.push({
    name: getRouterName(firstMenu.code)
  });
});

const getRouterName = (code: any) => {
  const compNames = {
    [species.audit]: "AuditRecord",
    [species.upload]: "UploadRecord",
    [species.history]: "BrowseHistory",
    [species.about]: "AboutIndex"
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
            <svg-icon name="tree" class="inline-block mr-[4px]" />
            {{ userStore?.userInfo?.orgName }}
          </div>
        </div>
      </div>
    </div>

    <div class="nav-box">
      <router-link
        v-for="(item, ind) in navList"
        class="nav-item"
        :key="ind"
        :to="{ name: getRouterName(item.code) }"
        exact
      >
        <div :class="['top-bg', `bg${ind + 1}`]"></div>
        <div class="label-name">{{ item.label }}</div>
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
    .flex(space-evenly, center);
    padding: 10px;
    width: 100%;
    background: #fff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
    margin-bottom: 10px;

    .nav-item {
      flex: 1;
      .flex(center, center);
      flex-direction: column;
      padding: 6px 8px;

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

        &.bg4 {
          background: url("@/assets/about@3x.png") no-repeat center / 100%;
        }
      }

      &.router-link-exact-active {
        border-radius: 10px;
        background: #e0f3ff;
        color: #1472f9;
        //font-weight: bold;
      }

      .label-name {
        font-size: 14px;
      }
    }
  }
}
</style>
