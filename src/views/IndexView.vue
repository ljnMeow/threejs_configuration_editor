<script setup lang="ts">
import Header from "./layouts/Header.vue";
import Left from "./layouts/Left/index.vue";
import Center from "./layouts/Center/index.vue";
import Right from "./layouts/Right/index.vue";
</script>

<template>
  <el-container class="index-view">
    <el-header height="50px" style="padding: 0">
      <Header />
    </el-header>
    <el-main style="padding: 0">
      <div class="main-wrapper">
        <Left />
        <Center />
        <Right />
      </div>
    </el-main>
  </el-container>
</template>

<style lang="less" scoped>
.index-view {
  width: 100vw;
  height: 100vh;

  .main-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }
}
</style>
