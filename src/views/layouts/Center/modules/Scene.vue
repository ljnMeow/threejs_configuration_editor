<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import useSignalStore from '@/store/modules/signalStore';
import { SceneViewport } from '@/core';

const sceneVireportRef = ref();
const signalStore = useSignalStore();

let timer: ReturnType<typeof setTimeout> | null = null;

const handleSceneResize = (width: number, height: number) => {
  if(timer) return

  timer = setTimeout(() => {
    signalStore.dispatch('viewportResize', {
      width,
      height
    })
    timer = null
  }, 10)
}

onMounted(async () => {
  window.sceneViewer = new SceneViewport(sceneVireportRef.value);

  await nextTick();

  const sceneResizeOBserver = new ResizeObserver(() => {
    handleSceneResize(sceneVireportRef.value.offsetWidth, sceneVireportRef.value.offsetHeight);
  });
  sceneResizeOBserver.observe(sceneVireportRef.value);
})
</script>

<template>
  <div class="scene">
    <div class="sceneVireport" ref="sceneVireportRef"></div>
  </div>
</template>

<style lang="less" scoped>
.scene {
  position: relative;
  width: 100%;
  height: 100%;

  .sceneVireport {
    width: 100%;
    height: 100%;

    :deep(canvas) {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }
  }
}
</style>
