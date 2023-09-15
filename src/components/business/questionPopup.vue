<script lang="ts" name="QuestionPopup" setup>
import { onMounted, ref } from "vue";
const visible = ref(false);
const cQuestionRef = ref<any>(null);
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  isType: {
    type: String,
    default: "userConcernTreeList" // treeList/userConcernTreeList
  },
  checkType: {
    type: String,
    default: "single" // multiple/single
  },
  search: {
    type: Boolean,
    default: false
  },
  // 是否只能选择子节点
  leafOnly: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits<{
  (e: "onCancel"): void;
  (e: "onConfirm", val: any): void;
}>();

onMounted(() => {
  visible.value = true;
});
const confirmFn = () => {
  visible.value = false;
  const obj = cQuestionRef.value!.checkedData;
  // console.log(obj);
  emit("onConfirm", obj);
};
const cancelFn = () => {
  visible.value = false;
  cQuestionRef.value!.resetChecked();
  emit("onCancel");
};
</script>

<template>
  <van-popup
    v-model:show="visible"
    round
    position="bottom"
    @closed="cancelFn"
    class="self-pop"
  >
    <div class="self-pop-header van-hairline--bottom">
      <van-button plain type="default" class="cancel-btn" @click="cancelFn"
        >取消</van-button
      >
      <van-button plain type="primary" class="confirm-btn" @click="confirmFn"
        >确定</van-button
      >
    </div>
    <div class="popup-body">
      <c-question-type
        ref="cQuestionRef"
        :is-type="props.isType"
        :leaf-only="props.leafOnly"
        :search="props.search"
        :check-type="props.checkType"
      />
    </div>
  </van-popup>
</template>

<style scoped lang="less"></style>
