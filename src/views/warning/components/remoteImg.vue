<template>
  <van-image
    width="100%"
    height="160px"
    fit="contain"
    :src="imgUr ? imgUr : ''"
    @click="previewImg([imgUr], 0)"
  >
  </van-image>
</template>

<script lang="ts" name="RemoteImg" setup>
import { ref } from "vue";
import { imageToStream } from "@/api/tCarAlarm";
import { showImagePreview } from "vant";

const imgUr = ref("");
const props = defineProps<{
  url?: string;
}>();
// 点击查看图片
const previewImg = (imgs, index) => {
  const pics = imgs.filter(v => v);
  if (!pics.length) return false;
  showImagePreview({
    images: pics,
    startPosition: index,
    closeable: true
  });
};
const getResouce = () => {
  if (!props.url) return;

  // const test = "http://192.168.3.96:9117/teambuild/assignBaseInfoAdd/%E4%B8%8A%E4%BC%A0%E7%85%A7%E7%89%87/ffefd05e-0ace-4745-a1c3-8b8a893e9dee/2023-04-27/tyle.png";
  imageToStream({
    url: props.url
  })
    .then(res => {
      imgUr.value = URL.createObjectURL(res) || "";
    })
    .catch(err => {
      console.log(err);
    });
};

getResouce();
</script>

<style scoped></style>
