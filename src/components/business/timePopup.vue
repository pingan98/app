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
}>();

onMounted(() => {
  visible.value = true;
  getCurrentTime(props.modelValue);
});

const getCurrentTime = (val?: string) => {
  const date = val ? val : new Date();
  const curTime = dayjs(date).format("YYYY-MM-DD HH:mm");
  const timeArr = curTime.split(" ");
  currentDate.value = timeArr[0].split("-");
  currentTime.value = timeArr[1].split(":");
};
const onConfirm = () => {
  visible.value = false;
  emit(
    "update:modelValue",
    currentDate.value.join("-") + " " + currentTime.value.join(":") + ":00"
  );
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
