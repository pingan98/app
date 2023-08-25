<script  lang="ts" name="Caution" setup>
import {ref} from "vue";
import MaterialList from "@/views/caution/components/materialList.vue";

const searchForm = ref({});
</script>

<template>
  <div class="warn-education-page">
    <!-- 搜索框 -->
    <div class="page-search">
      <van-search
          v-model="searchForm.dutyPoliceName"
          shape="round"
          placeholder="请输入被记分人"
      />
    </div>

    <!-- 列表 -->
    <material-list />
  </div>
</template>

<style scoped></style>
