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
const far = 100000000;
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
//Loader function
function loadModel(url) {
  return new Promise((resolve) => {
    new GLTFLoader().load(url, resolve);
  });
}

//Declare all models
let model1, model2, model3, model4, model5, model6;

let p1 = loadModel(
  "./assets/star_wars_imperial_ii_star_destroyer/scene.gltf"
).then((result) => {
  model1 = result.scene.children[0];
});

let p2 = loadModel(
  "./assets/star_wars_imperial_ii_star_destroyer/scene.gltf"
).then((result) => {
  model2 = result.scene.children[0];
});

let p3 = loadModel(
  "./assets/resistance_fleet__resistance_navy/scene.gltf"
).then((result) => {
  model3 = result.scene.children[0];
});

let p4 = loadModel("./assets/mars/scene.gltf").then((result) => {
  model4 = result.scene.children[0];
});

let p5 = loadModel("./assets/sun/scene.gltf").then((result) => {
  model5 = result.scene.children[0];
});

let p6 = loadModel("./assets/sun/scene.gltf").then((result) => {
  model6 = result.scene.children[0];
});

//if all Promises resolved
Promise.all([p1, p2, p3, p4, p6, p6]).then(() => {
  //do something to the model
  model1.position.set(150, 0, 0);
  model1.scale.set(0.3, 0.3, 0.3);

  model2.position.set(-150, 0, 0);
  model2.scale.set(0.3, 0.3, 0.3);

  model3.position.set(0, 0, 500);
  model3.scale.set(0.00032, 0.00032, 0.00032);

  model4.position.set(10000, -19000, 0);
  model4.scale.set(8000, 8000, 8000);

  model5.position.set(-5000000, 800000, -300000);
  model5.scale.set(30000, 30000, 30000);

  model6.position.set(-10000000, 200000, 900000);
  model6.scale.set(50000, 50000, 50000);

  //add model to the scene
  scene.add(model1);
  scene.add(model2);
  scene.add(model3);
  scene.add(model4);
  scene.add(model5);
  scene.add(model6);
});

// <----- LUZ DIRECCIONAL ----->
// TODO: Agregar tres fuentes de luz: los dos soles de Tatooine, y la luz que rebota del planeta
const colorDeLuz = 0xffffff;
const intensidadDeLuz = 2;
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
