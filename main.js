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
  tie_fighter,
  tie_fighter2,
  tie_fighter3,
  x_wing,
  x_wing2,
  x_wing3,
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
let p11 = loadModel("./assets/x-wing_fighter/scene.gltf").then((result) => {
  x_wing2 = result.scene.children[0];
});
let p12 = loadModel("./assets/x-wing_fighter/scene.gltf").then((result) => {
  x_wing3 = result.scene.children[0];
});

Promise.all([p1, p2, p3, p4, p6, p7, p8, p9, p10, p11, p12]).then(() => {
  // Posición de los modelos
  star_destroyer1.position.set(0, 0, 0);
  rebel_fleet.position.set(-250, 0, 1000);
  tatooine.position.set(9000, -2000, 0);
  sun1.position.set(10000, 20000, -100000);
  sun2.position.set(35000, 20000, -110000);

  // Tamaño de los modelos
  star_destroyer1.scale.set(0.5, 0.5, 0.5);
  rebel_fleet.scale.set(0.00032, 0.00032, 0.00032);
  tatooine.scale.set(7000, 7000, 7000);
  sun1.scale.set(900, 900, 900);
  sun2.scale.set(700, 700, 700);
  tie_fighter.scale.set(2, 2, 2);
  tie_fighter2.scale.set(2, 2, 2);
  tie_fighter3.scale.set(2, 2, 2);
  x_wing.scale.set(0.08, 0.08, 0.08);
  x_wing2.scale.set(0.08, 0.08, 0.08);
  x_wing3.scale.set(0.08, 0.08, 0.08);

  rebel_fleet.rotation.setFromVector3(
    new THREE.Vector3(-Math.PI / 2, 0, Math.PI / 2)
  );

  //START POS FIGHTER
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

  //START ROT FIGHTER
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

  //START POS XWING
  const s = { x: -150, y: 100, z: -150 };
  const m1 = { x: -150, y: 100, z: 150 };
  const m2 = { x: -350, y: 100, z: 150 };
  const m3 = { x: -350, y: 100, z: -150 };
  const m4 = { x: -150, y: 100, z: -150 };

  const s2 = { x: -150, y: 150, z: -150 };
  const m5 = { x: -150, y: 150, z: 150 };
  const m6 = { x: -350, y: 150, z: 150 };
  const m7 = { x: -350, y: 150, z: -150 };
  const m8 = { x: -150, y: 150, z: -150 };

  const s3 = { x: -150, y: 200, z: -150 };
  const m9 = { x: -150, y: 200, z: 150 };
  const m10 = { x: -350, y: 200, z: 150 };
  const m11 = { x: -350, y: 200, z: -150 };
  const m12 = { x: -150, y: 200, z: -150 };

  //START ROT XWING
  const rotSt = { rotY: 0 };
  const rot1 = { rotY: -Math.PI / 2 };
  const rot2 = { rotY: -Math.PI };
  const rot3 = { rotY: -Math.PI * (3 / 2) };
  const rot4 = { rotY: -Math.PI * 2 };

  const rotSt2 = { rotY: 0 };
  const rot5 = { rotY: -Math.PI / 2 };
  const rot6 = { rotY: -Math.PI };
  const rot7 = { rotY: -Math.PI * (3 / 2) };
  const rot8 = { rotY: -Math.PI * 2 };

  const rotSt3 = { rotY: 0 };
  const rot9 = { rotY: -Math.PI / 2 };
  const rot10 = { rotY: -Math.PI };
  const rot11 = { rotY: -Math.PI * (3 / 2) };
  const rot12 = { rotY: -Math.PI * 2 };

  //TWEEN MOV FIGHTER
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

  //TWEEN MOV XWING
  var Rot1 = new TWEEN.Tween(rotSt).to(rot1, 400);
  var Rot2 = new TWEEN.Tween(rotSt).to(rot2, 400);
  var Rot3 = new TWEEN.Tween(rotSt).to(rot3, 400);
  var Rot4 = new TWEEN.Tween(rotSt).to(rot4, 400);

  var Rot5 = new TWEEN.Tween(rotSt2).to(rot5, 400);
  var Rot6 = new TWEEN.Tween(rotSt2).to(rot6, 400);
  var Rot7 = new TWEEN.Tween(rotSt2).to(rot7, 400);
  var Rot8 = new TWEEN.Tween(rotSt2).to(rot8, 400);

  var Rot9 = new TWEEN.Tween(rotSt3).to(rot9, 400);
  var Rot10 = new TWEEN.Tween(rotSt3).to(rot10, 400);
  var Rot11 = new TWEEN.Tween(rotSt3).to(rot11, 400);
  var Rot12 = new TWEEN.Tween(rotSt3).to(rot12, 400);

  var Move1 = new TWEEN.Tween(s).to(m1, 2000);
  var Move2 = new TWEEN.Tween(s).to(m2, 2000);
  var Move3 = new TWEEN.Tween(s).to(m3, 2000);
  var Move4 = new TWEEN.Tween(s).to(m4, 2000);

  var Move5 = new TWEEN.Tween(s2).to(m5, 1800);
  var Move6 = new TWEEN.Tween(s2).to(m6, 1800);
  var Move7 = new TWEEN.Tween(s2).to(m7, 1800);
  var Move8 = new TWEEN.Tween(s2).to(m8, 1800);

  var Move9 = new TWEEN.Tween(s3).to(m9, 2200);
  var Move10 = new TWEEN.Tween(s3).to(m10, 2200);
  var Move11 = new TWEEN.Tween(s3).to(m11, 2200);
  var Move12 = new TWEEN.Tween(s3).to(m12, 2200);

  //CHAIN TWEENS FIGHTER
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

  //CHAIN TWEENS XWING
  Move1.chain(Rot1);
  Rot1.chain(Move2);
  Move2.chain(Rot2);
  Rot2.chain(Move3);
  Move3.chain(Rot3);
  Rot3.chain(Move4);
  Move4.chain(Rot4);
  Rot4.chain(Move1);

  Move5.chain(Rot5);
  Rot5.chain(Move6);
  Move6.chain(Rot6);
  Rot6.chain(Move7);
  Move7.chain(Rot7);
  Rot7.chain(Move8);
  Move8.chain(Rot8);
  Rot8.chain(Move5);

  Move9.chain(Rot9);
  Rot9.chain(Move10);
  Move10.chain(Rot10);
  Rot10.chain(Move11);
  Move11.chain(Rot11);
  Rot11.chain(Move12);
  Move12.chain(Rot12);
  Rot12.chain(Move9);

  //UPDATE FIGHTER POSITION
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

  //UPDATE XWING POSITION
  const upPos = function (
    object = {
      x,
      y,
      z,
    },
    elapsed
  ) {
    x_wing.position.x = object.x;
    x_wing.position.y = object.y;
    x_wing.position.z = object.z;
  };

  const upPos2 = function (
    object = {
      x,
      y,
      z,
    },
    elapsed
  ) {
    x_wing2.position.x = object.x;
    x_wing2.position.y = object.y;
    x_wing2.position.z = object.z;
  };

  const upPos3 = function (
    object = {
      x,
      y,
      z,
    },
    elapsed
  ) {
    x_wing3.position.x = object.x;
    x_wing3.position.y = object.y;
    x_wing3.position.z = object.z;
  };

  //CALL UPDATE FIGHTER
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

  //CALL UPDATE XWING
  Move1.onUpdate(upPos);
  Move2.onUpdate(upPos);
  Move3.onUpdate(upPos);
  Move4.onUpdate(upPos);

  Move5.onUpdate(upPos2);
  Move6.onUpdate(upPos2);
  Move7.onUpdate(upPos2);
  Move8.onUpdate(upPos2);

  Move9.onUpdate(upPos3);
  Move10.onUpdate(upPos3);
  Move11.onUpdate(upPos3);
  Move12.onUpdate(upPos3);

  //UPDATE ROTATION FIGHTER
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

  //UPDATE ROTATION XWING
  const upRot = function (
    object = {
      rotY,
    },
    elapsed
  ) {
    x_wing.rotation.y = object.rotY;
    x_wing2.rotation.y = object.rotY;
    x_wing3.rotation.y = object.rotY;
  };

  //CALL UPDATE ROTATION FIGHTER
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

  //CALL UPDATE ROTATION XWING
  Rot1.onUpdate(upRot);
  Rot2.onUpdate(upRot);
  Rot3.onUpdate(upRot);
  Rot4.onUpdate(upRot);

  Rot5.onUpdate(upRot);
  Rot6.onUpdate(upRot);
  Rot7.onUpdate(upRot);
  Rot8.onUpdate(upRot);

  Rot9.onUpdate(upRot);
  Rot10.onUpdate(upRot);
  Rot11.onUpdate(upRot);
  Rot12.onUpdate(upRot);

  //START FIGHTER TWEENS
  tweenMove1.start();

  tweenMove5.start();

  tweenMove9.start();

  //START XWING TWEENS
  Move1.start();

  Move5.start();

  Move9.start();

  // Agregar los modelos a la escena
  scene.add(star_destroyer1);
  scene.add(rebel_fleet);
  scene.add(tatooine);
  scene.add(sun1);
  scene.add(sun2);
  scene.add(tie_fighter);
  scene.add(tie_fighter2);
  scene.add(tie_fighter3);
  scene.add(x_wing);
  scene.add(x_wing2);
  scene.add(x_wing3);

  console.log("Entered promise");
  animate();
});

// <----- RAF para animar todo ----->
function animate() {
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
