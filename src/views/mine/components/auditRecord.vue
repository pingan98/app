<script lang="ts" name="AuditRecord" setup>
import { ref } from "vue";
import WarningItem from "@/views/warning/components/warningItem.vue";
import { getTWarnInfoPage } from "@/api/tWarnInfo";
import type { List, Query } from "@/api/tWarnInfo/types";
import { WARN_STATUS } from "@/const";
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const listData = ref<List[]>([]);
const searchForm = ref<Query>({
  page: 1,
  size: 20,
  warnState: WARN_STATUS.audited
});
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
</script>
<template>
  <div class="audit-record">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <warning-item v-for="(item, ind) in listData" :key="ind" :item="item" />
    </van-list>
  </div>
</template>
<style scoped lang="less">
.upload-record {
}
</style>
