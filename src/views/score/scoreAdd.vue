<script lang="ts" name="ScoreAdd" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { POLICE_TYPE } from "@/const";
import type { Form } from "@/api/scoreManage/types";
import type { FormInstance, FieldRule } from "vant";
import { showFailToast, showSuccessToast } from "vant";
import dayjs from "dayjs";
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
const policeKey = ref<"police" | "auxPolice">();
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
  inputOrgName: "",
  dutyPoliceName: "",
  dutyPoliceNo: "",
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

onMounted(() => {
  pageType.value = route.query.type as string;
  const id = route.params.id as string;
  if (id) {
    echoCurData(id);
  }
});
// 回显当前数据
const echoCurData = async (id: string) => {
  const { data } = await getScoreManageDetail({ id });
  if (data.queTime) {
    data.queTime = dayjs(data.queTime).format("YYYY-MM-DD HH:mm:ss");
  }
  if (data.scoreTime) {
    data.scoreTime = dayjs(data.scoreTime).format("YYYY-MM-DD HH:mm:ss");
  }
  data.detailsList.forEach(item => {
    if (item.scoreBasicId) {
      const problemId = (item.scoreBasicId || "").split("-");
      const problemName = (item.scoreBasic || "").split("-");
      item.questionTypeId = problemId[problemId.length - 1] || "";
      item.questionName = problemName[problemName.length - 1] || "";
    }
    item.jyname = item.dutyPoliceName;
  });

  const defaultArr = [
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
  ];
  // 0 民警  1辅警
  const policeArr =
    data?.detailsList?.filter(item => item.scoreType == POLICE_TYPE.min)
      ?.length > 0
      ? data.detailsList.filter(item => item.scoreType == POLICE_TYPE.min)
      : defaultArr;
  const auxPoliceArr =
    data.detailsList.filter(item => item.scoreType == POLICE_TYPE.fu)?.length >
    0
      ? data.detailsList.filter(item => item.scoreType == POLICE_TYPE.fu)
      : defaultArr;
  delete data.detailsList;

  formData.value = { id, ...data, police: policeArr, auxPolice: auxPoliceArr };
};
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
      return {
        scoreType,
        dutyOrgId,
        dutyOrgName,
        ...v
      };
    });
};

const submitFn = () => {
  const { scoreTime, queTime, police, auxPolice, ...form } = formData.value;
  const detailsList = [
    ...formatPolice(police, POLICE_TYPE.min),
    ...formatPolice(auxPolice, POLICE_TYPE.fu)
  ];
  console.log(detailsList);
  const serve = {
    detailsList,
    scoreTime: scoreTime,
    queTime: queTime,
    ...form
  };
  console.log(serve);

  // showSuccessToast("已提交");
  // refreshPage();

  /*formRef.value
    ?.validate()
    .then(() => {
      // console.log("通过");
      addScoreManage(serve).then((code: any, msg?: string) => {
        if (code) {
          showSuccessToast("已提交");
          router.replace("/score");
        } else {
          if (msg) showFailToast(msg);
        }
      });
    })
    .catch(err => {
      //验证失败
      showFailToast("请正确填写信息");
    });*/
};

const addFn = (type: "police" | "auxPolice") => {
  formData.value[type]?.push({
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
  formData.value[type]!.splice(index, 1);
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
    policeKey.value = type === POLICE_TYPE.min ? "police" : "auxPolice";
    policeShow.value = true;
  }
};
const onConfirmPolice = (val: any) => {
  policeShow.value = false;
  const { jyname = "", jycode = "", idcard = "" } = val;
  formData.value[policeKey.value][policeIndex.value].dutyPoliceName = jyname;
  formData.value[policeKey.value][policeIndex.value].dutyPoliceNo = jycode;
  formData.value[policeKey.value][policeIndex.value].idcard = idcard;
  // console.log(val);
  // console.log(val.idcard);
};
const onConfirmQuestion = (val: any) => {
  // console.log(val);
  questionShow.value = false;
  const { name = "", id = "", score = "", labels_txt = "", ids_txt = "" } = val;
  formData.value[policeKey.value][policeIndex.value].questionName = name;
  formData.value[policeKey.value][policeIndex.value].questionTypeId = id;
  formData.value[policeKey.value][policeIndex.value].scoreNum = score;
  formData.value[policeKey.value][policeIndex.value].scoreBasic = labels_txt;
  formData.value[policeKey.value][policeIndex.value].scoreBasicId = ids_txt;
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
              v-for="(item, ind) in formData.police"
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
                  formData.auxPolice?.filter(v => v.dutyPoliceName).length > 0
                    ? []
                    : [{ required: true, message: '请选择' }]
                "
                :class="{
                  'is-required':
                    formData.auxPolice?.filter(v => v.dutyPoliceName).length ===
                    0
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
              v-for="(item, ind) in formData.auxPolice"
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
                  formData.police?.filter(v => v.dutyPoliceName).length > 0
                    ? []
                    : [{ required: true, message: '请选择' }]
                "
                :class="{
                  'is-required':
                    formData.police?.filter(v => v.dutyPoliceName).length === 0
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
      v-if="policeShow"
      v-model:model-value="formData[policeKey][policeIndex].idcard"
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
      v-model:model-value="formData[orgKey]"
      @onCancel="orgShow = false"
      @onConfirm="onConfirmOrg"
    />
    <!-- 记分条款 -->
    <question-popup
      v-if="questionShow"
      :search="true"
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
