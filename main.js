import * as THREE from "./three.js-master/build/three.module.js";
import TWEEN from "https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js";
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js";

// <----- CREACIÓN DE LA ESCENA ----->
const scene = new THREE.Scene();

// <----- CREACIÓN DE LA CÁMARA ----->
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const fov = 90;
const near = 0.1;
const far = 100000000;
const camera = new THREE.PerspectiveCamera(
  fov,
  sizes.width / sizes.height,
  near,
  far
);
camera.position.set(-700, 300, 600);

// <----- CREACIÓN DEL RENDERER ----->
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// <----- LUZ AMBIENTAL ----->
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// <----- LUZ DIRECCIONAL ----->
const colorDeLuz = 0xffccaa;
const intensidadDeLuz = 5;
const directionalLight1 = new THREE.DirectionalLight(
  colorDeLuz,
  intensidadDeLuz
);
const directionalLight2 = new THREE.DirectionalLight(
  colorDeLuz,
  intensidadDeLuz
);
directionalLight1.position.set(10000, 20000, -100000);
directionalLight2.position.set(35000, 20000, -110000);
scene.add(directionalLight1);
scene.add(directionalLight2);

// <----- CONTROLES ORBITALES ----->
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0); // El objetivo en el que estará dando vueltas. Toma como parámetro un Vector3
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

// <----- LOADERS PARA LOS MODELOS ----->
function loadModel(url) {
  return new Promise((resolve) => {
    new GLTFLoader().load(url, resolve);
  });
}

// Lista de modelos
let rebel_fleet,
  star_destroyer1,
  star_destroyer2,
  tie_fighter,
  tie_fighter2,
  tie_fighter3,
  x_wing,
  tatooine,
  sun1,
  sun2;

let p1 = loadModel(
  "./assets/star_wars_imperial_ii_star_destroyer/scene.gltf"
).then((result) => {
  star_destroyer1 = result.scene.children[0];
});
let p2 = loadModel(
  "./assets/resistance_fleet__resistance_navy/scene.gltf"
).then((result) => {
  rebel_fleet = result.scene.children[0];
});
let p3 = loadModel("./assets/tie_fighter/scene.gltf").then((result) => {
  tie_fighter = result.scene.children[0];
});
let p4 = loadModel("./assets/x-wing_fighter/scene.gltf").then((result) => {
  x_wing = result.scene.children[0];
});
let p5 = loadModel(
  "./assets/star_wars_imperial_ii_star_destroyer/scene.gltf"
).then((result) => {
  star_destroyer2 = result.scene.children[0];
});
let p6 = loadModel("./assets/tatooine/scene.gltf").then((result) => {
  tatooine = result.scene.children[0];
});
let p7 = loadModel("./assets/sun/scene.gltf").then((result) => {
  sun1 = result.scene.children[0];
});
let p8 = loadModel("./assets/sun/scene.gltf").then((result) => {
  sun2 = result.scene.children[0];
});
let p9 = loadModel("./assets/tie_fighter/scene.gltf").then((result) => {
  tie_fighter2 = result.scene.children[0];
});
let p10 = loadModel("./assets/tie_fighter/scene.gltf").then((result) => {
  tie_fighter3 = result.scene.children[0];
});

Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]).then(() => {
  // Posición de los modelos
  star_destroyer1.position.set(0, 0, 0);
  star_destroyer2.position.set(-500, 0, 0);
  rebel_fleet.position.set(-250, 0, 700);
  tatooine.position.set(9000, -2000, 0);
  sun1.position.set(10000, 20000, -100000);
  sun2.position.set(35000, 20000, -110000);

  // Tamaño de los modelos
  star_destroyer1.scale.set(0.5, 0.5, 0.5);
  star_destroyer2.scale.set(0.5, 0.5, 0.5);
  rebel_fleet.scale.set(0.00032, 0.00032, 0.00032);
  tatooine.scale.set(7000, 7000, 7000);
  sun1.scale.set(900, 900, 900);
  sun2.scale.set(700, 700, 700);
  tie_fighter.scale.set(2, 2, 2);
  tie_fighter2.scale.set(2, 2, 2);
  tie_fighter3.scale.set(2, 2, 2);

  rebel_fleet.rotation.setFromVector3(new THREE.Vector3( -Math.PI / 2,0, Math.PI / 2));

  //MOVIMIENTO FIGHTER
  const start = { x: -150, y: 100, z: -150 };
  const moveto1 = { x: -150, y: 100, z: 150 };
  const moveto2 = { x: -350, y: 100, z: 150 };
  const moveto3 = { x: -350, y: 100, z: -150 };
  const moveto4 = { x: -150, y: 100, z: -150 };

  const start2 = { x: -150, y: 150, z: -150 };
  const moveto5 = { x: -150, y: 150, z: 150 };
  const moveto6 = { x: -350, y: 150, z: 150 };
  const moveto7 = { x: -350, y: 150, z: -150 };
  const moveto8 = { x: -150, y: 150, z: -150 };

  const start3 = { x: -150, y: 200, z: -150 };
  const moveto9 = { x: -150, y: 200, z: 150 };
  const moveto10 = { x: -350, y: 200, z: 150 };
  const moveto11 = { x: -350, y: 200, z: -150 };
  const moveto12 = { x: -150, y: 200, z: -150 };

  const rotStart = { rotY: 0 };
  const rotto1 = { rotY: -Math.PI / 2 };
  const rotto2 = { rotY: -Math.PI };
  const rotto3 = { rotY: -Math.PI * (3 / 2) };
  const rotto4 = { rotY: -Math.PI * 2 };

  const rotStart2 = { rotY: 0 };
  const rotto5 = { rotY: -Math.PI / 2 };
  const rotto6 = { rotY: -Math.PI };
  const rotto7 = { rotY: -Math.PI * (3 / 2) };
  const rotto8 = { rotY: -Math.PI * 2 };

  const rotStart3 = { rotY: 0 };
  const rotto9 = { rotY: -Math.PI / 2 };
  const rotto10 = { rotY: -Math.PI };
  const rotto11 = { rotY: -Math.PI * (3 / 2) };
  const rotto12 = { rotY: -Math.PI * 2 };

  var tweenRot1 = new TWEEN.Tween(rotStart).to(rotto1, 400);
  var tweenRot2 = new TWEEN.Tween(rotStart).to(rotto2, 400);
  var tweenRot3 = new TWEEN.Tween(rotStart).to(rotto3, 400);
  var tweenRot4 = new TWEEN.Tween(rotStart).to(rotto4, 400);

  var tweenRot5 = new TWEEN.Tween(rotStart2).to(rotto5, 400);
  var tweenRot6 = new TWEEN.Tween(rotStart2).to(rotto6, 400);
  var tweenRot7 = new TWEEN.Tween(rotStart2).to(rotto7, 400);
  var tweenRot8 = new TWEEN.Tween(rotStart2).to(rotto8, 400);

  var tweenRot9 = new TWEEN.Tween(rotStart3).to(rotto9, 400);
  var tweenRot10 = new TWEEN.Tween(rotStart3).to(rotto10, 400);
  var tweenRot11 = new TWEEN.Tween(rotStart3).to(rotto11, 400);
  var tweenRot12 = new TWEEN.Tween(rotStart3).to(rotto12, 400);

  var tweenMove1 = new TWEEN.Tween(start).to(moveto1, 2000);
  var tweenMove2 = new TWEEN.Tween(start).to(moveto2, 2000);
  var tweenMove3 = new TWEEN.Tween(start).to(moveto3, 2000);
  var tweenMove4 = new TWEEN.Tween(start).to(moveto4, 2000);

  var tweenMove5 = new TWEEN.Tween(start2).to(moveto5, 1800);
  var tweenMove6 = new TWEEN.Tween(start2).to(moveto6, 1800);
  var tweenMove7 = new TWEEN.Tween(start2).to(moveto7, 1800);
  var tweenMove8 = new TWEEN.Tween(start2).to(moveto8, 1800);

  var tweenMove9 = new TWEEN.Tween(start3).to(moveto9, 2200);
  var tweenMove10 = new TWEEN.Tween(start3).to(moveto10, 2200);
  var tweenMove11 = new TWEEN.Tween(start3).to(moveto11, 2200);
  var tweenMove12 = new TWEEN.Tween(start3).to(moveto12, 2200);

  tweenMove1.chain(tweenRot1);
  tweenRot1.chain(tweenMove2);
  tweenMove2.chain(tweenRot2);
  tweenRot2.chain(tweenMove3);
  tweenMove3.chain(tweenRot3);
  tweenRot3.chain(tweenMove4);
  tweenMove4.chain(tweenRot4);
  tweenRot4.chain(tweenMove1);



  tweenMove5.chain(tweenRot5);
  tweenRot5.chain(tweenMove6);
  tweenMove6.chain(tweenRot6);
  tweenRot6.chain(tweenMove7);
  tweenMove7.chain(tweenRot7);
  tweenRot7.chain(tweenMove8);
  tweenMove8.chain(tweenRot8);
  tweenRot8.chain(tweenMove5);



  tweenMove9.chain(tweenRot9);
  tweenRot9.chain(tweenMove10);
  tweenMove10.chain(tweenRot10);
  tweenRot10.chain(tweenMove11);
  tweenMove11.chain(tweenRot11);
  tweenRot11.chain(tweenMove12);
  tweenMove12.chain(tweenRot12);
  tweenRot12.chain(tweenMove9);

  const updatePos = function (
    object = {
      x,
      y,
      z,
    },
    elapsed
  ) {
    tie_fighter.position.x = object.x;
    tie_fighter.position.y = object.y;
    tie_fighter.position.z = object.z;

  };

  const updatePos2 = function (
    object = {
      x,
      y,
      z,
    },
    elapsed
  ) {
    tie_fighter2.position.x = object.x;
    tie_fighter2.position.y = object.y;
    tie_fighter2.position.z = object.z;

  };


  const updatePos3 = function (
    object = {
      x,
      y,
      z,
    },
    elapsed
  ) {
    tie_fighter3.position.x = object.x;
    tie_fighter3.position.y = object.y;
    tie_fighter3.position.z = object.z;
  };


  tweenMove1.onUpdate(updatePos);
  tweenMove2.onUpdate(updatePos);
  tweenMove3.onUpdate(updatePos);
  tweenMove4.onUpdate(updatePos);

  tweenMove5.onUpdate(updatePos2);
  tweenMove6.onUpdate(updatePos2);
  tweenMove7.onUpdate(updatePos2);
  tweenMove8.onUpdate(updatePos2);

  tweenMove9.onUpdate(updatePos3);
  tweenMove10.onUpdate(updatePos3);
  tweenMove11.onUpdate(updatePos3);
  tweenMove12.onUpdate(updatePos3);

  const updateRot = function (
    object = {
      rotY,
    },
    elapsed
  ) {
    tie_fighter.rotation.y = object.rotY;
    tie_fighter2.rotation.y = object.rotY;
    tie_fighter3.rotation.y = object.rotY;
  };

  tweenRot1.onUpdate(updateRot);
  tweenRot2.onUpdate(updateRot);
  tweenRot3.onUpdate(updateRot);
  tweenRot4.onUpdate(updateRot);

  tweenRot5.onUpdate(updateRot);
  tweenRot6.onUpdate(updateRot);
  tweenRot7.onUpdate(updateRot);
  tweenRot8.onUpdate(updateRot);

  tweenRot9.onUpdate(updateRot);
  tweenRot10.onUpdate(updateRot);
  tweenRot11.onUpdate(updateRot);
  tweenRot12.onUpdate(updateRot);

  tweenMove1.start();

  tweenMove5.start();

  tweenMove9.start();
  

  // Agregar los modelos a la escena
  scene.add(star_destroyer1);
  scene.add(star_destroyer2);
  scene.add(rebel_fleet);
  scene.add(tatooine);
  scene.add(sun1);
  scene.add(sun2);
  scene.add(tie_fighter);
  scene.add(tie_fighter2);
  scene.add(tie_fighter3);

  console.log("Entered promise");
  animate();
});

// <----- RAF para animar todo ----->
function animate() {
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
