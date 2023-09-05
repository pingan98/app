<script lang="ts" name="CSelectTreeOrg" setup>
// import LiquorTree from "liquor-tree";
import { ref } from "vue";
interface Props {
  options?: string;
}
const props = withDefaults(defineProps<Props>(), {
  options: "aa"
});
const items = ref([
  { text: "Item 1" },
  { text: "Item 2" },
  { text: "Item 3", children: [{ text: "Item 3.1" }, { text: "Item 3.2" }] }
]);
</script>
<template>
  <div class="c-select-tree-org">
    <liquor-tree :data="items" :options="options" ref="tree" />
  </div>
</template>

<style scoped></style>
