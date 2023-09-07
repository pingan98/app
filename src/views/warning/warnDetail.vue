<script lang="ts" name="WarnDetail" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ModuleBox from "@/components/business/moduleBox.vue";
import riskIcon from "@/assets/risk_icon@3x.png";
import noriskIcon from "@/assets/norisk_icon@3x.png";
import defaultIcon from "@/assets/default_rick_icon@3x.png";
import type { Form } from "@/api/tWarnInfo/types";
import { getWarnInfoDetail } from "@/api/tWarnInfo";
import { formatTime } from "@/utils";
import { QK_TYPE, QK_TYPE_TXT } from "@/const";
const route = useRoute();
const detailData = ref<Form>();
onMounted(async () => {
  const res = await getWarnInfoDetail({ id: route.params.id as string });
  detailData.value = { ...res.data };
});
const getColor = () => {
  const obj = {
    [QK_TYPE.true]: "from-[#fff0da] to-[#fffefe]", // 黄色
    [QK_TYPE.false]: "from-[#d0f7ff] to-[#f7fdff]", // 绿色
    [QK_TYPE.follow]: "from-[#d0f7ff] to-[#f7fdff]" // 绿色
  };
  if (detailData.value?.dealResult && obj[detailData.value?.dealResult])
    return obj[detailData.value?.dealResult];
  else return "from-[#d0eaff] to-[#f9fbff]"; // 蓝色
};
</script>

<template>
  <div class="warn-detail-page detail-bg bg-[#fff]">
    <nav-bar :title="route.meta.title" />

    <div class="p-[10px]">
      <module-box
        class="mb-[20px]"
        :bg="getColor()"
        :title="detailData?.warnName"
      >
        <template v-slot:icon>
          <img
            :src="
              detailData?.dealResult === QK_TYPE.true
                ? riskIcon
                : detailData?.dealResult === QK_TYPE.follow ||
                  detailData?.dealResult === QK_TYPE.false
                ? noriskIcon
                : defaultIcon
            "
            alt=""
          />
        </template>
        <div class="info-line-box">
          <div class="info-item">
            <div class="pre-icon"><img src="@/assets/unit_icon@3x.png" /></div>
            <label class="label">预警单位</label>
            <span>{{ detailData?.warnName }}</span>
          </div>
          <div class="info-item">
            <div class="pre-icon"><img src="@/assets/user_icon@3x.png" /></div>
            <label class="label">预警人员</label>
            <span>{{ detailData?.warnPoliceName }}</span>
          </div>
          <div class="info-item">
            <div class="pre-icon">
              <img src="@/assets/calendar_icon@3x.png" />
            </div>
            <label class="label">预警时间</label>
            <span>{{ formatTime(detailData?.warnTime) }}</span>
          </div>
          <div class="info-item">
            <div class="pre-icon">
              <img src="@/assets/address_icon@3x.png" />
            </div>
            <label class="label">预警地点</label>
            <span>{{ detailData?.warnAddredd }}</span>
          </div>
        </div>
      </module-box>

      <module-box :bg="getColor()" title="预警处理">
        <template v-slot:icon>
          <img
            :src="
              detailData?.dealResult === QK_TYPE.true
                ? riskIcon
                : detailData?.dealResult === QK_TYPE.follow ||
                  detailData?.dealResult === QK_TYPE.false
                ? noriskIcon
                : defaultIcon
            "
            alt=""
          />
        </template>
        <div class="p-[10px]">
          <div>
            <span class="label">核查处理结果：</span
            ><span>{{ QK_TYPE_TXT[detailData?.dealResult] }}</span>
          </div>
          <div class="remark-box">
            <div class="label">核查情况反馈：</div>
            <div class="desc">{{ detailData?.remark }}</div>
          </div>
        </div>
      </module-box>
    </div>
  </div>
</template>

<style scoped lang="less">
.label {
  color: var(--text-color2);
}
.warn-detail-page {
  padding-top: 46px;
  .remark-box {
    margin-top: 10px;
    background: #f4f9fe;
    padding: 4px 6px;
    border-radius: 5px;
    .label {
      margin-bottom: 4px;
    }
  }
}
</style>
