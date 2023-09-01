<script lang="ts" name="ModuleBox" setup>
import { withDefaults } from "vue";
// 使用 withDefaults 设置默认值
withDefaults(
  defineProps<{
    bg?: string;
    title: string;
  }>(),
  {
    bg: "from-[#fff0da] to-[#fffefe]"
  }
);
</script>

<template>
  <div class="module-box">
    <div class="title-box flex items-center bg-gradient-to-r" :class="[bg]">
      <span class="icon"><slot name="icon"></slot></span>
      <span class="name">{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.module-box {
  position: relative;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  background: #ffffff;
  overflow: auto;
  .title-box {
    padding: 10px 16px;
    .icon {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    .name {
      font-weight: bold;
    }
  }
}
</style>
