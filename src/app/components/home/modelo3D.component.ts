import { Component, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-modelo3d',
  template: '<div id="modelo3D"></div>',
})
export class Modelo3DComponent implements OnInit, OnDestroy {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;

  constructor(private ngZone: NgZone) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Adjust the aspect ratio
    this.renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for a transparent background
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  ngOnInit() {
    this.init();
    this.animate();
  }

  ngOnDestroy() {
    this.controls.dispose();
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

    // Configurar la cámara y el renderizador
    this.camera.position.z = 0.5;
    this.renderer.setSize(window.innerWidth * 0.78, window.innerHeight * 0.5);

    // Agregar el renderizador al contenedor HTML
    const contenedor = document.getElementById('modelo3D');
    contenedor!.appendChild(this.renderer.domElement);

    // Ajustar el tamaño del renderizador al contenedor
    this.renderer.setSize(contenedor!.clientWidth, contenedor!.clientHeight);
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      const animateFn = () => {
        requestAnimationFrame(animateFn);

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      };

      animateFn();
    });
  }
}
