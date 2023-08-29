<script lang="ts" name="CautionDetail" setup>
import { CAUTION_STATUS } from "@/views/caution/const";
import { ref } from "vue";

const cautionStatus = CAUTION_STATUS;
const bean = ref<any>({
  status: "2"
});
</script>

<template>
  <div class="caution-detail-page">
    <h3 class="title-box">榆阳公安分局开展“两会”安全保卫工作现场督察活动</h3>
    <div class="view-box flex justify-between">
      <div><span>汪汪汪</span><span>2023-07-13</span></div>
      <div>
        <span class="name"><van-icon name="eye-o" /> 1000+</span>
      </div>
    </div>
    <div class="desc-box">
      督察民警先后对全区范围内各派出所、公安检查站、警务工作室进行了抽查，仔细检查了各所、队巡逻点、卡口、执勤点及警务工作室警力到岗情况、警容风纪、装备配备、街面管控等情况，对执行任务的民警辅警逐人、逐岗进行督察，及时纠正布警上、执勤中存在的问题。
    </div>
    <div class="">图片</div>
    <div class="bottom-action flex justify-between">
      <template v-if="bean.status === cautionStatus.draft">
        <div class="flex flex-col items-center">
          <van-icon name="delete-o" size="26" />
          <div>删除</div>
        </div>
        <div>
          <van-button
            type="warning"
            round
            color="linear-gradient(to right, #00B3B3, #13E1B6)"
            ><svg-icon name="listing" class="inline-block" />上架</van-button
          >
          <van-button
            icon="edit"
            round
            color="linear-gradient(to right, #037CED, #02C2FA)"
            @click="$router.push(`/caution/add`)"
          >
            编辑
          </van-button>
        </div>
      </template>
      <template v-else-if="bean.status === cautionStatus.delist">
        <van-button round block icon="delete-o" type="danger" plain>
          删除
        </van-button>
      </template>
      <template v-else>
        <van-button
          type="warning"
          round
          class="w-[50%]"
          color="linear-gradient(to right, #FE871B, #FFCD4E)"
          ><svg-icon name="delist" class="inline-block" /> 下架</van-button
        >
        <van-button
          icon="edit"
          round
          class="w-[50%]"
          color="linear-gradient(to right, #037CED, #02C2FA)"
          @click="$router.push(`/caution/add`)"
        >
          编辑
        </van-button>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.caution-detail-page {
  padding: 16px 16px 86px;
  background: #ffffff;
  min-height: calc(100vh - 64px);
  .title-box {
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: bold;
  }
  .view-box {
    color: var(--text-color2);
    margin-bottom: 24px;
  }
  .desc-box {
    color: var(--text-color4);
  }
}
</style>
