<template>
  <router-view />
</template>

<script setup lang="ts" name="Home">
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
appStore.setNativeObj(
  window.nativeObj || {
    getAddress: () => {
      return `[{"resourceId": "33000998000000-3-0100-00004774","resourceRegionalismCode": "330000000000","resourceServiceType": "20","resourceAddress":"http://20.65.212:1798/proxy/f5a00d68744087776a7014328f7004e39/moveWarnMaterial/getWarnMaterialPagesdsd"},{"resourceId": "330000000000-3-0100-00004774","resourceRegionalismCode": "330000000000","resourceServiceType": "20","resourceAddress":"http://20.65.212:1798/proxy/f5a00d6874408266a7014328f7004e39/moveWarnMaterial/batchUpdateWarnMaterial"}]`;
    },
    getAppCredential: () => "appCredential",
    getUserCredential: () => "UserCredential",
    getZjhm: () => "zjhm"
  }
);
</script>

<style></style>
