<script lang="ts" name="ScoreAdd" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { POLICE_TYPE } from "@/const";
import type { Form } from "@/api/scoreManage/types";
import type { FormInstance, FieldRule } from "vant";
import { showFailToast, showSuccessToast } from "vant";
import {
  addScoreManage,
  getScoreManageDetail,
  editScoreManage
} from "@/api/scoreManage";
import { NUMBERREG } from "@/const/reg";
import { refreshPage } from "@/utils";

const route = useRoute();
const router = useRouter();

const pageType = ref("");
const loading = ref(false);
const timeShow = ref(false);
const timeKey = ref<"queTime" | "scoreTime">();
const orgShow = ref(false);
const orgKey = ref<"dutyOrgId" | "inputOrgId">();
const policeShow = ref(false);
const questionShow = ref(false);
const policeIndex = ref<number>(0);
const policeType = ref("-1");
const formRef = ref<FormInstance>();

// 表单校验
const scoreNumRules: FieldRule[] = [
  { required: true, message: "请输入分值" },
  { pattern: NUMBERREG, message: "请输入数字" }
];

const formData = ref<Form>({
  scoreTime: "",
  queTime: "",
  dutyOrgName: "",
  dutyOrgId: "",
  inputOrgId: "",
  inputOrgName: ""
});
// 因为直接把这俩数组放在formData里 页面会循环出个police和auxPolice，暂时分开写
const policeForm = ref({
  police: [
    {
      dutyOrgId: "",
      dutyOrgName: "",
      dutyPoliceName: "",
      dutyPoliceNo: "",
      idcard: "",
      scoreNum: "",
      questionName: "",
      questionTypeId: "",
      scoreBasic: "",
      scoreBasicId: ""
    }
  ],
  auxPolice: [
    {
      dutyOrgId: "",
      dutyOrgName: "",
      dutyPoliceName: "",
      dutyPoliceNo: "",
      idcard: "",
      scoreNum: "",
      questionName: "",
      questionTypeId: "",
      scoreBasic: "",
      scoreBasicId: ""
    }
  ]
});

onMounted(async () => {
  pageType.value = route.query.type as string;
  const id = route.params.id as string;
  if (id) {
    const { data } = await getScoreManageDetail({ id });
    formData.value = { ...data };
    // policeForm.value =
  }
});

const getTitle = (val: "add" | "edit") => {
  const temp = {
    add: "新增",
    edit: "编辑"
  };
  return temp[val];
};

const formatPolice = (data: any, scoreType: string) => {
  const { dutyOrgId, dutyOrgName } = formData.value;
  return data
    .filter((v: any) => v.dutyPoliceName)
    .map((v: any) => {
      const {
        dutyPoliceNo,
        dutyPoliceName,
        idcard,
        scoreNum,
        questionTypeId,
        scoreBasic,
        scoreBasicId
      } = v;
      return {
        scoreType,
        dutyOrgId,
        dutyOrgName,
        dutyPoliceNo,
        dutyPoliceName,
        idcard,
        scoreNum,
        scoreBasic,
        scoreBasicId,
        questionTypeId
      };
    });
};

const submitFn = () => {
  const { police, auxPolice } = policeForm.value;
  const { scoreTime, queTime, ...form } = formData.value;
  const detailsList = [
    ...formatPolice(police, POLICE_TYPE.min),
    ...formatPolice(auxPolice, POLICE_TYPE.fu)
  ];
  // console.log(dataList);
  const serve = {
    detailsList,
    scoreTime: scoreTime,
    queTime: queTime,
    ...form
  };
  // console.log(serve);

  // showSuccessToast("已提交");
  // refreshPage();

  formRef.value
    ?.validate()
    .then(() => {
      // console.log("通过");
      addScoreManage(serve).then((code: any, msg?: string) => {
        if (code) {
          showSuccessToast("已提交");
          router.push("/score");
        } else {
          if (msg) showFailToast(msg);
        }
      });
    })
    .catch(err => {
      //验证失败
      showFailToast("请正确填写信息");
    });
};

const addFn = (type: "police" | "auxPolice") => {
  policeForm.value[type].push({
    dutyOrgId: "",
    dutyOrgName: "",
    dutyPoliceName: "",
    dutyPoliceNo: "",
    idcard: "",
    scoreNum: "",
    questionName: "",
    questionTypeId: "",
    scoreBasic: "",
    scoreBasicId: ""
  });
};
const delFn = (type: "police" | "auxPolice", index: number) => {
  policeForm.value[type].splice(index, 1);
};
const changeOrgPop = (key: "dutyOrgId" | "inputOrgId") => {
  orgKey.value = key;
  orgShow.value = true;
};
const onConfirmOrg = (val: any) => {
  orgShow.value = false;
  if (orgKey.value === "dutyOrgId") {
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
  } else if (orgKey.value === "inputOrgId") {
    if (Array.isArray(val)) {
      // console.log("回显", val);
      formData.value!.inputOrgId = val.map((item: any) => item.id).join(",");
      formData.value!.inputOrgName = val
        .map((item: any) => item.label)
        .join(",");
    } else {
      const { orgId, orgName } = val;
      formData.value!.inputOrgId = orgId;
      formData.value!.inputOrgName = orgName;
    }
  }
};

const changePolice = (type: string, index: number, popType?: string) => {
  policeType.value = type;
  policeIndex.value = index;

  if (popType === "question") {
    questionShow.value = true;
  } else {
    policeShow.value = true;
  }
};
const onConfirmPolice = (val: any) => {
  // console.log(val);
  // console.log(val.idcard);
  policeShow.value = false;
  if (policeType.value === POLICE_TYPE.min) {
    policeForm.value.police[policeIndex.value].dutyPoliceName = val.jyname;
    policeForm.value.police[policeIndex.value].dutyPoliceNo = val.jycode;
    policeForm.value.police[policeIndex.value].idcard = val.idcard;
  } else if (policeType.value === POLICE_TYPE.fu) {
    policeForm.value.auxPolice[policeIndex.value].dutyPoliceName = val.jyname;
    policeForm.value.auxPolice[policeIndex.value].dutyPoliceNo = val.jycode;
    policeForm.value.auxPolice[policeIndex.value].idcard = val.idcard;
  }
};
const onConfirmQuestion = (val: any) => {
  // console.log(val);
  questionShow.value = false;
  if (policeType.value === POLICE_TYPE.min) {
    policeForm.value.police[policeIndex.value].questionName = val.name;
    policeForm.value.police[policeIndex.value].questionTypeId = val.id;
    policeForm.value.police[policeIndex.value].scoreNum = val.score;
    policeForm.value.police[policeIndex.value].scoreBasic = val.labels_txt;
    policeForm.value.police[policeIndex.value].scoreBasicId = val.ids_txt;
  } else if (policeType.value === POLICE_TYPE.fu) {
    policeForm.value.auxPolice[policeIndex.value].questionName = val.name;
    policeForm.value.auxPolice[policeIndex.value].questionTypeId = val.id;
    policeForm.value.auxPolice[policeIndex.value].scoreNum = val.score;
    policeForm.value.auxPolice[policeIndex.value].scoreBasic = val.labels_txt;
    policeForm.value.auxPolice[policeIndex.value].scoreBasicId = val.ids_txt;
  }
};
const changeTimePop = (key: "queTime" | "scoreTime") => {
  timeKey.value = key;
  timeShow.value = true;
};
</script>

<template>
  <div class="score-add-page">
    <nav-bar :title="getTitle(route.query?.type || '')" />

    <div class="score-form">
      <van-form ref="formRef">
        <van-cell-group>
          <van-field
            v-model="formData.queTime"
            name="queTime"
            label="问题时间"
            placeholder="问题时间"
            :rules="[{ required: true, message: '请选择' }]"
            @click="changeTimePop('queTime')"
            class="is-required"
            readonly
            clickable
            is-link
          />
          <van-field
            v-model="formData.dutyOrgName"
            name="dutyOrgId"
            label="责任部门"
            :rules="[{ required: true, message: '请选择' }]"
            placeholder="责任部门"
            class="is-required"
            @click="changeOrgPop('dutyOrgId')"
            readonly
            clickable
            is-link
          />
        </van-cell-group>
        <div class="duty-man">
          <div class="police-man mb-[10px]">
            <module-box
              class="mb-[10px]"
              title="责任民警"
              v-for="(item, ind) in policeForm.police"
              :key="ind"
            >
              <template v-slot:icon>
                <img src="@/assets/police_hat_icon_active@3x.png" alt="" />
              </template>
              <template v-slot:op v-if="ind !== 0">
                <div class="flex items-center" @click="delFn('police', ind)">
                  <van-icon name="delete-o" color="#5c7195" size="18" />
                  <span class="text-[#5c7195]">删除</span>
                </div>
              </template>
              <van-field
                v-model="item.dutyPoliceName"
                name="dutyPoliceNo"
                :rules="
                  policeForm.auxPolice.filter(v => v.dutyPoliceName).length > 0
                    ? []
                    : [{ required: true, message: '请选择' }]
                "
                :class="{
                  'is-required':
                    policeForm.auxPolice.filter(v => v.dutyPoliceName)
                      .length === 0
                }"
                label="责任民警"
                placeholder="责任民警"
                @click="changePolice(POLICE_TYPE.min, ind)"
                readonly
                clickable
                is-link
              />
              <van-field
                v-model="item.questionName"
                name="questionName"
                :rules="
                  item.dutyPoliceName
                    ? [{ required: true, message: '请选择' }]
                    : []
                "
                :class="{ 'is-required': !!item.dutyPoliceName }"
                label="记分条款"
                placeholder="记分条款"
                @click="changePolice(POLICE_TYPE.min, ind, 'question')"
                readonly
                clickable
                is-link
              />
              <van-field
                v-model="item.scoreNum"
                :rules="item.dutyPoliceName ? scoreNumRules : []"
                :class="{ 'is-required': !!item.dutyPoliceName }"
                name="scoreNum"
                label="分值"
                placeholder="分值"
              />
            </module-box>

            <van-button
              type="primary"
              block
              plain
              icon="plus"
              @click="addFn('police')"
              >新增责任民警</van-button
            >
          </div>
          <div class="police-man">
            <module-box
              class="mb-[10px]"
              title="责任辅警"
              v-for="(item, ind) in policeForm.auxPolice"
              :key="ind"
            >
              <template v-slot:icon>
                <img src="@/assets/police_hat_icon_active@3x.png" alt="" />
              </template>
              <template v-slot:op v-if="ind !== 0">
                <div class="flex items-center" @click="delFn('auxPolice', ind)">
                  <van-icon name="delete-o" color="#5c7195" size="18" />
                  <span class="text-[#5c7195]">删除</span>
                </div>
              </template>
              <van-field
                v-model="item.dutyPoliceName"
                :rules="
                  policeForm.police.filter(v => v.dutyPoliceName).length > 0
                    ? []
                    : [{ required: true, message: '请选择' }]
                "
                :class="{
                  'is-required':
                    policeForm.police.filter(v => v.dutyPoliceName).length === 0
                }"
                name="police"
                label="责任辅警"
                placeholder="责任辅警"
                @click="changePolice(POLICE_TYPE.fu, ind)"
                readonly
                clickable
                is-link
              />
              <van-field
                v-model="item.questionName"
                name="questionName"
                :rules="
                  item.dutyPoliceName
                    ? [{ required: true, message: '请选择' }]
                    : []
                "
                :class="{ 'is-required': !!item.dutyPoliceName }"
                label="记分条款"
                placeholder="记分条款"
                @click="changePolice(POLICE_TYPE.fu, ind, 'question')"
                readonly
                clickable
                is-link
              />
              <van-field
                v-model="item.scoreNum"
                name="scoreNum"
                :rules="item.dutyPoliceName ? scoreNumRules : []"
                :class="{ 'is-required': !!item.dutyPoliceName }"
                label="分值"
                placeholder="分值"
              />
            </module-box>
            <van-button
              type="primary"
              block
              plain
              icon="plus"
              @click="addFn('auxPolice')"
              >新增责任辅警</van-button
            >
          </div>
        </div>
        <van-cell-group>
          <van-field
            v-model="formData.scoreTime"
            name="scoreTime"
            label="记分时间"
            placeholder="记分时间"
            :rules="[{ required: true, message: '请选择时间' }]"
            @click="changeTimePop('scoreTime')"
            class="is-required"
            readonly
            clickable
            is-link
          />
          <van-field
            v-model="formData.inputOrgName"
            name="inputOrgName"
            label="记分单位"
            placeholder="记分单位"
            :rules="[{ required: true, message: '请选择' }]"
            @click="changeOrgPop('inputOrgId')"
            class="is-required"
            readonly
            clickable
            is-link
          />
          <van-field
            v-model="formData.scoreDesc"
            rows="1"
            autosize
            label="记分描述"
            type="textarea"
            placeholder="记分描述"
          />
        </van-cell-group>
      </van-form>
    </div>

    <div class="bottom-action flex justify-between">
      <van-button
        round
        block
        :loading="loading"
        color="linear-gradient(to right, #037CED, #02C2FA)"
        @click="submitFn"
      >
        提 交
      </van-button>
    </div>

    <!-- 责任民警/辅警 -->
    <police-popup
      :show-picker="policeShow"
      :org-id="formData.dutyOrgId"
      :police-type="policeType"
      @onCancel="policeShow = false"
      @onConfirm="onConfirmPolice"
    />
    <!-- 时间 -->
    <time-popup
      v-if="timeShow"
      v-model:model-value="formData[timeKey]"
      :show-picker="timeShow"
      @onCancel="timeShow = false"
    />
    <!-- 部门 -->
    <org-popup
      v-if="orgShow"
      :show-picker="orgShow"
      v-model:model-value="formData[orgKey]"
      @onCancel="orgShow = false"
      @onConfirm="onConfirmOrg"
    />
    <!-- 记分条款 -->
    <question-popup
      :show-picker="questionShow"
      @onCancel="questionShow = false"
      @onConfirm="onConfirmQuestion"
    />
  </div>
</template>

<style scoped lang="less">
.score-add-page {
  padding-bottom: 86px;
  padding-top: 46px;
}
.duty-man {
  padding: 10px 16px;
}
</style>
