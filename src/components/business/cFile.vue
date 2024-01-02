<script lang="ts" name="CFile" setup>
import { ref, watch } from "vue";
import type { Image } from "@/api/warnMaterial/types";
import type {
  UploaderAfterRead,
  UploaderFileListItem
} from "vant/lib/uploader/types";
import { showConfirmDialog, showFailToast, showSuccessToast } from "vant";
import { getFiles, uploadFile, delFile } from "@/api/common";

const fileList = ref<Image[]>([]);
const viewList = ref<Image[]>([]);

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
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
  },
  maxSize: {
    type: Number,
    default: 5 // 最大上传（M）
  }
});

watch(
  () => props.orderId,
  () => {
    getFileList();
  },
  { immediate: true }
);
const emit = defineEmits<{
  (e: "refresh"): void;
  (e: "update:modelValue", val: any): void;
}>();
const onOversize = file => {
  console.log(file);
  showFailToast("onOversize 文件大小不能超过5M");
};
// 图片上传
const onAfterRead: UploaderAfterRead = item => {
  if (!props.orderId) {
    showFailToast("上传失败,缺少必要参数");
    return false;
  }

  // console.log(item);
  if (Array.isArray(item)) return;
  if (!item.file) return;

  item.status = "uploading";
  item.message = "上传中...";

  const sendData = new FormData();
  sendData.append("moduleId", props.moduleId);
  sendData.append("orderId", props.orderId);
  sendData.append("busType", props.busType);
  sendData.append("file", item.file);
  uploadFile(sendData)
    .then((res: any) => {
      console.log(res);
      item.status = "done";
      item.message = undefined;
      item.url = res.data[0].attachFullPath;
      emit("refresh");
      getFileList();
    })
    .catch(() => {
      item.status = "failed";
      item.message = "上传失败";
    });
};
const onDelete = (item: Image) => {
  showConfirmDialog({
    title: "温馨提示",
    message: `您确认删除此数据吗？`
  })
    .then(() => {
      delFile({ attachId: item.id }).then(() => {
        showSuccessToast("删除成功");
        getFileList();
      });
    })
    .catch(err => {
      console.log(err);
    });
};
function getFileList() {
  if (props.orderId) {
    viewList.value = [];
    fileList.value = [];
    getFiles({ orderId: props.orderId, busType: props.busType }).then(
      ({ data }) => {
        console.log(data, "data");
        fileList.value = fileList.value.concat(data || []);
        viewList.value = fileList.value.map((v: any) => {
          return {
            id: v.id,
            name: v.attachName,
            url: v.attachFullPath
          };
        });
        emit("update:modelValue", JSON.stringify(fileList.value));
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
        v-model="viewList"
        :after-read="onAfterRead"
        @delete="onDelete"
        :max-size="maxSize * 1024 * 1024"
        @oversize="onOversize"
      >
      </van-uploader>
      <p class="tip" v-if="showTip && !viewList.length">
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
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>
