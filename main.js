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

  // Posición inicial de los TIE fighters
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

  // Rotación inicial de los TIE fighters
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

  // Posición inicial de los XWING
  const start_xwing = { x: -300, y: 100, z: 1000 }; // Posicion Inicial (En la flota rebelde)
  const xwing_move_to_1 = { x: -100, y: 80, z: -800 }; // Moverse hacia el star destroyer y bajar altitud
  const xwing_move_to_2 = { x: -200, y: 100, z: -900 }; // Subir altitud y seguir hacia adelante
  const xwing_move_to_3 = { x: -1000, y: 100, z: -900 }; // Ir a la izquierda y comenzar a regresar a la flota
  const xwing_move_to_4 = { x: -300, y: 100, z: 1000 }; // Regresar a posición inicial

  const start_xwing_2 = { x: 300, y: 100, z: 1000 };
  const xwing_2_move_to_1 = { x: 100, y: 80, z: -800 };
  const xwing_2_move_to_2 = { x: 200, y: 100, z: -900 };
  const xwing_2_move_to_3 = { x: 1000, y: 100, z: -900 };
  const xwing_2_move_to_4 = { x: 300, y: 100, z: 1000 };

  const start_xwing_3 = { x: 0, y: 200, z: 1000 }; // Posición inicial (En la flota, justo en el centro)
  const xwing_3_move_to_1 = { x: 0, y: 180, z: -800 }; // Moverse hacia el star destroyer y bajar altitud
  const xwing_3_move_to_2 = { x: 0, y: 200, z: -900 }; // Subir altitud y seguir adelante
  const xwing_3_move_to_3 = { x: 0, y: 500, z:  800}; // Aumentar altura y regresar a la flota desde arriba
  const xwing_3_move_to_4 = { x: 0, y: 200, z: 1000 }; // Regresar a posición inicial

  // Rotación inicial de los XWING
  const rot_start_xwing = { rotY: 0 };
  const xwing_rot_1 = { rotY: -Math.PI / 2 };
  const xwing_rot_2 = { rotY: -Math.PI };
  const xwing_rot_3 = { rotZ: -Math.PI * (3 / 2) }; // Vuelta completa (No funcionó :c)
  const xwing_rot_4 = { rotY: -Math.PI * 2 };

  const rot_start_xwing_2 = { rotY: 0 };
  const xwing_2_rot_1 = { rotY: -Math.PI / 2 };
  const xwing_2_rot_2 = { rotY: -Math.PI };
  const xwing_2_rot_3 = { rotY: -Math.PI * (3 / 2) };
  const xwing_2_rot_4 = { rotY: -Math.PI * 2 };

  const rot_start_xwing_3 = { rotY: 0 };
  const xwing_3_rot_1 = { rotY: -Math.PI / 2 };
  const xwing_3_rot_2 = { rotY: -Math.PI };
  const xwing_3_rot_3 = { rotY: -Math.PI * (3 / 2) };
  const xwing_3_rot_4 = { rotY: -Math.PI * 2 };

  //#region 
  // Tween de rotación para los TIE fighters
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

  // Tween de movimiento para los TIE fighters
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
  //#endregion

  // Tween de rotación para los XWING
  var tween_xwing_1 = new TWEEN.Tween(rot_start_xwing).to(xwing_rot_1, 50);
  var tween_xwing_2 = new TWEEN.Tween(rot_start_xwing).to(xwing_rot_2, 50);
  var tween_xwing_3 = new TWEEN.Tween(rot_start_xwing).to(xwing_rot_3, 50);
  var tween_xwing_4 = new TWEEN.Tween(rot_start_xwing).to(xwing_rot_4, 50);

  var tween_xwing2_1 = new TWEEN.Tween(rot_start_xwing_2).to(xwing_2_rot_1, 400);
  var tween_xwing2_2 = new TWEEN.Tween(rot_start_xwing_2).to(xwing_2_rot_2, 400);
  var tween_xwing2_3 = new TWEEN.Tween(rot_start_xwing_2).to(xwing_2_rot_3, 400);
  var tween_xwing2_4 = new TWEEN.Tween(rot_start_xwing_2).to(xwing_2_rot_4, 400);

  var tween_xwing3_1 = new TWEEN.Tween(rot_start_xwing_3).to(xwing_3_rot_1, 400);
  var tween_xwing3_2 = new TWEEN.Tween(rot_start_xwing_3).to(xwing_3_rot_2, 400);
  var tween_xwing3_3 = new TWEEN.Tween(rot_start_xwing_3).to(xwing_3_rot_3, 400);
  var tween_xwing3_4 = new TWEEN.Tween(rot_start_xwing_3).to(xwing_3_rot_4, 400);
  
  // Tween de movimiento para los XWING
  var move_xwing_1 = new TWEEN.Tween(start_xwing).to(xwing_move_to_1, 3500); // Vuelo inicial con decenso
  var move_xwing_2 = new TWEEN.Tween(start_xwing).to(xwing_move_to_2, 500); // Vuelo con ascenso
  var move_xwing_3 = new TWEEN.Tween(start_xwing).to(xwing_move_to_3, 2000); // Dando vuelta
  var move_xwing_4 = new TWEEN.Tween(start_xwing).to(xwing_move_to_4, 4000); // Regreso a la flota

  var move_xwing2_1 = new TWEEN.Tween(start_xwing_2).to(xwing_2_move_to_1, 3500);
  var move_xwing2_2 = new TWEEN.Tween(start_xwing_2).to(xwing_2_move_to_2, 500);
  var move_xwing2_3 = new TWEEN.Tween(start_xwing_2).to(xwing_2_move_to_3, 2000);
  var move_xwing2_4 = new TWEEN.Tween(start_xwing_2).to(xwing_2_move_to_4, 4000);

  var move_xwing3_1 = new TWEEN.Tween(start_xwing_3).to(xwing_3_move_to_1, 3500);
  var move_xwing3_2 = new TWEEN.Tween(start_xwing_3).to(xwing_3_move_to_2, 500);
  var move_xwing3_3 = new TWEEN.Tween(start_xwing_3).to(xwing_3_move_to_3, 3000);
  var move_xwing3_4 = new TWEEN.Tween(start_xwing_3).to(xwing_3_move_to_4, 4000);

  //#region 
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

  //#endregion

  //CHAIN TWEENS XWING
  move_xwing_1.chain(tween_xwing_1); // Iniciar rotación despues de que se haga el primer movimiento
  tween_xwing_1.chain(move_xwing_2); // Iniciar el segundo movimiento despues de que se haga la primer rotación
  move_xwing_2.chain(tween_xwing_2);
  tween_xwing_2.chain(move_xwing_3);
  move_xwing_3.chain(tween_xwing_3);
  tween_xwing_3.chain(move_xwing_4);
  move_xwing_4.chain(tween_xwing_4);
  tween_xwing_4.chain(move_xwing_1);

  move_xwing2_1.chain(tween_xwing2_1);
  tween_xwing2_1.chain(move_xwing2_2);
  move_xwing2_2.chain(tween_xwing2_2);
  tween_xwing2_2.chain(move_xwing2_3);
  move_xwing2_3.chain(tween_xwing2_3);
  tween_xwing2_3.chain(move_xwing2_4);
  move_xwing2_4.chain(tween_xwing2_4);
  tween_xwing2_4.chain(move_xwing2_1);

  move_xwing3_1.chain(tween_xwing3_1);
  tween_xwing3_1.chain(move_xwing3_2);
  move_xwing3_2.chain(tween_xwing3_2);
  tween_xwing3_2.chain(move_xwing3_3);
  move_xwing3_3.chain(tween_xwing3_3);
  tween_xwing3_3.chain(move_xwing3_4);
  move_xwing3_4.chain(tween_xwing3_4);
  tween_xwing3_4.chain(move_xwing3_1);

  //#region 
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
  //#endregion

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

  //#region 
  // Llamar a UPDATE de los Tie fighters
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
  //#endregion

  // Llamar a UPDATE de movimiento de los XWING
  move_xwing_1.onUpdate(upPos);
  move_xwing_2.onUpdate(upPos);
  move_xwing_3.onUpdate(upPos);
  move_xwing_4.onUpdate(upPos);

  move_xwing2_1.onUpdate(upPos2);
  move_xwing2_2.onUpdate(upPos2);
  move_xwing2_3.onUpdate(upPos2);
  move_xwing2_4.onUpdate(upPos2);

  move_xwing3_1.onUpdate(upPos3);
  move_xwing3_2.onUpdate(upPos3);
  move_xwing3_3.onUpdate(upPos3);
  move_xwing3_4.onUpdate(upPos3);

  //#region 
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
  //#endregion

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

  //#region 
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
  //#endregion

  //CALL UPDATE ROTATION XWING
  // tween_xwing_1.onUpdate(upRot);
  // tween_xwing_2.onUpdate(upRot);
  // tween_xwing_3.onUpdate(upRot);
  // tween_xwing_4.onUpdate(upRot);

  // tween_xwing2_1.onUpdate(upRot);
  // tween_xwing2_2.onUpdate(upRot);
  // tween_xwing2_3.onUpdate(upRot);
  // tween_xwing2_4.onUpdate(upRot);

  // tween_xwing3_1.onUpdate(upRot);
  // tween_xwing3_2.onUpdate(upRot);
  // tween_xwing3_3.onUpdate(upRot);
  // tween_xwing3_4.onUpdate(upRot);

  //START FIGHTER TWEENS
  tweenMove1.start();

  tweenMove5.start();

  tweenMove9.start();

  //START XWING TWEENS
  move_xwing_1.start();

  move_xwing2_1.start();

  move_xwing3_1.start();

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

  // Visualizador de los ejes (SOLO PARA DEV) Rojo -> X; Verde -> Y; Azul -> Z
  var axesHelper = new THREE.AxesHelper( 10000 );
  scene.add( axesHelper );


  animate();
});

// <----- RAF para animar todo ----->
function animate() {
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
