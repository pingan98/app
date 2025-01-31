<script lang="ts" name="ScoreDetail" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getScoreManageDetail, removeScoreManage } from "@/api/scoreManage";
import { formatTime } from "@/utils";
import type { Form } from "@/api/scoreManage/types";
import { POLICE_TYPE_TXT } from "@/const";
import { showConfirmDialog, showSuccessToast } from "vant";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const detailData = ref<Form>();
const judgeRole = userStore.getSomeMenu("scoreManage");

onMounted(() => {
  getScoreManageDetail({ id: route.params.id as string }).then(({ data }) => {
    detailData.value = data || {};
  });
});

const removeFn = async () => {
  await showConfirmDialog({
    title: "温馨提示",
    message: `您确认删除此条信息吗？`
  });
  await removeScoreManage({ id: route.params.id as string });
  showSuccessToast("删除成功");
  await router.back();
};
</script>

<template>
  <div class="score-detail-page detail-bg" v-if="detailData">
    <nav-bar :title="route.meta.title" />

    <div class="base-info-top card info-line-box">
      <div class="info-item">
        <div class="pre-icon"><img src="@/assets/unit_icon@3x.png" /></div>
        <label class="label">责任部门</label>
        <span>{{ detailData?.dutyOrgName }}</span>
      </div>
      <div class="info-item">
        <div class="pre-icon"><img src="@/assets/calendar_icon@3x.png" /></div>
        <label class="label">问题时间</label>
        <span>{{ formatTime(detailData?.queTime) }}</span>
      </div>
      <div class="info-item">
        <div class="pre-icon"><img src="@/assets/address_icon@3x.png" /></div>
        <label class="label">记分单位</label>
        <span>{{ detailData?.inputOrgName }}</span>
      </div>
      <div class="info-item">
        <div class="pre-icon"><img src="@/assets/calendar_icon@3x.png" /></div>
        <label class="label">记分时间</label>
        <span>{{ formatTime(detailData?.scoreTime) }}</span>
      </div>
    </div>
    <!-- <div class="score-desc card">
      <module-box title="记分描述">
        <template v-slot:icon>
          <img src="@/assets/warning_icon@3x.png" alt="" />
        </template>
        <div class="p-[10px]">{{ detailData?.scoreDesc }}</div>
      </module-box>
    </div> -->

    <!-- 责任人 -->
    <div class="duty-list card">
      <div
        class="job-box flex justify-center items-center"
        :class="[`bg${detailData?.scoreType}`]"
      >
        <img
          src="@/assets/police_hat_icon@3x.png"
          alt=""
          class="w-[16px] mr-[4px]"
        />
        {{
          detailData?.scoreType ? POLICE_TYPE_TXT[detailData?.scoreType] : ""
        }}
      </div>

      <div class="flex items-center">
        <div class="w-[54px] h-[54px] rounded-full">
          <img src="@/assets/avatar_bg@3x.png" alt="" />
        </div>
        <div class="score-num">
          <div class="name">{{ detailData?.dutyPoliceName }}</div>
          <div class="num-box">
            分值: <span class="num">{{ detailData?.scoreNum }}</span>
          </div>
        </div>
      </div>
      <div class="score-clause">
        <div class="label">记分条款:</div>
        <div class="desc">{{ detailData?.scoreBasic }}</div>
      </div>
    </div>

    <div class="bottom-action flex justify-between" v-if="judgeRole">
      <van-button
        round
        block
        icon="delete-o"
        type="danger"
        plain
        @click="removeFn"
      >
        删 除
      </van-button>
      <van-button
        round
        block
        icon="edit"
        color="linear-gradient(to right, #037CED, #02C2FA)"
        @click="router.push(`/score/add/${detailData?.id}?type=edit`)"
      >
        编 辑
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.score-detail-page {
  position: relative;
  padding: 46px 10px 10px;
  //padding: 46px 10px 86px;
  //min-height: 100vh;
}

.base-info-top {
  position: relative;
  &::before {
    display: block;
    content: "";
    width: 112%;
    height: 6px;
    border-radius: 4px;
    margin-top: -1px;
    transform: translateX(-20px);
    background: linear-gradient(to bottom, #a9d6ff 0%, #58aeff 100%);
  }
}
.duty-list {
  position: relative;
  padding: 16px;
  .score-num {
    margin-left: 17px;
    .name {
      font-size: 18px;
      font-weight: bold;
    }
    .num-box {
      color: var(--text-color2);
      .num {
        font-size: 16px;
        color: var(--text-color1);
      }
    }
  }
}
.job-box {
  position: absolute;
  top: 11px;
  right: -5px;
  width: 106px;
  height: 30px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #ffffff;
  &.bg0 {
    background: url("@/assets/red_bg@3x.png") no-repeat center / 100%;
  }
  &.bg1 {
    background: url("@/assets/yellow_bg@3x.png") no-repeat center / 100%;
  }
}
.score-clause {
  background: #f4f9fe;
  color: #6f8fbd;
  padding: 5px 9px;
  font-size: 13px;
  border-radius: 5px;
  margin-top: 12px;
  .label {
    display: inline-block;
    width: 110px;
  }
}
</style>
