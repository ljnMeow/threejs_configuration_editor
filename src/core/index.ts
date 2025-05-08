import * as THREE from "three";
import SceneViewport from "./SceneViewport";

const DEFAULT_CAMERA = new THREE.PerspectiveCamera(50, 1, 0.01, 100 * 1000);
DEFAULT_CAMERA.position.set(0, 5, 10);
DEFAULT_CAMERA.lookAt(new THREE.Vector3());

class EditorCore {
  public camera: THREE.PerspectiveCamera;
  public scene: THREE.Scene;
  public sceneHelpers: THREE.Scene;

  constructor() {
    DEFAULT_CAMERA.name = "默认相机";

    this.camera = DEFAULT_CAMERA.clone();

    this.scene = new THREE.Scene();
    this.scene.name = "默认场景";
    this.sceneHelpers = new THREE.Scene();
  }
}

export { SceneViewport, EditorCore };
