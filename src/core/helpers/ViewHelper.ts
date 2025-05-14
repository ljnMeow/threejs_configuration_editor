import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

/**
 * 视图指示器管理器
 *
 * 该类负责创建、管理和配置场景中的视图方向指示器
 */
export const DefaultViewHelperConfig = {
  isVisible: true, // 默认是否可见
};

// 方向按钮文字枚举
enum DirectionTextEnum {
  top = "上",
  bottom = "下",
  front = "前",
  back = "后",
  left = "左",
  right = "右",
}

// 方向按钮偏移因子（用于确定相机朝向）
const DirectionOffsetFactor = {
  top: { x: 0, y: 1, z: 0 },
  bottom: { x: 0, y: -1, z: 0 },
  front: { x: 0, y: 0, z: 1 },
  back: { x: 0, y: 0, z: -1 },
  left: { x: -1, y: 0, z: 0 },
  right: { x: 1, y: 0, z: 0 },
};

/**
 * 处理极小值，避免浮点数精度问题
 * @param value 需要处理的数值
 * @returns 如果绝对值小于1e-10则返回0，否则返回原值
 */
function epsilon(value) {
  return Math.abs(value) < 1e-10 ? 0 : value;
}

/**
 * 视图辅助器管理类
 */
class ViewHelperManager {
  private readonly camera: THREE.Camera; // three.js 相机对象
  private readonly parentDom: HTMLDivElement; // 父级 DOM 元素
  private container: HTMLElement; // 视图辅助器容器 DOM
  private helperDom: HTMLElement; // 立方体 DOM
  private controls: OrbitControls; // three.js 轨道控制器
  private readonly mat: THREE.Matrix4; // 用于同步旋转的矩阵

  // 默认配置
  private isVisible: boolean = DefaultViewHelperConfig.isVisible;

  /**
   * 构造函数
   * @param camera three.js 相机对象
   * @param parentDom 父 DOM 元素
   * @param controls three.js 轨道控制器
   */
  constructor(
    camera: THREE.Camera,
    parentDom: HTMLDivElement,
    controls: OrbitControls
  ) {
    this.camera = camera;
    this.controls = controls;

    // 创建视图立方体 DOM 元素
    const { container, cube, dom } = this.create(parentDom || document.body);
    this.container = container;
    this.helperDom = cube;
    this.parentDom = dom

    // 初始化矩阵
    this.mat = new THREE.Matrix4();
  }

  /**
   * 创建视图辅助器 DOM 结构
   * @param dom 父 DOM 元素
   * @returns 包含容器、立方体、父 DOM 的对象
   */
  create(dom: HTMLDivElement) {
    // 创建容器
    const container = document.createElement("div");
    container.id = "view-helper-container";

    // 创建立方体
    const cube = document.createElement("div");
    cube.className = "view-helper-cube";

    // 遍历方向，创建每个方向的按钮
    for (let i in DirectionTextEnum) {
      const direction = document.createElement("div");
      direction.className = `view-helper-direction view-helper-direction--${i}`;
      direction.innerHTML = DirectionTextEnum[i];

      // 点击事件：切换相机朝向
      direction.addEventListener("click", () => {
        this.updateCamera(i);
      });

      cube.appendChild(direction);
    }

    container.appendChild(cube);

    // 挂载到父 DOM
    dom.parentElement?.appendChild(container);

    return { container, cube, dom };
  }

  /**
   * 获取相机 CSS 矩阵字符串
   * 将 THREE.js 矩阵转换为 CSS 的 matrix3d() 字符串
   * @param matrix THREE.js 矩阵
   * @returns CSS 矩阵字符串
   */
  getCameraCSSMatrix(matrix) {
    const { elements } = matrix;

    // 构建 CSS matrix3d 字符串，注意 Y 轴需要取反（WebGL 和 CSS 坐标系 Y 轴方向相反）
    return `matrix3d(
			${epsilon(elements[0])},
			${epsilon(-elements[1])},
			${epsilon(elements[2])},
			${epsilon(elements[3])},
			${epsilon(elements[4])},
			${epsilon(-elements[5])},
			${epsilon(elements[6])},
			${epsilon(elements[7])},
			${epsilon(elements[8])},
			${epsilon(-elements[9])},
			${epsilon(elements[10])},
			${epsilon(elements[11])},
			${epsilon(elements[12])},
			${epsilon(-elements[13])},
			${epsilon(elements[14])},
			${epsilon(elements[15])}
		)`;
  }

  /**
   * 更新视图立方体的旋转，使其与相机方向一致
   */
  update() {
    // 从相机的世界逆矩阵中提取旋转部分
    this.mat.extractRotation(this.camera.matrixWorldInverse);
    // 应用 CSS 变换，使立方体旋转与相机方向一致
    this.helperDom.style.transform = `translateZ(-300px) ${this.getCameraCSSMatrix(
      this.mat
    )}`;
  }

  /**
   * 平滑切换相机到指定方向（优化版，插值极坐标，动画更自然）
   * @param direction 目标方向
   */
  updateCamera(direction: string) {
    // 检查相机和控制器是否可用
    if (!this.camera || !this.controls) {
      console.warn(
        "ViewHelper: Camera or Controls not available for updateCamera."
      );
      return;
    }

    // 获取目标方向的单位向量
    const offset = DirectionOffsetFactor[direction];

    // 计算当前相机到控制目标点的距离，保持缩放级别一致
    let currentDistance = this.camera.position.distanceTo(this.controls.target);
    if (currentDistance === 0) {
      // 如果相机就在目标点，给一个默认距离，避免重合
      currentDistance = 10;
    }

    // 获取当前相机相对于 target 的位置向量
    const currentPos = this.camera.position.clone().sub(this.controls.target);
    // 转换为球坐标（半径、极角 phi、方位角 theta），便于插值动画
    const currentSpherical = new THREE.Spherical().setFromVector3(currentPos);

    // 计算目标方向的单位向量，并缩放到当前距离
    const targetDir = new THREE.Vector3(offset.x, offset.y, offset.z).normalize();
    // 转换为球坐标，得到目标的半径、极角、方位角
    const targetSpherical = new THREE.Spherical().setFromVector3(targetDir.multiplyScalar(currentDistance));

    // 修正极角 phi，避免 lookAt 异常
    if (direction === "top") {
      targetSpherical.phi = 0.00001;
    } else if (direction === "bottom") {
      targetSpherical.phi = Math.PI - 0.00001;
    }

    // 处理 theta 跨越 0/2PI 的情况，保证动画走最短路径
    let deltaTheta = targetSpherical.theta - currentSpherical.theta;
    if (deltaTheta > Math.PI) {
      targetSpherical.theta -= Math.PI * 2;
    } else if (deltaTheta < -Math.PI) {
      targetSpherical.theta += Math.PI * 2;
    }

    // 用于 gsap 动画插值的临时对象
    const tempObj = {
      radius: currentSpherical.radius,
      phi: currentSpherical.phi,
      theta: currentSpherical.theta,
    };

    // 使用 gsap 进行球坐标插值动画
    gsap.to(tempObj, {
      radius: targetSpherical.radius, // 半径插值
      phi: targetSpherical.phi,       // 极角插值
      theta: targetSpherical.theta,   // 方位角插值
      duration: 0.5,                  // 动画时长
      ease: "power2.inOut",           // 缓动函数
      onUpdate: () => {
        // 每帧根据插值结果计算新位置
        const spherical = new THREE.Spherical(tempObj.radius, tempObj.phi, tempObj.theta);
        const newPos = new THREE.Vector3().setFromSpherical(spherical).add(this.controls.target);
        this.camera.position.copy(newPos);      // 更新相机位置
        this.camera.lookAt(this.controls.target); // 保持相机朝向目标
        this.controls.update();                 // 更新 OrbitControls 状态
      },
      onComplete: () => {
        // 动画结束后再更新一次，确保状态同步
        this.controls.update();
      },
    });
  }

  /**
   * 设置可见性
   * @param visible - 是否可见
   */
  setVisible(visible: boolean) {
    this.isVisible = visible;
    
    if(this.isVisible) {
      // 显示时重新添加到父节点
      this.parentDom.parentElement?.appendChild(this.container);
    } else {
      // 隐藏时从父节点移除
      this.parentDom.parentElement?.removeChild(this.container);
    }
  }

  /**
   * 更新视图辅助器配置
   * @param config - 视图辅助器配置对象
   */
  updateViewHelperConfig(config) {
    if (!this.helperDom) return;

    // 检查各属性是否需要更新
    const visibleChanged =
      config.visible !== undefined && config.visible !== this.isVisible;

    // 只更新变化的属性
    if (visibleChanged) {
      this.setVisible(config.visible);
    }
  }
}

export default ViewHelperManager;
