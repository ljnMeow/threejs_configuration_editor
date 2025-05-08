// 声明 .vue 文件为 Vue 组件
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface Window {
  editor: import('../core/index').EditorCore;
  sceneViewer: import('../core/index').SceneViewport;
}
