import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import useSignalStore from "@/store/modules/signalStore";

export default class SceneViewport {
  container: HTMLDivElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer | undefined;
  controls: OrbitControls | undefined;

  // 场景中的物体
  private objects: THREE.Object3D[] = [];

  // 网格辅助线
  private gridHelper: THREE.GridHelper | null = null;

  // 坐标轴辅助线
  private axesHelper: THREE.AxesHelper | null = null;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.scene = window.editor.scene;
    this.camera = window.editor.camera;

    // 初始化场景
    this.initRenderer();
    this.initControls();
    this.initHelpers();

    this.initSignal();
  }

  /**
   * 初始化渲染器
   */
  private initRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    // 设置渲染器大小为容器大小
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );

    // 设置设备像素比
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // 启用阴影
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 使用setAnimationLoop代替requestAnimationFrame
    this.renderer.setAnimationLoop(this.animate.bind(this));

    // 将渲染器的DOM元素添加到容器中
    this.container.appendChild(this.renderer.domElement);
  }

  /**
   * 初始化相机控制器
   */
  private initControls(): void {
    if (!this.renderer) return;

    // 创建轨道控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // 配置控制器
    this.controls.enableDamping = true; // 启用阻尼效果
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 500;
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  /**
   * 初始化辅助工具（网格和坐标轴）
   */
  private initHelpers(): void {
    // 添加网格辅助线
    this.gridHelper = new THREE.GridHelper(100, 100);
    this.scene.add(this.gridHelper);

    // 添加坐标轴辅助线
    this.axesHelper = new THREE.AxesHelper(50);
    this.scene.add(this.axesHelper);
  }

  /**
   * 动画循环
   */
  private animate(): void {
    if (!this.renderer) return;
    if (this.controls) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
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
    if (this.gridHelper) {
      this.scene.remove(this.gridHelper);
      this.gridHelper = null;
    }

    if (this.axesHelper) {
      this.scene.remove(this.axesHelper);
      this.axesHelper = null;
    }

    // 销毁控制器
    if (this.controls) {
      this.controls.dispose();
    }

    // 移除渲染器的DOM元素
    if (this.renderer) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }

  initSignal() {
    const signalStore = useSignalStore();

    signalStore.add("viewportResize", this.viewportResize.bind(this));
  }

  viewportResize() {
    const aspect = this.container.offsetWidth / this.container.offsetHeight;

    if (this.camera.isPerspectiveCamera) {
      this.camera.aspect = aspect;
    }
    this.camera.updateProjectionMatrix();

    this.renderer?.setSize(
      this.container.offsetWidth,
      this.container.offsetHeight
    );
  }
}
