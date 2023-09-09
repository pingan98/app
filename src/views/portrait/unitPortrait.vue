<script lang="ts" name="UnitPortrait" setup>
import { ref, computed, onMounted } from "vue";
import { toList } from "@/utils";
import { useRoute } from "vue-router";

import {
  POLICE_TYPE,
  POLICE_TYPE_TXT,
  SPECIES,
  SPECIES_TXT
} from "@/const/portrait";

import ViolateDiscipline from "@/views/portrait/components/violateDiscipline.vue";
import PetitionComplain from "@/views/portrait/components/petitionComplain.vue";
import DrinkReport from "@/views/portrait/components/drinkReport.vue";
import HandleCase from "@/views/portrait/components/handleCase.vue";
import FilterTab from "@/views/portrait/components/filterTab.vue";

const searchForm = ref<any>({});
const speciesList = toList(SPECIES, SPECIES_TXT);
const jobType = ref<any>({});
const species = SPECIES;
const activeSpecies = ref<string | number>(species.wgwj);
const route = useRoute();
const compName = computed(() => {
  const compNames = {
    [species.wgwj]: ViolateDiscipline,
    [species.petition]: PetitionComplain,
    [species.drink]: DrinkReport,
    [species.case]: HandleCase
  };
  return compNames[activeSpecies.value];
});
onMounted(() => {
  getDutyList();
});

const getDutyList = () => {
  jobType.value = toList(POLICE_TYPE, POLICE_TYPE_TXT);
  jobType.value.unshift({
    label: "全部",
    code: ""
  });
};

function refreshData(params: any) {
  searchForm.value = params;
}
</script>

<template>
  <div class="unit-portrait-page">
    <nav-bar :title="route.meta.title" />

    <!-- 搜索框 -->
    <div class="page-search">
      <filter-tab type="unit" @refresh="refreshData"></filter-tab>
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
        <component :params="searchForm" :is="compName" />
      </transition>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.unit-portrait-page {
  padding-top: 88px;
}

.page-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 10;
  border-top: 4px solid #e5e7eb;
  background: #fff;
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
