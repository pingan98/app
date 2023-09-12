<script lang="ts" name="DrinkReport" setup>
import { ref, watch } from "vue";

import { getYJBBDW } from "@/api/personPortrait";

import ModuleBox from "@/components/business/moduleBox.vue";
import avatar from "@/assets/avatar@3x.png";
import HorizontalLine from "@/views/portrait/charts/horizontalLine.vue";

const props = defineProps({
  params: {
    type: Object,
    default: () => {}
  }
});

const drinkInfo = ref<any>({});

const getData = (params: any) => {
  getYJBBDW({ db33: params?.db33 }).then(data => {
    drinkInfo.value = data || {};
  });
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
  <div class="drink-report">
    <div class="all-count-grid">
      <div class="grid-item-box top-item drink">
        <div class="name">饮酒报备总人数</div>
        <div class="num-box">
          <span class="num">
            {{ drinkInfo.zrc ? drinkInfo.zrc.length : 0 }} </span
          >人次
        </div>
      </div>
      <div class="grid-item-box top-item now-time">
        <div class="name">当日报备</div>
        <div class="num-box">
          <span class="num">{{
            drinkInfo.bbrc ? drinkInfo.bbrc.length : 0
          }}</span
          >人次
        </div>
      </div>
      <div class="grid-item-box bottom-item day_6">
        <div class="img-box"></div>
        <div class="info-box">
          <div class="name">近30日报备超6次</div>
          <div class="num-box">
            <span class="num">{{
              drinkInfo.totalCount ? drinkInfo.totalCount.length : 0
            }}</span
            >人次
          </div>
        </div>
      </div>
      <div class="grid-item-box bottom-item day_30">
        <div class="img-box"></div>
        <div class="info-box">
          <div class="name">近30日无报备记录</div>
          <div class="num-box">
            <span class="num">{{
              drinkInfo.approvedCount ? drinkInfo.approvedCount.length : 0
            }}</span
            >人次
          </div>
        </div>
      </div>
    </div>

    <!-- 饮酒报备 -->
    <module-box
      class="mb-[20px]"
      title="饮酒报备"
      bg="from-[#d0eaff] to-[#f9fbff]"
      v-if="drinkInfo.zrc && drinkInfo.zrc.length"
    >
      <template v-slot:icon>
        <img src="@/assets/sort_icon3@3x.png" alt="" />
      </template>
      <div class="drink-module">
        <div class="drink-module_row is-header">
          <div class="drink-module_col">姓名</div>
          <div class="drink-module_col">饮酒开始时间</div>
          <div class="drink-module_col">提交报备时间</div>
          <div class="drink-module_col">是否确认到家</div>
        </div>
        <div class="drink-module_table">
          <div
            class="drink-module_row van-hairline--bottom"
            v-for="(item, ind) in drinkInfo.zrc"
            :key="ind"
          >
            <div class="drink-module_col">{{ item.name || "" }}</div>
            <div class="drink-module_col">{{ item.createTime || "" }}</div>
            <div class="drink-module_col">{{ item.createTime || "" }}</div>
            <div class="drink-module_col">
              {{ item.goHome === 0 ? "否" : "是" }}
            </div>
          </div>
        </div>
      </div>
    </module-box>

    <!-- 近30日报备超6次 -->

    <module-box
      class="report-6 mb-[20px]"
      title="近30日报备超6次"
      v-if="drinkInfo.totalCount && drinkInfo.totalCount.length"
    >
      <template v-slot:icon>
        <img src="@/assets/sort_icon1@3x.png" alt="" />
      </template>
      <div class="chart-box">
        <horizontal-line :bean="drinkInfo.totalCount" />
      </div>
    </module-box>

    <!-- 近30日无报备记录 -->
    <module-box
      class="mb-[20px]"
      title="近30日无报备记录"
      bg="from-[#cff7ff] to-[#fbfeff]"
      v-if="drinkInfo.approvedCount && drinkInfo.approvedCount.length"
    >
      <template v-slot:icon>
        <img src="@/assets/sort_icon4@3x.png" alt="" />
      </template>
      <van-grid :column-num="5" :border="false">
        <van-grid-item
          v-for="(item, ind) in drinkInfo.approvedCount"
          :key="ind"
        >
          <van-image :src="avatar" width="38px" />
          <div>{{ item.name }}</div>
        </van-grid-item>
      </van-grid>
    </module-box>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.all-count-grid {
  .flex(space-between, center);
  flex-wrap: wrap;
  margin-bottom: 24px;
  .grid-item-box {
    width: 48%;
    height: 76px;
    border-radius: 5px;
    .name {
      color: var(--text-color2);
      font-size: 12px;
    }
    .num-box {
      color: var(--text-color2);
      font-size: 12px;
      .num {
        color: var(--text-color1);
        font-size: 24px;
        font-family: DIN;
        font-weight: bold;
      }
    }
    &.top-item {
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 15px;
      padding-top: 13px;
      padding-left: 14px;
    }
    &.bottom-item {
      .flex(center, center);
    }
    &.drink {
      background: url("@/assets/drink_bg@3x.png") no-repeat center / 100%;
    }
    &.now-time {
      background: url("@/assets/fu_score@3x.png") no-repeat center / 100%;
    }
    &.day_6 {
      background: #feeeeb;
      .img-box {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        background: url("@/assets/cup_icon@3x.png") no-repeat center / 100%;
      }
    }
    &.day_30 {
      background: #e4fbf6;
      .img-box {
        width: 28px;
        height: 24px;
        margin-right: 10px;
        background: url("@/assets/empty_icon@3x.png") no-repeat center / 100%;
      }
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
.report-6 {
  .chart-box {
    width: 100%;
    height: 260px;
    padding: 10px;
  }
}
</style>
