import { defineStore } from "pinia";
import { store } from "@/store";

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
    servicesBusAddress: ""
  }),
  actions: {
    setNativeObj(data: INativeObj) {
      this.nativeObj = data;
      this.setServicesBusAddress(this.address[0] || {});
    },
    setServicesBusAddress(data: IAddressItem) {
      const resourceAddress = data.resourceAddress;
      const regex = /^http:\/\/[^\/]+\/proxy\/([^\/]+)\//;
      const match = resourceAddress.match(regex);
      this.servicesBusAddress = match ? match[0] : "" || "";
    },
    filterAddress(url: string): IAddressItem {
      const address = this.address.filter((item: IAddressItem) => {
        return item.resourceAddress.includes(url);
      });
      return address[0] || {};
    }
  },
  getters: {
    userCredential(state) {
      return state.nativeObj?.getUserCredential();
    },
    appCredential(state) {
      return state.nativeObj?.getAppCredential();
    },
    address(state) {
      const address = state.nativeObj?.getAddress();
      return address ? JSON.parse(address) : [];
    },
    zjhm(state) {
      return state.nativeObj?.getZjhm();
    }
  }
});

export function useAppStoreHook() {
  return useAppStore(store);
}
