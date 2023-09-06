<script lang="ts" name="Score" setup>
import { onMounted, ref } from "vue";
import ScoreItem from "@/views/score/components/scoreItem.vue";
import { useRoute } from "vue-router";
import { toList } from "@/utils";
import { getScoreManagePage } from "@/api/scoreManage";
import type { Query, List } from "@/api/scoreManage/types";
import { POLICE_TYPE, POLICE_TYPE_TXT } from "@/const";
const route = useRoute();
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const searchForm = ref<Query>({
  page: 1,
  size: 20
});
const listData = ref<List[]>([]);
const jobType = ref<any>({});
onMounted(() => {
  getDutyList();
});
const onTimeChange = val => {
  console.log(searchForm.value);
};
const getDutyList = () => {
  jobType.value = toList(POLICE_TYPE, POLICE_TYPE_TXT);
  jobType.value.unshift({
    label: "全部",
    code: ""
  });
};
const jobChange = (item: any) => {
  searchForm.value.scoreType = item.code;
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

const cSelectRef = ref<any>(null);

function handleConfirm() {
  console.log(cSelectRef.value!.getCheckedKeys());
}
</script>

<template>
  <div class="score-page pt-[46px]">
    <nav-bar :title="route.meta.title" />
    <!-- 搜索框 -->
    <div class="page-search">
      <van-search
        v-model="searchForm.dutyPoliceName"
        shape="round"
        placeholder="请输入被记分人"
      />
      <van-dropdown-menu ref="menuRef">
        <van-dropdown-item title="职务">
          <drop-panel>
            <van-radio-group v-model="searchForm.scoreType">
              <van-cell-group inset>
                <van-cell
                  :title="item.label"
                  :key="ind"
                  v-for="(item, ind) in jobType"
                  clickable
                  @click="jobChange(item)"
                >
                  <template #right-icon>
                    <van-radio :name="item.code" />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </drop-panel>
        </van-dropdown-item>
        <van-dropdown-item title="部门">
          <drop-panel @onConfirm="handleConfirm">
            <c-select-tree-org
              v-model="searchForm.dutyOrgId"
              checkType="single"
              ref="cSelectRef"
            />
          </drop-panel>
        </van-dropdown-item>
        <van-dropdown-item title="时间">
          <drop-panel>
            <c-date-range v-model="searchForm.times"></c-date-range>
          </drop-panel>
        </van-dropdown-item>
      </van-dropdown-menu>
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
      axis="xy"
      icon="plus"
      magnetic="x"
      @click="$router.push('/score/add')"
    />
  </div>
</template>

<style scoped lang="less"></style>
