import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { transition } from '@/webgl/utils/transition';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import mitt from 'mitt';
import { VERTEX_SHADER, FRAGMENT_SHADER } from './shader'
import { VERTEX_SHADER as VERTEX_SHADER2, FRAGMENT_SHADER as FRAGMENT_SHADER2 } from './customLambertShader'

const emitter = mitt();

class Stage {
  clock;
  renderer;
  scene;
  camera;
  controls;
  customRender = null;
  tickT;
  tickTasks = [];
  cameraTween = null;
  tweens = [];
  emitter = emitter;

  constructor(container) {
    this.container = container;
    this.setup();
    
    if (process.env.NODE_ENV === 'development') {
      window.stage = this;
      window.THREE = THREE;
    }
  }

  setup() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setPixelRatio(2);
    this.renderer.setClearColor(0xffffff);
    this.renderer.setSize(2000, 2000);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.physicallyCorrectLights = true;
    this.container.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0x444444, 1);
    this.ambientLight = ambientLight;
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(3, -2, 1);
    this.scene.add( dirLight );

    // const helper = new THREE.DirectionalLightHelper( dirLight, 2, 0xff0000 );
    // this.scene.add( helper );

    this.dirLight = dirLight;
    this.scene.add(dirLight);

    // const gridHelper = new THREE.GridHelper(20, 20);
    // this.scene.add(gridHelper);
    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);

    this.camera = new THREE.PerspectiveCamera(40, this.container.offsetWidth / this.container.offsetWidth, 0.1, 1000);
    this.camera.position.set(0, -8, 12);

    this.controls = new OrbitControls(this.camera, this.container.parentNode);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    // this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 20;
    this.controls.minPolarAngle = 0 + 1; // radians
    this.controls.maxPolarAngle = Math.PI - 1; // radians
    // this.minZoom = 0;
    // this.maxZoom = 18;
    this.controls.addEventListener('change', () => this.onControlChange);
    window.addEventListener('resize', this.onResize.bind(this));

    this.setupParticle();
    // this.setupCylinder();
  }

  setupParticle() {
    const cvs = document.createElement('canvas');
    cvs.style = 'position: absolute; left: 0; top: 0;';
    cvs.width = 800;
    cvs.height = 800;
    const ctx = cvs.getContext('2d');
    ctx.translate(cvs.width / 2, cvs.height / 2 + 4);
    ctx.font = "bold 120px Arial";
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.textBaseline="middle";
    ctx.fillText('z = sinx+cosy', 0, 0);
    // document.body.appendChild(cvs);

    const pointCount = 1 || Math.min(window.innerWidth / 1440, 1);
    const geom = new THREE.PlaneBufferGeometry(8, 8, Math.abs(100 * pointCount), Math.abs(100 * pointCount));
    let material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        time: { type: '1f', value: 0 },
        texture1: { type: "t", value: new THREE.CanvasTexture(cvs) },
        // pointSize: { type: '1f', value: window.innerWidth / 1920 }
      },
      transparent: true,
      // blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geom, material);
    // points.rotation.z = Math.PI / 4;
    // points.rotation.x = -Math.PI / 2;
    this.scene.add(points);

    this.addTick((delta) => {
      material.uniforms.time.value += delta;
    });

    // const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // const plane = new THREE.Mesh(geom, material2);
    // this.scene.add(plane);
  }

  setupCylinder() {
    // const group = new THREE.Group();
    // for (let x = 0; x < 100; x++) {
    //   for (let y = 0; y < 25; y++) {
    //     const cylinderGeom = new THREE.BoxBufferGeometry(1, 1, 10, 1, 1, 1);
    //     group.add(cylinder);
    //   }
    // }

    const cylinderGeom = new THREE.BoxBufferGeometry(1, 1, 10, 1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

    console.log(material);
    material.transparent = true;
    material.onBeforeCompile = ((shader) => {
      shader.fragmentShader = FRAGMENT_SHADER2;
      shader.vertexShader = VERTEX_SHADER2;
      console.log(shader.fragmentShader);
      console.log(shader.vertexShader);
    });
    const cylinder = new THREE.Mesh(cylinderGeom, material);
    this.scene.add(cylinder);
  }

  entryCamera() {
    this.camera.position.set(5, 4, 6);
    this.camera.lookAt(new THREE.Vector3(0, 10, 0));
    this.camera.userData.lookAt = new THREE.Vector3(0, 3, 0);
    this.cameraTween && this.cameraTween.stop();
    this.resetCamera();
  }

  resetCamera(dur = 2000) {
    this.moveCameraTo(new THREE.Vector3(0, 0, 12), new THREE.Vector3(), dur);
  }

  moveCameraTo(position, lookAt = new THREE.Vector3(), dur = 1000) {
    if (this.cameraTween) {
      TWEEN.remove(this.cameraTween);
      this.cameraTween.stop();
    }
    this.camera.userData.lookAt = this.controls.target;
    const tween = transition(
      this.camera,
      {
        position,
        lookAt,
      },
      dur,
    );
    this.cameraTween = tween;
    this.controls.enabled = false;
    tween.start();
    tween.onComplete(() => {
      this.cameraTween && TWEEN.remove(this.cameraTween);
      this.cameraTween = null;
      this.controls.target = lookAt;
      this.controls.saveState();
      this.controls.reset();
      this.controls.enabled = true;
    });
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerWidth;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerWidth);
  }

  onControlChange() {}

  getScreenCoordByWorldPosition(worldPosition) {
    const { container, camera } = this;
    const vector3 = new THREE.Vector3().copy(worldPosition).project(camera);
    const widthHalf = container.offsetWidth / 2;
    const heightHalf = container.offsetHeight / 2;
    vector3.x = vector3.x * widthHalf + widthHalf;
    vector3.y = -(vector3.y * heightHalf) + heightHalf;
    return vector3;
  }

  addTick(fn) {
    this.tickTasks.push(fn);
  }

  removeTick(fn) {
    this.tickTasks = this.tickTasks.filter((task) => task !== fn);
  }

  tick() {
    const tick = () => {
      const delta = this.clock.getDelta();
      this.tickTasks.forEach((task) => task(delta));
      this.controls.enabled && this.controls.update();
      TWEEN.update();
      this.renderer.render(this.scene, this.camera);
      this.tickT = requestAnimationFrame(tick);
    };
    tick();
  }

  clear() {
    cancelAnimationFrame(this.tickT);
  }

  destroy() {
    // 销毁场景
  }
}

export { Stage };