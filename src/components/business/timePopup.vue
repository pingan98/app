<script lang="ts" name="TimePopup" setup>
import { ref, watch } from "vue";
import { MAX_DATE, MIN_DATE } from "@/const";

const visible = ref(false);
const minDate = MIN_DATE;
const maxDate = MAX_DATE;
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
const confirmFn = ({ selectedValues }) => {
  visible.value = false;
  emit("onConfirm", selectedValues.join("-"));
};
const cancelFn = () => {
  visible.value = false;
  emit("onCancel");
};
</script>

<template>
  <van-popup v-model:show="visible" position="bottom" round @closed="cancelFn">
    <van-date-picker
      @confirm="confirmFn"
      @cancel="cancelFn"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </van-popup>
</template>

<style scoped></style>
