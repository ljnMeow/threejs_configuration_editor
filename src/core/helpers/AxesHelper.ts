import * as THREE from "three";

/**
 * 坐标轴辅助器管理器
 *
 * 该类负责创建、管理和配置场景中的坐标轴辅助器
 */

export const DefaultAxesConfig: AxesHelperInfo = {
  isVisible: true,
  size: 5,
};

class AxesHelperManager {
  // 坐标轴辅助器实例
  private axesHelper: THREE.AxesHelper | null = null;

  // 所属场景
  private scene: THREE.Scene;

  // 默认配置
  private isVisible: boolean = DefaultAxesConfig.isVisible;
  // 坐标轴大小 - 轴线的长度
  private size: number = DefaultAxesConfig.size;

  /**
   * 构造函数
   * @param scene - 坐标轴辅助器所属的场景
   */
  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * 创建并添加坐标轴辅助器到场景
   * @param size - 坐标轴大小
   * @returns 创建的坐标轴辅助器实例
   */
  public create(size: number = this.size): THREE.AxesHelper {
    // 如果已存在坐标轴辅助器，先移除
    this.remove();

    // 更新配置
    this.size = size;
    // 创建新的坐标轴辅助器
    this.axesHelper = new THREE.AxesHelper(size);
    // 添加到场景
    this.scene.add(this.axesHelper);

    return this.axesHelper;
  }

  /**
   * 从场景中移除坐标轴辅助器
   */
  public remove(): void {
    if (this.axesHelper) {
      this.scene.remove(this.axesHelper);
      this.axesHelper = null;
    }
  }

  /**
   * 设置坐标轴辅助器的可见性
   * @param visible - 是否可见
   */
  public setVisible(visible: boolean): void {
    if (this.axesHelper) {
      this.isVisible = visible;
      this.axesHelper.visible = visible;
    }
  }

  /**
   * 获取坐标轴辅助器实例
   * @returns 坐标轴辅助器实例，如果不存在则返回null
   */
  public getHelper(): THREE.AxesHelper | null {
    return this.axesHelper;
  }

  /**
   * 更新坐标轴大小
   * @param size - 坐标轴大小
   */
  public updateSize(size: number): void {
    // 需要重新创建
    if (this.axesHelper && this.isVisible) {
      this.create(size);
    }
  }

  /**
   * 销毁坐标轴辅助器并释放资源
   */
  public dispose(): void {
    this.remove();
    // 清空引用
    this.scene = null as any;
  }

  /**
   * 更新坐标轴辅助器配置
   * @param config - 坐标轴配置对象
   */
  updateAxesHelperConfig(config) {
    if (!this.axesHelper) return;
    
    // 检查各属性是否需要更新
    const visibleChanged =
      config.visible !== undefined && config.visible !== this.isVisible;
    const sizeChanged = config.size !== undefined && config.size !== this.size;

    // 只更新变化的属性
    if (visibleChanged) {
      this.setVisible(config.visible);
    }
    if (sizeChanged) {
      this.updateSize(config.size || this.size);
    }
  }
}

export default AxesHelperManager;
