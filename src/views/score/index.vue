<script lang="ts" name="Score" setup>
import { ref } from "vue";
import ScoreItem from "@/views/score/components/scoreItem.vue";
import { useRoute } from "vue-router";
const route = useRoute();
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const searchForm = ref({});
const onLoad = async () => {};
</script>

<template>
  <div class="score-page pt-[46px]">
    <nav-bar :title="route.meta.title" />
    <!-- 搜索框 -->
    <div class="page-search">
      <van-search
        v-model="searchForm.dutyPoliceName"
        shape="round"
        placeholder="请输入被记分人"
      />
    </div>

    <!-- 列表 -->
    <div class="score-list page-list">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <score-item></score-item>
        <score-item></score-item>
      </van-list>
    </div>

    <!-- 新增按钮 -->
    <van-floating-bubble
      axis="xy"
      icon="plus"
      magnetic="x"
      @click="$router.push('/score/add')"
    />
  </div>
</template>

<style scoped lang="less"></style>
