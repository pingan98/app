<!--
 * @Description:
 * @Author: 辰月
 * @Date: 2023-09-08 13:36:19
 * @LastEditTime: 2023-09-13 13:45:09
 * @LastEditors: 辰月
-->
<template>
  <div class="filter-tabs">
    <div
      :class="['filter-tab', { 'is-active': tabActive === TAB_TYPE.unit }]"
      @click="onTabChange(TAB_TYPE.unit)"
    >
      <div class="filter-tab_txt">
        {{ filterTabData.db33Txt || "单位" }}
        <van-icon class="filter-tab_icon" name="play" />
      </div>
    </div>
    <!-- 个人画像进来的时候需要判断有没有筛选的权限 -->
    <div
      v-if="
        props.type === TAB_TYPE.people && userStore.getSomeMenu('peopleSelect')
      "
      :class="['filter-tab', { 'is-active': tabActive === TAB_TYPE.people }]"
      @click="onTabChange(TAB_TYPE.people)"
    >
      <div class="filter-tab_txt">
        {{ filterTabData.policeHandlingCase || "民警" }}
        <van-icon class="filter-tab_icon" name="play" />
      </div>
    </div>
    <div
      :class="['filter-tab', { 'is-active': tabActive === TAB_TYPE.time }]"
      @click="onTabChange(TAB_TYPE.time)"
    >
      <div class="filter-tab_txt">
        {{ getDate().length ? getDate().join("~") : "时间" }}
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
        <div class="action-sheet-top" v-if="tabActive !== TAB_TYPE.time">
          <span class="action-sheet-top_btn" @click="onPopupClose('cancel')"
            >取消</span
          >
          <span class="action-sheet-top_btn" @click="onPopupClose('confirm')"
            >确认</span
          >
        </div>

        <div class="action-sheet-body">
          <!-- <van-cascader
            v-if="tabActive === TAB_TYPE.unit"
            v-model="db33Local"
            :show-header="false"
            :options="unitData"
            :field-names="{ text: 'shortName', value: 'id' }"
          /> -->
          <div class="list-wrap" v-if="tabActive !== TAB_TYPE.time">
            <template v-if="tabActive === TAB_TYPE.people">
              <van-cell
                :title="item.jyname"
                v-for="item in policeData"
                :key="item.id"
                @click="onChosePeople(item)"
              >
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                  <van-icon
                    v-if="item.jyname === policeHandlingCaseLocal"
                    name="passed"
                    style="color: #1989fa"
                  />
                </template>
              </van-cell>
              <van-empty v-if="!policeData.length" description="暂无数据" />
            </template>
            <template v-if="tabActive === TAB_TYPE.unit">
              <van-cell
                :title="item.orgName"
                v-for="item in unitData"
                :key="item.id"
                @click="onChoseUnit(item)"
              >
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                  <van-icon
                    v-if="item.orgName === db33Local.orgName"
                    name="passed"
                    style="color: #1989fa"
                  />
                </template>
              </van-cell>
              <van-empty v-if="!unitData.length" description="暂无数据" />
            </template>
          </div>

          <!-- <van-calendar
            :show-title="false"
            v-if="tabActive === TAB_TYPE.time"
            :close-on-click-overlay="false"
            :poppable="false"
            :round="false"
            type="range"
            :min-date="minDate"
            :style="{ height: '70vh' }"
            allow-same-day
            :default-date="times"
            @confirm="onConfirmCalendar"
          /> -->
          <van-picker-group
            v-if="tabActive === TAB_TYPE.time"
            :tabs="['开始日期', '结束日期']"
            @cancel="onPopupClose('cancel')"
            @confirm="onPopupClose('confirm')"
          >
            <van-date-picker
              v-model="startDate"
              :min-date="minDate"
              :max-date="maxDate"
            />
            <van-date-picker
              v-model="endDate"
              :min-date="minDate"
              :max-date="maxDate"
            />
          </van-picker-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts" name="FilterTab">
import { getGRHX, getDWHX } from "@/api/personPortrait";

import type {
  IPersonPortraitParam,
  IPersonPortraitUnit
} from "@/views/portrait/types";
import { onMounted } from "vue";
import { ref, watch } from "vue";
import dayjs from "dayjs";
import { showToast } from "vant";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();

const emit = defineEmits(["refresh"]);
const props = defineProps({
  type: {
    type: String,
    default: "people" // TAB_TYPE.unit | TAB_TYPE.people
  }
});

// tab
const TAB_TYPE = {
  unit: "unit",
  people: "people",
  time: "time"
};

const tabActive = ref("");

const showPopup = ref(false);

// 单位
const unitData = ref<any>([]);

// 民警
const policeData = ref<any>([]);

// 时间
const minDate = dayjs().subtract(10, "year").toDate();
const maxDate = dayjs().add(10, "year").toDate();
// const startDate = ref(dayjs().startOf("M").format("YYYY/MM/DD").split("/"));
const startDate = ref((dayjs().year() + "/01/01").split("/"));
const endDate = ref(dayjs().format("YYYY/MM/DD").split("/"));

const filterTabData = ref<IPersonPortraitParam>({
  db33Txt: "",
  startTime: "",
  endTime: "",
  db33: "",
  policeHandlingCase: ""
});
//  临时变量 目的是只有点了确认之后才会更改显示上的值 及发起请求
const db33Local = ref<IPersonPortraitUnit>({});
const policeHandlingCaseLocal = ref(filterTabData.value.policeHandlingCase);

function onTabChange(code: string) {
  if (code === tabActive.value) return false;
  tabActive.value = code;

  // 临时变量的值不等于显示的时，将显示的值初始化给临时变量
  if (db33Local.value.orgId !== filterTabData.value.db33) {
    db33Local.value.orgId = filterTabData.value.db33 || "";
    db33Local.value.orgName = filterTabData.value.db33Txt || "";
  }
  if (policeHandlingCaseLocal.value !== filterTabData.value.db33) {
    policeHandlingCaseLocal.value =
      filterTabData.value.policeHandlingCase || "";
  }
  showPopup.value = true;
}

function onPopupClose(type: string) {
  if (type === "confirm") {
    // 将临时变量赋值显示的值
    if (tabActive.value === TAB_TYPE.unit) {
      filterTabData.value.db33Txt = db33Local.value.orgName;
      filterTabData.value.db33 = db33Local.value.orgId;
    }
    if (policeHandlingCaseLocal.value) {
      filterTabData.value.policeHandlingCase = policeHandlingCaseLocal.value;
    }

    if (tabActive.value === TAB_TYPE.time) {
      const _startDate = dayjs(startDate.value.join("/"));
      const _endDate = dayjs(endDate.value.join("/"));
      if (_startDate.isAfter(_endDate)) {
        showToast("结束日期不能早于开始日期");
        return false;
      }
      filterTabData.value.startTime = _startDate.toString();
      filterTabData.value.endTime = _endDate.toString();
    }

    emitChange();
  }
  tabActive.value = "";
  showPopup.value = false;
}

function emitChange() {
  const params = { ...filterTabData.value };
  delete params.db33Txt;

  const [startTime, endTime] = getDate();
  params.startTime = dayjs(startTime || startDate.value.join("/")).format(
    "YYYY/MM/DD 00:00:00"
  );
  params.endTime = dayjs(endTime || endDate.value.join("/")).format(
    "YYYY/MM/DD 23:59:59"
  );
  emit("refresh", params);
}

function onChosePeople(data: any) {
  policeHandlingCaseLocal.value = data.jyname;
}

function onChoseUnit(data: IPersonPortraitUnit) {
  db33Local.value = data;
}

function getOrgData() {
  getDWHX({}).then(data => {
    unitData.value = data || [];

    db33Local.value = unitData.value[0] || {};

    filterTabData.value.db33 = db33Local.value.orgId;
    filterTabData.value.db33Txt = db33Local.value.orgName;

    if (props.type === TAB_TYPE.unit) {
      emitChange();
    }
  });
}

function getGRHXData() {
  getGRHX({ db33: filterTabData.value.db33 }).then(data => {
    policeData.value = data || [];
    const jyname = policeData.value[0]?.jyname;
    if (jyname) {
      filterTabData.value.policeHandlingCase = jyname;
      emitChange();
    }
  });
}

function getDate(format = "YYYY/MM/DD") {
  const { startTime, endTime } = filterTabData.value;
  return [startTime, endTime].filter(v => v).map(v => dayjs(v).format(format));
}

onMounted(() => {
  getOrgData();
});

watch(
  () => {
    return { ...filterTabData.value };
  },
  (newValue, oldValue) => {
    if (newValue.db33 && newValue.db33 !== oldValue?.db33) {
      if (props.type === TAB_TYPE.people) {
        getGRHXData();
      }
    }
  },
  { deep: true, immediate: true }
);
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
      &:last-child {
        color: var(--van-primary-color);
      }
    }
  }
  .action-sheet-body {
    height: 70vh;
    .list-wrap {
      height: 100%;
      overflow: auto;
    }
  }

  .action-sheet-footer {
    padding: 0 var(--van-padding-md) 6px;
    :deep(.van-button) {
      height: var(--van-calendar-confirm-button-height);
    }
  }
}
</style>
