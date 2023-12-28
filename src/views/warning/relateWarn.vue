<script lang="ts" name="RelateWarn" setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getTCarAlarmPage } from "@/api/tCarAlarm";
import type { Query, List } from "@/api/tCarAlarm/types";
import ModuleBox from "@/components/business/moduleBox.vue";
import RemoteImg from "@/views/warning/components/remoteImg.vue";

const route = useRoute();
const listData = ref<List[]>([]);
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const searchForm = ref<Query>({
  page: 1,
  size: 20,
  id: route.params.id as string
});

const onLoad = async () => {
  const { data } = await getTCarAlarmPage(searchForm.value);
  const arr = data!.records.map((v: any, index: number) => {
    let txt = [v.humanname, "于", v.timesstamp, "在", v.cameraname];

    if (v.plateno) {
      txt = [
        v.humanname,
        "所属车辆",
        v.plateno,
        "于",
        v.timesstamp,
        "在",
        v.cameraname
      ];
    }
    return {
      ...v,
      index: index,
      custom_name: v.plateno || v.humanname,
      txt: txt.filter(v => v).join()
    };
  });
  listData.value.push(...arr);

  if (listData.value.length === data.total) {
    finished.value = true; // 数据全部加载完成
  } else {
    searchForm.value.page++;
  }
  loading.value = false;
};
</script>

<template>
  <div class="relate-warn">
    <nav-bar :title="route.meta.title" />

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <module-box
        :title="item.plateno"
        v-for="(item, ind) in listData"
        :key="ind"
        class="mb-[10px]"
      >
        <template v-slot:icon>
          <img src="@/assets/sort_icon1@3x.png" alt="" />
        </template>
        <template v-slot:op>
          <span>{{ item.timesstamp }}</span>
        </template>
        <div class="p-[10px]">
          <div class="mb-[6px]">{{ item.txt }}</div>
          <remote-img
            v-if="Object.keys(item).length"
            :url="item.snappedpicurl"
          />
        </div>
      </module-box>
    </van-list>
  </div>
</template>

<style scoped lang="less">
.relate-warn {
  padding: 56px 10px 16px;
  min-height: 100vh;
  background: #f6f8fa;
}
</style>
