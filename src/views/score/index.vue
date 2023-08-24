<script lang="ts" name="Score" setup>
import { ref } from "vue";
import ScoreList from "@/views/score/components/scoreList.vue";
const searchForm = ref({});
</script>

<template>
  <div class="score-page">
    <!-- 搜索框 -->
    <div class="page-search">
      <van-search
        v-model="searchForm.dutyPoliceName"
        shape="round"
        placeholder="请输入被记分人"
      />
    </div>

    <!-- 列表 -->
    <score-list />
  </div>
</template>

<style scoped lang="less">
.page-search {
  margin-bottom: 10px;
}
</style>
