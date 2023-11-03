<!--
 * @Description: 
 * @Author: 辰月
 * @Date: 2023-09-11 13:41:23
 * @LastEditTime: 2023-11-03 11:15:57
 * @LastEditors: 辰月
-->
<script lang="ts" name="TimePopup" setup>
import { onMounted, ref, watch } from "vue";
import dayjs from "dayjs";

const visible = ref(false);
const minDate = dayjs().subtract(10, "year").toDate();
const currentDate = ref<string[]>([]);
const currentTime = ref<string[]>([]);

const props = defineProps({
  showPicker: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits<{
  (e: "onCancel"): void;
  (e: "update:modelValue", val: any): void;
  (e: "onConfirm", val: string): void;
}>();

onMounted(() => {
  visible.value = true;
  getCurrentTime(props.modelValue);
});

const getCurrentTime = (val?: string) => {
  const curTime = dayjs(val || new Date());
  currentDate.value = curTime.format("YYYY-MM-DD").split("-");
  currentTime.value = curTime.format("HH:mm").split(":");
};
const onConfirm = () => {
  visible.value = false;
  const tmp = dayjs(
    `${currentDate.value.join("-")} ${currentTime.value.join(":")}`
  ).format("YYYY-MM-DD HH:mm:00");
  emit("update:modelValue", tmp);
  emit("onConfirm", tmp);
};
const onCancel = () => {
  visible.value = false;
  emit("onCancel");
};
</script>

<template>
  <van-popup v-model:show="visible" position="bottom" round @closed="onCancel">
    <van-picker-group
      title="预约日期"
      :tabs="['选择日期', '选择时间']"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <van-date-picker v-model="currentDate" :min-date="minDate" />
      <van-time-picker v-model="currentTime" />
    </van-picker-group>
  </van-popup>
</template>

<style scoped></style>
