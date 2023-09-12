<script lang="ts" name="ViolateDiscipline" setup>
import { ref, watch } from "vue";
import { toList } from "@/utils";
import { POLICE_TYPE, POLICE_TYPE_TXT } from "@/const";

import { getBreakRuleScore } from "@/api/personPortrait";

const props = defineProps({
  params: {
    type: Object,
    default: () => {}
  }
});

let beanLocal: { [key: string]: any } = {};

const bean = ref<{
  score: string;
  list: Array<any>;
}>({
  score: "",
  list: []
});

const policeType = POLICE_TYPE;
const activeTab = ref<string | number>(policeType.min);
const tabArr = toList(POLICE_TYPE, POLICE_TYPE_TXT);

const setBeanData = () => {
  const mapParam = {
    [POLICE_TYPE.fu]: ["fjList", "fjTotalScore"],
    [POLICE_TYPE.min]: ["mjList", "mjTotalScore"]
  };
  const tmp = mapParam[activeTab.value];
  bean.value = {
    score: beanLocal[tmp[1]],
    list: beanLocal[tmp[0]]
  };
};

const getData = (params: any) => {
  getBreakRuleScore(params).then(data => {
    beanLocal = data || {};
    setBeanData();
  });
};

const changeTab = (item: any) => {
  activeTab.value = item.code;
  setBeanData();
};

watch(
  () => props.params,
  newValue => {
    if (newValue.db33) {
      getData(props.params);
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="violate-discipline">
    <div class="tab-box">
      <div
        @click="changeTab(item)"
        class="tab-item"
        v-for="(item, ind) in tabArr"
        :key="`tab_${ind}`"
        :class="{
          active: item.code === activeTab,
          min: item.code === policeType.min,
          fu: item.code === policeType.fu
        }"
      >
        <div class="name">{{ item.label }}总记分</div>
        <div class="num">
          {{ bean.score || 0 }}
        </div>
      </div>
    </div>
    <div class="score-list" v-if="bean">
      <div
        class="score-item van-hairline--bottom"
        v-for="(item, ind) in bean.list"
        :key="ind"
      >
        <div class="left-img-box">
          <div>
            <span class="num"> {{ item.scoreNum || "" }}</span
            >分
          </div>
          <div>记分分值</div>
        </div>
        <div class="right-main-box">
          <div class="kind">
            {{ item.queType || "" }}
          </div>
          <div class="desc">
            <span class="label">记分类型：</span> {{ item.scoreType || "" }}
          </div>
          <div class="desc">
            <span class="label">记分时间：</span> {{ item.createTime || "" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
@import "../style/index.less";

.violate-discipline {
  .tab-box {
    width: 100%;
    .flex(space-between, center);
    .tab-item {
      width: 48%;
      height: 76px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding: 15px;
      &.min {
        background: url("@/assets/min_score@3x.png") no-repeat center / 100%;
      }
      &.fu {
        background: url("@/assets/fu_score@3x.png") no-repeat center / 100%;
      }
      &.active::after {
        display: block;
        content: "";
        width: 64px;
        height: 7px;
        border-radius: 5px;
        transform: translate(50%, 10px);
      }
      &.min.active::after {
        background: linear-gradient(90deg, #1572f9 0%, #0096ff 100%);
      }
      &.fu.active::after {
        background: linear-gradient(90deg, #fe871b 0%, #ffcd4e 100%);
      }
      .name {
        font-size: 12px;
        color: var(--text-color2);
      }
      .num {
        font-size: 26px;
        font-family: DIN;
        font-weight: bold;
      }
    }
  }
}
</style>
