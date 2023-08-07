import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MotionPathPlugin } from "gsap/all";
import * as THREE from "three";
import * as SHADERS from "./3d-shaders";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GLOBE from "./assets/3d-models/globe.glb";
import THREETONE from "./assets/images/threeTone.jpg";
import TEXT1 from "./assets/3d-models/txt1.glb";
import TEXT2 from "./assets/3d-models/txt2.glb";

export const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);

camera.position.set(0, 2, 4.5);

export function initScene() {
	const renderer = new THREE.WebGLRenderer({ alpha: true });

	renderer.setSize(window.innerWidth, window.innerHeight);

	const rendererContainer = document.getElementById("threejs-container");
	rendererContainer.appendChild(renderer.domElement);

	const manager = new THREE.LoadingManager();

	const scene = new THREE.Scene();

	const light1 = new THREE.PointLight(0xfffffff, 2);
	scene.add(light1);

	const cellshademat1 = new THREE.ShaderMaterial({
		vertexShader: SHADERS.cellshadeVS,
		fragmentShader: SHADERS.cellshade1FS,
		uniforms: {
			defaultColor: { value: new THREE.Vector3(1, 1, 1) }, // Set to white color
			black: { value: new THREE.Vector3(0.149, 0.149, 0.149) },
			lightPosition: { value: light1.position },
		},
	});

	const geometry = new THREE.TorusGeometry(2, 1);
	const mesh = new THREE.Mesh(geometry, cellshademat1);
	mesh.position.set(0, 2, 0);
	// scene.add(mesh);

	const starGeometry = new THREE.SphereGeometry(0.1, 10, 10);
	const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
	const numStars = 1000; // Number of stars you want

	function applyCustomShader(object, mat) {
		// Apply the shader material to the object
		object.traverse((child) => {
			const toon = new THREE.TextureLoader().load(THREETONE);
			toon.minFilter = THREE.NearestFilter;
			toon.magFilter = THREE.NearestFilter;
			const toonmat = new THREE.MeshToonMaterial({
				color: 0xffffff,
				gradientMap: toon,
			});
			if (child.isMesh) {
				child.material = mat;
			}
		});
	}

	// const grid = new THREE.AxesHelper();
	// grid.position.set(0, -1, 0);
	// scene.add(grid);

	//GLTF

	const gltfLoader = new GLTFLoader();
	let globe;
	let txt1;
	let txt2;

	gltfLoader.load(GLOBE, (gltf) => {
		globe = gltf.scene;
		globe.position.set(2, 2, 0);
		globe.rotateX(-0.4);
		globe.rotateY(-2);
		applyCustomShader(globe, cellshademat1);
		scene.add(globe);
	});

	gltfLoader.load(TEXT1, (gltf) => {
		txt1 = gltf.scene;
		txt1.position.set(11, 2.8, 3.2);
		txt1.rotation.set(0.57, 0, 1.6);
		applyCustomShader(txt1, starMaterial);
		scene.add(txt1);
	});

	gltfLoader.load(TEXT2, (gltf) => {
		txt2 = gltf.scene;
		txt2.position.set(11, 1.85, 4.5);
		txt2.rotation.set(0.57, 0, 1.6);
		applyCustomShader(txt2, starMaterial);
		scene.add(txt2);
	});

	for (let i = 0; i < numStars; i++) {
		const starMesh = new THREE.Mesh(starGeometry, starMaterial);
		const range = 300;

		// Generate random positions for stars within a certain range
		starMesh.position.x = (Math.random() - 0.5) * range;
		starMesh.position.y = (Math.random() - 0.5) * range;
		starMesh.position.z = (Math.random() - 0.5) * range;

		scene.add(starMesh);
	}

	let k = 0.0;
	let centerX = 0;
	let centerY = 0;
	let radius = 10;

	function animate() {
		if (globe) {
			globe.rotateY(0.001);
		}

		k += 0.001;

		const x = centerX + radius * Math.cos(k);
		const y = centerY + radius * Math.sin(k);

		light1.position.set(x, y, 5);
		cellshademat1.uniforms.lightPosition.value.copy(light1.position);

		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	}

	animate();

	window.addEventListener("resize", () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});

	// ANIMATIONS
	gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: "#welcome-banner",
			start: "top top",
			end: "bottom bottom",
			scrub: 1,
		},
	});

	tl.to(camera.position, {
		x: 2,
		y: 2,
		z: 4,
		duration: 2,
		ease: "power2.out",
	});
	tl.to(camera.position, {
		x: 2,
		y: 2,
		z: 4,
		duration: 0.1,
	});
	tl.to(camera.position, {
		x: 10.87,
		y: 1.9,
		z: 4.7,
		ease: "power2.in",
		duration: 5,
	});
	tl.to(
		camera.rotation,
		{
			x: -1,
			y: -1.6,
			z: 0,
			ease: "power2.inOut",
			duration: 3,
		},
		"<",
	);
	tl.to(
		camera.rotation,
		{
			x: 0.6,
			y: -1.57,
			z: 0,
			ease: "power2.inOut",
			duration: 2,
		},
		">0.5",
	);
}
