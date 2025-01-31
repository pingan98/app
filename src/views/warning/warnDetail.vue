<script lang="ts" name="WarnDetail" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModuleBox from "@/components/business/moduleBox.vue";
import riskIcon from "@/assets/risk_icon@3x.png";
import noriskIcon from "@/assets/norisk_icon@3x.png";
import defaultIcon from "@/assets/default_rick_icon@3x.png";
import type { Form } from "@/api/tWarnInfo/types";
import type { FormInstance } from "vant";
import { getWarnInfoDetail, postWarnDeal } from "@/api/tWarnInfo";
import { formatTime, toList } from "@/utils";
import { showFailToast, showSuccessToast } from "vant";
import { QK_TYPE, QK_TYPE_TXT, WARN_STATUS } from "@/const";
import { getTCarAlarmPage } from "@/api/tCarAlarm";
const route = useRoute();
const router = useRouter();
const detailData = ref<Form>();
const isEdit = ref(false);
const pageTitle = ref("");
const pageType = ref("");
const qkArr = toList(QK_TYPE, QK_TYPE_TXT);
const relateData = ref<any>([]);
const IS_ORDER = "0";
onMounted(() => {
  getInit();
});
const formRef = ref<FormInstance>();
const formData = ref({
  dealResult: "",
  remark: ""
});
const getInit = async () => {
  const { warnState } = route.query;
  // console.log(warnState);
  pageTitle.value =
    warnState === WARN_STATUS.reviewed ? "审核" : (route.meta.title as string);
  isEdit.value = warnState === WARN_STATUS.reviewed;
  const res = await getWarnInfoDetail({ id: route.params.id as string });
  detailData.value = { ...res.data };
  const { data } = await getTCarAlarmPage({
    page: 1,
    size: 20,
    id: route.params.id as string
  });
  relateData.value = data.records || [];
};
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
const editFn = () => {
  isEdit.value = true;
  const { remark, dealResult } = detailData.value;
  formData.value.remark = remark;
  formData.value.dealResult = dealResult;
};
const submitFn = (isOrder: string) => {
  if (isOrder === IS_ORDER) {
    // const { dealResult, remark } = detailData.value;
    const { dealResult, remark } = formData.value;
    router.push(
      `/warning/report/${
        detailData.value?.id
      }?dealResult=${dealResult}&remark=${encodeURIComponent(remark)}`
    );
    return;
  }

  formRef.value
    ?.validate()
    .then(() => {
      const { dealResult, remark } = formData.value;
      const server = {
        id: detailData.value?.id as string,
        dealResult,
        remark,
        isOrder
      };
      console.log(server);
      if (isOrder === IS_ORDER) {
        router.push(`/warning/report/${detailData.value?.id}`);
        return;
      }

      postWarnDeal(server).then(res => {
        if (res?.code) {
          showSuccessToast("已提交");
          isEdit.value = false;
          router.push(`/warning/detail/${server.id}`);
        }
      });
    })
    .catch(err => {
      //验证失败
      showFailToast("请正确填写信息");
    });
};
</script>

<template>
  <div class="warn-detail-page detail-bg bg-[#fff]">
    <nav-bar :title="pageTitle" />

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
          <div class="info-item" v-if="relateData.length">
            <van-button
              round
              block
              size="small"
              icon-position="right"
              icon="arrow"
              color="linear-gradient(to right, #037CED, #02C2FA)"
              @click="
                $router.push(
                  `/warning/relate/${detailData?.id}?warnModelId=${detailData?.warnModelId}`
                )
              "
            >
              查看相关预警信息
            </van-button>
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
        <van-form v-if="isEdit" ref="formRef">
          <van-field
            class="must"
            label-align="top"
            v-model="formData.remark"
            name="remark"
            rows="1"
            autosize
            label="核查情况反馈："
            type="textarea"
            show-error
            maxlength="100"
            placeholder="请输入核查情况"
            show-word-limit
            :rules="[{ required: true, message: '请输入核查情况' }]"
          />
          <van-field
            label="核查处理结果："
            class="must"
            name="dealResult"
            show-error
            label-align="top"
            :rules="[{ required: true, message: '请选择' }]"
          >
            <template #input>
              <van-radio-group v-model="formData.dealResult">
                <van-radio
                  :name="item.code"
                  v-for="(item, ind) in qkArr"
                  :key="ind"
                  >{{ item.label }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>
        </van-form>
        <div class="p-[10px]" v-else>
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

    <div class="bottom-action flex justify-between">
      <!-- 已处理 -->
      <template v-if="detailData?.warnState === WARN_STATUS.audited">
        <van-button
          v-if="!isEdit"
          round
          block
          color="linear-gradient(to right, #037CED, #02C2FA)"
          @click="editFn"
        >
          编 辑
        </van-button>
        <template v-else>
          <van-button icon="revoke" round type="default" @click="isEdit = false"
            >取消</van-button
          >
          <div class="flex">
            <van-button
              round
              style="width: 100px"
              @click="submitFn('0')"
              v-if="formData.dealResult === QK_TYPE.true"
            >
              上 报
            </van-button>
            <van-button
              round
              style="width: 100px"
              color="linear-gradient(to right, #037CED, #02C2FA)"
              @click="submitFn('1')"
            >
              保 存
            </van-button>
          </div>
        </template>
      </template>

      <!-- 待处理 -->
      <template v-else>
        <van-button
          round
          block
          @click="submitFn('0')"
          v-if="formData.dealResult === QK_TYPE.true"
        >
          上 报
        </van-button>
        <van-button
          round
          block
          color="linear-gradient(to right, #037CED, #02C2FA)"
          @click="submitFn('1')"
        >
          保 存
        </van-button>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.warn-detail-page {
  padding-top: 46px;
  padding-bottom: 86px;
  min-height: 100vh;
  .label {
    color: var(--text-color2);
  }
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
