<script lang="ts" name="CautionAdd" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type {
  UploaderAfterRead,
  UploaderFileListItem
} from "vant/lib/uploader/types";
import type { Form, Image } from "@/api/warnMaterial/types";
import type { FormInstance } from "vant";
import { showFailToast, showSuccessToast } from "vant";
import {
  addWarnMaterial,
  updateWarnMaterial,
  removeWarnMaterial,
  warnMaterialDetail
} from "@/api/warnMaterial";
import { CAUTION_STATUS } from "@/const";
const route = useRoute();
const router = useRouter();

const orderId = ref("");
const timeShow = ref(false);
const pageType = ref("");
// 上传图片
const fileList = ref<Image[]>([]);
const formRef = ref<FormInstance>();
const formData = ref<Form>({
  warnTitle: "",
  warnTime: "",
  warnContent: "",
  warnState: ""
});
onMounted(async () => {
  pageType.value = route.query.type as string;
  if (route.params.id) {
    const res = await warnMaterialDetail({ id: route.params.id as string });
    formData.value = { ...res.data };
  }
});
const getTitle = (val: string) => {
  const temp = {
    add: "新增",
    edit: "编辑"
  };
  return temp[val];
};
// 图片上传
const onAfterRead: UploaderAfterRead = item => {
  console.log(item);
  if (Array.isArray(item)) return;
  if (!item.file) return;

  item.status = "uploading";
  item.message = "上传中...";
  addFile(item.file)
    .then(res => {
      item.status = "done";
      item.message = undefined;
      item.url = res.data.url;
    })
    .catch(() => {
      item.status = "failed";
      item.message = "上传失败";
    });
};
const onDeleteImg = (item: UploaderFileListItem) => {
  formData.value.pictures = formData.value.pictures?.filter(
    pic => pic.url !== item.url
  );
};
const addFile = (file: File) => {
  if (!orderId.value) {
    showFailToast("上传失败,缺少必要参数");
    return false;
  }
  const sendData = new FormData();
  sendData.append("moduleId", this.moduleId);
  sendData.append("orderId", this.orderId);
  sendData.append("busType", this.busType);
  sendData.append("file", file.raw, file.name);
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
          <div class="illness-img">
            <van-uploader
              upload-icon="photo-o"
              upload-text="图片/视频"
              max-count="5"
              v-model="fileList"
              :after-read="onAfterRead"
              @delete="onDeleteImg"
            ></van-uploader>
            <p class="tip" v-if="!fileList.length">最多上传5张</p>
          </div>
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
      :show-picker="timeShow"
      @onCancel="timeShow = false"
      @onConfirm="val => (formData.warnTime = val)"
    />
  </div>
</template>

<style scoped lang="less">
.caution-add-page {
  padding: 50px 16px 86px;
  background: #ffffff;
  min-height: calc(100vh - 64px);
}
.illness-img {
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: #c3c3c5;
  }
  :deep(.van-uploader) {
    &__preview {
      &-delete {
        left: -6px;
        top: -6px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        &-icon {
          transform: scale(0.9) translate(-22%, 22%);
        }
      }
      &-image {
        border-radius: 8px;
        overflow: hidden;
      }
    }
    &__upload {
      border-radius: 8px;
    }
    &__upload-icon {
      color: var(--cp-text3);
    }
  }
}
</style>
