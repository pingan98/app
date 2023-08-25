<script setup lang="ts" name="MaterialList">
import { ref } from "vue";
import MaterialItem from "@/views/caution/components/materialItem.vue";
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
</script>

<template>
  <div class="material-list">
    <van-list finished-text="没有更多了">
      <material-item></material-item>
      <material-item></material-item>
      <material-item></material-item>
      <material-item></material-item>
      <material-item></material-item>
    </van-list>
  </div>
</template>

<style scoped lang="less">
.material-list {
  background: #ffffff;
}
</style>
