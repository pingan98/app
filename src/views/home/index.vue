<script setup lang="ts" name="Home">
import { ref, watch } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store/modules/app";
import type { PickerOption } from "vant";
import MaterialItem from "@/views/caution/components/materialItem.vue";
import type { Query, List } from "@/api/warnMaterial/types";
import { getWarnMaterialPage } from "@/api/warnMaterial";
import { CAUTION_STATUS } from "@/const/warnMaterial";
import empty from "@/assets/empty@3x.png";
import { getAudiovisual } from "@/api/common";
import type { LoginData } from "@/api/auth/types";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
const env = import.meta.env.VITE_APP_ENV;
const userStore = useUserStore();
const appStore = useAppStore();
const testRole = [
  { name: "陈俊文", policeNo: "cjw", userSource: "0", password: "M@123456" },
  { name: "派出所", policeNo: "pcs", userSource: "0", password: "M@123456" },
  { name: "jsdc ", policeNo: "jsdc ", userSource: "0", password: "M@123456" },
  {
    name: "汪赛赛 ",
    policeNo: "5047",
    userSource: "1",
    password: "M@App123456"
  }
];
const showPicker = ref(false);
const bannerUrl = ref("");
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const listData = ref<List[]>([]);
const materialForm = ref<Query>({
  page: 1,
  size: 20,
  warnState: CAUTION_STATUS.listing
});

const homeNav = ref<
  {
    title: string;
    to: string;
  }[]
>([]);
// 测试
const onConfirm = async ({
  selectedOptions
}: {
  selectedOptions: PickerOption;
}): Promise<void> => {
  showPicker.value = false;
  const loginData = {
    username: selectedOptions[0].policeNo,
    password: selectedOptions[0].password
  };
  // 登录
  userStore.login(loginData).then(() => {
    getUserInfo();
    refreshList();
  });

  showPicker.value = false;
};
function getUserInfo() {
  userStore.setUserInfo().then(res => {
    console.log("getUserInfo res :>> ", res);
  });
}
function getBanner() {
  const url = useCachedViewStoreHook().bannerUrl || "";
  if (url) {
    bannerUrl.value = url;
  } else {
    getAudiovisual(
      env === "prod"
        ? "/cautionAdd/警示教育/e9ce17a8-a03d-4f8e-b5d3-c5e0442dd178/2023-12-01/banner-2935889c.jpg"
        : "/cautionAdd/警示教育/6f06e55d-79d5-4768-8d47-15a9ade4550e/2023-12-01/banner.jpg"
    ).then(res => {
      bannerUrl.value = res as string;
      useCachedViewStoreHook().addBannerUrl(bannerUrl.value);
    });
  }
}
function onLogin() {
  const serve: LoginData = {
    username: ""
  };
  if (env === "prod") {
    // 正式
    serve.username = appStore.zjhm; // 测试 330421196508134111
  } else {
    // 测试
    serve.username = userStore?.userInfo?.policeNo || "cjw";
    serve.password = testRole.filter(
      v => v.policeNo === serve.username
    )[0].password;
  }
  userStore.login(serve).then(() => {
    getUserInfo();
    getCautionList();
  });
}
function refreshList() {
  listData.value = [];
  materialForm.value.page = 1;
  getCautionList();
}
onLogin();
getBanner();
const getCautionList = async () => {
  try {
    const res = await getWarnMaterialPage(materialForm.value);

    listData.value.push(...res!.rows);

    if (listData.value.length === res.total) {
      finished.value = true; // 数据全部加载完成
    } else {
      materialForm.value.page++;
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    finished.value = true;
  }
};
watch(
  () => userStore.menuList,
  menuList => {
    homeNav.value = [];
    if (userStore.getSomeMenu("scoreManageMenu")) {
      homeNav.value.push({ title: "记分管理", to: "Score" });
    }
    // 不用加显隐判断 对所有民警可见
    homeNav.value.push({ title: "警示教育", to: "Caution" });
    if (userStore.getSomeMenu("warnManage")) {
      homeNav.value.push({ title: "预警管理", to: "Warning" });
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="home-page">
    <template v-if="env === 'dev'">
      <div class="user-sty" @click="showPicker = true">
        {{ userStore?.userInfo?.name }}
      </div>
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
          :columns="testRole"
          :columns-field-names="{ text: 'name', value: 'policeNo' }"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </template>

    <div class="home-page-head">
      <div class="home-banner w-screen">
        <img :src="bannerUrl" alt="" style="max-width: 100%; height: auto" />
      </div>
      <!-- nav -->
      <van-grid
        clickable
        :column-num="homeNav.length"
        class="home-nav"
        :border="false"
      >
        <van-grid-item
          :to="{ name: item.to }"
          v-for="(item, ind) in homeNav"
          :key="ind"
        >
          <div :class="['img-box', `bg_${item.to}`]"></div>
          <div class="name">{{ item.title }}</div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 警示教育 -->
    <div class="warning-material">
      <div class="head">
        <h3 class="name">
          <img
            src="@/assets/material_icon@3x.png"
            alt=""
            class="w-[34px] h-[34px] pr-[7px]"
          />警示教育
        </h3>
        <router-link to="/caution" class="more"
          >更多 <van-icon name="arrow"
        /></router-link>
      </div>

      <!-- 列表 -->
      <div class="material-list">
        <van-empty
          description=""
          v-if="!listData.length"
          :image="empty"
          image-size="100%"
        >
        </van-empty>
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="getCautionList"
        >
          <material-item
            @click="$router.push(`/caution/detail/${item.id}?from=home`)"
            v-for="(item, ind) in listData"
            :key="ind"
            :item="item"
          ></material-item>
        </van-list>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.user-sty {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  padding: 20px;
  background-color: red;
  z-index: 100;
}

.home-page {
  min-height: calc(100vh - 50px);
}
.home-nav {
  .van-grid-item {
    //touch-action: none;
  }
  .img-box {
    width: 60px;
    height: 60px;
    &.bg_Score {
      background: url("@/assets/score@3x.png") no-repeat center / 100%;
    }
    &.bg_Caution {
      background: url("@/assets/education@3x.png") no-repeat center / 100%;
    }
    &.bg_Warning {
      background: url("@/assets/warning@3x.png") no-repeat center / 100%;
    }
  }
  .name {
    font-size: 16px;
    color: var(--text-color1);
    font-weight: bold;
  }
}
.warning-material {
  margin-top: 10px;
  background: #fff;
  padding: 12px 0;
  .head {
    .flex(space-between, center);
    padding: 0 16px;
    .name {
      .flex(center, center);
      color: var(--text-color3);
      font-weight: bold;
    }
    .more {
      font-size: 12px;
      color: var(--text-color2);
    }
  }
}
.material-list {
  background: #ffffff;
  padding: 0 16px;
}
</style>
