<script setup lang="ts">
import { ref } from "vue";
import NodeTree from "./modules/NodeTree.vue";
import ModelList from "./modules/ModelList.vue";
import LightList from "./modules/LightList.vue";
import MaterialList from "./modules/MaterialList.vue";

const tabList: Array<TabListItem> = [
  {
    key: 0,
    label: "节点",
    icon: "icon-node",
  },
  {
    key: 1,
    label: "模型",
    icon: "icon-model",
  },
  {
    key: 2,
    label: "灯光",
    icon: "icon-light",
  },
  {
    key: 3,
    label: "材质",
    icon: "icon-material",
  },
];
const activeTab = ref(0);
const toggleLeft = ref(true);

const handleToggleLeft = () => {
  toggleLeft.value = !toggleLeft.value;
};
</script>

<template>
  <div class="left" :style="{ width: toggleLeft ? '300px' : '0px' }">
    <el-tabs v-model="activeTab" tab-position="left" style="height: 100%">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.key"
        :name="item.key"
        style="height: 100%"
      >
        <template #label>
          <SvgIcon
            :iconName="item.icon"
            :color="activeTab === item.key ? '#000000' : '#3f3f3f'"
            size="20px"
          />
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
        <NodeTree v-if="activeTab === 0" />
        <ModelList v-else-if="activeTab === 1" />
        <LightList v-else-if="activeTab === 2" />
        <MaterialList v-else-if="activeTab === 3" />
      </el-tab-pane>
    </el-tabs>
    <div class="toggle" @click="handleToggleLeft()">
      <el-icon :size="18">
        <ArrowLeftBold v-if="toggleLeft" />
        <ArrowRightBold v-else />
      </el-icon>
    </div>
  </div>
</template>

<style lang="less" scoped>
.left {
  position: relative;
  width: 300px;
  padding: 10px 0;
  background-color: #ffffff;
  transition: all 0.3s;
  z-index: 1;

  .tab-label {
    position: relative;
    margin-left: 4px;
    font-size: 14px;
  }

  .toggle {
    position: absolute;
    top: 50%;
    left: 100%;
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
    margin-left: 0px;
  }
  50% {
    margin-left: 6px;
  }
}
</style>
