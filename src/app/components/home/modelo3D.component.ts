import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-modelo3d',
  template: '<div id="modelo3D" style="width: 100%; height: 300px;"></div>',
})
export class Modelo3DComponent implements OnInit {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
  }

  ngOnInit() {
    this.init();
    this.animate();
  }

  private init() {
    // Cargar y agregar el modelo 3D aquí
    const loader = new GLTFLoader();
    loader.load('assets/img/estatua.glb', (gltf) => {
      const modelo: any = gltf.scene;
      modelo.position.set(0, 0, 0);
      modelo.scale.set(1, 1, 1);
      this.scene.add(modelo);
    });

    // Agregar el renderizador al contenedor HTML
    document.getElementById('modelo3D')!.appendChild(this.renderer.domElement);
  }

  private animate() {
    const animateFn = () => {
      requestAnimationFrame(animateFn);
      this.renderer.render(this.scene, this.camera);
    };

    animateFn();
  }
}
