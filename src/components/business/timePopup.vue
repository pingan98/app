<script lang="ts" name="TimePopup" setup>
import { onMounted, ref, watch } from "vue";
import dayjs from "dayjs";

const visible = ref(false);
const minDate = dayjs().subtract(10, "year").toDate();
const currentDate = ref<string[]>([]);
const currentTime = ref(["00", "00"]);

const props = defineProps({
  showPicker: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits<{
  (e: "onCancel"): void;
  (e: "onConfirm", val: any): void;
}>();

watch(
  () => props.showPicker,
  val => {
    if (val) {
      visible.value = val;
    }
  }
);

onMounted(() => {
  getCurrentTime();
});

const getCurrentTime = () => {
  const curTime = dayjs().format("YYYY-MM-DD");
  currentDate.value = curTime.split("-");
};
const onConfirm = () => {
  visible.value = false;
  emit(
    "onConfirm",
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
      <van-date-picker
        v-model="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
      />
      <van-time-picker v-model="currentTime" />
    </van-picker-group>
  </van-popup>
</template>

<style scoped></style>
