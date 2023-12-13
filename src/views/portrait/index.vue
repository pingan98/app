<script lang="ts" name="Portrait" setup>
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();
const route = useRoute();
</script>

<template>
  <div class="portrait-page">
    <nav-bar :title="route.meta.title" />

    <div
      class="person portrait-item"
      @click="$router.push('/portrait/person')"
    ></div>
    <!-- 单位画像民警不可见 -->
    <div
      v-if="userStore.getSomeMenu('unitDrawMenu')"
      class="unit portrait-item"
      @click="$router.push('/portrait/unit')"
    ></div>
  </div>
</template>

<style scoped lang="less">
.portrait-page {
  background: #ffffff;
  min-height: calc(100vh - 60px);
  padding: 50px 16px 16px;
  .portrait-item {
    width: 100%;
    height: 150px;
    overflow: hidden;
    border-radius: 10px;
    &.person {
      box-shadow: 0px 3px 6px rgba(16, 151, 255, 0.5);
      background: url("@/assets/person_portrait@3x.png") no-repeat center / 100%;
    }
    &.unit {
      box-shadow: 0px 3px 6px rgba(241, 94, 61, 0.41);
      background: url("@/assets/unit_portrait@3x.png") no-repeat center / 100%;
    }
  }
  .portrait-item + .portrait-item {
    margin-top: 16px;
  }
}
</style>
