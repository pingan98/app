import Axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig
} from "axios";
import { ContentTypeEnum, ResultEnum } from "@/enums/requestEnum";
declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
  interface AxiosResponse {
    token: string;
    // 这里追加你的参数
  }
}
import { useUserStore } from "@/store/modules/user";
import type { LoginData } from "@/api/auth/types";

import NProgress from "../progress";
import { showFailToast, showSuccessToast, showConfirmDialog } from "vant";
import { refreshPage } from "@/utils";

const env = import.meta.env.VITE_APP_ENV;

// 默认 axios 实例请求配置
const configDefault = {
  headers: {
    "Content-Type": ContentTypeEnum.FORM_URLENCODED
  },
  timeout: 50000,
  baseURL: import.meta.env.VITE_BASE_API,
  data: {}
};

class Http {
  // 当前实例
  private static axiosInstance: AxiosInstance;
  // 请求配置
  private static axiosConfigDefault: AxiosRequestConfig;

  // 请求拦截
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      config => {
        // dev prod
        if (env === "prod") {
          // 所有接口需要走总线那边 返回格式如下：(参考数组第一个)
          /*const tempArr = [
            {
              resourceId: "330000000000-3-0100-00004774",
              resourceRegionalismCode: "330000000000",
              resourceServiceType: "20",
              resourceAddress:
                "http://20.65.212:1798/proxy/f5a00d6874408266a7014328f7004e39/user/getCurrentAccount"
            },
            {
              resourceId: "33000998000000-3-0100-00004774",
              resourceRegionalismCode: "330000000000",
              resourceServiceType: "20",
              resourceAddress:
                "http://20.65.212:1798/proxy/f5a00d68744087776a7014328f7004e39/moveWarnMaterial/getWarnMaterialPage"
            }
          ];*/
          const tempArr = window.nativeObj.getAddress()
            ? JSON.parse(window.nativeObj.getAddress())
            : [];
          // console.log("getAddress start-----------");
          // console.log(tempArr);
          // console.log("getAddress end-----------");
          const index = tempArr.findIndex(
            (item: string | any, index: number) => {
              const arr = item.resourceAddress.split("/proxy/")[1].split("/");
              const url = "/" + arr.splice(1).join("/");

              if (["{", "}"].includes(url)) {
                // 模糊匹配
                if (url.includes(config.url) > -1) return index;
              } else {
                // 绝对匹配
                if (url === config.url) return index;
              }
            }
          );
          // console.log('index');
          // console.log(tempArr[index]);
          showConfirmDialog({
            title: "url" + index,
            message: tempArr[index].resourceAddress || "没找到地址"
          })
            .then(() => {
              // on confirm
            })
            .catch(() => {
              // on cancel
            });
          config.url = tempArr[index].resourceAddress;

          // config["resourceId"] = tempArr[index].resourceId;
          config.headers["resourceId"] = tempArr[index].resourceId;
        }
        // NProgress.start();
        const userStore = useUserStore();
        // 发送请求前，可在此携带 token
        if (userStore.accessToken) {
          config.headers["Access-Token"] = userStore.accessToken;
        }
        return config;
      },
      (error: AxiosError) => {
        showFailToast(error.message);
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // NProgress.done();
        const res = response.data;
        if (res.status == "20000") {
          // token过期
          showFailToast(res.msg);

          // const userStore = useUserStore();
          // userStore
          //   .login(<LoginData>{
          //     username: userStore?.userInfo?.policeNo,
          //     password: "M@123456"
          //   })
          //   .then(() => {
          //     userStore.setUserInfo();
          //     // refreshPage();
          //   });
        } else if (res.code === false) {
          showFailToast(res.msg || "业务失败");
          return Promise.reject(res);
        }
        return res;
        /*// 与后端协定的返回字段
        const { code, message, result, ...res } = response.data;
        // 判断请求是否成功
        const isSuccess =
          result &&
          Reflect.has(response.data, "code") &&
          code === ResultEnum.SUCCESS;
        if (isSuccess) {
          return result;
        } else {
          // 处理请求错误
          // showFailToast(message);
          return Promise.reject(response.data);
        }*/
      },
      (error: AxiosError) => {
        // NProgress.done();
        // 处理 HTTP 网络错误
        let message = "";
        // HTTP 状态码
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = "请求错误";
            break;
          case 401:
            message = "未授权，请登录";
            break;
          case 403:
            message = "拒绝访问";
            break;
          case 404:
            message = `请求地址出错: ${error.response?.config?.url}`;
            break;
          case 408:
            message = "请求超时";
            break;
          case 500:
            message = "服务器内部错误";
            break;
          case 501:
            message = "服务未实现";
            break;
          case 502:
            message = "网关错误";
            break;
          case 503:
            message = "服务不可用";
            break;
          case 504:
            message = "网关超时";
            break;
          case 505:
            message = "HTTP版本不受支持";
            break;
          default:
            message = "网络连接故障";
        }

        showFailToast(message);
        return Promise.reject(error);
      }
    );
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  // 通用请求函数
  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export const http = new Http(configDefault);
