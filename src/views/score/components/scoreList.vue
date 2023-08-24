<script setup lang="ts" name="ScoreList">
import { ref } from "vue";
import ScoreItem from "@/views/score/components/scoreItem.vue";
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
</script>

<template>
  <div class="score-list page-list">
    <van-list finished-text="没有更多了">
      <score-item></score-item>
      <score-item></score-item>
    </van-list>

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
