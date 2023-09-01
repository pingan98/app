<script lang="ts" name="PersonPortrait" setup>
import { ref } from "vue";
import avatar from "@/assets/avatar_bg@3x.png";
const drinkHead = ["饮酒开始时间", "提交报备时间", "是否确认到家"];
import ModuleBox from "@/components/business/moduleBox.vue";

const searchForm = ref({});
</script>

<template>
  <div class="person-portrait-page">
    <!-- 搜索框 -->
    <div class="page-search">
      <van-search
        v-model="searchForm.dutyPoliceName"
        shape="round"
        placeholder="请输入"
      />
    </div>
    <div class="person-portrait-main">
      <div class="all-count-box">
        <div class="all-count-item left-box van-hairline--right">
          <van-image :src="avatar" width="50px" />
          <div>
            <div class="name">张XX</div>
            <div>XX部门</div>
          </div>
        </div>
        <div class="all-count-item right-box">
          <div class="name">记分总分</div>
          <div><span class="num">27</span>分</div>
        </div>
      </div>

      <div class="score-list">
        <div class="score-item van-hairline--bottom">
          <div class="left-img-box">
            <div><span class="num">3</span>分</div>
            <div>记分分值</div>
          </div>
          <div class="right-main-box">
            <div class="kind">记分条款记分条款记分条款记分条款</div>
            <div class="desc"><span class="label">记分类型：</span>xxx记分</div>
            <div class="desc"><span class="label">记分时间：</span>xxx记分</div>
          </div>
        </div>
        <div class="score-item van-hairline--bottom">
          <div class="left-img-box">
            <div><span class="num">3</span>分</div>
            <div>记分分值</div>
          </div>
          <div class="right-main-box">
            <div class="kind">记分条款记分条款记分条款记分条款</div>
            <div class="desc"><span class="label">记分类型：</span>xxx记分</div>
            <div class="desc"><span class="label">记分时间：</span>xxx记分</div>
          </div>
        </div>
      </div>

      <div class="flex-module-box flex justify-between items-center mt-[18px]">
        <module-box
          title="出差情况"
          bg="from-[#d0eaff] to-[#f9fbff]"
          class="w-[48%]"
        >
          <template v-slot:icon>
            <img src="@/assets/sort_icon3@3x.png" alt="" />
          </template>
          <div class="count-box">
            <div class="count-item van-hairline--right">
              <div class="name">出差次数</div>
              <div><span class="num">27</span>次</div>
            </div>
            <div class="count-item">
              <div class="name">出差时长</div>
              <div><span class="num">27</span>小时</div>
            </div>
          </div>
        </module-box>
        <module-box
          title="信访投诉"
          bg="from-[#d0f7ff] to-[#f7fdff]"
          class="w-[48%]"
        >
          <template v-slot:icon>
            <img src="@/assets/sort_icon4@3x.png" alt="" />
          </template>
          <div class="count-box">
            <div class="count-item van-hairline--right">
              <div class="name">信访数</div>
              <div><span class="num">27</span>件</div>
            </div>
            <div class="count-item">
              <div class="name">投诉数</div>
              <div><span class="num">27</span>件</div>
            </div>
          </div>
        </module-box>
      </div>

      <module-box
        title="执法办案"
        bg="from-[#d0dfff] to-[#fbfdfd]"
        class="mt-[18px]"
      >
        <template v-slot:icon>
          <img src="@/assets/sort_icon2@3x.png" alt="" />
        </template>
        <div class="count-box">
          <div class="count-item van-hairline--right">
            <div class="name">办理刑事案件数</div>
            <div><span class="num">27</span>起</div>
          </div>
          <div class="count-item van-hairline--right">
            <div class="name">办理行政案件数</div>
            <div><span class="num">27</span>起</div>
          </div>
          <div class="count-item">
            <div class="name">接处警数</div>
            <div><span class="num">27</span>起</div>
          </div>
        </div>
      </module-box>

      <module-box title="饮酒报备次数：2" class="mt-[18px]">
        <template v-slot:icon>
          <img src="@/assets/sort_icon1@3x.png" alt="" />
        </template>
        <div class="drink-module">
          <div class="drink-module_row is-header">
            <div
              class="drink-module_col"
              v-for="(item, ind) in drinkHead"
              :key="`head_col_${ind}`"
            >
              {{ item }}
            </div>
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

.page-search {
  margin-bottom: 10px;
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
    width: 40%;
    text-align: center;
    .num {
      font-size: 28px;
      font-family: DIN;
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
  }
}
</style>
