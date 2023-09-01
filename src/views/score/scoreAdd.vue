<script lang="ts" name="ScoreAdd" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
import TimeSelect from "@/components/business/timeSelect.vue";
import ModuleBox from "@/components/business/moduleBox.vue";

const loading = ref(false);
const timeShow = ref(false);
const formData = ref({});

const submitFn = () => {
  loading.value = true;
  loading.value = false;
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
            @click="timeShow = true"
            class="is-required"
            is-link
          />
          <van-field
            v-model="formData.dutyOrgId"
            name="dutyOrgId"
            label="责任部门"
            placeholder="责任部门"
            :rules="[{ required: true, message: '请填写用户名' }]"
            class="is-required"
            is-link
          />
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
                @click="timeShow = true"
                class="is-required"
                is-link
              />
              <van-field
                v-model="formData.police"
                name="police"
                label="记分条款"
                placeholder="记分条款"
                @click="timeShow = true"
                class="is-required"
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
            <van-button type="primary" block plain icon="plus"
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
                @click="timeShow = true"
                class="is-required"
                is-link
              />
              <van-field
                v-model="formData.auxPolice"
                name="police"
                label="记分条款"
                placeholder="记分条款"
                @click="timeShow = true"
                class="is-required"
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
            <van-button type="primary" block plain icon="plus"
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
            is-link
          />
          <van-field
            v-model="formData.inputOrgId"
            name="inputOrgId"
            label="记分单位"
            placeholder="记分单位"
            :rules="[{ required: true, message: '请填写用户名' }]"
            class="is-required"
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

    <!-- 时间选择 -->
    <van-popup v-model:show="timeShow" position="bottom">
      <time-select />
    </van-popup>
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
