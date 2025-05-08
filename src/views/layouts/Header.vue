<script setup lang="ts">
import { ref } from "vue";
import {
  CaretLeft,
  CaretRight,
  CopyDocument,
  Delete,
  CircleClose,
  FullScreen,
  Setting,
  QuestionFilled,
} from "@element-plus/icons-vue";

const theme = ref(false);
</script>

<template>
  <div class="header">
    <div class="left">
      <img src="../../assets/image/logo.png" alt="logo.png" class="logo" />
      <el-space :size="6">
        <el-button-group>
          <el-tooltip content="撤销" placement="bottom">
            <el-button :icon="CaretLeft" size="small" />
          </el-tooltip>
          <el-tooltip content="恢复" placement="bottom">
            <el-button :icon="CaretRight" size="small" />
          </el-tooltip>
        </el-button-group>
        <el-tooltip content="复制" placement="bottom">
          <el-button :icon="CopyDocument" size="small" />
        </el-tooltip>
        <el-button-group>
          <el-tooltip content="删除" placement="bottom">
            <el-button :icon="Delete" size="small" />
          </el-tooltip>
          <el-tooltip content="清空所有" placement="bottom">
            <el-button :icon="CircleClose" size="small" />
          </el-tooltip>
        </el-button-group>
        <el-tooltip content="全屏" placement="bottom">
          <el-button :icon="FullScreen" size="small" />
        </el-tooltip>
        <el-button size="small">
          <el-space :size="2">
            导入<el-icon><Upload /></el-icon>
          </el-space>
        </el-button>
        <el-button size="small">
          <el-space :size="2">
            导出<el-icon><Download /></el-icon>
          </el-space>
        </el-button>
      </el-space>
    </div>
    <div class="center title light-text-color">搞着玩大宝贝界面</div>
    <div class="right">
      <el-space :size="6">
        <el-button size="small">
          <el-space :size="2">
            保存<el-icon><Files /></el-icon>
          </el-space>
        </el-button>
        <el-button size="small">
          <el-space :size="2">
            预览<el-icon><View /></el-icon>
          </el-space>
        </el-button>
        <el-dropdown>
          <el-button size="small">中/en</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>中文</el-dropdown-item>
              <el-dropdown-item>English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-switch
          v-model="theme"
          active-text="深色"
          inactive-text="浅色"
          inline-prompt
          size="large"
          style="margin: 0 8px"
        >
          <template #active-action>
            <el-icon><Moon /></el-icon>
          </template>
          <template #inactive-action>
            <el-icon><Sunny /></el-icon>
          </template>
        </el-switch>
        <el-tooltip content="设置" placement="bottom">
          <el-button :icon="Setting" size="small" />
        </el-tooltip>
        <el-button :icon="QuestionFilled" size="small" />
      </el-space>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  .left,
  .right {
    display: flex;
    align-items: center;
    flex: none;
    width: calc(100% / 3.8);
    height: 100%;
    padding: 0 20px;

    &.right {
      justify-content: flex-end;
    }

    .logo {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }

  .center {
    flex-grow: 1;
    text-align: center;

    &.title {
      font-size: 18px;
      font-weight: bolder;
      letter-spacing: 4px;
    }
  }
}
</style>
