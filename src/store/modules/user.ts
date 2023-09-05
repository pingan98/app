import { ref } from "vue";
import { defineStore } from "pinia";
import { loginApi, logoutApi } from "@/api/auth";
import type { LoginData } from "@/api/auth/types";
import { getCurrentAccount } from "@/api/user/index";
import type { UserInfo } from "@/api/user/types";
import { useStorage } from "@vueuse/core";
import { resetRouter } from "@/router";

// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore(
  "user",
  () => {
    // state
    // const accessToken = useStorage("accessToken", "");
    const accessToken = ref("");
    const userInfo = ref<UserInfo>();

    /**
     * 登录调用
     *
     * @param {LoginData}
     * @returns
     */
    function login(loginData: LoginData) {
      return new Promise<void>((resolve, reject) => {
        loginApi(loginData)
          .then(response => {
            accessToken.value = response.token; // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx

            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    const getToken = (u: UserInfo) => {
      userInfo.value = u;
    };

    // 获取信息(用户昵称、头像、角色集合、权限集合)
    function getInfo() {
      return new Promise<UserInfo>((resolve, reject) => {
        getCurrentAccount()
          .then(({ data }) => {
            if (!data) {
              return reject("Verification failed, please Login again.");
            }
            setUser({ ...data });
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    const setUser = (u: UserInfo) => {
      userInfo.value = u;
    };
    // 注销
    function logout() {
      return new Promise<void>((resolve, reject) => {
        logoutApi()
          .then(() => {
            resetRouter();
            resetToken();
            location.reload(); // 清空路由
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    // 重置
    function resetToken() {
      accessToken.value = "";
      userInfo.value = undefined;
    }
    return {
      accessToken,
      userInfo,
      login,
      getInfo,
      setUser,
      logout,
      resetToken
    };
  },
  {
    persist: true
  }
);
