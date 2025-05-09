import * as THREE from "three";

/**
 * 网格辅助线管理器
 *
 * 该类负责创建、管理和配置场景中的网格辅助线
 */

export const DefaultGridConfig: GridHelperInfo = {
  isVisible: true,
  size: 100,
  divisions: 100,
  gridColor: "rgba(136, 136, 136, 1.0)",
};

class GridHelperManager {
  // 网格辅助线实例
  private gridHelper: THREE.GridHelper | null = null;

  // 所属场景
  private scene: THREE.Scene;

  // 默认配置
  private isVisible: boolean = DefaultGridConfig.isVisible;
  // 网格大小 - 从中心点向四周延伸的距离(总宽度为2倍size)
  private size: number = DefaultGridConfig.size;
  // 网格分割数量 - 每个方向上的线条数量(值越大网格越密集)
  private divisions: number = DefaultGridConfig.divisions;
  // 网格线颜色 - 除中心线外的网格线颜色
  private gridColor: THREE.ColorRepresentation = DefaultGridConfig.gridColor;

  /**
   * 构造函数
   * @param scene - 网格辅助线所属的场景
   */
  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * 创建并添加网格辅助线到场景
   * @param size - 网格大小
   * @param divisions - 网格分割数量
   * @param gridColor - 网格线颜色
   * @returns 创建的网格辅助线实例
   */
  public create(
    size: number = this.size,
    divisions: number = this.divisions,
    gridColor: THREE.ColorRepresentation = this.gridColor
  ): THREE.GridHelper {
    // 如果已存在网格辅助线，先移除
    this.remove();

    // 更新配置
    this.size = size;
    this.divisions = divisions;
    this.gridColor = gridColor;

    // 创建新的网格辅助线
    this.gridHelper = new THREE.GridHelper(
      size,
      divisions,
      gridColor,
      gridColor
    );

    // 添加到场景
    this.scene.add(this.gridHelper);

    return this.gridHelper;
  }

  /**
   * 从场景中移除网格辅助线
   */
  public remove(): void {
    if (this.gridHelper) {
      this.scene.remove(this.gridHelper);
      this.gridHelper = null;
    }
  }

  /**
   * 设置网格辅助线的可见性
   * @param visible - 是否可见
   */
  public setVisible(visible: boolean): void {
    if (this.gridHelper) {
      this.isVisible = visible;
      this.gridHelper.visible = this.isVisible;
    }
  }

  /**
   * 获取网格辅助线实例
   * @returns 网格辅助线实例，如果不存在则返回null
   */
  public getHelper(): THREE.GridHelper | null {
    return this.gridHelper;
  }

  /**
   * 更新网格颜色
   * @param gridColor - 网格线颜色
   */
  public updateColors(
    gridColor: THREE.ColorRepresentation
  ): void {
    // 由于 GridHelper 的颜色在创建后不易直接修改，我们需要重新创建
    if (this.gridHelper && this.isVisible) {
      this.create(this.size, this.divisions, gridColor);
    }
  }

  /**
   * 更新网格大小和分割数
   * @param size - 网格大小
   * @param divisions - 网格分割数量
   */
  public updateSize(size: number, divisions: number): void {
    // 同样需要重新创建
    if (this.gridHelper && this.isVisible) {
      this.create(size, divisions, this.gridColor);
    }
  }

  /**
   * 销毁网格辅助线并释放资源
   */
  public dispose(): void {
    this.remove();
    // 清空引用
    this.scene = null as any;
  }

  /**
   * 更新网格辅助线配置
   * @param config - 网格配置对象
   */
  updateGridHelperConfig(config) {
    if (!this.gridHelper) return;

    // 检查各属性是否需要更新
    const visibleChanged =
      config.visible !== undefined && config.visible !== this.isVisible;
    const colorChanged =
      (config.gridColor !== undefined && config.gridColor !== this.gridColor);
    const sizeChanged =
      (config.size !== undefined && config.size !== this.size) ||
      (config.divisions !== undefined && config.divisions !== this.divisions);

    // 只更新变化的属性
    if (visibleChanged) {
      this.setVisible(config.visible);
    }
    if (colorChanged) {
      this.updateColors(config.gridColor || this.gridColor);
    }
    if (sizeChanged) {
      this.updateSize(config.size || this.size, config.divisions || this.divisions);
    }
  }
}

export default GridHelperManager;
