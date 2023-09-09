import { createApp } from "vue";
import { store } from "./store";
//添加事件管理者'passive'，来阻止'touchstart'事件，让页面更加流畅。 解决chrome下的warning问题
import "default-passive-events";
// normalize.css
import "normalize.css/normalize.css";
// vant 样式
import "vant/es/toast/style";
import "vant/lib/index.css";
// 全局样式
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(store);
app.use(router);

app.mount("#app");
