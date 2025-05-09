<script setup lang="ts">
import { computed } from "vue";
import { useSceneInfoStore } from "@/store/modules/sceneStore";

const sceneInfoStore = useSceneInfoStore();

const sceneInfo = computed(() => sceneInfoStore.data);
</script>

<template>
  <div class="config-wrapper">
    <el-form label-position="left" label-width="80px">
      <el-form-item label="是否展示">
        <el-switch
          v-model="sceneInfo.gridVisible"
          inline-prompt
          active-text="是"
          inactive-text="否"
          @change="(val) => { sceneInfoStore.setDataFieldValue('gridVisible', val) }"
        />
      </el-form-item>
      <el-form-item label="网格颜色">
        <el-input v-model="sceneInfo.gridColor" readonly placeholder="网格颜色">
          <template #append>
            <el-color-picker
              v-model="sceneInfo.gridColor"
              show-alpha
              size="small"
              @change="(val) => { sceneInfoStore.setDataFieldValue('gridColor', val) }"
            />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
:deep(.el-input-group__append) {
  padding: 0 4px;
}
</style>
