<script lang="ts" name="HandleCase" setup></script>

<template>
  <div class="handle-case">
    <div class="all-count-box">
      <div class="all-count-item van-hairline--right">
        <div class="name">接处警数</div>
        <div><span class="num">0</span>起</div>
      </div>
      <div class="all-count-item van-hairline--right">
        <div class="name">办理刑事案件数</div>
        <div><span class="num">0</span>起</div>
        <div class="average-deduction">
          平均扣分:<span class="num">0</span>分
        </div>
      </div>
      <div class="all-count-item">
        <div class="name">办理行政案件数</div>
        <div><span class="num">0</span>起</div>
        <div class="average-deduction">
          平均扣分:<span class="num">0</span>分
        </div>
      </div>
    </div>

    <div class="case-list" v-if="false">
      <div class="case-item van-hairline--bottom">
        <div class="left-img-box"></div>
        <div class="right-main-box">
          <div class="name-box">xxx<span class="police-no">035687</span></div>
          <div class="dep-box">
            <img
              src="@/assets/dep_icon@3x.png"
              alt=""
              class="w-[16px] mr-[6px]"
            />
            部门名称
          </div>
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
        </div>
      </div>

      <div class="case-item van-hairline--bottom">
        <div class="left-img-box"></div>
        <div class="right-main-box">
          <div class="name-box">xxx<span class="police-no">035687</span></div>
          <div class="dep-box">
            <img
              src="@/assets/dep_icon@3x.png"
              alt=""
              class="w-[16px] mr-[6px]"
            />
            部门名称
          </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.all-count-box {
  .flex(space-evenly, flex-start);
  padding: 16px 0;
  background: linear-gradient(90deg, #0084ff 0%, #02c2fa 100%);
  box-shadow: 0px 2px 6px rgba(60, 130, 254, 0.16);
  border-radius: 5px;
  .all-count-item {
    flex: 1;
    .flex(center, center);
    flex-direction: column;
    color: #ffffff;
    font-size: 12px;
    .num {
      font-size: 26px;
      font-family: DIN;
      font-weight: bold;
    }
    .average-deduction {
      padding: 0 6px;
      color: #3c82fe;
      background: #ffffff;
      border-radius: 10px;
      .num {
        font-size: 12px;
        font-family: DIN;
      }
    }
  }
}
.case-list {
  margin-top: 20px;
  .case-item {
    .flex(flex-start,flex-start);
    padding: 10px 0;
    .left-img-box {
      border-radius: 50%;
      width: 45px;
      height: 45px;
      background: url("@/assets/avatar@3x.png") no-repeat center / 100%;
    }
    .right-main-box {
      flex: 1;
      margin-left: 10px;
      .name-box {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 3px;
        .police-no {
          margin-left: 10px;
          color: #a5bcdd;
        }
      }
      .dep-box {
        color: var(--text-color2);
        .flex(flex-start, center);
        margin: 5px 0;
      }
      .count-box {
        .flex(space-evenly, flex-start);
        padding: 10px 0;
        background: #f8f8f8;
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
          &.van-hairline--right::after {
            border-color: #dfdfdf;
            //border-bottom-color: red;
          }
        }
      }
    }
  }
}
</style>
