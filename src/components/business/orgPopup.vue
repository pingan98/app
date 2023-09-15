<script lang="ts" name="OrgPopup" setup>
import { onMounted, ref, watch } from "vue";
const visible = ref(false);
const cOrgRef = ref<any>(null);
const props = defineProps({
  modelValue: {
    type: String,
    required: true
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
onMounted(() => {
  visible.value = true;
});
const emit = defineEmits<{
  (e: "onCancel"): void;
  (e: "update:modelValue", val: any): void;
  (e: "onConfirm", val: any): void;
}>();
const confirmFn = () => {
  console.log(cOrgRef.value!.getCheckedNodes());
  emit(
    "onConfirm",
    props.checkType === "single"
      ? cOrgRef.value!.getCheckedKeys()
      : cOrgRef.value!.getCheckedNodes()
  );
  visible.value = false;
  // cOrgRef.value!.resetChecked();
};
const cancelFn = () => {
  visible.value = false;
  // cOrgRef.value!.resetChecked();
  emit("onCancel");
};

const checkedNode = ref<any>(props.modelValue);
/*watch(
  () => checkedNode.value,
  val => {
    emit("update:modelValue", val);
  }
);*/
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
      <c-select-tree-org
        :check-type="props.checkType"
        :leaf-only="props.leafOnly"
        v-model:model-value="checkedNode"
        ref="cOrgRef"
      ></c-select-tree-org>
    </div>
  </van-popup>
</template>

<style scoped></style>
