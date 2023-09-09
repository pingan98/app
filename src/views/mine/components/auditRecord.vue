<script lang="ts" name="AuditRecord" setup>
import { ref } from "vue";
import defaultIcon from "@/assets/default_rick_icon@3x.png";
import type { List, Query } from "@/api/queOrder/types";
import { ASSIGN_STATUS } from "@/const";
import { getQueOrderPage } from "@/api/queOrder";
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const listData = ref<List[]>([]);
const sourceName = {
  "1": "饮酒结束所属车辆异动预警",
  "2": "特殊时段人员异动预警",
  "3": "特殊时段车辆异动预警",
  "4": "重点区域人员异动预警",
  "5": "信访",
  "6": "投诉"
};
const searchForm = ref<Query>({
  page: 1,
  size: 20,
  state: ASSIGN_STATUS.archive
});
const onLoad = async () => {
  const res = await getQueOrderPage(searchForm.value);
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
      <module-box
        class="record-item"
        bg="from-[#d0eaff] to-[#f9fbff]"
        :title="sourceName[item.source]"
        v-for="(item, ind) in listData"
        :key="ind"
      >
        <template v-slot:icon>
          <img :src="defaultIcon" alt="" />
        </template>
        <div class="p-[10px]">
          <div class="info-line">
            <span class="label">责任单位：</span>{{ item.dutyOrgName }}
          </div>
          <div class="info-line">
            <span class="label">责任人：</span>{{ item.dutyPeopleName }}
          </div>
          <div class="info-line">
            <span class="label">问题时间：</span>{{ item.queTime }}
          </div>
          <div class="info-line">
            <span class="label">预警地点：</span>{{ item.rightlass }}
          </div>
        </div>
      </module-box>
    </van-list>
  </div>
</template>
<style scoped lang="less">
.audit-record {
  .info-line + .info-line,
  .record-item + .record-item {
    margin-top: 10px;
  }
  .label {
    color: var(--text-color2);
  }
}
</style>
