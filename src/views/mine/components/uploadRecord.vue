<script lang="ts" name="UploadRecord" setup>
import MaterialItem from "@/views/caution/components/materialItem.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import type { List, Query } from "@/api/warnMaterial/types";
import { getWarnMaterialPage } from "@/api/warnMaterial";
import { useUserStore } from "@/store/modules/user";

const route = useRoute();
const userStore = useUserStore();

// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const listData = ref<List[]>([]);
const searchForm = ref<Query>({
  page: 1,
  size: 20,
  createUser: userStore?.userInfo?.name
});

const onLoad = async () => {
  try {
    const res = await getWarnMaterialPage(searchForm.value);

    listData.value.push(...res!.rows);

    if (listData.value.length === res.total) {
      finished.value = true; // 数据全部加载完成
    } else {
      searchForm.value.page++;
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    finished.value = true;
  }
};
</script>
<template>
  <div class="upload-record">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <material-item
        @click="$router.push(`/caution/detail/${item.id}`)"
        v-for="(item, ind) in listData"
        :key="ind"
        :item="item"
      ></material-item>
    </van-list>
  </div>
</template>
<style scoped lang="less">
.upload-record {
  background: #ffffff;
  padding: 0 16px;
}
</style>
