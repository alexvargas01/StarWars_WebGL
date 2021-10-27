import * as THREE from "./three.js-master/build/three.module.js";
import * as TWEEN from "./tween.js/dist/tween.umd.js";
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
camera.position.set(-500, 300, 600);

// <----- CREACIÓN DEL RENDERER ----->
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// <----- LUZ AMBIENTAL ----->
const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientLight );

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
directionalLight1.position.set(10000, 20000, -100000)
directionalLight2.position.set(35000, 20000, -110000)
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
function loadModel(url){
	return new Promise(resolve => {
		new GLTFLoader().load(url, resolve);
	})
}

// Lista de modelos
let rebel_fleet, star_destroyer1, star_destroyer2, tie_fighter, x_wing, tatooine, sun1, sun2;

let p1 = loadModel('./assets/star_wars_imperial_ii_star_destroyer/scene.gltf').then(result => {star_destroyer1 = result.scene.children[0]; });
let p2 = loadModel('./assets/resistance_fleet__resistance_navy/scene.gltf').then(result => {rebel_fleet = result.scene.children[0]; });
let p3 = loadModel('./assets/tie_fighter/scene.gltf').then(result => {tie_fighter = result.scene.children[0]; });
let p4 = loadModel('./assets/x-wing_fighter/scene.gltf').then( result => {x_wing = result.scene.children[0]; });
let p5 = loadModel('./assets/star_wars_imperial_ii_star_destroyer/scene.gltf').then(result => {star_destroyer2 = result.scene.children[0]; });
let p6 = loadModel('./assets/tatooine/scene.gltf').then(result => {tatooine = result.scene.children[0]; });
let p7 = loadModel('./assets/sun/scene.gltf').then(result => {sun1 = result.scene.children[0]; });
let p8 = loadModel('./assets/sun/scene.gltf').then(result => {sun2 = result.scene.children[0]; });

Promise.all([p1, p2, p3, p4, p5, p6, p7, p8]).then( () => {

	// Posición de los modelos
	star_destroyer1.position.set(0, 0, 0);
	star_destroyer2.position.set(-150, 0, 0);
	rebel_fleet.position.set(0, 0, 500);
	tatooine.position.set(9000, -2000, 0);
	sun1.position.set(10000, 20000, -100000);
	sun2.position.set(35000, 20000, -110000);

	// Tamaño de los modelos
	star_destroyer1.scale.set(0.3, 0.3, 0.3);
	star_destroyer2.scale.set(0.3, 0.3, 0.3);
	rebel_fleet.scale.set(.00032, .00032, .00032);
	tatooine.scale.set(7000, 7000, 7000);
	sun1.scale.set(900, 900, 900);
	sun2.scale.set(700, 700, 700);

	// Rotación inicial de los modelos
	

	// Agregar los modelos a la escena
	scene.add(star_destroyer1);
	// scene.add(star_destroyer2);
	// scene.add(rebel_fleet);
	scene.add(tatooine);
	scene.add(sun1);
	scene.add(sun2);

	console.log("Entered promise");
	animate();
})

// <----- RAF para animar todo ----->
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
