<script setup lang="ts">
import { reactive } from "vue";
import MaterialList from "@/views/home/components/materialList.vue";

const homeNav = reactive([
  { title: "记分管理", to: "Score" },
  { title: "警示教育", to: "Score" },
  { title: "预警管理", to: "Score" }
]);
</script>

<template>
  <div class="home-page">
    <div class="home-page-head">
      <!-- 轮播图 -->
      <div
        class="home-banner px-[16px] bg-gradient-to-t from-[#ffffff] to-[#8dc2ff] w-screen h-[200px] flex items-center"
      >
        <van-swipe indicator-color="#fff" lazy-render>
          <van-swipe-item>
            <img src="@/assets/ad.png" alt="" />
          </van-swipe-item>
          <van-swipe-item>
            <img src="@/assets/ad.png" alt="" />
          </van-swipe-item>
          <van-swipe-item>
            <img src="@/assets/ad.png" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- nav -->
      <van-grid clickable :column-num="3" class="home-nav" :border="false">
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

    <!-- 警示材料 -->
    <div class="warning-material">
      <div class="head">
        <h3 class="name">
          <img
            src="@/assets/material_icon@3x.png"
            alt=""
            class="w-[34px] h-[34px] pr-[7px]"
          />警示材料
        </h3>
        <router-link to="/score" class="more"
          >更多 <van-icon name="arrow"
        /></router-link>
      </div>

      <!-- 列表 -->
      <material-list />
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.home-page {
  min-height: calc(100vh - 50px);
}
.home-nav {
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
  padding: 12px 16px;
  .head {
    .flex(space-between, center);
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
</style>
