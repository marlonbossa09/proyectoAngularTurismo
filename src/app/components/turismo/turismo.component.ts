import { Component, NgZone, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-turismo',
  templateUrl: './turismo.component.html',
  styleUrls: ['./turismo.component.css']
})
export class TurismoComponent implements OnInit, OnDestroy, AfterViewInit {

  scene: any;
  camera: any;
  renderer: any;
  controls: any;
  object: any;
  containerThree: any;

  constructor(private ngZone: NgZone) {
    this.scene = new THREE.Scene();
    this.containerThree = null;
  }

  ngOnInit() {
    this.scene.background = new THREE.Color(0x23AF83);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.renderer = new CSS3DRenderer();
  }

  ngAfterViewInit() {
    this.containerThree = document.getElementById('three') as HTMLDivElement;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.containerThree.appendChild(this.renderer.domElement);
    console.log('CARGÓ THREE');

    this.loadIframe();
    this.animate();
  }

  ngOnDestroy() {
    if (this.renderer) {
    }
  }

  private loadIframe() {
    const div = document.createElement('div');
    div.style.width = '960px';
    div.style.height = '720px';

    const iframe = document.createElement('iframe');
    iframe.style.width = '960px';
    iframe.style.height = '720px';
    iframe.src = 'https://threejs.org/';
    div.appendChild(iframe);

    this.object = new CSS3DObject(div);
    this.object.scale.set(0.005, 0.005, 0.005);
    this.scene.add(this.object);
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      const animateFn = () => {
        requestAnimationFrame(animateFn);
        this.renderer.render(this.scene, this.camera);

        if (this.object !== null) {
          this.object.rotation.y += 0.01;
        }
      };

      animateFn();
    });
  }
}
