<script lang="ts" name="Warning" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { toList } from "@/utils";
import { WARN_STATUS, WARN_STATUS_TXT } from "@/const";
import WarningItem from "@/views/warning/components/warningItem.vue";
import type { List, Query } from "@/api/tWarnInfo/types";
import { getTWarnInfoPage } from "@/api/tWarnInfo";
const route = useRoute();
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const searchForm = ref<Query>({
  page: 1,
  size: 20,
  warnState: WARN_STATUS.audited
});
const listData = ref<List[]>([]);
const tabs = toList(WARN_STATUS, WARN_STATUS_TXT);
const tabChange = (value: string) => {
  searchForm.value.warnState = value;
  searchForm.value.page = 1;
  listData.value = [];
  onLoad();
};
const onLoad = async () => {
  const res = await getTWarnInfoPage(searchForm.value);
  listData.value.push(...res!.rows);

  if (listData.value.length === res.total) {
    finished.value = true; // 数据全部加载完成
  } else {
    searchForm.value.page++;
  }
  loading.value = false;
};
const onSearch = () => {
  listData.value = [];
  searchForm.value.page = 1;
  onLoad();
};
/**
 * todo: 清空事件暂不生效
 */
const onClear = () => {
  console.log(111111);
  searchForm.value.page = 1;
  searchForm.value.warnName = "";
  listData.value = [];
  onLoad();
};
</script>

<template>
  <div class="warning-page">
    <nav-bar :title="route.meta.title" />

    <!-- 搜索框 -->
    <div class="page-search">
      <form action="/">
        <van-search
          v-model="searchForm.warnName"
          shape="round"
          placeholder="请输入"
          @search="onSearch"
          @clear.prevent.stop="onClear"
        />
      </form>
      <c-tab :tabs="tabs" @tabChange="tabChange" />
    </div>

    <div class="mx-[14px] my-[16px]">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <warning-item v-for="(item, ind) in listData" :key="ind" :item="item" />
      </van-list>
    </div>
  </div>
</template>

<style scoped lang="less">
.warning-page {
  padding-top: 46px;
}
</style>
