<script lang="ts" name="UnitPortrait" setup>
import { ref, computed, onMounted } from "vue";
import { toList } from "@/utils";
import { useRoute } from "vue-router";

import {
  POLICE_TYPE,
  POLICE_TYPE_TXT,
  SPECIES,
  SPECIES_Txt
} from "@/const/portrait";
import ViolateDiscipline from "@/views/portrait/components/violateDiscipline.vue";
import PetitionComplain from "@/views/portrait/components/petitionComplain.vue";
import DrinkReport from "@/views/portrait/components/drinkReport.vue";
import HandleCase from "@/views/portrait/components/handleCase.vue";

const searchForm = ref<any>({});
const speciesList = toList(SPECIES, SPECIES_Txt);
const jobType = ref<any>({});
const species = SPECIES;
const activeSpecies = ref<string>(species.wgwj);
const route = useRoute();
const activeName = ref("1");
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
const onTimeChange = val => {
  console.log(searchForm.value);
};
const getDutyList = () => {
  jobType.value = toList(POLICE_TYPE, POLICE_TYPE_TXT);
  jobType.value.unshift({
    label: "全部",
    code: ""
  });
};
const jobChange = item => {
  searchForm.value.scoreType = item.code;
};
</script>

<template>
  <div class="unit-portrait-page">
    <nav-bar :title="route.meta.title" />

    <!-- 搜索框 -->
    <div class="page-search">
      <van-search
        v-model="searchForm.dutyPoliceName"
        shape="round"
        placeholder="请输入"
      />
      <van-dropdown-menu ref="menuRef">
        <van-dropdown-item title="职务">
          <drop-panel>
            <van-radio-group v-model="searchForm.scoreType">
              <van-cell-group inset>
                <van-cell
                  :title="item.label"
                  :key="ind"
                  v-for="(item, ind) in jobType"
                  clickable
                  @click="jobChange(item)"
                >
                  <template #right-icon>
                    <van-radio :name="item.code" />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </drop-panel>
        </van-dropdown-item>
        <van-dropdown-item title="部门">
          <drop-panel>
            <c-select-tree-org />
          </drop-panel>
        </van-dropdown-item>
        <van-dropdown-item title="时间">
          <drop-panel>
            <c-date-range
              v-model="searchForm.times"
              @update:modelValue="onTimeChange"
            ></c-date-range>
          </drop-panel>
        </van-dropdown-item>
      </van-dropdown-menu>
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
.unit-portrait-page {
  padding-top: 46px;
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
