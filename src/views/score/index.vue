<script lang="ts" name="Score" setup>
import { onMounted, ref } from "vue";
import ScoreItem from "@/views/score/components/scoreItem.vue";
import { useRoute } from "vue-router";
import { toList } from "@/utils";
import { getScoreManagePage } from "@/api/scoreManage";
import type { Query, List } from "@/api/scoreManage/types";
import { POLICE_TYPE, POLICE_TYPE_TXT } from "@/const";
import FilterTab from "@/views/score/components/filterTab.vue";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();
const route = useRoute();
const offset = ref({ y: 550, x: -10 });
const judgeRole = userStore.getSomeMenu("warnMaterial");
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const searchForm = ref<Query>({
  page: 1,
  size: 20
});
const filterRef = ref<any>(null);
const listData = ref<List[]>([]);
const jobType = ref<any>({});

onMounted(() => {
  getDutyList();
});
const getDutyList = () => {
  jobType.value = toList(POLICE_TYPE, POLICE_TYPE_TXT);
  jobType.value.unshift({
    label: "全部",
    code: ""
  });
};
const onLoad = async () => {
  const res = await getScoreManagePage(searchForm.value);
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
const onFilter = (data: any) => {
  listData.value = [];
  searchForm.value = { ...searchForm.value, ...data };
  searchForm.value.page = 1;

  onLoad();
};
const onClear = () => {
  searchForm.value.page = 1;
  searchForm.value.dutyPoliceName = "";
  listData.value = [];
  onLoad();
};
const onCancel = () => {
  searchForm.value = {
    page: 1,
    size: 20
  };
  listData.value = [];
  filterRef.value!.resetTab();
  onLoad();
};
</script>

<template>
  <div class="score-page pt-[46px]">
    <nav-bar :title="route.meta.title" />
    <!-- 搜索框 -->
    <div class="page-search">
      <form action="/">
        <van-search
          v-model="searchForm.dutyPoliceName"
          shape="round"
          show-action
          action-text="重置"
          placeholder="请输入被记分人"
          @search="onSearch"
          @clear="onClear"
          @cancel="onCancel"
        />
      </form>
      <filter-tab @onFilter="onFilter" ref="filterRef" />
    </div>

    <!-- 列表 -->
    <div class="score-list page-list">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <score-item
          v-for="(item, ind) in listData"
          :key="ind"
          :item="item"
        ></score-item>
      </van-list>
    </div>

    <!-- 新增按钮 -->
    <van-floating-bubble
      v-if="judgeRole"
      axis="xy"
      icon="plus"
      magnetic="x"
      v-model:offset="offset"
      @click="$router.push('/score/add?type=add')"
    />
  </div>
</template>

<style scoped lang="less"></style>
