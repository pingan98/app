<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      <span>{{ item.title }}</span>
      <template #icon="props">
        <img :src="props.active ? item.active : item.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { getAssetsFile } from "@/utils";

const active = ref(0);

const tabbarData = reactive([
  {
    title: "首页",
    to: { name: "Home" },
    active: getAssetsFile("home_active@3x.png"),
    inactive: getAssetsFile("home@3x.png")
  },
  {
    title: "画像",
    to: { name: "Portrayal" },
    active: getAssetsFile("portrayal_active@3x.png"),
    inactive: getAssetsFile("portrayal@3x.png")
  },
  {
    title: "我的",
    to: { name: "Mine" },
    active: getAssetsFile("user_active@3x.png"),
    inactive: getAssetsFile("user@3x.png")
  }
]);
</script>
