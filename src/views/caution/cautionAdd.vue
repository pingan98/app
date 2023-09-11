<script lang="ts" name="CautionAdd" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Form } from "@/api/warnMaterial/types";
import type { FormInstance } from "vant";
import { showFailToast, showSuccessToast } from "vant";
import {
  addWarnMaterial,
  updateWarnMaterial,
  warnMaterialDetail
} from "@/api/warnMaterial";
import { CAUTION_STATUS } from "@/const";
import CFile from "@/components/business/cFile.vue";
import { generateGuid } from "@/utils";
const route = useRoute();
const router = useRouter();

const timeShow = ref(false);
const pageType = ref("");
const formRef = ref<FormInstance>();
const formData = ref<Form>({
  warnTitle: "",
  warnTime: "",
  warnContent: "",
  warnState: ""
});
onMounted(async () => {
  pageType.value = route.query.type as string;
  const id = route.params.id as string;
  if (id) {
    const res = await warnMaterialDetail({ id });
    formData.value = { ...res.data };
  }
  formData.value.id = id ? id : generateGuid();
});
const getTitle = (val: "add" | "edit") => {
  const temp = {
    add: "新增",
    edit: "编辑"
  };
  return temp[val];
};

const submitFn = (type: string) => {
  formRef.value
    ?.validate()
    .then(() => {
      const { warnTime, ...form } = formData.value;
      const serve = {
        ...form,
        warnState: type,
        warnTime: warnTime + " 00:00:00"
      };
      console.log(serve);
      addWarnMaterial(serve).then(res => {
        console.log(res);
        showSuccessToast("已提交");
        router.push("/caution");
      });
    })
    .catch(error => {
      showFailToast("请正确填写信息");
    });
};
const editFn = () => {
  formRef.value
    ?.validate()
    .then(() => {
      const { warnTime, warnTitle, warnContent } = formData.value;
      const serve = {
        id: route.params.id as string,
        warnTime,
        warnTitle,
        warnContent
      };
      updateWarnMaterial(serve).then(res => {
        console.log(res);
        showSuccessToast("已提交");
        router.push("/caution");
      });
    })
    .catch(error => {
      showFailToast("请正确填写信息");
    });
};
</script>

<template>
  <div class="caution-add-page">
    <nav-bar :title="getTitle(route.query?.type || '')" />

    <van-form ref="formRef">
      <van-field
        class="must"
        label-align="top"
        v-model="formData.warnTitle"
        name="warnTitle"
        label="标题"
        show-error
        placeholder="请输入标题"
        show-word-limit
        :rules="[{ required: true, message: '请输入' }]"
      />
      <van-field
        label-align="top"
        v-model="formData.warnTime"
        name="warnTime"
        label="警示时间"
        placeholder="警示时间"
        :rules="[{ required: true, message: '请选择' }]"
        @click="timeShow = true"
        class="must"
        readonly
        clickable
        is-link
      />
      <van-field
        class="must"
        label-align="top"
        v-model="formData.warnContent"
        name="warnContent"
        rows="2"
        autosize
        label="内容"
        type="textarea"
        show-error
        maxlength="100"
        placeholder="请输入"
        show-word-limit
        :rules="[{ required: true, message: '请输入' }]"
      />
      <van-field name="uploader">
        <template #input>
          <c-file
            :order-id="formData.id"
            module-id="cautionAdd"
            bus-type="警示教育"
          />
        </template>
      </van-field>
    </van-form>

    <div class="bottom-action flex justify-between">
      <template v-if="pageType === 'add'">
        <van-button
          round
          class="w-[50%]"
          plain
          @click="submitFn(CAUTION_STATUS.draft)"
          >存草稿</van-button
        >
        <van-button
          round
          class="w-[50%]"
          color="linear-gradient(to right, #037CED, #02C2FA)"
          @click="submitFn(CAUTION_STATUS.listing)"
        >
          发布
        </van-button>
      </template>

      <van-button
        v-else
        round
        block
        color="linear-gradient(to right, #037CED, #02C2FA)"
        @click="editFn"
      >
        确定
      </van-button>
    </div>

    <!-- 时间 -->
    <time-popup
      v-if="timeShow"
      v-model:model-value="formData.warnTime"
      :show-picker="timeShow"
      @onCancel="timeShow = false"
    />
  </div>
</template>

<style scoped lang="less">
.caution-add-page {
  padding: 50px 16px 86px;
  background: #ffffff;
  min-height: calc(100vh - 64px);
}
</style>
