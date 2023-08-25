<script setup lang="ts" name="MaterialCard"></script>

<template>
  <div class="material-card van-hairline--bottom pt-[14px] pb-[10px]" @click="$router.push(`/caution/detail/111`)">
    <div class="content-box">
      <h3 class="title">
        标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
      </h3>
      <div class="desc-box">
        <span class="name">王伟强</span>
        <span class="name"><van-icon name="eye-o" /> 1000+</span>
        <span class="name">2023.07.31</span>
      </div>
    </div>
    <div class="img-box">
      <img src="@/assets/ad.png" alt="" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.material-card {
  .flex(space-between);
  .content-box {
    flex: 1;
    .flex(space-between);
    flex-direction: column;
    .title {
      .ellipsisLine(2);
      color: var(--text-color1);
      font-size: 16px;
      font-weight: bold;
    }
    .desc-box {
      .flex(space-between, center);
      color: var(--text-color2);
      font-size: 12px;
    }
  }
  .img-box {
    .flex(center, center);
    width: 106px;
    height: 76px;
    margin-left: 15px;
    background: rgba(140, 144, 255, 0.39);
    opacity: 1;
    border-radius: 5px;
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
