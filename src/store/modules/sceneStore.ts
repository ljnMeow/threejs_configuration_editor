import { defineStore } from "pinia";
import { DefaultGridConfig } from "@/core/helpers/GridHelper";
import useSignalStore from "./signalStore";

/**
 * 默认场景信息对象
 */
const DefaultSceneInfo: SceneInfo = {
  id: "", // 场景唯一标识符
  name: "", // 场景名称
  desc: "", // 场景描述
  gridVisible: DefaultGridConfig.isVisible, // 网格是否可见
  gridSize: DefaultGridConfig.size, // 网格大小(从中心点向四周延伸的距离)
  gridDivisions: DefaultGridConfig.divisions, // 网格分割数量(值越大网格越密集)
  gridColor: DefaultGridConfig.gridColor, // 网格线颜色(除中心线外的网格线)
};

/**
 * 创建场景信息的 Pinia Store
 * 使用选项式 API 风格定义 Store
 */
export const useSceneInfoStore = defineStore("sceneInfo", {
  state: () => <{ data: SceneInfo }>{ data: DefaultSceneInfo },
  actions: {
    /**
     * 设置场景数据的特定字段值
     * @param field - 要设置的字段名称
     * @param value - 要设置的字段值（字符串或数字）
     */
    setDataFieldValue(field: string, value: string | number) {
      // 如果字段不存在，则直接返回
      if (this.data[field] === undefined) return;

      // 更新 store 中的数据
      this.data[field] = value;

      // 检查是否为网格相关属性，如果是则触发网格更新信号
      if (field.startsWith("grid")) {
        this.updateGridHelper();
      }
    },

    /**
     * 更新网格辅助线
     * 触发信号通知 GridHelperManager 更新视图
     */
    updateGridHelper() {
      const signalStore = useSignalStore();

      // 发送网格更新信号，携带所有网格相关配置
      signalStore.dispatch("gridHelperConfigUpdate", {
        visible: this.data.gridVisible,
        size: this.data.gridSize,
        divisions: this.data.gridDivisions,
        gridColor: this.data.gridColor,
      });
    },
  },
});
