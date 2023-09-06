<script lang="ts" name="ScoreItem" setup>
import type { List } from "@/api/scoreManage/types";
import { formatTime } from "@/utils";

const props = defineProps<{
  item: List;
}>();
</script>

<template>
  <div
    class="page-list-item flex justify-start items-start van-hairline--bottom van-clearfix"
    @click="$router.push(`/score/detail/111`)"
  >
    <div class="avatar-box rounded-full">
      <img src="@/assets/avatar@3x.png" alt="" />
    </div>

    <div class="item-info-box pl-[20px]">
      <div class="name-box flex justify-between">
        <div class="name text-[16px] font-bold">{{ item.dutyPoliceName }}</div>
        <div class="time">{{ formatTime(item.scoreTime, "YYYY-MM-DD") }}</div>
      </div>
      <div class="flex center-line">
        <span class="flex justify-start items-center"
          ><img
            src="@/assets/dep_icon@3x.png"
            alt=""
            class="w-[14px] pr-[4px] box-content"
          />{{ item.dutyOrgName }}</span
        >
      </div>
      <div class="score-clause">
        <div class="score-clause-item">
          <span class="label">记分单位:</span>
          <span class="desc"> {{ item.inputOrgName }}</span>
        </div>
        <div class="score-clause-item">
          <span class="label">记分条款:</span>
          <span class="desc"> {{ item.scoreBasic }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.page-list-item {
  width: 100%;
  .avatar-box {
    width: 45px;
    height: 45px;
    flex-shrink: 0;
  }
  .item-info-box {
    flex: 1;
    .name-box {
      .name {
        .ellipsis();
        flex: 1;
        width: 0;
      }
      .time {
        width: 62px;
        color: var(--text-color2);
        font-size: 12px;
        flex-shrink: 0;
      }
    }
  }
}

.center-line {
  color: var(--text-color2);
  font-size: 12px;
  margin-bottom: 5px;
}
.score-clause-item {
  .flex(flex-start, flex-start);
  background: #f8f8f8;
  color: var(--text-color2);
  padding: 5px 9px;
  font-size: 13px;
  border-radius: 5px;
  .label {
    display: inline-block;
    width: 60px;
  }
  .desc {
    flex: 1;
    .ellipsisLine(2);
  }
}
</style>
