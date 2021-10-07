import * as THREE from "./three.js-master/build/three.module.js";
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const fov = 75;
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera( fov, sizes.width/sizes.height, near, far );
camera.position.set(60, 80, 50);

// LUZ Ambiental
const light = new THREE.AmbientLight(0x101010);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( sizes.width, sizes.height );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

loader.load( './assets/star_wars_imperial_ii_star_destroyer/scene.gltf', function ( gltf ) {

	const zelda = gltf.scene.children[0];
	zelda.scale.set(0.3,0.3,0.3);
	scene.add( gltf.scene );

	

}, undefined, function ( error ) {

	console.error( error );

} );

// Luz direccional blanca a toda intensidad brillando desde arriba
const colorDeLuz = 0xffffff;
const intensidadDeLuz = 1;
const directionalLight = new THREE.DirectionalLight( colorDeLuz, intensidadDeLuz ); 
scene.add( directionalLight );

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0); // El objetivo en el que estará dando vueltas. Toma como parámetro un Vector3
controls.update(); // Actualiza los controles para que tengan las modificaciones que se le hacen

// Fondo
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

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();