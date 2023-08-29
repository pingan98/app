<script lang="ts" name="Caution" setup>
import { ref } from "vue";
import { toList } from "@/utils";
import { CAUTION_STATUS, CAUTION_STATUS_Txt } from "@/views/caution/const";
import MaterialItem from "@/views/caution/components/materialItem.vue";

// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const batchFlag = ref(false);
const searchForm = ref<any>({});

const offset = ref({ y: 500 });
const bottomStatus = ref();
const checkAll = ref(false);
const checkboxGroup = ref(null);
const checkLists = ref<any>([]);
const cautionStatus = CAUTION_STATUS;
const tabs = toList(CAUTION_STATUS, CAUTION_STATUS_Txt);
const tabChange = (value: string | number) => {
  searchForm.value.status = value;
  batchFlag.value = false;
};
const submitFn = () => {};

const toggleAll = () => {
  checkboxGroup.value.toggleAll();
};
const cancelBatch = () => {
  batchFlag.value = false;
};
</script>

<template>
  <div class="caution-page">
    <!-- 搜索框 -->
    <div class="page-search mb-[10px]">
      <van-search
        v-model="searchForm.dutyPoliceName"
        shape="round"
        placeholder="请输入"
      />
      <c-tab :tabs="tabs" @tabChange="tabChange" />
    </div>

    <!-- 列表 -->
    <div class="material-list">
      <van-list finished-text="没有更多了">
        <van-checkbox-group
          v-model="checkLists"
          class="my-24px"
          v-if="batchFlag"
        >
          <van-checkbox>
            <material-item></material-item>
          </van-checkbox>
          <van-checkbox>
            <material-item></material-item>
          </van-checkbox>
        </van-checkbox-group>

        <template v-else>
          <material-item
            @click="$router.push(`/caution/detail/111`)"
          ></material-item>
          <material-item></material-item>
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
        <template v-if="searchForm.status === cautionStatus.draft">
          <van-checkbox v-model="checkAll" @change="toggleAll"
            >全选</van-checkbox
          >
          <div>
            <van-button icon="revoke" round type="default" @click="cancelBatch"
              >取消</van-button
            >
            <van-button plain icon="delete-o" round type="danger"
              >删除</van-button
            >
            <van-button
              type="warning"
              round
              color="linear-gradient(to right, #00B3B3, #13E1B6)"
              ><svg-icon name="listing" class="inline-block" />上架</van-button
            >
          </div>
        </template>

        <template v-else-if="searchForm.status === cautionStatus.delist">
          <van-checkbox v-model="checkAll" @change="toggleAll"
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
              class="w-[120px]"
              >删除</van-button
            >
          </div>
        </template>

        <template v-else>
          <van-checkbox v-model="checkAll" @change="toggleAll"
            >全选</van-checkbox
          >
          <div>
            <van-button icon="revoke" round type="default" @click="cancelBatch"
              >取消</van-button
            >
            <van-button
              type="warning"
              round
              class="w-[120px]"
              color="linear-gradient(to right, #FE871B, #FFCD4E)"
              ><svg-icon name="delist" class="inline-block" />下架</van-button
            >
          </div>
        </template>
      </template>
    </div>

    <!-- 新增按钮 -->
    <van-floating-bubble
      axis="xy"
      icon="plus"
      magnetic="x"
      v-model:offset="offset"
      @click="$router.push('/caution/add')"
    />
  </div>
</template>

<style scoped lang="less">
.caution-page {
  position: relative;
}
.material-list {
  background: #ffffff;
  padding: 0 16px;
}
</style>
