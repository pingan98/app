<script lang="ts" name="ScoreAdd" setup>
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import ModuleBox from "@/components/business/moduleBox.vue";
import type { Form } from "@/api/scoreManage/types";

const route = useRoute();
const loading = ref(false);
const timeShow = ref(false);
const dutyShow = ref(false);
const policeShow = ref(false);
const policeType = ref("-1");
const formData = reactive<Form>({});
import { MIN_DATE, MAX_DATE, POLICE_TYPE } from "@/const";
import CSelectTreeOrg from "@/components/business/cSelectTreeOrg.vue";
import PolicePopup from "@/components/business/policePopup.vue";
const minDate = MIN_DATE;
const maxDate = MAX_DATE;
const cSelectRef = ref<any>(null);

const submitFn = () => {
  loading.value = true;
  loading.value = false;
};
const onConfirmTime = ({ selectedValues }) => {
  formData.queTime = selectedValues.join("-");
  timeShow.value = false;
};
const addFn = (type: string) => {};
const dutyConfirmFn = () => {
  dutyShow.value = false;
  const { orgId, orgName } = cSelectRef.value!.getCheckedKeys();
  console.log(cSelectRef.value!.getCheckedKeys());
  formData.dutyOrgId = orgId;
  formData.dutyOrgName = orgName;
};
const changePolice = (type: string) => {
  policeType.value = type;
  policeShow.value = true;
};
const onPoliceConfirm = (val: any) => {
  console.log(val);
};
</script>

<template>
  <div class="score-add-page">
    <nav-bar :title="route.meta.title" />

    <div class="score-form">
      <van-form ref="form">
        <van-cell-group>
          <van-field
            v-model="formData.queTime"
            name="queTime"
            label="问题时间"
            placeholder="问题时间"
            :rules="[{ required: true, message: '请选择时间' }]"
            @click="timeShow = true"
            class="is-required"
            is-link
          />
          <!-- 时间选择 -->
          <van-popup v-model:show="timeShow" position="bottom" round>
            <van-date-picker
              @confirm="onConfirmTime"
              @cancel="timeShow = false"
              :min-date="minDate"
              :max-date="maxDate"
            />
          </van-popup>
          <van-field
            v-model="formData.dutyOrgName"
            name="dutyOrgId"
            label="责任部门"
            placeholder="责任部门"
            :rules="[{ required: true, message: '请选择' }]"
            class="is-required"
            @click="dutyShow = true"
            readonly
            clickable
            is-link
          />
          <van-popup
            v-model:show="dutyShow"
            position="bottom"
            round
            class="self-pop"
          >
            <div class="self-pop-header van-hairline--bottom">
              <van-button
                plain
                type="default"
                class="cancel-btn"
                @click="dutyShow = false"
                >取消</van-button
              >
              <van-button
                plain
                type="primary"
                class="confirm-btn"
                @click="dutyConfirmFn"
                >确定</van-button
              >
            </div>
            <c-select-tree-org
              check-type="single"
              ref="cSelectRef"
            ></c-select-tree-org>
          </van-popup>
        </van-cell-group>
        <div class="duty-man">
          <div class="police-man mb-[10px]">
            <module-box class="mb-[10px]" title="责任民警">
              <template v-slot:icon>
                <img src="@/assets/police_hat_icon_active@3x.png" alt="" />
              </template>
              <van-field
                v-model="formData.police"
                name="police"
                label="责任民警"
                placeholder="责任民警"
                @click="changePolice(POLICE_TYPE.min)"
                class="is-required"
                readonly
                clickable
                is-link
              />
              <van-field
                v-model="formData.police"
                name="police"
                label="记分条款"
                placeholder="记分条款"
                @click="timeShow = true"
                class="is-required"
                readonly
                clickable
                is-link
              />
              <van-field
                v-model="formData.police"
                name="police"
                label="分值"
                placeholder="分值"
                @click="timeShow = true"
                class="is-required"
              />
            </module-box>

            <van-button
              type="primary"
              block
              plain
              icon="plus"
              @click="addFn(POLICE_TYPE.min)"
              >新增责任民警</van-button
            >
          </div>
          <div class="police-man">
            <module-box class="mb-[10px]" title="责任辅警">
              <template v-slot:icon>
                <img src="@/assets/police_hat_icon_active@3x.png" alt="" />
              </template>
              <van-field
                v-model="formData.auxPolice"
                name="police"
                label="责任辅警"
                placeholder="责任辅警"
                class="is-required"
                @click="changePolice(POLICE_TYPE.fu)"
                readonly
                clickable
                is-link
              />
              <van-field
                v-model="formData.auxPolice"
                name="police"
                label="记分条款"
                placeholder="记分条款"
                @click="timeShow = true"
                class="is-required"
                readonly
                clickable
                is-link
              />
              <van-field
                v-model="formData.auxPolice"
                name="police"
                label="分值"
                placeholder="分值"
                @click="timeShow = true"
                class="is-required"
              />
            </module-box>
            <van-button
              type="primary"
              block
              plain
              icon="plus"
              @click="addFn(POLICE_TYPE.fu)"
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
            @click="timeShow = true"
            class="is-required"
            readonly
            clickable
            is-link
          />
          <van-field
            v-model="formData.inputOrgId"
            name="inputOrgId"
            label="记分单位"
            placeholder="记分单位"
            :rules="[{ required: true, message: '请填写用户名' }]"
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

    <div class="bottom-action">
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

    <police-popup
      :show-picker="policeShow"
      :org-id="formData.dutyOrgId"
      :police-type="policeType"
      @onCancel="policeShow = false"
      @onConfirm="onPoliceConfirm"
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
