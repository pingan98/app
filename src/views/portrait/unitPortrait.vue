<script lang="ts" name="UnitPortrait" setup>
import { ref, computed } from "vue";
import { toList } from "@/utils";
import { SPECIES, SPECIES_Txt } from "@/views/portrait/const";
import ViolateDiscipline from "@/views/portrait/components/violateDiscipline.vue";
import PetitionComplain from "@/views/portrait/components/petitionComplain.vue";
import DrinkReport from "@/views/portrait/components/drinkReport.vue";
import HandleCase from "@/views/portrait/components/handleCase.vue";

const searchForm = ref({});
const speciesList = toList(SPECIES, SPECIES_Txt);
const species = SPECIES;
const activeSpecies = ref<string>(species.drink);

const compName = computed(() => {
  const compNames = {
    [species.wgwj]: ViolateDiscipline,
    [species.petition]: PetitionComplain,
    [species.drink]: DrinkReport,
    [species.case]: HandleCase
  };
  return compNames[activeSpecies.value];
});
</script>

<template>
  <div class="unit-portrait-page">
    <!-- 搜索框 -->
    <div class="page-search">
      <van-search
        v-model="searchForm.dutyPoliceName"
        shape="round"
        placeholder="请输入"
      />
    </div>
    <div class="unit-portrait-main">
      <div class="nav-box">
        <span
          v-for="(item, ind) in speciesList"
          class="nav-item"
          :key="ind"
          @click="activeSpecies = item.code"
          :class="{ active: item.code === activeSpecies }"
        >
          {{ item.label }}
        </span>
      </div>
      <transition name="van-fade">
        <component :is="compName" />
      </transition>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.page-search {
  margin-bottom: 10px;
}
.unit-portrait-main {
  padding: 16px;
  background: #ffffff;
  width: 100%;
  .nav-box {
    .flex(space-evenly, center);
    margin-bottom: 20px;
    .nav-item {
      display: inline-block;
      width: 80px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background: var(--c-bg);
      border-radius: 13px;
      font-weight: 500;
      font-size: 12px;
      &.active {
        background: linear-gradient(90deg, #037ced 0%, #02c2fa 100%);
        box-shadow: 0px 2px 6px rgba(60, 130, 254, 0.16);
        color: #ffffff;
      }
    }
  }
}
</style>
