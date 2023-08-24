<script lang="ts" name="ScoreItem"></script>

<template>
  <div
    class="page-list-item flex justify-start items-start van-hairline--bottom"
    @click="$router.push(`/score/detail/111`)"
  >
    <div class="w-[45px] h-[45px] rounded-full">
      <img src="@/assets/avatar@3x.png" alt="" />
    </div>
    <div class="flex-1 pl-[20px]">
      <div class="flex justify-between">
        <span class="name text-[16px] font-bold">张张张</span>
        <span class="time">2023-07-30</span>
      </div>
      <div class="flex center-line">
        <span class="flex justify-start items-center pr-[10px]"
          ><img
            src="@/assets/idcard_icon@3x.png"
            alt=""
            class="w-[16px] pr-[4px] box-content"
          />民警</span
        >
        <span class="flex justify-start items-center"
          ><img
            src="@/assets/dep_icon@3x.png"
            alt=""
            class="w-[14px] pr-[4px] box-content"
          />部门名称</span
        >
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
.time {
  color: var(--text-color2);
  font-size: 12px;
}
.center-line {
  color: var(--text-color2);
  font-size: 12px;
  margin-bottom: 5px;
}
.score-clause {
  .flex(flex-start, flex-start);
  background: #f8f8f8;
  color: var(--text-color2);
  padding: 5px 9px;
  font-size: 13px;
  border-radius: 5px;
  .label {
    display: inline-block;
    width: 160px;
  }
  .desc {
    .ellipsisLine(2);
  }
}
</style>
