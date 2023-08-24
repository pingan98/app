<script lang="ts" name="ScoreDetail" setup>
import ModuleBox from "@/components/business/moduleBox.vue";
</script>

<template>
  <div class="score-detail-page">
    <div class="bg"></div>
    <div class="base-info-top card">
      <div class="info-item">
        <div class="pre-icon"><img src="@/assets/unit_icon@3x.png" /></div>
        <label class="label">责任部门</label>
        <span>1</span>
      </div>
      <div class="info-item">
        <div class="pre-icon"><img src="@/assets/calendar@3x.png" /></div>
        <label class="label">问题时间</label>
        <span>1</span>
      </div>
      <div class="info-item">
        <div class="pre-icon"><img src="@/assets/address_icon@3x.png" /></div>
        <label class="label">记分单位</label>
        <span>1</span>
      </div>
      <div class="info-item">
        <div class="pre-icon"><img src="@/assets/calendar@3x.png" /></div>
        <label class="label">记分时间</label>
        <span>1</span>
      </div>
    </div>
    <div class="score-desc card">
      <module-box>
        <template v-slot:icon>
          <img src="@/assets/warning_icon@3x.png" alt="" />
        </template>
        <template v-slot:title>
          <span class="name">记分描述</span>
        </template>
        <div class="p-[10px]">记分描述记分描述记分描述记分描述记分描述</div>
      </module-box>
    </div>

    <!-- 责任人 -->
    <div class="duty-list card">
      <div class="job-box bg1 flex justify-center items-center">
        <img
          src="@/assets/police_hat_icon@3x.png"
          alt=""
          class="w-[16px] mr-[4px]"
        />
        责任民警
      </div>

      <div class="flex items-center">
        <div class="w-[54px] h-[54px] rounded-full">
          <img src="@/assets/avatar_bg@3x.png" alt="" />
        </div>
        <div class="score-num">
          <div class="name">民警姓名</div>
          <div class="num">分值: <span>5.00</span></div>
        </div>
      </div>
      <div class="score-clause">
        <span class="label">记分条款:</span>
        <span class="desc">
          第一条第一款第一项第一条第一款第一项第一条第一款第一项第一条第一款第一项</span
        >
      </div>
    </div>

    <div class="duty-list card">
      <div class="job-box bg2 flex justify-center items-center">
        <img
          src="@/assets/police_hat_icon@3x.png"
          alt=""
          class="w-[16px] mr-[4px]"
        />
        责任民警
      </div>

      <div class="flex items-center">
        <div class="w-[54px] h-[54px] rounded-full">
          <img src="@/assets/avatar_bg@3x.png" alt="" />
        </div>
        <div class="score-num">
          <div class="name">民警姓名</div>
          <div class="num">分值: <span>5.00</span></div>
        </div>
      </div>
      <div class="score-clause">
        <span class="label">记分条款:</span>
        <span class="desc">
          第一条第一款第一项第一条第一款第一项第一条第一款第一项第一条第一款第一项</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.score-detail-page {
  position: relative;
  padding: 10px;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(180deg, #1b91ff 0%, rgba(2, 194, 250, 0) 100%);
}
.card {
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  background: #ffffff;
  margin-bottom: 12px;
}
.base-info-top {
  position: relative;
  padding: 0 16px;

  &::before {
    display: block;
    content: "";
    width: 112%;
    height: 6px;
    border-radius: 4px;
    margin-top: -1px;
    transform: translateX(-20px);
    background: linear-gradient(top, #a9d6ff 0%, #58aeff 100%);
  }
}
.info-item {
  padding: 12px 0;
  border-bottom: 1px solid #efefef;
  .flex(flex-start, flex-top);
  &:last-of-type {
    border-bottom: 0;
  }
  .pre-icon {
    margin-right: 10px;
    img {
      width: 18px;
      height: auto;
    }
  }

  .label {
    display: inline-block;
    color: var(--text-color2);
    width: 90px;
  }

  .value {
    flex: 1;
    .current-place {
      color: #0277fe;
      margin-top: 6px;
    }
  }
}

.duty-list {
  position: relative;
  padding: 16px;
  .score-num {
    margin-left: 17px;
    .name {
      font-size: 18px;
      font-weight: bold;
    }
    .num {
      color: var(--text-color2);
    }
  }
}
.job-box {
  position: absolute;
  top: 11px;
  right: -5px;
  width: 106px;
  height: 30px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #ffffff;
  &.bg1 {
    background: url("@/assets/red_bg@3x.png") no-repeat center / 100%;
  }
  &.bg2 {
    background: url("@/assets/yellow_bg@3x.png") no-repeat center / 100%;
  }
}
.score-clause {
  .flex(flex-start, flex-start);
  background: #f4f9fe;
  color: #6f8fbd;
  padding: 5px 9px;
  font-size: 13px;
  border-radius: 5px;
  margin-top: 12px;
  .label {
    display: inline-block;
    width: 110px;
  }
}
</style>
