<script  lang="ts" name="WarningList" setup>
import { ref } from "vue";
import WarningItem from "@/views/warning/components/warningItem.vue";
</script>

<template>
  <div class="container">
    <van-list finished-text="没有更多了">
      <warning-item />
      <warning-item />
      <warning-item />
    </van-list>
  </div>
</template>

<style scoped></style>
