<script  lang="ts" name="CTab" setup>
import {ref} from "vue";
import type { Ref } from 'vue'
import type {Tabs} from "@/views/warning/type";

defineProps<{
  tabs: Tabs[]
}>()

defineEmits<{
  (e: 'tabChange', value: number | string): void
}>()

const active : Ref<string | number> = ref('')

</script>

<template>
  <van-tabs v-model:active="active" @click-tab="$emit('tabChange', $event.name)">
    <template v-for="(item, i) in tabs" :key="i">
      <van-tab :title="item.title"  :name="item.value"></van-tab>
    </template>
  </van-tabs>
</template>

<style scoped></style>
