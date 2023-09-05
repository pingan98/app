<script setup lang="ts" name="Myself">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="mine-page detail-bg">
    <nav-bar :title="route.meta.title" />
  </div>
</template>

<style scoped lang="less"></style>
