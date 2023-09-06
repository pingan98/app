<script lang="ts" name="PolicePopup" setup>
import { onMounted, ref, watch } from "vue";
import { getPoliceByOrgId } from "@/api/tCarUser";
import { showFailToast } from "vant";
import { toMap } from "@/utils";

const list = ref<any>([]);
const mapList = ref<any>({});
const visible = ref(false);
const customFieldName = {
  text: "jyname",
  value: "idcard"
};
const props = defineProps({
  policeType: {
    type: String,
    default: "-1"
  },
  orgId: {
    type: String,
    default: ""
  },
  showPicker: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits<{
  (e: "onCancel"): void;
  (e: "onConfirm", val: any): void;
}>();
const confirmFn = ({ selectedValues }) => {
  visible.value = false;
  const obj = mapList.value[selectedValues[0]];
  emit("onConfirm", obj);
};
const cancelFn = () => {
  visible.value = false;
  emit("onCancel");
};
watch(
  () => props.showPicker,
  val => {
    if (val) {
      visible.value = val;

      getData();
    }
  }
);
const getData = () => {
  if (!props.orgId) {
    showFailToast("请选择部门");
    return false;
  }

  getPoliceByOrgId({ orgId: props.orgId, type: props.policeType }).then(
    ({ data }) => {
      list.value = data;
      mapList.value = toMap(data, "idcard");
    }
  );
};
</script>

<template>
  <van-popup v-model:show="visible" round position="bottom" @closed="cancelFn">
    <van-picker
      v-if="list.length"
      show-toolbar
      :columns="list"
      @confirm="confirmFn"
      @cancel="cancelFn"
      :columns-field-names="customFieldName"
    />

    <van-empty description="暂无数据" v-else />
  </van-popup>
</template>

<style scoped></style>
