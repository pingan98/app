<script lang="ts" name="ScoreAdd" setup>
import { ref, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Form, IPolice, IScore } from "@/api/scoreManage/types";
import { E_BASIC_TYPE, E_POLICE_TYPE } from "@/enums";
import { showFailToast, showSuccessToast } from "vant";
import dayjs from "dayjs";
import {
  addScoreManage,
  getScoreManageDetail,
  editScoreManage
} from "@/api/scoreManage";

import { useUserStore } from "@/store/modules/user";

type IKeyTime = "queTime" | "scoreTime";
type IKeyOrg = "dutyOrg" | "inputOrg";
interface IOrg {
  orgId: string;
  orgName: string;
  data: any;
}

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

enum TITLE_TYPE_TXT {
  add = "新增",
  edit = "编辑"
}

const title = ref(
  TITLE_TYPE_TXT[route.query.type as keyof typeof TITLE_TYPE_TXT]
);
const showPopupByPolice = ref(false);
const showPopupByScore = ref(false);
const showPopupByTime = ref(false);
const showPopupByOrg = ref(false);

const loading = ref(false);

const keyOrg = ref<IKeyOrg>("dutyOrg");
const keyTime = ref<IKeyTime>("queTime");
const time = ref();
const org = ref();
const formData = ref<Form>({
  queTime: dayjs().format("YYYY-MM-DD HH:mm:00"),
  scoreTime: dayjs().format("YYYY-MM-DD HH:mm:00"),
  inputOrgName: userStore.userInfo?.orgName,
  inputOrgId: userStore.userInfo?.orgId,
  dutyOrgId: userStore.userInfo?.orgId,
  dutyOrgName: userStore.userInfo?.orgName,
  scoreType: E_POLICE_TYPE.min,
  basicType: E_BASIC_TYPE.score
});

const onChangePoliceType = () => {
  formData.value = {
    ...formData.value,
    dutyPoliceName: "",
    dutyPoliceNo: ""
  };
};

const onChangeBasicType = () => {
  formData.value = {
    ...formData.value,
    scoreBasic: "",
    scoreBasicId: "",
    scoreNum: ""
  };
};

const openPopupByTime: (keyName: IKeyTime) => void = keyName => {
  keyTime.value = keyName;
  time.value = formData.value[keyName];
  showPopupByTime.value = true;
};

const openPopupByOrg: (keyName: IKeyOrg) => void = keyName => {
  keyOrg.value = keyName;
  org.value = formData.value[`${keyName}Id`];
  showPopupByOrg.value = true;
};

const onConfirmByTime = () => {
  formData.value[keyTime.value] = time.value;
};

const onConfirmByOrg: (data: IOrg) => void = data => {
  showPopupByOrg.value = false;
  formData.value[`${keyOrg.value}Id`] = data.orgId;
  formData.value[`${keyOrg.value}Name`] = data.orgName;
};

const onConfirmByPolice: (data: IPolice) => void = data => {
  formData.value = {
    ...formData.value,
    dutyPoliceName: data.jyname,
    dutyPoliceNo: data.jycode
  };
};

const onConfirmByScore: (data: IScore) => void = data => {
  formData.value = {
    ...formData.value,
    scoreBasic: data.labels_txt,
    scoreBasicId: data.ids_txt,
    scoreNum: data.score
  };
};

const toSubmit = () => {
  loading.value = true;
  const fn = formData.value.id ? editScoreManage : addScoreManage;
  fn(formData.value)
    .then((code: any, msg?: string) => {
      if (code) {
        showSuccessToast("已提交");
        router.back();
      } else {
        if (msg) showFailToast(msg);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const getData = () => {
  getScoreManageDetail({ id: route.params.id as string }).then(({ data }) => {
    const tmp = data || {};
    // 提前设置这两个值 是为了防止触发单选框组的change, 从而清空值
    formData.value.basicType = tmp.basicType;
    formData.value.scoreType = tmp.scoreType;
    tmp.queTime = dayjs(tmp.queTime).format("YYYY-MM-DD HH:mm:00");
    tmp.scoreTime = dayjs(tmp.scoreTime).format("YYYY-MM-DD HH:mm:00");
    nextTick(() => {
      formData.value = tmp;
    });
  });
};

onMounted(() => {
  if (route.params.id) {
    getData();
  }
});
</script>

<template>
  <div class="score-add-page">
    <nav-bar :title="title" />
    <van-form ref="formRef" @submit="toSubmit">
      <div class="score-form">
        <van-cell-group>
          <van-field
            v-model="formData.queTime"
            name="queTime"
            label="问题时间"
            placeholder="问题时间"
            :rules="[{ required: true, message: '请选择' }]"
            class="is-required"
            readonly
            clickable
            is-link
            @click="openPopupByTime('queTime')"
          />
          <van-field
            v-model="formData.dutyOrgName"
            name="dutyOrgId"
            label="责任部门"
            :rules="[{ required: true, message: '请选择' }]"
            placeholder="责任部门"
            class="is-required"
            readonly
            clickable
            is-link
            @click="openPopupByOrg('dutyOrg')"
          />
        </van-cell-group>
        <div class="duty-man">
          <div class="police-man mb-[10px]">
            <module-box class="mb-[10px]" title="责任人">
              <template v-slot:icon>
                <img src="@/assets/police_hat_icon_active@3x.png" alt="" />
              </template>
              <van-field name="radio" label="人员类型">
                <template #input>
                  <van-radio-group
                    v-model="formData.scoreType"
                    direction="horizontal"
                    @change="onChangePoliceType"
                  >
                    <van-radio :name="E_POLICE_TYPE.min">民警</van-radio>
                    <van-radio :name="E_POLICE_TYPE.fu">辅警</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field
                v-model="formData.dutyPoliceName"
                name="dutyPoliceName"
                readonly
                placeholder="请选择"
                clickable
                label="责任人"
                class="is-required"
                :rules="[{ required: true, message: '请选择' }]"
                @click="showPopupByPolice = true"
                is-link
              />
              <van-field name="radio" label="记分类型">
                <template #input>
                  <van-radio-group
                    v-model="formData.basicType"
                    direction="horizontal"
                    @change="onChangeBasicType"
                  >
                    <van-radio :name="E_BASIC_TYPE.score"
                      >记分办法(试行)</van-radio
                    >
                    <van-radio :name="E_BASIC_TYPE.other">其他</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field
                v-if="formData.basicType === E_BASIC_TYPE.score"
                v-model="formData.scoreBasic"
                name="scoreBasic"
                :rules="[{ required: true, message: '请选择' }]"
                label="记分条款"
                placeholder="请选择"
                readonly
                clickable
                is-link
                @click="showPopupByScore = true"
                class="is-required"
              />

              <van-field
                v-if="formData.basicType === E_BASIC_TYPE.other"
                v-model="formData.scoreBasic"
                name="scoreBasic"
                label="记分条款"
                placeholder="请输入"
                :rules="[{ required: true, message: '请输入' }]"
                class="is-required"
              />
              <van-field
                v-model="formData.scoreNum"
                name="scoreNum"
                :rules="[{ required: true, message: '请输入' }]"
                class="is-required"
                label="分值"
                placeholder="请输入"
              />
            </module-box>
          </div>
        </div>
        <van-cell-group>
          <van-field
            v-model="formData.scoreTime"
            name="scoreTime"
            label="记分时间"
            placeholder="请选择"
            :rules="[{ required: true, message: '请选择' }]"
            class="is-required"
            readonly
            @click="openPopupByTime('scoreTime')"
            clickable
            is-link
          />
          <van-field
            v-model="formData.inputOrgName"
            name="inputOrgName"
            label="记分单位"
            placeholder="请选择"
            :rules="[{ required: true, message: '请选择' }]"
            class="is-required"
            readonly
            clickable
            is-link
            @click="openPopupByOrg('inputOrg')"
          />
        </van-cell-group>
      </div>

      <div class="bottom-action flex justify-between">
        <van-button
          round
          block
          :loading="loading"
          color="linear-gradient(to right, #037CED, #02C2FA)"
          native-type="submit"
        >
          提 交
        </van-button>
      </div>
    </van-form>

    <!-- 责任民警/辅警 -->
    <police-popup
      v-if="showPopupByPolice"
      :org-id="formData.dutyOrgId"
      :police-type="formData.scoreType"
      @onCancel="showPopupByPolice = false"
      @onConfirm="onConfirmByPolice"
    />
    <!-- 时间 -->
    <time-popup
      v-if="showPopupByTime"
      v-model:model-value="time"
      :show-picker="showPopupByTime"
      @onCancel="showPopupByTime = false"
      @onConfirm="onConfirmByTime"
    />
    <!-- 部门 -->
    <org-popup
      v-if="showPopupByOrg"
      v-model:model-value="org"
      @onCancel="showPopupByOrg = false"
      @onConfirm="onConfirmByOrg"
    />
    <!-- 记分条款 -->
    <question-popup
      v-if="showPopupByScore"
      :search="true"
      @onCancel="showPopupByScore = false"
      @onConfirm="onConfirmByScore"
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
