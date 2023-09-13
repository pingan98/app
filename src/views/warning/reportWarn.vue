<script lang="ts" name="ReportWarn" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Form, ReportFrom } from "@/api/tWarnInfo/types";
import { getWarnInfoDetail, postWarnDeal } from "@/api/tWarnInfo";
import { addQueOrder } from "@/api/queOrder";
import type { FormInstance } from "vant";
import dayjs from "dayjs";
import { showFailToast, showSuccessToast } from "vant";
import { QK_TYPE } from "@/const";
import CFile from "@/components/business/cFile.vue";

const route = useRoute();
const router = useRouter();
const IS_ORDER = "0";
const loading = ref(false);
const formRef = ref<FormInstance>();
const orgShow = ref(false);
const formData = ref<ReportFrom>({
  connId: "",
  dutyOrgId: "",
  dutyOrgName: "",
  queTime: "",
  queDesc: "",
  dutyPeopleName: ""
});

onMounted(async () => {
  const res = await getWarnInfoDetail({ id: route.params.id as string });
  const { id, warnOrgId, warnOrgName, warnTime, warnPoliceName } = res!.data;
  const obj = {
    connId: id,
    dutyOrgId: warnOrgId,
    dutyOrgName: warnOrgName,
    queTime: dayjs(warnTime).format("YYYY-MM-DD HH:mm:ss"),
    dutyPeopleName: warnPoliceName,
    queDesc: ""
  };
  const { remark } = route.query;
  obj.queDesc = remark as string;
  formData.value = obj;
});
const onConfirmOrg = (val: any) => {
  orgShow.value = false;
  // console.log("执行", val);
  if (Array.isArray(val)) {
    // console.log("回显", val);
    formData.value!.dutyOrgId = val.map((item: any) => item.id).join(",");
    formData.value!.dutyOrgName = val
      .map((item: any) => item.shortName)
      .join(",");
  } else {
    const { orgId, orgName } = val;
    formData.value!.dutyOrgId = orgId;
    formData.value!.dutyOrgName = orgName;
  }
};
const submitFn = () => {
  formRef.value
    ?.validate()
    .then(() => {
      const { connId, queDesc } = formData.value;

      postWarnDeal({
        id: connId,
        dealResult: QK_TYPE.true,
        remark: queDesc,
        isOrder: IS_ORDER
      }).then(({ code }) => {
        if (code) {
          addQueOrder(formData.value).then(({ code }) => {
            if (code) {
              showSuccessToast("已提交");
              router.push(`/warning/detail/${connId}`);
            } else {
              showFailToast("提交失败");
            }
          });
        }
      });
    })
    .catch(error => {
      showFailToast("请正确填写信息");
    });
};
</script>

<template>
  <div class="report-warn-page">
    <nav-bar :title="route.meta.title" />

    <van-form ref="formRef">
      <van-field
        v-model="formData.queTime"
        name="queTime"
        label="问题时间"
        placeholder="问题时间"
        :rules="[{ required: true, message: '请选择' }]"
        class="is-required"
        readonly
      />
      <van-field
        v-model="formData.queDesc"
        rows="2"
        autosize
        label="问题备注"
        type="textarea"
        placeholder="问题备注"
        class="is-required"
      />
      <van-field
        v-model="formData.dutyOrgName"
        name="dutyOrgId"
        label="责任部门"
        :rules="[{ required: true, message: '请选择' }]"
        placeholder="责任部门"
        class="is-required"
        @click="orgShow = true"
        clickable
        readonly
        is-link
      />
      <van-field
        v-model="formData.dutyPeopleName"
        label="责任人"
        placeholder="责任人"
        class="is-required"
      />
      <van-field name="uploader">
        <template #input>
          <c-file
            :order-id="formData.connId"
            bus-type="上报预览"
            module-id="assignAdd"
          />
        </template>
      </van-field>
    </van-form>

    <div class="bottom-action">
      <van-button
        round
        block
        :loading="loading"
        color="linear-gradient(to right, #037CED, #02C2FA)"
        @click="submitFn"
      >
        确认上报
      </van-button>
    </div>

    <!-- 部门 -->
    <org-popup
      v-if="orgShow"
      :show-picker="orgShow"
      check-type="single"
      v-model:model-value="formData.dutyOrgId"
      @onCancel="orgShow = false"
      @onConfirm="onConfirmOrg"
    />
  </div>
</template>

<style scoped lang="less">
.report-warn-page {
  padding-top: 46px;
}
</style>
