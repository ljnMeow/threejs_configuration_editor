<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { EditorCore } from "./core";

const editor = new EditorCore();
window.editor = editor;
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
