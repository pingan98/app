<script setup lang="ts">
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps<{
  title?: string;
  rightText?: string;
  back?: () => void;
}>();
/*const onClickRight = () => {
  useToggleDarkMode();
};*/
const onClickLeft = () => {
  if (props.back) return props.back();
  if (history.state?.back) {
    router.back();
  } else {
    router.push("/");
  }
};
const emit = defineEmits<{
  (e: "click-right"): void;
}>();
const onClickRight = () => {
  emit("click-right");
};
</script>

<template>
  <van-nav-bar
    fixed
    left-arrow
    @click-left="onClickLeft"
    :title="title"
    left-text="返回"
    :right-text="rightText"
    @click-right="onClickRight"
  >
    <!--<template #right>
      <svg-icon class="text-[18px]" :name="useDarkMode() ? 'light' : 'dark'" />
    </template>-->
  </van-nav-bar>
</template>

<style scoped></style>
