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
          v-model="sceneInfo.gridHelperVisible"
          inline-prompt
          active-text="是"
          inactive-text="否"
          @change="(val) => { sceneInfoStore.setDataFieldValue('gridHelperVisible', val) }"
        />
      </el-form-item>
      <el-form-item label="网格大小">
        <el-input-number
          v-model="sceneInfo.gridHelperSize"
          :min="10"
          :disabled="!sceneInfo.gridHelperVisible"
          controls-position="right"
          placeholder="网格大小(从中心点向四周延伸的距离)"
          @change="(val) => { sceneInfoStore.setDataFieldValue('gridHelperSize', val) }"
        />
      </el-form-item>
      <el-form-item label="分割数量">
        <el-input-number
          v-model="sceneInfo.gridHelperDivisions"
          :min="10"
          :max="1000"
          :disabled="!sceneInfo.gridHelperVisible"
          controls-position="right"
          placeholder="网格分割数量(值越大网格越密集)"
          @change="(val) => { sceneInfoStore.setDataFieldValue('gridHelperDivisions', val) }"
        />
      </el-form-item>
      <el-form-item label="网格颜色">
        <el-input v-model="sceneInfo.gridHelperColor" :disabled="!sceneInfo.gridHelperVisible" readonly placeholder="网格颜色">
          <template #append>
            <el-color-picker
              v-model="sceneInfo.gridHelperColor"
              show-alpha
              size="small"
              :disabled="!sceneInfo.gridHelperVisible"
              @change="(val) => { sceneInfoStore.setDataFieldValue('gridHelperColor', val) }"
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
