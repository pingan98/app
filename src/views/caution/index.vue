<script lang="ts" name="Caution" setup>
import { ref } from "vue";
import { toList } from "@/utils";
import { showConfirmDialog, showFailToast, showSuccessToast } from "vant";
import { CAUTION_STATUS, CAUTION_STATUS_TXT } from "@/const/warnMaterial";
import MaterialItem from "@/views/caution/components/materialItem.vue";
import { useRoute } from "vue-router";
import {
  getWarnMaterialPage,
  batchUpdateWarnMaterial,
  removeWarnMaterial
} from "@/api/warnMaterial";
import type { List, Query } from "@/api/warnMaterial/types";
const route = useRoute();
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const batchFlag = ref(false);
const searchForm = ref<Query>({
  page: 1,
  size: 20,
  warnTitle: "",
  warnState: CAUTION_STATUS.listing
});
const listData = ref<List[]>([]);
const offset = ref({ y: 500 });
const checkAll = ref(false);
const checkboxGroup = ref<any>(null);
const checkedList = ref<any>([]);
const tabs = toList(CAUTION_STATUS, CAUTION_STATUS_TXT);
const tabChange = (value: string) => {
  searchForm.value.warnState = value;
  batchFlag.value = false;
  searchForm.value.page = 1;
  listData.value = [];
  onLoad();
};
const submitFn = () => {};

const checkAllFn = () => {
  checkboxGroup.value.toggleAll(checkAll.value);
};
const cancelBatch = () => {
  batchFlag.value = false;
  checkAll.value = false;
  checkedList.value = [];
};

const getType = (type: string) => {
  const temp = {
    [CAUTION_STATUS.listing]: "下架",
    [CAUTION_STATUS.draft]: "上架"
  };
  return temp[type] || "";
};
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
const onSearch = () => {
  listData.value = [];
  searchForm.value.page = 1;
  onLoad();
};
const onClear = () => {
  searchForm.value.page = 1;
  searchForm.value.warnTitle = "";
  listData.value = [];
  onLoad();
};
const batchUpdate = async () => {
  showFailToast("暂无选中数据");
  if (!checkedList.value.length) {
    showFailToast("暂无选中数据");
    return;
  }
  const str = getType(searchForm.value.warnState);
  await showConfirmDialog({
    title: "温馨提示",
    message: `您确认${str}选中数据吗？`
  });
  await batchUpdateWarnMaterial(checkedList, searchForm.value.warnState);
  showSuccessToast(str + "成功");
  onSearch();
};
const removeFn = async () => {
  if (!checkedList.value.length) {
    showFailToast("暂无选中数据");
    return;
  }

  await showConfirmDialog({
    title: "温馨提示",
    message: `您确认删除选中数据吗？`
  });
  await removeWarnMaterial(checkedList);
  showSuccessToast("删除成功");
  onSearch();
};
</script>

<template>
  <div class="caution-page">
    <nav-bar :title="route.meta.title" />

    <!-- 搜索框 -->
    <div class="page-search">
      <form action="/">
        <van-search
          v-model="searchForm.warnTitle"
          shape="round"
          placeholder="请输入"
          @search="onSearch"
          @clear.prevent.stop="onClear"
        />
      </form>
      <c-tab :tabs="tabs" @tabChange="tabChange" />
    </div>

    <!-- 列表 -->
    <div class="material-list">
      <!--<van-empty description="" v-if="!listData.length"> </van-empty>-->
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-checkbox-group
          ref="checkboxGroup"
          v-model="checkedList"
          v-if="batchFlag"
        >
          <van-checkbox
            :name="item.id"
            v-for="(item, ind) in listData"
            :key="ind"
          >
            <material-item :item="item"></material-item>
          </van-checkbox>
        </van-checkbox-group>

        <template v-else>
          <material-item
            v-for="(item, ind) in listData"
            :key="ind"
            :item="item"
            @click="$router.push(`/caution/detail/${item.id}`)"
          ></material-item>
        </template>
      </van-list>
    </div>

    <div class="bottom-action flex justify-between">
      <van-button
        v-if="!batchFlag"
        round
        block
        color="linear-gradient(to right, #037CED, #02C2FA)"
        @click="batchFlag = true"
      >
        <svg-icon name="batch" class="inline-block" />
        批量处理
      </van-button>

      <template v-else>
        <van-checkbox v-model="checkAll" @change="checkAllFn"
          >全选</van-checkbox
        >
        <div>
          <van-button icon="revoke" round type="default" @click="cancelBatch"
            >取消</van-button
          >
          <van-button
            plain
            icon="delete-o"
            round
            type="danger"
            v-if="searchForm.warnState !== CAUTION_STATUS.listing"
            @click="removeFn"
            >删除</van-button
          >
          <van-button
            @click="batchUpdate"
            v-if="getType(searchForm.warnState)"
            type="warning"
            round
            :color="
              searchForm.warnState === CAUTION_STATUS.listing
                ? 'linear-gradient(to right, #FE871B, #FFCD4E)'
                : 'linear-gradient(to right, #00B3B3, #13E1B6)'
            "
            ><svg-icon
              :name="
                searchForm.warnState === CAUTION_STATUS.listing
                  ? 'delist'
                  : 'listing'
              "
              class="inline-block"
            />
            {{ getType(searchForm.warnState) }}</van-button
          >
        </div>
      </template>
    </div>

    <!-- 新增按钮 -->
    <van-floating-bubble
      v-if="!batchFlag"
      axis="xy"
      icon="plus"
      magnetic="x"
      v-model:offset="offset"
      @click="$router.push('/caution/add?type=add')"
    />
  </div>
</template>

<style scoped lang="less">
.van-button + .van-button {
  margin-left: 10px;
}
.caution-page {
  position: relative;
  padding-top: 46px;
}
.material-list {
  background: #ffffff;
  padding: 0 16px;
  :deep(.van-checkbox) {
    width: 100%;
    .van-checkbox__label {
      flex: 1;
    }
  }
}
</style>
