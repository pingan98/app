<script lang="ts" name="ModuleBox" setup></script>

<template>
  <div class="module-box">
    <div class="title-box flex items-center">
      <span class="icon"><slot name="icon"></slot></span>
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.module-box {
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  background: #ffffff;
  overflow: auto;
  .title-box {
    background: linear-gradient(
      270deg,
      rgba(255, 245, 230, 0) 0%,
      #fff5e6 100%
    );
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
