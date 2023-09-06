<script lang="ts" name="CSelectPolice" setup>
import { ref, watch, withDefaults } from "vue";
import { getPoliceByOrgId } from "@/api/tCarUser";

const list = ref<any>([]);

const props = withDefaults(
  defineProps<{
    orgId: string;
    type?: string;
  }>(),
  {
    type: "-1"
  }
);
watch(
  [() => props.orgId, () => props.type],
  ([newCount1, newCount2], [oldCount1, oldCount2]) => {
    getData();
  }
);
const getData = () => {
  if (!props.orgId) return false;
  getPoliceByOrgId({ orgId: props.orgId, type: props.type }).then(
    ({ data }) => {
      list.value = data;
    }
  );
};
const change = () => {};
</script>

<template>
  <div class="c-select-police">
    <van-cell v-for="item in list" :key="item.idcard" :title="item.jyname" />
  </div>
</template>

<style scoped></style>
