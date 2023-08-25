<script  lang="ts" name="Warning" setup>
import {ref} from "vue";
import CTab from "@/components/business/cTab.vue";
import WarningItem from "@/views/warning/components/warningItem.vue";
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const searchForm = ref({});
const tabs = [{title:'已审核', value:1},{title:'待审核', value:2}]
const tabChange = (value:string | number)=>{
  console.log(value)
}
const onLoad = async () => {}
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
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <warning-item />
        <warning-item />
        <warning-item />
      </van-list>
    </div>
  </div>
</template>

<style scoped></style>
