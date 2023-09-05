<script lang="ts" name="DropPanel" setup>
const emit = defineEmits<{
  (e: "onCancel"): void;
  (e: "onConfirm"): void;
}>();
</script>

<template>
  <div class="drop-panel">
    <div>
      <slot></slot>
    </div>
    <div class="bottom flex justify-evenly mt-[10px]">
      <van-button class="w-[100%]" size="small" @click="$emit('onCancel')">
        取消
      </van-button>
      <van-button
        class="w-[100%]"
        size="small"
        type="primary"
        @click="$emit('onConfirm')"
      >
        确认
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.van-button + .van-button {
  margin-left: 0;
}
</style>
