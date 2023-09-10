<script lang="ts" name="CautionAdd" setup>
import { onMounted, ref } from "vue";
import type { Form } from "@/api/warnMaterial/types";
import type { FormInstance } from "vant";
import { generateGuid } from "@/utils";
import { showFailToast, showSuccessToast } from "vant";
import {
  addWarnMaterial,
  updateWarnMaterial,
  warnMaterialDetail
} from "@/api/warnMaterial";
import { CAUTION_STATUS } from "@/const";
import CFile from "@/components/business/cFile.vue";

const visible = ref(false);
const timeShow = ref(false);
const formRef = ref<FormInstance>();
const formData = ref<Form>({
  warnTitle: "",
  warnTime: "",
  warnContent: "",
  warnState: ""
});
const props = defineProps({
  popType: {
    type: String,
    default: ""
  },
  cautionId: {
    type: String,
    default: ""
  }
});
const emit = defineEmits<{
  (e: "onCancel"): void;
  (e: "refresh"): void;
}>();

const getTitle = (val: "add" | "edit") => {
  const temp = {
    add: "新增",
    edit: "编辑"
  };
  return temp[val];
};
onMounted(async () => {
  visible.value = true;

  if (props.cautionId) {
    const res = await warnMaterialDetail({ id: props.cautionId as string });
    formData.value = { ...res.data };
  }
  formData.value.id = props.cautionId ? props.cautionId : generateGuid();
});

const onCancel = () => {
  visible.value = false;
  emit("onCancel");
};
const onRefresh = () => {
  visible.value = false;
  emit("refresh");
};
const submitFn = (type: string) => {
  formRef.value
    ?.validate()
    .then(() => {
      const serve = {
        ...formData.value,
        warnState: type
      };
      console.log(serve);
      addWarnMaterial(serve).then(res => {
        console.log(res);
        showSuccessToast("已提交");
        onRefresh();
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
      const { warnTime, warnTitle, warnContent, id } = formData.value;
      const serve = {
        id,
        warnTime,
        warnTitle,
        warnContent
      };
      updateWarnMaterial(serve).then(res => {
        console.log(res);
        showSuccessToast("修改成功");
        onRefresh();
      });
    })
    .catch(error => {
      showFailToast("请正确填写信息");
    });
};
</script>

<template>
  <van-popup
    v-model:show="visible"
    position="right"
    :style="{ width: '100%', height: '100%', 'padding-top': '46px' }"
    @closed="onCancel"
  >
    <nav-bar :title="getTitle(props.popType)" :back="() => (visible = false)" />

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
      <template v-if="popType === 'add'">
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
      :show-picker="timeShow"
      @onCancel="timeShow = false"
      @onConfirm="val => (formData.warnTime = val)"
    />
  </van-popup>
</template>

<style scoped></style>
