<script lang="ts" name="ViolateDiscipline" setup>
import { ref, watch, nextTick } from "vue";
import { toList } from "@/utils";
import { POLICE_TYPE, POLICE_TYPE_TXT } from "@/const";

import { getBreakRuleScore } from "@/api/personPortrait";
import ModuleBox from "@/components/business/moduleBox.vue";

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
const tabArr = ref(
  toList(POLICE_TYPE, POLICE_TYPE_TXT).map(item => {
    return {
      ...item,
      score: 0
    };
  })
);

const setBeanData = () => {
  const mapParam = {
    [POLICE_TYPE.fu]: ["fjList", "fjTotalNum"],
    [POLICE_TYPE.min]: ["mjList", "mjTotalNum"]
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

    tabArr.value[0].score = data.mjTotalNum || 0;
    tabArr.value[1].score = data.fjTotalNum || 0;

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
          {{ item.score }}
        </div>
      </div>
    </div>

    <module-box
      class="mt-[30px]"
      title="扣分明细"
      bg="from-[#d0eaff] to-[#f9fbff]"
    >
      <template v-slot:icon>
        <img src="@/assets/sort_icon3@3x.png" alt="" />
      </template>

      <div class="drink-module">
        <div class="drink-module_row is-header">
          <div class="drink-module_col">序号</div>
          <div class="drink-module_col">姓名</div>
          <div class="drink-module_col">扣分次数</div>
          <div class="drink-module_col">扣分数</div>
        </div>
        <div class="drink-module_table">
          <van-empty description="暂无数据" v-if="!bean.list.length" />
          <div
            v-else
            class="drink-module_row van-hairline--bottom"
            v-for="(item, ind) in bean.list"
            :key="ind"
          >
            <div class="drink-module_col">{{ ind + 1 }}</div>
            <div class="drink-module_col">{{ item.name || "" }}</div>
            <div class="drink-module_col">{{ item.scoreCount || 0 }}</div>
            <div class="drink-module_col">{{ item.scoreNum || 0 }}</div>
          </div>
        </div>
      </div>
    </module-box>

    <!--<div class="score-list" v-if="bean">
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
    </div>-->
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
      position: relative;
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
        position: absolute;
        bottom: -10px;
        left: 0;
        content: "";
        width: 64px;
        height: 7px;
        border-radius: 5px;
        transform: translateX(50%);
        background: linear-gradient(90deg, #1572f9 0%, #0096ff 100%);
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

  .drink-module {
    width: 100%;
    padding: 10px;
    &_table {
      max-height: 280px;
      margin: 0 auto;
      overflow-y: auto;
    }
    &_row {
      color: #666666;
      .flex(flex-start, center);
      &.is-header {
        height: 36px;
        background: #edeff3;
        font-size: 12px;
      }
    }
    &_col {
      text-align: center;
      width: 25%;
      padding: 5px 0;
    }
  }
}
</style>
