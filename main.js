import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

// Vertex Shader
const VS = `

varying vec3 v_Normal;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_Normal = normal;
}
`;

// Fragment Shader
const FS = `

varying vec3 v_Normal;

void main() {
  gl_FragColor = vec4(v_Normal, 1.0);
}
`;

/*

INICIO DE LA CLASE

*/

// Clase que contiene el constructor y funciones para crear la escena
class StarWarsWebGL {

  constructor() {
    this.Initialize();
  }

  // Función para iniciar el proyecto
  Initialize() {
    // Inicializar el Renderer de WebGL
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    // Iniciar parámetros para el renderer
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.OnWindowResize();
    }, false);

    // Creación de la cámara
    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(75, 20, 0);

    // Crear la escena para los objetos
    this.scene = new THREE.Scene();

    // Crear la luz direccional y ambiental
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
    this.scene.add(light);

    // Añadir la luz a la escena
    light = new THREE.AmbientLight(0x101010);
    this.scene.add(light);

    // Añadir los controles para la orbita de la escena
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
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
    // Asignar la textura como el fondo
    this.scene.background = texture;

    // Crear un plano
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
          }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    // Agregar el plano a la escena
    this.scene.add(plane);

    // Crear la esfera
    const s1 = new THREE.Mesh(
      new THREE.SphereGeometry(2,32,32),
      new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: VS,
        fragmentShader: FS,
      })
    )
    s1.position.set(0,5,0);
    s1.castShadow = true;
    // Agregar la esfera a la escena
    this.scene.add(s1);

    this.RAF();
  }

  // Función para cambiar el tamaño de la ventana
  OnWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Request Animation Frame
  // Ejecutar esta funcion por cada frame de la pantalla
  RAF() {
    requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera);
      this.RAF();
    });
  }
}

/*

FIN DE LA CLASE

*/

let APP = null;

// Iniciar la escena en cuanto cargue la página
window.addEventListener('DOMContentLoaded', () => {
  APP = new StarWarsWebGL();
});
