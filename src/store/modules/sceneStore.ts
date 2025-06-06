import { defineStore } from "pinia";
import { DefaultGridConfig } from "@/core/helpers/GridHelper";
import { DefaultAxesConfig } from "@/core/helpers/AxesHelper";
import { DefaultViewHelperConfig } from "@/core/helpers/ViewHelper"
import useSignalStore from "./signalStore";

/**
 * 默认场景信息对象
 */
const DefaultSceneInfo: SceneInfo = {
  id: "", // 场景唯一标识符
  name: "", // 场景名称
  desc: "", // 场景描述
  gridHelperVisible: DefaultGridConfig.isVisible, // 网格是否可见
  gridHelperSize: DefaultGridConfig.size, // 网格大小(从中心点向四周延伸的距离)
  gridHelperDivisions: DefaultGridConfig.divisions, // 网格分割数量(值越大网格越密集)
  gridHelperColor: DefaultGridConfig.gridColor, // 网格线颜色(除中心线外的网格线)
  axesHelperVisible: DefaultAxesConfig.isVisible, // 坐标轴是否可见
  axesHelperSize: DefaultAxesConfig.size, // 坐标轴长度(从中心点向四周延伸的距离)
  viewHelperVisible: DefaultViewHelperConfig.isVisible, // 视图指示器是否可见
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

      // 检查并更新相关属性
      if (field.startsWith("gridHelper")) {
        this.updateGridHelper();
      }
      if (field.startsWith("axesHelper")) {
        this.updateAxesHelper();
      }
      if (field.startsWith("viewHelper")) {
        this.updateViewHelper();
      }
    },

    /**
     * 更新网格辅助线
     * 触发信号通知 GridHelperManager 更新视图
     */
    updateGridHelper() {
      const signalStore = useSignalStore();

      signalStore.dispatch("gridHelperConfigUpdate", {
        visible: this.data.gridHelperVisible,
        size: this.data.gridHelperSize,
        divisions: this.data.gridHelperDivisions,
        gridColor: this.data.gridHelperColor,
      });
    },

    /**
     * 更新坐标轴辅助线
     * 触发信号通知 AxesHelperManager 更新视图
     */
    updateAxesHelper() {
      const signalStore = useSignalStore();

      signalStore.dispatch("axesHelperConfigUpdate", {
        visible: this.data.axesHelperVisible,
        size: this.data.axesHelperSize,
      });
    },

    /**
     * 更新视图辅助器
     * 触发信号通知 ViewHelperManager 更新视图
     */
    updateViewHelper() {
      const signalStore = useSignalStore();

      signalStore.dispatch("viewHelperConfigUpdate", {
        visible: this.data.viewHelperVisible,
      });
    },
  },
});
