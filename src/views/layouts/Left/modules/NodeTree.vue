<script setup lang="ts">
const data = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 4",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 5",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 6",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 7",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <el-scrollbar id="node-tree-scroll-wrapper">
    <el-tree :data="data" :props="{ children: 'children', label: 'label' }" />
  </el-scrollbar>
</template>

<style lang="less" scoped></style>
