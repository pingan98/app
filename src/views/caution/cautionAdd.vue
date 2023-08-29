<script lang="ts" name="CautionAdd" setup></script>

<template>
  <div class="caution-add-page">
    <div class="bottom-action flex justify-between">
      <van-button round class="w-[50%]" plain>取消</van-button>
      <van-button
        round
        class="w-[50%]"
        color="linear-gradient(to right, #037CED, #02C2FA)"
      >
        确定
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.caution-add-page {
  padding: 16px 16px 86px;
  background: #ffffff;
  min-height: calc(100vh - 64px);
}
</style>
