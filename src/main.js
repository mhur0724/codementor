import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "blue" });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);

camera.position.z = 5;
scene.add(camera);

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const controls = new OrbitControls(camera, canvas);
controls.update();

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

function getQueryParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const cubeRotationX = parseFloat(getQueryParameter("rotationX"));
console.log(cubeRotationX);

if (!isNaN(cubeRotationX)) {
  cubeMesh.userData.rotateXSpeed = cubeRotationX;
} else {
  cubeMesh.userData.rotateXSpeed = 0;
}

function updateCubeColor() {
  const color = getQueryParameter("color");
  if (color && (/^#[0-9A-F]{6}$/i.test(color) || THREE.Color.NAMES[color])) {
    cubeMaterial.color.set(color);
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cubeMesh.rotation.x += cubeMesh.userData.rotateXSpeed;
  renderer.render(scene, camera);
}

updateCubeColor();
animate();
