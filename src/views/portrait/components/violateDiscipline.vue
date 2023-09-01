<script lang="ts" name="ViolateDiscipline" setup></script>

<template>
  <div class="violate-discipline">
    <div class="tab-box">
      <div class="tab-item min active">
        <div class="name">民警总记分</div>
        <div class="num">25</div>
      </div>
      <div class="tab-item fu">
        <div class="name">辅警总记分</div>
        <div class="num">25</div>
      </div>
    </div>
    <div class="score-list">
      <div class="score-item van-hairline--bottom">
        <div class="left-img-box">
          <div><span class="num">3</span>分</div>
          <div>记分分值</div>
        </div>
        <div class="right-main-box">
          <div class="kind">
            问题种类问题种类问题种类问题种类问题种类问题种类问题种类问题种类
          </div>
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
          <div class="kind">
            问题种类问题种类问题种类问题种类问题种类问题种类问题种类问题种类
          </div>
          <div class="desc"><span class="label">记分类型：</span>xxx记分</div>
          <div class="desc"><span class="label">记分时间：</span>xxx记分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";

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
      &.active.min::after {
        background: linear-gradient(90deg, #1572f9 0%, #0096ff 100%);
      }
      &.active.fu::after {
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
  .score-list {
    margin-top: 30px;
    .score-item {
      .flex(flex-start,flex-start);
      padding: 10px 0;
      .left-img-box {
        .flex(center, center);
        flex-direction: column;
        width: 100px;
        height: 88px;
        background: url("@/assets/icon1@3x.png") no-repeat center / 78px;
        color: #ffffff;
        .num {
          font-size: 28px;
          font-family: DIN;
          font-weight: bold;
        }
      }
      .right-main-box {
        flex: 1;
        .kind {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 6px;
          .ellipsisLine(2);
        }
        .desc {
          .label {
            color: var(--text-color2);
          }
        }
        .desc + .desc {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
