<script  lang="ts" name="WarningItem" setup>
import { ref } from "vue";
import ModuleBox from "@/components/business/moduleBox.vue";
</script>

<template>
  <div class="warning-item" @click="$router.push(`/warning/detail/111`)">
    <!--绿色  bg="from-[#d0f7ff] to-[#f7fdff]"-->
    <!--蓝色  bg="from-[#d0eaff] to-[#f9fbff]"-->
    <module-box bg="from-[#fff0da] to-[#fffefe]">
      <template v-slot:icon>
        <img src="@/assets/risk_icon@3x.png" alt="" />
        <!--<img src="@/assets/norisk_icon@3x.png" alt="" />-->
        <!--<img src="@/assets/default_rick_icon@3x.png" alt="" />-->
      </template>
      <template v-slot:title>
        <span class="name">预警名称</span>
      </template>
      <!--定位的图标-->
      <div class="watermark bg-risk"></div>
      <div class="p-[10px]">
        <div class="info-line"><span class="label">预警单位：</span>xxx</div>
        <div class="info-line"><span class="label">预警人员：</span>xxx</div>
        <div class="info-line"><span class="label">预警时间：</span>xxx</div>
        <div class="info-line"><span class="label">预警地点：</span>xxx</div>
      </div>
    </module-box>
  </div>
</template>

<style scoped lang="less">
.info-line + .info-line, .warning-item + .warning-item{
  margin-top: 10px;
}
.label {
  color: var(--text-color2);
}
.watermark {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 0;
  width: 90px;
  height: 73px;
  &.bg-risk {
    background: url("@/assets/risk_watermelon@3x.png") no-repeat center / 100%;
  }
  &.bg-no-risk {
    background: url("@/assets/norisk_watermelon@3x.png") no-repeat center / 100%;
  }
  &.bg-record {
    background: url("@/assets/record_watermelon@3x.png") no-repeat center / 100%;
  }
}
</style>
