<script lang="ts" name="OrgPopup" setup>
import { ref, watch } from "vue";
const visible = ref(false);
const cOrgRef = ref<any>(null);
const props = defineProps({
  showPicker: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [Array, String]
    // required: true
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
    default: false
  }
});
const emit = defineEmits<{
  (e: "onCancel"): void;
  (e: "onConfirm", val: any): void;
}>();
const confirmFn = () => {
  visible.value = false;
  // console.log(cOrgRef.value!.getCheckedKeys());
  emit("onConfirm", cOrgRef.value!.getCheckedKeys());
  cOrgRef.value!.resetChecked();
};
const cancelFn = () => {
  visible.value = false;
  cOrgRef.value!.resetChecked();
  emit("onCancel");
};
watch(
  () => props.showPicker,
  val => {
    if (val) {
      visible.value = val;
    }
  }
);
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
    <c-select-tree-org
      :check-type="props.checkType"
      :leaf-only="props.leafOnly"
      ref="cOrgRef"
    ></c-select-tree-org>
  </van-popup>
</template>

<style scoped></style>
