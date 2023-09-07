<script setup lang="ts" name="Myself">
import { useRoute } from "vue-router";
import { MINE_NAV, MINE_NAV_TXT } from "@/const";
import { toList } from "@/utils";
import { computed, ref } from "vue";
import BrowseHistory from "@/views/mine/components/browseHistory.vue";
import UploadRecord from "@/views/mine/components/uploadRecord.vue";
import AuditRecord from "@/views/mine/components/auditRecord.vue";

const route = useRoute();
const species = MINE_NAV;
const activeSpecies = ref<string>(species.audit);
const speciesList = toList(MINE_NAV, MINE_NAV_TXT);
const compName = computed(() => {
  const compNames = {
    [species.audit]: AuditRecord,
    [species.upload]: UploadRecord,
    [species.history]: BrowseHistory
  };
  return compNames[activeSpecies.value];
});
</script>

<template>
  <div class="mine-page detail-bg">
    <nav-bar :title="route.meta.title" />

    <div class="avatar-box flex items-center">
      <div class="w-[54px] h-[54px] pr-[10px] rounded-full">
        <img src="@/assets/avatar_bg@3x.png" alt="" />
      </div>
      <div class="name-box">
        <div class="name">张国伟</div>
        <div class="dep flex">
          <div class="flex items-center mr-[10px]">
            <img
              src="@/assets/dep_icon@3x.png"
              alt=""
              class="w-[14px] mr-[4px]"
            />单位名称单
          </div>
          <div>
            <svg-icon name="tree" class="inline-block mr-[4px]" />部门名称部门
          </div>
        </div>
      </div>
    </div>

    <div class="nav-box">
      <div
        v-for="(item, ind) in speciesList"
        class="nav-item"
        :key="ind"
        @click="activeSpecies = item.code"
        :class="{ active: item.code === activeSpecies }"
      >
        <div class="top-bg" :class="[`bg${ind + 1}`]"></div>
        <div>{{ item.label }}</div>
      </div>
    </div>

    <transition name="van-fade">
      <component :is="compName" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.mine-page {
  position: relative;
  padding: 56px 10px 10px;
  .avatar-box {
    position: relative;
    width: 100%;
    padding: 16px 20px;
    background: #fff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
    margin-bottom: 10px;
    .name-box {
      .name {
        font-weight: bold;
        font-size: 18px;
      }
      .dep {
        color: var(--text-color2);
      }
    }
  }

  .nav-box {
    position: relative;
    .flex(space-between, center);
    padding: 10px 16px;
    width: 100%;
    background: #fff;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
    margin-bottom: 10px;
    .nav-item {
      .flex(center, center);
      flex-direction: column;
      padding: 8px 10px;
      .top-bg {
        width: 42px;
        height: 42px;
        margin-bottom: 4px;
        &.bg1 {
          background: url("@/assets/audit@3x.png") no-repeat center / 100%;
        }
        &.bg2 {
          background: url("@/assets/share@3x.png") no-repeat center / 100%;
        }
        &.bg3 {
          background: url("@/assets/footer@3x.png") no-repeat center / 100%;
        }
      }
      &.active {
        border-radius: 10px;
        background: #e0f3ff;
        color: #1472f9;
        font-weight: bold;
      }
    }
  }
}
</style>
