<script lang="ts" name="PolicePopup" setup>
import { onMounted, ref } from "vue";
import { getPoliceByOrgId } from "@/api/tCarUser";
import { showFailToast } from "vant";
import { toMap } from "@/utils";

const list = ref<any>([]);
const mapList = ref<any>({});
const visible = ref(false);
const selectedValue = ref([]);
const loading = ref(true);
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
  modelValue: {
    type: String,
    default: ""
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
onMounted(() => {
  getData();
});
const getData = () => {
  if (!props.orgId) {
    showFailToast("请选择部门");
    return false;
  }
  visible.value = true;
  selectedValue.value = [props.modelValue];

  getPoliceByOrgId({
    orgId: props.orgId as string,
    type: props.policeType as string
  })
    .then(({ data }) => {
      loading.value = false;
      list.value = data;
      mapList.value = toMap(data, "idcard");
    })
    .catch(err => {
      loading.value = false;
    });
};
</script>

<template>
  <van-popup v-model:show="visible" round position="bottom" @closed="cancelFn">
    <van-picker
      v-if="list.length"
      :loading="loading"
      v-model="selectedValue"
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
