import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

const _VS = `

varying vec3 v_Normal;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_Normal = normal;
}
`;

const _FS = `

varying vec3 v_Normal;

void main() {
  gl_FragColor = vec4(v_Normal, 1.0);
}
`;

class BasicWorldDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    // Inicializar el Renderer de WebGL
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    // Iniciar parámetros para el renderer
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    // Creación de la cámara
    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(75, 20, 0);

    // Crear la escena para los objetos
    this._scene = new THREE.Scene();

    // Crear la luz y luz ambiental
    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this._scene.add(light);

    // Añadir la luz a la escena
    light = new THREE.AmbientLight(0x101010);
    this._scene.add(light);

    const controls = new OrbitControls(this._camera, this._threejs.domElement);
    controls.target.set(0, 5, 0);
    controls.update();

    // Cargar el cubo de fondo
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './skybox/posx.png',
        './skybox/negx.png',
        './skybox/posy.png',
        './skybox/negy.png',
        './skybox/posz.png',
        './skybox/negz.png',
    ]);
    this._scene.background = texture;

    // Crear un plano
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
          }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    // Agregar el plano a la esfera
    this._scene.add(plane);

    // Crear la esfera
    const s1 = new THREE.Mesh(
      new THREE.SphereGeometry(2,32,32),
      new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: _VS,
        fragmentShader: _FS,
      })
    )
    s1.position.set(0,5,0);
    s1.castShadow = true;
    // Agregar la esfera a la escena
    this._scene.add(s1);
    this._sphere = s1;

    this._RAF();
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  // Request Animation Frame
  // Ejecutar esta funcion por cada frame de la pantalla
  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo();
});
