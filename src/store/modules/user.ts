import { ref } from "vue";
import { defineStore } from "pinia";
import { loginApi, logoutApi } from "@/api/auth";
import type { LoginData, LoginResult } from "@/api/auth/types";
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
    const menuList = ref<any[]>();

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
    const setUser = (u: any) => {
      userInfo.value = u;
    };
    // 获取信息(用户昵称、头像、角色集合、权限集合)
    function setUserInfo() {
      return new Promise<UserInfo>((resolve, reject) => {
        getCurrentAccount()
          .then(({ data }) => {
            // function test({a} : { a: any}) {}
            if (!data) {
              return reject("Verification failed, please Login again.");
            }
            setUser({ ...data });
            setMenuList(data.menuList || []);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    const getSomeMenu = (url: string) => {
      return menuList.value?.some(item => item.url === url);
    };
    const setMenuList = (v: any) => {
      menuList.value = v;
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
      menuList,
      login,
      setUserInfo,
      setUser,
      getSomeMenu,
      logout,
      resetToken
    };
  },
  {
    persist: true
  }
);
