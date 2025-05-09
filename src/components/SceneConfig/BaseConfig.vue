<script setup lang="ts">
import { computed } from "vue";
import { useSceneInfoStore } from '@/store/modules/sceneStore'

const sceneInfoStore = useSceneInfoStore()

const sceneInfo = computed(() => sceneInfoStore.data);
</script>

<template>
  <div class="config-wrapper">
    <el-form label-position="left" label-width="80px">
      <el-form-item label="场景ID">
        <el-input v-model="sceneInfo.id" placeholder="场景ID" disabled />
      </el-form-item>
      <el-form-item label="场景名称">
        <el-input
          v-model="sceneInfo.name"
          clearable
          placeholder="场景名称"
          maxlength="32"
          @change="(val) => { sceneInfoStore.setDataFieldValue('name', val) }"
        />
      </el-form-item>
      <el-form-item label="场景说明">
        <el-input
          v-model="sceneInfo.desc"
          clearable
          show-word-limit
          placeholder="场景说明"
          type="textarea"
          maxlength="200"
          resize="none"
          :autosize="{ minRows: 6, maxRows: 6 }"
          @change="(val) => { sceneInfoStore.setDataFieldValue('desc', val) }"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
