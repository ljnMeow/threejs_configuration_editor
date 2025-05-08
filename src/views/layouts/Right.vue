<script setup lang="ts">
import { ref } from "vue";

const toggleLeft = ref(true);

const handleToggleLeft = () => {
  toggleLeft.value = !toggleLeft.value;
};
</script>

<template>
  <div class="right" :style="{ width: toggleLeft ? '300px' : '0px' }">
    <div class="toggle" @click="handleToggleLeft()">
      <el-icon :size="18">
        <ArrowRightBold v-if="toggleLeft" />
        <ArrowLeftBold v-else />
      </el-icon>
    </div>
  </div>
</template>

<style lang="less" scoped>
.right {
  position: relative;
  width: 300px;
  padding: 10px 0;
  background-color: #ffffff;
  transition: all 0.3s;
  z-index: 1;

  .toggle {
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 50px;

    :deep(.el-icon) {
      transition: all 0.3s ease;
    }

    &:hover {
      :deep(.el-icon) {
        animation: swing 1s infinite;
      }
    }
  }
}

@keyframes swing {
  0%,
  100% {
    margin-right: 0px;
  }
  50% {
    margin-right: 6px;
  }
}
</style>
