import { createApp } from "vue";
import router from "./router";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "@/assets/css/reset.css";
import "@/assets/css/style.css";
import "element-plus/dist/index.css";
import "@/assets/less/customStyle.less";
import "@/assets/less/globalStyle.less";

import App from "./App.vue";

import { initStore } from "./store";

import SvgIcon from "@/components/SvgIcon/index.vue";
import "@/assets/js/iconfont.js";

const app = createApp(App);

initStore(app); // 状态库初始化

app.use(router); // 注册路由

app.component("SvgIcon", SvgIcon).use(ElementPlus); // 组件库全局注册

// element-icons 全局注册
for (const key of Object.keys(ElementPlusIconsVue)) {
  const component = (ElementPlusIconsVue as any)[key];
  app.component(key, component);
}

app.mount("#app");
