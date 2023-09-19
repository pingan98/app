<script lang="ts" name="CTab" setup>
import { ref, watch } from "vue";
import type { Ref } from "vue";
import type { ConstListType } from "@/types";

const props = defineProps<{
  tabs: ConstListType;
  modelValue: string | number;
}>();

const emit = defineEmits<{
  (e: "tabChange", value: number | string): void;
  (e: "update:modelValue", val: any): void;
}>();

const active: Ref<string | number> = ref("");

watch(
  () => active.value,
  (val: any) => {
    active.value = props.modelValue ? props.modelValue : active.value;
    emit("update:modelValue", val);
  }
);
</script>

<template>
  <van-tabs
    v-model:active="active"
    @click-tab="$emit('tabChange', $event.name)"
  >
    <template v-for="(item, i) in props.tabs" :key="i">
      <van-tab :title="item.label" :name="item.code"></van-tab>
    </template>
  </van-tabs>
</template>

<style scoped></style>
