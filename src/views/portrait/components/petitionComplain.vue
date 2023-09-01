<script lang="ts" name="PetitionComplain" setup>
import { ref } from "vue";
</script>

<template>
  <div class="petition-complain">
    <div class="all-count-box">
      <div class="all-count-item van-hairline--right">
        <div class="name">投诉件总量</div>
        <div><span class="num">27</span>件</div>
      </div>
      <div class="all-count-item van-hairline--right">
        <div class="name">12389派发件</div>
        <div><span class="num">27</span>件</div>
      </div>
      <div class="all-count-item">
        <div class="name">自接件</div>
        <div><span class="num">27</span>件</div>
      </div>
    </div>

    <div class="status-box">
      <div class="status-item-box wait">
        <div class="name">未办结</div>
        <div><span class="num">3</span> 件</div>
      </div>
      <div class="status-item-box true">
        <div class="name">属实</div>
        <div><span class="num">3</span> 件</div>
      </div>
      <div class="status-item-box part-true">
        <div class="name">部分属实</div>
        <div><span class="num">3</span> 件</div>
      </div>
    </div>

    <div class="petition-list">
      <div class="petition-item van-hairline--bottom">
        <div class="left-img-box"></div>
        <div class="right-main-box">
          <div class="name">
            问题种类问题种类问题种类问题种类问题种类问题种类问题种类问题种类
          </div>
          <div class="petition-status">
            <div class="is-right petition-status-box">
              <span class="icon-box true"></span>
              属实
            </div>
            <div class="is-conclude petition-status-box">
              <span class="icon-box true"></span>
              已办结
            </div>
          </div>
          <div class="info-box">
            <div class="info-item"><span class="label">投诉人：</span>xxx</div>
            <div class="info-item">
              <span class="label">投诉方式：</span>xxx
            </div>
            <div class="info-item">
              <span class="label">投诉时间：</span>xxx
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
  .flex(space-evenly);
  padding: 16px 0;
  height: 80px;
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
      font-size: 30px;
      font-family: DIN;
      font-weight: bold;
    }
  }
}
.status-box {
  .flex(space-between);
  margin-top: 13px;
  margin-bottom: 20px;
  .status-item-box {
    padding: 7px 0 7px 45px;
    flex: 32% 0 0;
    color: var(--text-color2);
    border-radius: 5px;
    font-size: 12px;
    .num {
      font-size: 20px;
      font-family: DIN;
      color: var(--text-color1);
      font-weight: bold;
    }
    &.wait {
      background: #fef6f5 url("@/assets/wait_status@3x.png") no-repeat 12px
        center / 26px;
    }
    &.true {
      background: #e4fbf6 url("@/assets/check_right@3x.png") no-repeat 12px
        center / 28px;
    }
    &.part-true {
      background: #e7f3ff url("@/assets/warn_icon1@3x.png") no-repeat 12px
        center / 26px;
    }
  }
}
.petition-list {
  .petition-item {
    .flex(flex-start,flex-start);
    padding: 10px 0;
    .left-img-box {
      width: 40px;
      height: 40px;
      background: url("@/assets/petition_icon@3x.png") no-repeat center / 100%;
    }
    .right-main-box {
      flex: 1;
      margin-left: 10px;
      .name {
        font-weight: bold;
        margin-bottom: 3px;
        .ellipsisLine(2);
      }
      .petition-status {
        .flex(flex-start,center);
        .petition-status-box {
          color: var(--text-color2);
          font-size: 12px;
          .icon-box {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 3px;
          }
        }
        .is-right {
          margin-right: 15px;
          .icon-box {
            &.true {
              background: url("@/assets/pass_icon@3x.png") no-repeat center /
                100%;
            }
            &.false {
              background: url("@/assets/false_icon2@3x.png") no-repeat center /
                100%;
            }
            &.part-true {
              background: url("@/assets/warn_icon2@3x.png") no-repeat center /
                100%;
            }
          }
        }
        .is-conclude {
          .icon-box {
            &.true {
              background: url("@/assets/pass_icon@3x.png") no-repeat center /
                100%;
            }
            &.false {
              background: url("@/assets/false_icon2@3x.png") no-repeat center /
                100%;
            }
          }
        }
      }
      .info-box {
        background: #f8f8f8;
        padding: 8px 11px;
        border-radius: 5px;
        .label {
          display: inline-block;
          width: 70px;
          color: var(--text-color2);
        }
      }
    }
  }
}
</style>
