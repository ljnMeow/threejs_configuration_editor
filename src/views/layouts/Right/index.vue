<script setup lang="ts">
import { ref } from "vue";
import SceneConfig from "./modules/SceneConfig.vue";

const tabList: Array<TabListItem> = [
  {
    key: 0,
    label: "场景",
  },
  {
    key: 1,
    label: "渲染器",
  },
  {
    key: 2,
    label: "后期",
  },
  {
    key: 3,
    label: "天气",
  },
];
const activeTab = ref(0);
const toggleLeft = ref(true);

const handleToggleLeft = () => {
  toggleLeft.value = !toggleLeft.value;
};
</script>

<template>
  <div class="right" :style="{ width: toggleLeft ? '300px' : '0px' }">
    <div v-if="toggleLeft" class="tab-container">
      <el-tabs v-model="activeTab" stretch>
        <el-tab-pane v-for="item in tabList" :key="item.key" :name="item.key">
          <template #label>
            <span
              :class="[
                'tab-label',
                activeTab === item.key
                  ? 'light-active-text-color'
                  : 'light-text-color',
              ]"
            >
              {{ item.label }}
            </span>
          </template>

          <SceneConfig v-if="activeTab === 0" />
        </el-tab-pane>
      </el-tabs>
    </div>
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

  .tab-container {
    padding: 0 10px;
    height: 100%;
  }

  .tab-label {
    position: relative;
    margin-left: 4px;
    font-size: 14px;
  }

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
