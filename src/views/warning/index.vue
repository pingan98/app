<script  lang="ts" name="Warning" setup>
import {ref} from "vue";
import CTab from "@/components/business/cTab.vue";
import WarningList from "@/views/warning/components/warningList.vue";

const searchForm = ref({});
const tabs = [{title:'已审核', value:1},{title:'待审核', value:2}]
const tabChange = (value:string | number)=>{
  console.log(value)
}
</script>

<template>
  <div class="warning-page">
    <!-- 搜索框 -->
    <div class="page-search">
      <van-search
          v-model="searchForm.dutyPoliceName"
          shape="round"
          placeholder="请输入"
      />
      <c-tab :tabs="tabs" @tabChange="tabChange"/>
    </div>

    <div class="mx-[14px] my-[16px]">
      <warning-list />
    </div>
  </div>
</template>

<style scoped></style>
