<script lang="ts" name="CautionDetail" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatTime, getFileTypeByExtension } from "@/utils";
import { CAUTION_STATUS } from "@/const/warnMaterial";
import type { Form, IBattchJson } from "@/api/warnMaterial/types";
import {
  batchUpdateWarnMaterial,
  removeWarnMaterial,
  warnMaterialDetail
} from "@/api/warnMaterial";
import { showConfirmDialog, showSuccessToast, type FormInstance } from "vant";
import { useUserStore } from "@/store/modules/user";
import { useRouteParamsStore } from "@/store/modules/routeParams";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const routeParamsStore = useRouteParamsStore();
const videoList = ref<Array<IBattchJson>>([]);
const imgList = ref<Array<IBattchJson>>([]);

const judgeRole = userStore.getSomeMenu("warnMaterial");

const detailData = ref<Form>();
onMounted(async () => {
  const res = await warnMaterialDetail({ id: route.params.id as string });
  const battchJson = res.data?.battchJson
    ? JSON.parse(res.data?.battchJson)
    : [];

  videoList.value = battchJson.filter(
    (v: IBattchJson) => getFileTypeByExtension(v.attachName || "") === "video"
  );
  imgList.value = battchJson.filter(
    (v: IBattchJson) => getFileTypeByExtension(v.attachName || "") === "image"
  );

  detailData.value = { ...res.data };
});
const batchUpdate = async (warnState: string) => {
  const getType = (type: string) => {
    const temp = {
      [CAUTION_STATUS.listing]: "下架",
      [CAUTION_STATUS.draft]: "上架"
    };
    return temp[type];
  };
  const str = getType(detailData.value?.warnState as string);
  await showConfirmDialog({
    title: "温馨提示",
    message: `您确认${str}此条信息吗？`
  });
  await batchUpdateWarnMaterial([detailData.value?.id as string], warnState);
  showSuccessToast(str + "成功");
  returnPage();
};
const returnPage = () => {
  routeParamsStore.setParams({
    name: "Caution",
    params: {
      warnState: detailData.value?.warnState
    }
  });
  router.replace("/caution");
  router.go(-1);
};
const removeFn = async () => {
  await showConfirmDialog({
    title: "温馨提示",
    message: `您确认删除此条信息吗？`
  });
  await removeWarnMaterial([detailData.value!.id as string]);
  showSuccessToast("删除成功");
  returnPage();
};
</script>

<template>
  <div class="caution-detail-page">
    <nav-bar :title="route.meta.title" />

    <h3 class="title-box">{{ detailData?.warnTitle }}</h3>
    <div class="view-box flex justify-between">
      <div>
        <span class="mr-[4px]">{{ detailData?.createUser }}</span>
        <span>{{ formatTime(detailData?.upperTime) }}</span>
      </div>
      <div>
        <span class="name"
          ><van-icon name="eye-o" /> {{ detailData?.warnViewNumber }}</span
        >
      </div>
    </div>
    <div class="desc-box">{{ detailData?.warnContent }}</div>
    <div class="img-con" v-if="imgList.length">
      <div class="img-box" v-for="(item, ind) in imgList" :key="ind">
        <img :src="item.attachFullPath" alt="" />
      </div>
    </div>
    <div class="img-con" v-if="videoList.length">
      <div class="video-box" v-for="(item, ind) in videoList" :key="ind">
        <video controls>
          <source :src="item.attachFullPath" :type="item.attachType" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <!-- 从首页过来的不显示操作 -->
    <div
      class="bottom-action flex justify-between"
      v-if="!['home', 'browseHistory'].includes(route.query.from) && judgeRole"
    >
      <template v-if="detailData?.warnState === CAUTION_STATUS.draft">
        <div class="flex flex-col items-center" @click="removeFn">
          <van-icon name="delete-o" size="26" />
          <div>删除</div>
        </div>
        <div>
          <van-button
            type="warning"
            @click="batchUpdate(CAUTION_STATUS.listing)"
            round
            color="linear-gradient(to right, #00B3B3, #13E1B6)"
            ><svg-icon name="listing" class="inline-block" />上架</van-button
          >
          <van-button
            icon="edit"
            round
            color="linear-gradient(to right, #037CED, #02C2FA)"
            @click="$router.push(`/caution/add/${detailData?.id}?type=edit`)"
          >
            编辑
          </van-button>
        </div>
      </template>
      <template v-else-if="detailData?.warnState === CAUTION_STATUS.delist">
        <van-button
          round
          block
          icon="delete-o"
          type="danger"
          plain
          @click="removeFn"
        >
          删除
        </van-button>
      </template>
      <template v-else>
        <van-button
          type="warning"
          @click="batchUpdate(CAUTION_STATUS.delist)"
          round
          block
          color="linear-gradient(to right, #FE871B, #FFCD4E)"
          ><svg-icon name="delist" class="inline-block" /> 下架</van-button
        >
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/styles/mixin.less";
.van-button + .van-button {
  margin-left: 10px;
}
.caution-detail-page {
  padding: 50px 16px 86px;
  background: #ffffff;
  min-height: 100vh;
  .title-box {
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: bold;
  }
  .view-box {
    color: var(--text-color2);
  }
  .desc-box {
    color: var(--text-color4);
    margin: 20px 0;
  }
  .img-con {
    .img-box {
      .flex(center, center);
      width: 100%;
      margin-bottom: 20px;
      img {
        max-width: 100%;
      }
    }
    .video-box {
      height: 250px;
      video {
        width: 100%;
        height: 250px;
      }
    }
  }
}
</style>
