import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import useSignalStore from "@/store/modules/signalStore";

import GridHelperManager from "./helpers/GridHelper";
import AxesHelperManager from './helpers/AxesHelper'
import ViewHelperManager from './helpers/ViewHelper'

/**
 * 场景视口管理类
 * 负责 three.js 场景的初始化、渲染、辅助工具管理、信号响应等
 */
export default class SceneViewport {
  container: HTMLDivElement; // 容器 DOM 元素
  scene: THREE.Scene; // three.js 场景对象
  camera: THREE.PerspectiveCamera; // three.js 透视相机对象
  renderer: THREE.WebGLRenderer | undefined; // three.js 渲染器
  controls: OrbitControls | undefined; // 轨道控制器

  // 网格辅助线管理器
  private gridHelperManager: GridHelperManager | null = null;
  // 坐标轴服务管理器
  private axesHelperManager: AxesHelperManager | null = null;
  // 视图辅助管理器
  private viewHelperManager: ViewHelperManager | null = null;

  /**
   * 构造函数，初始化场景视口
   * @param container 容器 DOM 元素
   */
  constructor(container: HTMLDivElement) {
    this.container = container;
    this.scene = window.editor.scene;
    this.camera = window.editor.camera;
    
    // 初始化辅助工具管理器
    this.gridHelperManager = new GridHelperManager(this.scene);
    this.axesHelperManager = new AxesHelperManager(this.scene);

    // 初始化渲染器、控制器、辅助工具
    this.initRenderer();
    this.initControls();
    this.initHelpers();

    // 初始化信号监听
    this.initSignal();
  }

  /**
   * 初始化 three.js 渲染器
   */
  private initRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      alpha: true,     // 透明背景
    });

    // 设置渲染器大小为容器大小
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );

    // 设置设备像素比，提升高清屏显示效果
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // 启用阴影
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 使用 setAnimationLoop 代替 requestAnimationFrame，便于后续拓展
    this.renderer.setAnimationLoop(this.animate.bind(this));

    // 将渲染器的 DOM 元素添加到容器中
    this.container.appendChild(this.renderer.domElement);
  }

  /**
   * 初始化相机控制器（OrbitControls）
   */
  private initControls(): void {
    if (!this.renderer) return;

    // 创建轨道控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // 配置控制器参数
    this.controls.enableDamping = true; // 启用阻尼效果
    this.controls.dampingFactor = 0.05; // 阻尼系数
    this.controls.screenSpacePanning = false; // 禁用屏幕空间平移
    this.controls.minDistance = 1; // 最小缩放距离
    this.controls.maxDistance = 500; // 最大缩放距离
    // this.controls.maxPolarAngle = Math.PI / 2; // 可选：限制最大仰角

    // 初始化视图辅助器
    this.viewHelperManager = new ViewHelperManager(this.camera, this.container, this.controls);
  }

  /**
   * 初始化辅助工具（网格、坐标轴）
   */
  private initHelpers(): void {
    // 创建网格辅助线管理器
    this.gridHelperManager?.create();
    // 创建坐标轴辅助器管理器
    this.axesHelperManager?.create();
  }

  /**
   * 动画循环，每帧自动调用
   */
  private animate(): void {
    if (!this.renderer) return;
    if (this.controls) {
      this.controls.update(); // 更新控制器状态
      this.viewHelperManager?.update(); // 同步视图辅助器旋转
    }
    this.renderer.render(this.scene, this.camera); // 渲染场景
  }

  /**
   * 销毁场景，释放资源
   */
  public dispose(): void {
    // 停止动画循环
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
    }

    // 移除辅助工具
    if (this.gridHelperManager) {
      this.gridHelperManager.dispose();
      this.gridHelperManager = null;
    }
    if (this.axesHelperManager) {
      this.axesHelperManager.dispose();
      this.axesHelperManager = null;
    }

    // 销毁控制器
    if (this.controls) {
      this.controls.dispose();
    }

    // 移除渲染器的 DOM 元素并释放资源
    if (this.renderer) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }

  /**
   * 初始化信号监听（响应全局事件）
   */
  initSignal() {
    const signalStore = useSignalStore();

    // 监听视口尺寸变化
    signalStore.add("viewportResize", this.viewportResize.bind(this));
    // 监听网格辅助线配置更新
    signalStore.add("gridHelperConfigUpdate", (config: SceneInfo) => this.gridHelperManager?.updateGridHelperConfig(config));
    // 监听坐标轴辅助器配置更新
    signalStore.add("axesHelperConfigUpdate", (config: SceneInfo) => this.axesHelperManager?.updateAxesHelperConfig(config));
    // 监听视图辅助器配置更新
    signalStore.add("viewHelperConfigUpdate", (config: SceneInfo) => this.viewHelperManager?.updateViewHelperConfig(config));
  }

  /**
   * 视口尺寸变化时自适应
   */
  viewportResize() {
    const aspect = this.container.offsetWidth / this.container.offsetHeight;

    // 如果是透视相机，更新宽高比
    if (this.camera.isPerspectiveCamera) {
      this.camera.aspect = aspect;
    }
    this.camera.updateProjectionMatrix();

    // 更新渲染器尺寸
    this.renderer?.setSize(
      this.container.offsetWidth,
      this.container.offsetHeight
    );
  }
}
