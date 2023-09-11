<script setup lang="ts" name="MaterialCard">
import type { List } from "@/api/warnMaterial/types";
import defaultImage from "@/assets/default_fm.png";
import { formatTime } from "@/utils";

const props = defineProps<{
  item: List;
}>();
</script>

<template>
  <div class="material-card van-hairline--bottom pt-[14px] pb-[10px]">
    <div class="content-box">
      <h3 class="title">
        {{ item?.warnTitle }}
      </h3>
      <div class="desc-box">
        <span class="name">{{ item?.createUser }}</span>
        <span class="name"
          ><van-icon name="eye-o" /> {{ item?.warnViewNumber }}</span
        >
        <span class="name">{{
          formatTime(item?.upperTime, "YYYY-MM-DD")
        }}</span>
      </div>
    </div>
    <div class="img-box">
      <img
        :src="item?.coverImg || defaultImage"
        alt=""
        @error="
          e => {
            e.target.src = defaultImage;
          }
        "
      />
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
    //background: rgba(140, 144, 255, 0.39);
    opacity: 1;
    border-radius: 5px;
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
