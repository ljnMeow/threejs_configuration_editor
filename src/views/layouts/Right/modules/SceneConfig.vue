<script setup lang="ts">
import { ref } from "vue";
import BaseConfig from "@/components/SceneConfig/BaseConfig.vue";
import GridConfig from "@/components/SceneConfig/GridConfig.vue";
import AxesConfig from "@/components/SceneConfig/AxesConfig.vue";
import ViewHelperConfig from "@/components/SceneConfig/ViewHelperConfig.vue"

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
    <el-collapse-item title="坐标轴" :name="2" icon="CaretRight">
      <AxesConfig />
    </el-collapse-item>
    <el-collapse-item title="视图辅助器" :name="3" icon="CaretRight">
      <ViewHelperConfig />
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="less" scoped>
.custom-collapse {
  border: 0;
}
</style>
