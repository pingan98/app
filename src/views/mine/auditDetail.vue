<script lang="ts" name="AuditDetail" setup>
import { useRoute } from "vue-router";
import ModuleBox from "@/components/business/moduleBox.vue";
import { onMounted, ref } from "vue";
import {
  ASSIGN_STATUS,
  DISPOSAL_METHOD_TXT,
  POLICE_TYPE_TXT,
  REVIEW_TYPE,
  REVIEW_TYPE_TXT,
  HANDLE_TYPE_TXT
} from "@/const";
import type { Form } from "@/api/tWarnInfo/types";
import { formatTime } from "@/utils";
import { orderDetail } from "@/api/queOrder";

const route = useRoute();
const detailData = ref<Form>();
const processList = ref<any[]>([]);

onMounted(() => {
  getInit();
});
const getDisposalPeople = (data: any) => {
  // console.log(data);
  const arr = data.dutyUserList || [];
  return arr.map((v: any) => {
    const txt = [DISPOSAL_METHOD_TXT[v.dealType]].join();
    return { ...v, txt, policeTypeTxt: POLICE_TYPE_TXT[v.policeType] };
  });
};
const isShowDeal = (data: any) => {
  return ![ASSIGN_STATUS.pending].includes(data.state);
};
const isShowApprove = (data: any) => {
  if (
    !(
      !data.approveResult &&
      ![ASSIGN_STATUS.pending, ASSIGN_STATUS.review].includes(data.state)
    )
  ) {
    return ![ASSIGN_STATUS.pending, ASSIGN_STATUS.review].includes(data.state);
  }
};
const getInit = async () => {
  const { data } = await orderDetail({ orderId: route.params.id as string });
  // console.log(res);
  const tmp = { ...(data || {}) };
  processList.value = [];
  tmp.orderId = tmp.id;
  const dealList = (tmp.dealList || []).reverse();
  const approveList = (tmp.approveList || []).reverse();
  const defRow = {
    state: tmp.state,
    orderId: tmp.id,
    dutyOrgId: tmp.dutyOrgId,
    dutyOrgName: tmp.dutyOrgName
  };
  processList.value = dealList.map((v: any, i: number) => {
    const approve = approveList[i] || {};
    // approveResult 有值说明是驳回数据，那state 另赋一个不是待处理待审核的值
    if (approve.approveResult) {
      v.state = ASSIGN_STATUS.archive;
      approve.state = ASSIGN_STATUS.archive;
    }
    return {
      deal: {
        ...defRow,
        ...v
      },
      approve: {
        ...defRow,
        ...approve,
        approveResult1: approve.approveResult || REVIEW_TYPE.pass
      }
    };
  });
  // 待处理时 得给默认数据
  if (tmp.state === ASSIGN_STATUS.pending) {
    processList.value.push({
      deal: { ...defRow },
      approve: { ...defRow }
    });
  }
  detailData.value = { ...tmp };
};
</script>

<template>
  <div class="audit-detail-page detail-bg">
    <nav-bar :title="route.meta.title" />

    <div class="p-[10px]">
      <module-box
        title="上报信息"
        class="mb-[10px]"
        bg="from-[#d0eaff] to-[#f9fbff]"
      >
        <template v-slot:icon>
          <img src="@/assets/default_rick_icon@3x.png" alt="" />
        </template>
        <div class="info-line-box">
          <div class="info-item">
            <label class="label">问题发生时间</label>
            <span>{{ detailData?.queTime }}</span>
          </div>
          <div class="info-item">
            <label class="label">责任部门</label>
            <span>{{ detailData?.dutyOrgName }}</span>
          </div>
          <div class="info-item">
            <label class="label">责任人</label>
            <span>{{ detailData?.dutyPeopleName }}</span>
          </div>
          <div class="info-item">
            <label class="label">处理期限</label>
            <span>{{ formatTime(detailData?.deadlineTime) }}</span>
          </div>
          <div class="info-item">
            <label class="label">上报时间</label>
            <span>{{ detailData?.orderTime }}</span>
          </div>
          <div class="info-item">
            <label class="label">问题描述</label>
            <span>{{ detailData?.queDesc }}</span>
          </div>
        </div>
      </module-box>

      <template v-for="(item, ind) in processList" :key="ind">
        <module-box
          v-if="isShowDeal(item.deal)"
          title="处理信息"
          class="mb-[10px]"
          bg="from-[#d0f7ff] to-[#f7fdff]"
          :key="`deal_${ind}`"
        >
          <template v-slot:icon>
            <img src="@/assets/norisk_icon@3x.png" alt="" />
          </template>
          <div class="info-line-box">
            <div class="info-item">
              <label class="label">核查结果</label>
              <span>{{ HANDLE_TYPE_TXT[item.deal?.isTrue] }}</span>
            </div>
            <div class="info-item">
              <label class="label">处理情况</label>
              <span>{{ item.deal?.dealStatue }}</span>
            </div>
            <div class="info-item">
              <label class="label">处理时间</label>
              <span>{{ formatTime(item.deal?.inputTime) }}</span>
            </div>
            <div class="table-info-item">
              <div class="label">追责人员</div>
              <div class="drink-module">
                <div class="drink-module_row is-header">
                  <div class="drink-module_col">人员类型</div>
                  <div class="drink-module_col">警员姓名</div>
                  <div class="drink-module_col">拟处置方式</div>
                </div>
                <div class="drink-module_table">
                  <template v-if="getDisposalPeople(item.deal).length">
                    <div
                      class="drink-module_row van-hairline--bottom"
                      :key="peopleIndex"
                      v-for="(peopleItem, peopleIndex) in getDisposalPeople(
                        item.deal
                      )"
                    >
                      <div class="drink-module_col">
                        {{ peopleItem.policeTypeTxt }}
                      </div>
                      <div class="drink-module_col">
                        {{ peopleItem.policeName }}
                      </div>
                      <div class="drink-module_col">{{ peopleItem.txt }}</div>
                    </div>
                  </template>
                  <div v-else class="text-center">暂无数据</div>
                </div>
              </div>
            </div>
          </div>
        </module-box>

        <module-box
          title="审核信息"
          class="mb-[10px]"
          :key="`approve_${ind}`"
          v-if="isShowApprove(item.approve)"
        >
          <template v-slot:icon>
            <img src="@/assets/risk_icon@3x.png" alt="" />
          </template>
          <div class="info-line-box">
            <div class="info-item">
              <label class="label">审核结果</label>
              <span>{{ REVIEW_TYPE_TXT[item.approve?.approveResult1] }}</span>
            </div>
            <div class="info-item">
              <label class="label">审核时间</label>
              <span>{{ formatTime(item.approve?.inputTime) }}</span>
            </div>
            <div class="info-item">
              <label class="label">是否列管跟办</label>
              <span>{{ item.approve?.isLggb === "1" ? "是" : "否" }}</span>
            </div>
            <div class="info-item">
              <label class="label">审核意见</label>
              <span>{{ item.approve?.approveDesc }}</span>
            </div>
          </div>
        </module-box>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.audit-detail-page {
  padding-top: 50px;
  min-height: calc(100vh - 64px);
}
.table-info-item {
  padding: 10px 0;
  .label {
    color: var(--text-color2);
  }
}
.drink-module {
  width: 100%;
  padding-top: 10px;
  &_table {
    max-height: 280px;
    margin: 0 auto;
    overflow-y: auto;
  }
  &_row {
    color: #666666;
    .flex(flex-start, center);
    &.is-header {
      height: 36px;
      background: #edeff3;
      font-size: 12px;
    }
  }
  &_col {
    text-align: center;
    width: 33.33%;
    padding: 5px 0;
  }
}
</style>
