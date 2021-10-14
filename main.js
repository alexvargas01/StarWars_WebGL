import * as THREE from "./three.js-master/build/three.module.js";
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js";

// <----- CREACIÓN DE LA ESCENA ----->
const scene = new THREE.Scene();

// <----- CREACIÓN DE LA CÁMARA ----->
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const fov = 80;
const near = 0.1;
const far = 5000;
const camera = new THREE.PerspectiveCamera(
  fov,
  sizes.width / sizes.height,
  near,
  far
);
camera.position.set(500, 400, 600);

// <----- CREACIÓN DEL RENDERER ----->
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// <----- LOADER PARA EL MODELO ----->
// TODO: Agregar más naves imperiales y rebeldes
const loader = new GLTFLoader();
loader.load(
  "./assets/star_wars_imperial_ii_star_destroyer/scene.gltf",
  function (gltf) {
    const zelda = gltf.scene.children[0];
    zelda.scale.set(0.3, 0.3, 0.3);
	zelda.position.set(150,0,0)
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const loader2 = new GLTFLoader();
loader2.load(
  "./assets/star_wars_imperial_ii_star_destroyer/scene.gltf",
  function (gltf) {
    const zelda = gltf.scene.children[0];
    zelda.scale.set(0.3, 0.3, 0.3);
	zelda.position.set(-150,0,0)
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const loader3 = new GLTFLoader();
loader3.load(
	"./assets/resistance_fleet__resistance_navy/scene.gltf",
  function (gltf) {
    const zelda = gltf.scene.children[0];
    zelda.scale.set(.00032, .00032, .00032);
	zelda.position.set(0,0,500)
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// <----- LUZ DIRECCIONAL ----->
// TODO: Agregar tres fuentes de luz: los dos soles de Tatooine, y la luz que rebota del planeta
const colorDeLuz = 0xffffff;
const intensidadDeLuz = 1;
const directionalLight = new THREE.DirectionalLight(
  colorDeLuz,
  intensidadDeLuz
); // Luz direccional blanca a toda intensidad brillando desde arriba
scene.add(directionalLight);

// <----- CONTROLES ORBITALES ----->
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0); // El objetivo en el que estará dando vueltas. Toma como parámetro un Vector3
controls.update(); // Actualiza los controles para que tengan las modificaciones que se le hacen

// <----- FONDO ----->
const background_loader = new THREE.CubeTextureLoader();
const texture = background_loader.load([
  "./assets/background/space-posx.jpg",
  "./assets/background/space-negx.jpg",
  "./assets/background/space-posy.jpg",
  "./assets/background/space-negy.jpg",
  "./assets/background/space-posz.jpg",
  "./assets/background/space-negz.jpg",
]);
scene.background = texture;

// <----- RAF para animar todo ----->
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
