<script lang="ts" name="CTab" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import type { ConstListType } from "@/types";

defineProps<{
  tabs: ConstListType;
}>();

defineEmits<{
  (e: "tabChange", value: number | string): void;
}>();

const active: Ref<string | number> = ref("");
</script>

<template>
  <van-tabs
    v-model:active="active"
    @click-tab="$emit('tabChange', $event.code)"
  >
    <template v-for="(item, i) in tabs" :key="i">
      <van-tab :title="item.label" :name="item.code"></van-tab>
    </template>
  </van-tabs>
</template>

<style scoped></style>
