<script setup lang="ts">
import { ref } from "vue";
import BaseConfig from "@/components/SceneConfig/BaseConfig.vue";
import GridConfig from "@/components/SceneConfig/GridConfig.vue";

const activeKey = ref(0);
</script>

<template>
  <el-collapse class="custom-collapse" v-model="activeKey" accordion>
    <el-collapse-item title="基础信息" :name="0" icon="CaretRight">
      <BaseConfig />
    </el-collapse-item>
    <el-collapse-item title="网格" :name="1" icon="CaretRight">
      <GridConfig />
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="less" scoped>
.custom-collapse {
  border: 0;
}
</style>
