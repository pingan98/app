import { defineStore } from "pinia";
import { store } from "@/store";
import { add } from "husky";

interface INativeObj {
  getUserCredential(): string;
  getAppCredential(): string;
  getAddress(): string;
  getZjhm(): string;
}

interface IAddressItem {
  resourceId: string;
  resourceRegionalismCode: string;
  resourceServiceType: string;
  resourceAddress: string;
}

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    nativeObj: {} as INativeObj,
    userCredential: "",
    appCredential: "",
    address: [],
    zjhm: ""
  }),
  actions: {
    setNativeObj(data) {
      this.nativeObj = data;
      this.userCredential = data.getUserCredential() || "";
      this.appCredential = data.getAppCredential() || "";
      this.zjhm = data.getZjhm() || "";
      const address = data.getAddress();
      this.address = address ? JSON.parse(address) : [];
    },
    setServicesBusAddress(data) {
      // console.log("入参data----", data);
      const resourceAddress = data.resourceAddress || "";
      const regex = /^http:\/\/[^\/]+\/proxy\/([^\/]+)\//;
      const match = resourceAddress.match(regex);
      // console.log(match);
      return match ? match[0] : "" || "";
    },
    filterAddress(url: string): IAddressItem {
      // console.log("入参url----", url);
      const splitUrlArr = url.split("?") || [];
      // console.log("split url>>", splitUrlArr);
      // console.log("this.address---", this.address);
      const address = this.address.filter((item: IAddressItem) => {
        return item.resourceAddress.includes(splitUrlArr[0]);
      });
      // console.log("filterAddress------", address[0]);
      return address[0] || {};
    }
  }
});

export function useAppStoreHook() {
  return useAppStore(store);
}
