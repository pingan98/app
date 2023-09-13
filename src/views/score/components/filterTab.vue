<!--
 * @Description:
 * @Author: 辰月
 * @Date: 2023-09-08 13:36:19
 * @LastEditTime: 2023-09-09 09:46:22
 * @LastEditors: 辰月
-->
<template>
  <div class="filter-tabs">
    <div
      :class="['filter-tab', { 'is-active': tabActive === TAB_TYPE.unit }]"
      @click="onTabChange(TAB_TYPE.unit)"
    >
      <div class="filter-tab_txt">
        {{ filterTabData.dutyOrgName || "部门" }}
        <van-icon class="filter-tab_icon" name="play" />
      </div>
    </div>
    <div
      v-if="props.type === TAB_TYPE.job"
      :class="['filter-tab', { 'is-active': tabActive === TAB_TYPE.job }]"
      @click="onTabChange(TAB_TYPE.job)"
    >
      <div class="filter-tab_txt">
        {{ POLICE_TYPE_TXT[filterTabData.scoreType] || "职务" }}
        <van-icon class="filter-tab_icon" name="play" />
      </div>
    </div>
    <div
      :class="['filter-tab', { 'is-active': tabActive === TAB_TYPE.time }]"
      @click="onTabChange(TAB_TYPE.time)"
    >
      <div class="filter-tab_txt">
        <template v-if="filterTabData.startTime && filterTabData.endTime"
          >{{ filterTabData.startTime }}~{{ filterTabData.endTime }}</template
        ><template v-else>时间</template>
        <van-icon class="filter-tab_icon" name="play" />
      </div>
    </div>
    <van-popup
      v-model:show="showPopup"
      position="bottom"
      safe-area-inset-bottom
      :close-on-click-overlay="false"
    >
      <div class="action-sheet">
        <div class="action-sheet-top">
          <span class="action-sheet-top_btn" @click="onPopupClose('cancel')"
            >取消</span
          >
          <span
            class="action-sheet-top_btn primary"
            @click="onPopupClose('confirm')"
            >确定</span
          >
        </div>

        <div class="action-sheet-body">
          <div class="list-wrap" v-if="tabActive !== TAB_TYPE.time">
            <!-- 职务 -->
            <template v-if="tabActive === TAB_TYPE.job">
              <van-radio-group v-model="jobLocal">
                <van-cell-group>
                  <van-cell
                    :title="item.label"
                    :key="ind"
                    v-for="(item, ind) in jobData"
                    clickable
                    @click="onChoseJob(item.code)"
                  >
                    <template #right-icon>
                      <van-radio :name="item.code" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </template>

            <!-- 部门 -->
            <template v-if="tabActive === TAB_TYPE.unit">
              <c-select-tree-org checkType="single" ref="cOrgRef" />
            </template>
          </div>

          <van-picker-group
            :style="{ height: '70vh' }"
            v-if="tabActive === TAB_TYPE.time"
            :tabs="['开始日期', '结束日期']"
          >
            <template v-slot:toolbar></template>
            <van-date-picker v-model="startTime" :min-date="minDate" />
            <van-date-picker v-model="endTime" :min-date="minDate" />
          </van-picker-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts" name="FilterTab">
import { onMounted } from "vue";
import { ref, watch } from "vue";
import dayjs from "dayjs";
import { toList } from "@/utils";
import { POLICE_TYPE, POLICE_TYPE_TXT } from "@/const";

const emit = defineEmits(["onSearch"]);
const props = defineProps({
  type: {
    type: String,
    default: "job" // TAB_TYPE.unit | TAB_TYPE.job
  }
});
const jobLocal = ref<any>(null);

const filterTabData = ref<any>({});
const startTime = ref<string[]>([]);
const endTime = ref<string[]>([]);
// tab
const TAB_TYPE = {
  unit: "unit",
  job: "job",
  time: "time"
};

const cOrgRef = ref<any>(null);
const tabActive = ref("");

const showPopup = ref(false);

// 职务
const jobData = ref<any>([]);

// 时间
const minDate = dayjs().subtract(10, "year").toDate();
function onTabChange(code: string) {
  if (code === tabActive.value) return false;
  tabActive.value = code;

  showPopup.value = true;
}
const getDutyList = () => {
  jobData.value = toList(POLICE_TYPE, POLICE_TYPE_TXT);
  jobData.value.unshift({
    label: "全部",
    code: ""
  });
};
function resetTab() {
  cOrgRef.value?.resetChecked();
  filterTabData.value = {};
  endTime.value = [];
  startTime.value = [];
  jobLocal.value = null;
}
function onPopupClose(type: string) {
  if (type === "confirm") {
    filterTabData.value.scoreType = jobLocal.value;

    if (cOrgRef.value) {
      const { orgId, orgName } = cOrgRef.value!.getCheckedKeys();
      filterTabData.value.dutyOrgId = orgId;
      filterTabData.value.dutyOrgName = orgName;
    }

    emitChange();
  }
  tabActive.value = "";
  showPopup.value = false;
}

function formatTime(format = "YYYY-MM-DD") {
  if (startTime.value.length && endTime.value.length) {
    const stime = startTime.value.join("-");
    const etime = endTime.value.join("-");
    return [dayjs(stime).format(format), dayjs(etime).format(format)];
  }
  return [];
}

function emitChange() {
  const params = { ...filterTabData.value };

  if (formatTime().length) {
    const [startTime, endTime] = formatTime();
    filterTabData.value.startTime = startTime;
    filterTabData.value.endTime = endTime;
    params.startTime = dayjs(startTime).format("YYYY-MM-DD 00:00:00");
    params.endTime = dayjs(endTime).format("YYYY-MM-DD 23:59:59");
  }

  delete params.dutyOrgName;
  emit("onSearch", params);
}

function onChoseJob(code: string) {
  jobLocal.value = code;
}

onMounted(() => {
  getDutyList();
});

defineExpose({
  resetTab
});
</script>

<style lang="less" scoped>
@import "@/styles/mixin.less";
.filter-tabs {
  display: flex;
  justify-content: space-around;
  padding: 6px 4px 6px 0;
  .filter-tab {
    color: var(--van-text-color);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .filter-tab_txt {
      .ellipsisLine(1);
      padding: 0 14px 0 4px;
      position: relative;
    }
    &.is-active {
      color: var(--van-primary-color);
      .filter-tab_icon {
        color: var(--van-primary-color);
        transition: 500ms transform;
        transform: translateY(-50%) rotate(-90deg);
      }
    }
  }
  .filter-tab_icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    color: var(--van-gray-4);
  }
}

.action-sheet {
  // display: flex;
  // flex-direction: column;
  .action-sheet-top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    .action-sheet-top_btn {
      padding: 8px 10px;
      color: var(--van-gray-6);
      &.primary {
        color: var(--van-primary-color);
      }
    }
  }
  .action-sheet-body {
    height: 70vh;
    .list-wrap {
      padding: 10px;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
