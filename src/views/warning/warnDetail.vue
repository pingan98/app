<script  lang="ts" name="WarnDetail" setup>
import ModuleBox from "@/components/business/moduleBox.vue";
</script>

<template>
  <div class="warn-detail-page detail-bg bg-[#fff]">
    <div class="p-[10px]">
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
        <div class="info-line-box">
          <div class="info-item">
            <div class="pre-icon"><img src="@/assets/unit_icon@3x.png" /></div>
            <label class="label">预警单位</label>
            <span>1</span>
          </div>
          <div class="info-item">
            <div class="pre-icon"><img src="@/assets/user_icon@3x.png" /></div>
            <label class="label">预警人员</label>
            <span>1</span>
          </div>
          <div class="info-item">
            <div class="pre-icon"><img src="@/assets/calendar_icon@3x.png" /></div>
            <label class="label">预警时间</label>
            <span>1</span>
          </div>
          <div class="info-item">
            <div class="pre-icon"><img src="@/assets/address_icon@3x.png" /></div>
            <label class="label">预警地点</label>
            <span>1</span>
          </div>
        </div>
      </module-box>

      <module-box bg="from-[#fff0da] to-[#fffefe]">
        <template v-slot:icon>
          <img src="@/assets/warning_icon@3x.png" alt="" />
        </template>
        <template v-slot:title>
          <span class="name">预警处理</span>
        </template>
        <div class="p-[10px]">
          <div><span class="label">是否存在风险信息：</span><span>是否</span></div>
          <div class="label">核查结果：</div>
          <div class="desc">xxxxxxxxxxx</div>
        </div>
      </module-box>
    </div>

  </div>
</template>

<style scoped lang="less">
.label {
  color: var(--text-color2);
}
</style>
