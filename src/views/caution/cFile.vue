<script lang="ts" name="CFile" setup>
import { ref } from "vue";
import type { Image } from "@/api/warnMaterial/types";
import type {
  UploaderAfterRead,
  UploaderFileListItem
} from "vant/lib/uploader/types";
import { showConfirmDialog, showFailToast } from "vant";
import { getFiles } from "@/api/common";

const fileList = ref<Image[]>([]);

const props = defineProps({
  btnTxt: {
    type: String,
    default: "上传文件"
  },
  preview: {
    type: Boolean,
    default: false
  },
  showTip: {
    type: Boolean,
    default: true
  },
  orderId: {
    type: String,
    default: ""
  },
  moduleId: {
    type: String,
    default: ""
  },
  busType: {
    type: String,
    default: ""
  },
  maxCount: {
    type: Number,
    default: 5
  }
});

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
  showConfirmDialog({
    title: "温馨提示",
    message: `您确认删除此数据吗？`
  })
    .then(() => {
      formData.value.pictures = formData.value.pictures?.filter(
        pic => pic.url !== item.url
      );
    })
    .catch(err => {
      console.log(err);
    });
};
const addFile = (file: File) => {
  if (!props.orderId) {
    showFailToast("上传失败,缺少必要参数");
    return false;
  }
  const sendData = new FormData();
  sendData.append("moduleId", props.moduleId);
  sendData.append("orderId", props.orderId);
  sendData.append("busType", props.busType);
  // sendData.append("file", file.raw, file.name);
};
function getFileList() {
  if (props.orderId) {
    fileList.value = [];
    getFiles({ orderId: props.orderId, busType: props.busType }).then(
      ({ data }) => {
        console.log(data, "data");
        fileList.value = fileList.value.concat(data || []);
      }
    );
  }
}
</script>

<template>
  <div class="c-file">
    <div class="illness-img">
      <van-uploader
        upload-icon="photo-o"
        :upload-text="btnTxt"
        :max-count="maxCount"
        v-model="fileList"
        :after-read="onAfterRead"
        @delete="onDeleteImg"
      ></van-uploader>
      <p class="tip" v-if="showTip && !fileList.length">
        最多上传{{ maxCount }}张
      </p>
    </div>
  </div>
</template>

<style scoped lang="less">
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
