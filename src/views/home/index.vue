<script setup lang="ts" name="Home">
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "@/store/modules/user";
import { getFileTypeByExtension } from "@/utils";
import type { PickerOption } from "vant";
import MaterialItem from "@/views/caution/components/materialItem.vue";
import type { LoginData } from "@/api/auth/types";
import type { Query, List, IBattchJson } from "@/api/warnMaterial/types";
import { getWarnMaterialPage } from "@/api/warnMaterial";
import { CAUTION_STATUS } from "@/const/warnMaterial";

import empty from "@/assets/empty@3x.png";
import homeBanner1 from "@/assets/homeSwipe/ad1@3x.png";
import homeBanner2 from "@/assets/homeSwipe/ad2@3x.png";
import homeBanner3 from "@/assets/homeSwipe/ad3@3x.png";

const env = import.meta.env.VITE_APP_ENV;
const userStore = useUserStore();

const images = [homeBanner1, homeBanner2, homeBanner3];
const testRole = [
  { name: "陈俊文", policeNo: "cjw" },
  { name: "派出所", policeNo: "pcs" },
  { name: "jsdc ", policeNo: "jsdc " }
];
const showPicker = ref(false);
const loginData = ref<LoginData>({
  username: "",
  password: "M@123456"
});
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
  loginData.value.username = selectedOptions[0].policeNo;
  // 登录
  userStore.login(loginData.value).then(() => {
    getUserInfo();
    // showSuccessToast("登录成功");
    // location.reload();
  });

  showPicker.value = false;
};
function getUserInfo() {
  userStore.setUserInfo().then(res => {
    console.log("getUserInfo res :>> ", res);
  });
}

// 正式
const onLogin = () => {
  // console.log(window.nativeObj.getZjhm());
  // 测试 330421196508134111
  // 正式 window.nativeObj.getZjhm()
  // 登录
  userStore
    .login({
      // username: "330421196508134111"
      username: window.nativeObj.getZjhm() || ""
    })
    .then(() => {
      getUserInfo();
      // showSuccessToast("登录成功");
      // location.reload();
    });
};
const getCautionList = async () => {
  try {
    const res = await getWarnMaterialPage(materialForm.value);
    res!.rows.forEach((item: any) => {
      const battchJson = item?.battchJson ? JSON.parse(item?.battchJson) : [];
      item.battchJson = battchJson;
      item.coverImg = battchJson.filter(
        (v: IBattchJson) =>
          getFileTypeByExtension(v.attachName || "") === "image"
      )[0]?.attachFullPath;
      item.videoUrl = battchJson.filter(
        (v: IBattchJson) =>
          getFileTypeByExtension(v.attachName || "") === "video"
      )[0]?.attachFullPath;
    });
    listData.value.push(...res!.rows);
    console.log("listData.value :>> ", listData.value);
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
onMounted(() => {
  // console.log("window--------------------------");
  // console.log(window.nativeObj);
  // console.log("window.nativeObj--------------------------");
  // console.log(window.nativeObj);
  // console.log("window.nativeObj.getUserInfo--------------------------");
  // console.log(window.nativeObj.getUserInfo);
  // console.log("window.nativeObj.getZjhm--------------------------");
  // console.log(window.nativeObj.getZjhm());
  // console.log("window.nativeObj.getUserId--------------------------");
  // console.log(window.nativeObj.getUserId());
  // const getUserInfo = window.nativeObj?.getUserInfo();
  // localStorage.userIdCard = window.nativeObj?.getUserInfo();
  // console.log("getUserId--------------------------");
  // console.log(window.nativeObj?.getUserId());
  // console.log("home----getUserInfo----------------");
  // console.log(getUserInfo);
  // showSuccessToast(getUserInfo);

  if (env === "prod") {
    onLogin();
  }
});
watch(
  () => userStore.accessToken,
  (newValue, oldValue) => {
    if (listData.value.length) return;
    listData.value = [];
    materialForm.value.page = 1;
    listData.value = [];
    getCautionList();
  }
);

watch(
  () => userStore.menuList,
  menuList => {
    homeNav.value = [
      { title: "记分管理", to: "Score" },
      { title: "警示教育", to: "Caution" }
    ];
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
        <img src="~@/assets/homeSwipe/banner.jpg" alt="" style="max-width: 100%;height: auto">
      </div>
      <!-- 轮播图 -->
      <!--<div
        class="home-banner px-[16px] bg-gradient-to-t from-[#ffffff] to-[#8dc2ff] w-screen h-[200px] pt-[20px]"
      >
        <van-swipe indicator-color="#fff" :autoplay="3000">
          <van-swipe-item v-for="image in images" :key="image">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
      </div>-->

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
          <div class="img-box" :class="[`bg${ind + 1}`]"></div>
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
    &.bg1 {
      background: url("@/assets/score@3x.png") no-repeat center / 100%;
    }
    &.bg2 {
      background: url("@/assets/education@3x.png") no-repeat center / 100%;
    }
    &.bg3 {
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
