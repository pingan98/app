<script setup lang="ts" name="MaterialList">
import { ref } from "vue";
import MaterialItem from "@/views/caution/components/materialItem.vue";
// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
const searchForm = ref({});
const tabs = [{title:'警示材料', value:1},{title:'草稿箱', value:2},{title:'已下架', value:3}]
const tabChange = (value:string | number)=>{
  console.log(value)
}
</script>

<template>
  <div class="material-list">
    <van-list finished-text="没有更多了">
      <material-item></material-item>
      <material-item></material-item>
      <material-item></material-item>
      <material-item></material-item>
      <material-item></material-item>
    </van-list>
  </div>
</template>

<style scoped lang="less">

</style>
