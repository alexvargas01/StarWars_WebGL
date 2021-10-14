import * as THREE from "./three.js-master/build/three.module.js";
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js";

// <----- CREACIÓN DE LA ESCENA ----->
const scene = new THREE.Scene();


// <----- CREACIÓN DE LA CÁMARA ----->
const sizes = {
  width: window.innerWidth,
	height: window.innerHeight
}
const fov = 75;
const near = 0.1;
const far = 10000;
const camera = new THREE.PerspectiveCamera( fov, sizes.width/sizes.height, near, far );
camera.position.set(60, 80, 50);


// <----- CREACIÓN DEL RENDERER ----->
const renderer = new THREE.WebGLRenderer();
renderer.setSize( sizes.width, sizes.height );
document.body.appendChild( renderer.domElement );


// <----- LUZ DIRECCIONAL ----->
// TODO: Agregar tres fuentes de luz: los dos soles de Tatooine, y la luz que rebota del planeta
const colorDeLuz = 0xffffff;
const intensidadDeLuz = 1;
const directionalLight = new THREE.DirectionalLight( colorDeLuz, intensidadDeLuz ); // Luz direccional blanca a toda intensidad brillando desde arriba
scene.add( directionalLight );


// <----- CONTROLES ORBITALES ----->
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0); // El objetivo en el que estará dando vueltas. Toma como parámetro un Vector3
controls.update(); // Actualiza los controles para que tengan las modificaciones que se le hacen


// <----- FONDO ----->
const background_loader = new THREE.CubeTextureLoader();
const texture = background_loader.load([
	'./assets/background/space-posx.jpg',
	'./assets/background/space-negx.jpg',
	'./assets/background/space-posy.jpg',
	'./assets/background/space-negy.jpg',
	'./assets/background/space-posz.jpg',
	'./assets/background/space-negz.jpg',
])
scene.background = texture;

// <----- LOADER PARA EL MODELO ----->
// TODO: Agregar más naves imperiales y rebeldes
// const loader = new GLTFLoader();
// loader.load( './assets/star_wars_imperial_ii_star_destroyer/scene.gltf', function ( gltf ) {

// 	const zelda = gltf.scene.children[0];
// 	zelda.scale.set(0.3,0.3,0.3);
// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

function loadModel(url){
	return new Promise(resolve => {
		new GLTFLoader().load(url, resolve);
	})
}

// Lista de modelos
// TODO: Agregar los modelos de los soles, y tatooine
let rebel_frigate, star_destroyer, tie_fighter, x_wing;

let p1 = loadModel('./assets/star_wars_imperial_ii_star_destroyer/scene.gltf').then(result => {star_destroyer = result.scene.children[0]; });
let p2 = loadModel('./assets/nebulon_b_frigate/scene.gltf').then(result => {rebel_frigate = result.scene.children[0]; });
let p3 = loadModel('./assets/tie_fighter/scene.gltf').then(result => {tie_fighter = result.scene.children[0]; });
let p4 = loadModel('./assets/x-wing_fighter/scene.gltf').then( result => {x_wing = result.scene.children[0]; });

Promise.all([p1, p2, p3, p4]).then( () => {

	// Posición de los modelos
	star_destroyer.position.set(0, 0, 0);
	rebel_frigate.position.set(500, 200, 0);

	// Tamaño de los modelos
	rebel_frigate.scale.set(18,18,18);

	// Rotación inicial de los modelos
	rebel_frigate.rotateZ(90);

	// Agregar los modelos a la escena
	scene.add(star_destroyer);
	scene.add(rebel_frigate);

	console.log("Entered promise");
	animate();
})

// <----- RAF para animar todo ----->
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();