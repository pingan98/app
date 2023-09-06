<script lang="ts" name="CDateRange" setup>
import { onMounted, ref, watch } from "vue";
import dayjs from "dayjs";
import { showFailToast } from "vant";
import { MIN_DATE, MAX_DATE } from "@/const";
const minDate = MIN_DATE;
const maxDate = MAX_DATE;
const formatter = (type: string, option: any) => {
  if (type === "year") {
    option.text += "年";
  }
  if (type === "month") {
    option.text += "月";
  }
  if (type === "day") {
    option.text += "日";
  }
  return option;
};
const startTime = ref<string[]>([]);
const endTime = ref<string[]>([]);
const emit = defineEmits<{
  (e: "update:modelValue", time: any): void;
}>();
/*watch(
  props.timeValue,
  (newValue, oldValue) => {
    if (Array.isArray(props.timeValue)) {
      startTime.value = props.timeValue[0];
      endTime.value = props.timeValue[1];
    }
  },
  {
    immediate: true
  }
);*/
onMounted(() => {
  getCurrentDate();
});
const getCurrentDate = () => {
  const curTime = dayjs().format("YYYY-MM-DD");
  startTime.value = endTime.value = curTime.split("-");
};
const timeChange = () => {
  const stime = startTime.value.join("-");
  const etime = endTime.value.join("-");
  // debugger;
  if (
    stime &&
    etime &&
    new Date(stime).valueOf() - new Date(etime).valueOf() >= 0
  ) {
    showFailToast("结束时间早于开始时间");
    // endTime.value = [];
    return false;
  }
  emit("update:modelValue", [stime + " 00:00:00", etime + " 23:59:59"]);
};
</script>

<template>
  <div class="c-date-range">
    <div class="time-item">
      <div class="time-title">开始时间</div>
      <van-date-picker
        v-model="startTime"
        title="选择日期"
        :show-toolbar="false"
        :min-date="minDate"
        :max-date="maxDate"
        option-height="30px"
        :formatter="formatter"
        @change="timeChange"
      />
    </div>

    <div class="time-item">
      <div class="time-title">结束时间</div>
      <van-date-picker
        :show-toolbar="false"
        v-model="endTime"
        title="选择日期"
        :min-date="minDate"
        :max-date="maxDate"
        option-height="30px"
        :formatter="formatter"
        @change="timeChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.c-date-range {
  .time-title {
    font-size: 14px;
    margin: 10px 0;
  }
  .time-item + .time-item {
    margin-top: 20px;
  }
}
</style>
