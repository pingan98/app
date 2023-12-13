<!--
 * @Description: 
 * @Author: 辰月
 * @Date: 2023-09-13 16:05:07
 * @LastEditTime: 2023-12-13 16:26:20
 * @LastEditors: 辰月
-->
<script setup lang="ts" name="MaterialItem">
import { ref } from "vue";
import type { List, IBattchJson } from "@/api/warnMaterial/types";
import { getFileTypeByExtension } from "@/utils";
import defaultImage from "@/assets/default_fm.png";
import { formatTime } from "@/utils";
import { getAudiovisual } from "@/api/common";

const props = defineProps<{
  item: List;
}>();

const url = ref("");
const resouceType = ref("");
const getResouce = () => {
  const battchJson = props.item?.battchJson
    ? JSON.parse(props.item?.battchJson)
    : [];
  const coverImg = battchJson.filter(
    (v: IBattchJson) => getFileTypeByExtension(v.attachName || "") === "image"
  )[0];
  const videoUrl = battchJson.filter(
    (v: IBattchJson) => getFileTypeByExtension(v.attachName || "") === "video"
  )[0];
  const tmp = coverImg || videoUrl;
  if (!tmp) return false;
  resouceType.value = getFileTypeByExtension(tmp.attachName || "");
  getAudiovisual(tmp.attachFullPath).then(res => {
    url.value = res as string;
  });
};
getResouce();
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
    <div class="img-box" v-if="resouceType === 'image'">
      <img
        :src="url"
        alt=""
        @error="
          e => {
            e.target.src = defaultImage;
          }
        "
      />
    </div>
    <div class="img-box" v-if="resouceType === 'video'">
      <video :controls="false">
        <source v-if="url" :src="url" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="img-box" v-if="!resouceType && !url">
      <img :src="defaultImage" alt="" />
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
      max-height: 100%;
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
