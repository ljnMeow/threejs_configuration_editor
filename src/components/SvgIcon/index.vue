<template>
  <svg :class="[svgClass, ...customClass]" aria-hidden="true" :style="customStyle" :width="size" :height="size">
    <use :fill="color" :xlink:href="iconClassName" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: undefined,
  },
  customStyle: {
    type: Object,
    default: undefined,
  },
  customClass: {
    type: Array<string>,
    default: [],
  },
  size: {
    type: String,
    default: '16px',
  }
});

const iconClassName = computed(() => {
  return `#${props.iconName}`;
});

const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return "svg-icon";
});

const color = computed(() => {
  return props.color;
});
</script>

<style lang="less" scoped>
.svg-icon {
  position: relative;
}
</style>
