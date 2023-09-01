<script lang="ts" name="Warning" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { toList } from "@/utils";
import { WARN_STATUS, WARN_STATUS_TXT } from "@/const";
import WarningItem from "@/views/warning/components/warningItem.vue";
const route = useRoute();
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const searchForm = ref({});
const tabs = toList(WARN_STATUS, WARN_STATUS_TXT);
const tabChange = (value: string | number) => {
  console.log(value);
};
const onLoad = async () => {};
</script>

<template>
  <div class="warning-page">
    <nav-bar :title="route.meta.title" />

    <!-- 搜索框 -->
    <div class="page-search">
      <van-search
        v-model="searchForm.dutyPoliceName"
        shape="round"
        placeholder="请输入"
      />
      <c-tab :tabs="tabs" @tabChange="tabChange" />
    </div>

    <div class="mx-[14px] my-[16px]">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <warning-item />
        <warning-item />
        <warning-item />
      </van-list>
    </div>
  </div>
</template>

<style scoped></style>
