<script lang="ts" name="WarningItem" setup>
import ModuleBox from "@/components/business/moduleBox.vue";
import riskIcon from "@/assets/risk_icon@3x.png";
import noriskIcon from "@/assets/norisk_icon@3x.png";
import defaultIcon from "@/assets/default_rick_icon@3x.png";
import type { List } from "@/api/tWarnInfo/types";
import { formatTime } from "@/utils";
import { WARN_STATUS, QK_TYPE } from "@/const";

const props = defineProps<{
  item: List;
}>();
const getColor = () => {
  const obj = {
    [QK_TYPE.true]: "from-[#fff0da] to-[#fffefe]", // 黄色
    [QK_TYPE.false]: "from-[#d0f7ff] to-[#f7fdff]", // 绿色
    [QK_TYPE.follow]: "from-[#d0f7ff] to-[#f7fdff]" // 绿色
  };
  if (props.item?.dealResult && obj[props.item?.dealResult])
    return obj[props.item?.dealResult];
  else return "from-[#d0eaff] to-[#f9fbff]"; // 蓝色
};
</script>

<template>
  <div
    class="warning-item"
    @click="
      $router.push(`/warning/detail/${item.id}?warnState=${item.warnState}`)
    "
  >
    <module-box :bg="getColor()" :title="item.warnName">
      <template v-slot:icon>
        <img
          :src="
            item.dealResult === QK_TYPE.true
              ? riskIcon
              : item.dealResult === QK_TYPE.follow ||
                item.dealResult === QK_TYPE.false
              ? noriskIcon
              : defaultIcon
          "
          alt=""
        />
      </template>
      <!--定位的图标-->
      <div
        class="watermark"
        :class="{
          'bg-risk': item.dealResult === QK_TYPE.true,
          'bg-no-risk': item.dealResult === QK_TYPE.false,
          'bg-follow': item.dealResult === QK_TYPE.follow,
          'bg-record': item.warnState === WARN_STATUS.reviewed
        }"
      ></div>
      <div class="p-[10px]">
        <div class="info-line">
          <span class="label">预警单位：</span>{{ item.warnOrgName }}
        </div>
        <div class="info-line">
          <span class="label">预警人员：</span>{{ item.warnPoliceName }}
        </div>
        <div class="info-line">
          <span class="label">预警时间：</span>{{ formatTime(item.warnTime) }}
        </div>
        <div class="info-line">
          <span class="label">预警地点：</span>{{ item.warnAddredd }}
        </div>
      </div>
    </module-box>
  </div>
</template>

<style scoped lang="less">
.info-line + .info-line,
.warning-item + .warning-item {
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
  &.bg-follow {
    background: url("@/assets/follow_watermelon@3x.png") no-repeat center / 100%;
  }
  &.bg-record {
    background: url("@/assets/record_watermelon@3x.png") no-repeat center / 100%;
  }
}
</style>
