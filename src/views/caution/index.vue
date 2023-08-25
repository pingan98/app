<script  lang="ts" name="Caution" setup>
import {ref} from "vue";
import MaterialItem from "@/views/caution/components/materialItem.vue";

const searchForm = ref({});
const tabs = [{title:'警示材料', value:1},{title:'草稿箱', value:2},{title:'已下架', value:3}]
const tabChange = (value:string | number)=>{
  console.log(value)
}
const submitFn = () => {
};
</script>

<template>
  <div class="caution-page">
    <!-- 搜索框 -->
    <div class="page-search mb-[10px]">
      <van-search
          v-model="searchForm.dutyPoliceName"
          shape="round"
          placeholder="请输入"
      />
      <c-tab :tabs="tabs" @tabChange="tabChange"/>
    </div>

    <!-- 列表 -->
    <div class="material-list">
      <van-list finished-text="没有更多了">
        <material-item></material-item>
        <material-item></material-item>
      </van-list>
    </div>

    <div class="bottom-action">
      <van-button
          round
          block
          color="linear-gradient(to right, #037CED, #02C2FA)"
          @click="submitFn"
      >
        批量处理
      </van-button>
    </div>

    <!-- 新增按钮 -->
    <van-floating-bubble
        axis="xy"
        icon="plus"
        magnetic="x"
        @click="$router.push('/caution/add')"
    />
  </div>
</template>

<style scoped lang="less">
.caution-page {
  position: relative;
}
.material-list {
  background: #ffffff;
  padding: 0 16px;
}
</style>
