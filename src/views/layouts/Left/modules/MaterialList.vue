<script setup lang="ts">
import { ref } from "vue";

const activeCollapse = ref("0");
</script>

<template>
  <el-space class="operating-btn">
    <el-tooltip content="新建文件夹" placement="bottom">
      <el-button size="small">
        <el-icon><Files /></el-icon>
      </el-button>
    </el-tooltip>
    <el-tooltip content="创建材质" placement="bottom">
      <el-button size="small">
        <el-icon><CirclePlus /></el-icon>
      </el-button>
    </el-tooltip>
    <el-tooltip content="刷新数据" placement="bottom">
      <el-button size="small">
        <el-icon><Refresh /></el-icon>
      </el-button>
    </el-tooltip>
  </el-space>

  <el-scrollbar id="material-list-scroll-wrapper">
    <el-collapse v-model="activeCollapse" accordion>
      <el-collapse-item title="木纹" name="0">
        <el-row>
          <el-col :span="12" v-for="item in 20" :key="item" draggable="true">
            <el-space class="material-item" :size="6" direction="vertical">
              <el-image
                src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                :preview-src-list="[
                  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                ]"
                style="width: 80px; height: 80px; border-radius: 10px"
                fit="cover"
                hide-on-click-modal
                draggable="false"
                @dragstart.prevent
              >
                <template #error>
                  <div class="image-slot">
                    <el-icon :size="28" color="#A3A6AD"
                      ><PictureFilled
                    /></el-icon>
                  </div>
                </template>
              </el-image>
              <span class="light-text-color"> 材质 {{ item }}</span>
            </el-space>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="金属" name="1">
        <el-empty :image-size="70" description="暂无数据" />
      </el-collapse-item>
    </el-collapse>
  </el-scrollbar>
</template>

<style lang="less" scoped>
:deep(.el-empty) {
  padding: 10px 0;
}
:deep(.el-empty__description) {
  margin-top: 6px;
}
:deep(.el-col) {
  display: flex;
}
.operating-btn {
  width: calc(100% - 10px);
  margin-bottom: 10px;
}
.material-item {
  margin: 0 auto;
  padding: 10px 0 4px 0;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
