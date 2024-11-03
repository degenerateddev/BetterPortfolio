<script setup lang="ts">
// https://dev.to/aneeqakhan/animating-the-3d-cube-with-threejs-1i12
import { Mesh, BoxGeometry, TextureLoader, MeshLambertMaterial, Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight } from 'three';
import { onMounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps<{
    images: string[];
}>();

const scene = new Scene();
const factor = window.innerWidth / window.innerHeight
const camera = new PerspectiveCamera(15, 1.5, 0.1, 1000);
const renderer = new WebGLRenderer({ antialias: true, alpha: true });

const geometry = new BoxGeometry();
const textureLoader = new TextureLoader();
const materials = props.images.map(pic => {
    return new MeshLambertMaterial({
        map: textureLoader.load("img/cube/" + pic)
    })
});
const cube = new Mesh(geometry, materials);
cube.scale.set(1, 1, 1);
scene.add(cube);

const ambientLight = new AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xffffff, 2);
directionalLight.position.set(-10, 10, 10).normalize();
scene.add(directionalLight);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

camera.position.z = 5;

onMounted(() => {
    const container = document.querySelector('.three');
    if (container) {
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
    }
});

setInterval(() => {
    gsap.to(cube.rotation, { duration: 1.5, y: cube.rotation.y - Math.PI / 2, ease: "expo.inOut" });
}, 3000);

scene.background = null;
</script>

<template>
    <div class="three">
        
    </div>
</template>

<style scoped>
.three {
    width: 100%;
    height: 80vh;
}

canvas {
    width: 100%;
    height: 100%;
}
</style>