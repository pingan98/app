<script lang="ts" name="AboutIndex" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let timer: number = 0;
const countdown = ref("");

onMounted(() => {
  console.log("全国注册备案号》》", window?.nativeObj?.getRecordNum());
  startCountdown();
});
onBeforeUnmount(() => {
  clearInterval(timer); // 清除定时器
  timer = 0;
});

const startCountdown = () => {
  let seconds = 3; // 设置倒计时的秒数
  timer = setInterval(() => {
    if (seconds > 0) {
      countdown.value = `${seconds}秒`;
      seconds--;
    } else {
      router.replace("/"); // 三秒倒计时结束去到home页面
      clearInterval(timer); // 清除定时器
    }
  }, 1000);
};
</script>

<template>
  <div class="about-page">
    <div class="countdown-time" v-if="countdown">{{ countdown }}</div>
    <div class="logo-wrap">
      <div class="logo-box"><img src="@/assets/about/logo.png" alt="" /></div>
    </div>

    <div class="record-num-wrap">
      <span class="label">全国注册备案号：</span>
      <!--<span>{{
        window?.nativeObj?.getRecordNum() || "#### - ####### - ######"
      }}</span>-->
      <span>2023-3304114-000015</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.about-page {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("@/assets/about/about-bg.png") no-repeat center / 100%;
  overflow: hidden;
  .countdown-time {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px 8px;
    background: rgba(0, 0, 0, 0.3);
    color: #ffffff;
    border-radius: 4px;
  }
  .logo-wrap {
    width: 200px;
    margin: 100px auto 0;
    .logo-box {
      width: 100%;
    }
  }
  .record-num-wrap {
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 85%;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
  }
}
</style>
