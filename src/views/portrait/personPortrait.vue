<script lang="ts" name="PersonPortrait" setup>
import { ref } from "vue";
import ModuleBox from "@/components/business/moduleBox.vue";
import FilterTab from "@/views/portrait/components/filterTab.vue";
import { getZJ, getPerScoreList } from "@/api/personPortrait";

import { useRoute } from "vue-router";

import avatar from "@/assets/avatar_bg@3x.png";

const route = useRoute();

const bean = ref<any>({});
const scoreBean = ref<any>({});

function getData(params: any) {
  getZJ(params).then(data => {
    bean.value = data || {};
    // console.log("bean.value :>> ", bean.value);
  });
  const REG =
    /第[一二三四五六七八九十百千万]*条第[一二三四五六七八九十百千万]*项/;

  getPerScoreList(params).then(data => {
    (data.rtnList || []).forEach(item => {
      // 记分条款显示会太长 只显示第几条第几款
      let simpleScore = "";
      const matchRes = item.queType.match(REG);
      if (matchRes && matchRes.length) {
        simpleScore = matchRes[0];
      } else {
        simpleScore = item.queType;
      }
      item.simpleScore = simpleScore;
    });
    scoreBean.value = data;
  });
}

function refreshData(param: any) {
  getData(param);
}
</script>

<template>
  <div class="person-portrait-page">
    <nav-bar :title="route?.meta?.title" />

    <!-- 搜索框 -->
    <div class="page-search">
      <filter-tab @refresh="refreshData"></filter-tab>
    </div>
    <van-empty v-if="!bean.police?.jyname" description="暂无数据" />
    <div class="person-portrait-main" v-else>
      <div class="all-count-box">
        <div class="all-count-item left-box">
          <!--<van-image :src="bean.police?.photoPath || avatar" width="50px" />-->
          <van-image :src="avatar" width="50px" />
          <div>
            <div class="name">{{ bean.police?.jyname || "" }}</div>
            <div>{{ bean.orgName || "" }}</div>
          </div>
        </div>
        <div class="right-box">
          <div
            class="count-item"
            v-if="Number(bean.punishData.rulePunish || '')"
          >
            <span>局纪局规处理</span
            ><span class="num">{{ bean.punishData.rulePunish || 0 }}</span>
          </div>
          <div
            class="count-item"
            v-if="Number(bean.punishData.govPunish || '')"
          >
            <span>党纪政务处分</span
            ><span class="num">{{ bean.punishData.govPunish || 0 }}</span>
          </div>
        </div>
      </div>

      <div class="flex-module-box flex justify-between items-center mt-[18px]">
        <module-box
          title="队伍记分"
          bg="from-[#d0eaff] to-[#f9fbff]"
          class="flex-1"
        >
          <template v-slot:icon>
            <img src="@/assets/sort_icon3@3x.png" alt="" />
          </template>
          <div class="count-box">
            <div class="count-item van-hairline--right">
              <div class="name">数量</div>
              <div>
                <span class="num">{{
                  Number(scoreBean.scoreNum || "") || "-"
                }}</span>
              </div>
            </div>
            <div class="count-item van-hairline--right">
              <div class="name">总记分</div>
              <div>
                <span class="num">{{
                  Number(scoreBean.totalScoreNum || "") || "-"
                }}</span>
              </div>
            </div>
            <div class="count-item">
              <div class="name">单位排名</div>
              <div>
                <span class="num">{{
                  Number(scoreBean.scoreRank || "") || "-"
                }}</span>
              </div>
            </div>
          </div>
        </module-box>
        <module-box
          v-if="
            bean?.caseData?.handlePoliceNumber &&
            bean?.caseData?.handlePoliceNumber != 0
          "
          title="接处警"
          bg="from-[#d0f7ff] to-[#f7fdff]"
          class="w-[40%] ml-[10px]"
        >
          <template v-slot:icon>
            <img src="@/assets/sort_icon4@3x.png" alt="" />
          </template>

          <div class="count-box">
            <div class="count-item van-hairline--right">
              <div class="name">数量</div>
              <div>
                <span class="num">{{
                  bean.caseData.handlePoliceNumber || 0
                }}</span>
              </div>
            </div>
            <div class="count-item">
              <div class="name">单位排名</div>
              <div>
                <span class="num">{{ bean.caseData.ranking || 0 }}</span>
              </div>
            </div>
          </div>
        </module-box>
      </div>

      <div class="score-list" v-if="scoreBean.rtnList">
        <div
          class="score-item van-hairline--bottom"
          v-for="(item, ind) in scoreBean.rtnList"
          :key="ind"
        >
          <div class="left-img-box">
            <div>
              <span class="num">{{ item.scoreNum || 0 }}</span
              >分
            </div>
            <div>记分分值</div>
          </div>
          <div class="right-main-box">
            <div class="kind">{{ item.simpleScore || "" }}</div>
            <div class="desc">
              <span class="label">记分类型：</span>{{ item.scoreType || "" }}
            </div>
            <div class="desc">
              <span class="label">记分时间：</span>{{ item.createTime || "" }}
            </div>
          </div>
        </div>
      </div>

      <!-- TODO: 此处没找到相关接口 -->
      <module-box title="饮酒报备次数：2" class="mt-[18px]" v-if="false">
        <template v-slot:icon>
          <img src="@/assets/sort_icon1@3x.png" alt="" />
        </template>
        <div class="drink-module">
          <div class="drink-module_row is-header">
            <div class="drink-module_col">饮酒开始时间</div>
            <div class="drink-module_col">提交报备时间</div>
            <div class="drink-module_col">是否确认到家</div>
          </div>
          <div class="drink-module_table">
            <div class="drink-module_row van-hairline--bottom">
              <div class="drink-module_col">2023-08-23 15:47:36</div>
              <div class="drink-module_col">2023-08-23 15:47:36</div>
              <div class="drink-module_col">是</div>
            </div>
            <div class="drink-module_row van-hairline--bottom">
              <div class="drink-module_col">2023-08-23 15:47:36</div>
              <div class="drink-module_col">2023-08-23 15:47:36</div>
              <div class="drink-module_col">是</div>
            </div>
          </div>
        </div>
      </module-box>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
@import "./style/index.less";

.person-portrait-page {
  padding-top: 88px;
  // padding-top: 140px;
}

.page-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 10;
  border-top: 4px solid #e5e7eb;
  background: #fff;
}

.person-portrait-main {
  background: #ffffff;
  padding: 16px;
}

.all-count-box {
  .flex(space-between, center);
  padding: 16px;
  height: 90px;
  color: #ffffff;
  background: linear-gradient(90deg, #0084ff 0%, #02c2fa 100%);
  box-shadow: 0px 2px 6px rgba(60, 130, 254, 0.16);
  border-radius: 5px;

  .left-box {
    flex: 1;
    .flex(flex-start, center);

    .van-image {
      margin-right: 16px;
    }

    .name {
      font-size: 20px;
      font-family: Source Han Sans SC;
      font-weight: bold;
    }
  }

  .right-box {
    flex-shrink: 0;
    text-align: center;

    .count-item {
      background: rgba(255, 255, 255, 0.39);
      height: 26px;
      width: 130px;
      border-radius: 3px;
      color: #ffffff;

      .num {
        font-size: 18px;
        font-family: DIN;
        font-weight: bold;
        margin-left: 10px;
      }
      & + .count-item {
        margin-top: 10px;
      }
    }
  }
}

.count-box {
  .flex(space-evenly, flex-start);
  padding: 10px 0;
  background: #ffffff;
  border-radius: 5px;

  .count-item {
    flex: 1;
    .flex(center, center);
    flex-direction: column;
    color: var(--text-color2);
    font-size: 12px;

    .num {
      font-size: 20px;
      font-family: DIN;
      font-weight: bold;
      color: var(--text-color1);
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
    width: 33.33%;
    padding: 5px 0;
    font-size: inherit;
  }
}
</style>
