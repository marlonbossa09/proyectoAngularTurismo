import {
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: any;
  private raycaster: THREE.Raycaster;
  private pointer: THREE.Vector2;
  private intersects: THREE.Intersection[];

  private objet3d: any | THREE.Object3D;
  private clips: THREE.AnimationClip[];
  private mixer: THREE.AnimationMixer;
  private action: any | THREE.AnimationAction;
  private clock: THREE.Clock;
  private objects: THREE.Object3D[] = [];
  private currentObjectIndex: number = 0;

  constructor(private ngZone: NgZone) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.controls = null;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.intersects = [];
    this.objet3d = null;
    this.clips = [];
    this.mixer = new THREE.AnimationMixer(this.objet3d || null);
    this.action = undefined;
    this.clock = new THREE.Clock();
  }

  ngOnInit() {
    this.init();
    this.animate();
  }

  ngOnDestroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
  }



  private init() {
    this.camera.position.z = 50;
    this.camera.scale.set(0.5, 0.5, 0.5);

    this.renderer.setSize(window.innerWidth * 0.78, window.innerHeight * 0.78);

    document.getElementById('fondos')!.appendChild(this.renderer.domElement);

    const light = new THREE.AmbientLight();
    this.scene.add(light);

    // orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Raycaster
    document
      .getElementById('fondos')!
      .addEventListener('pointermove', this.onPointerMove.bind(this));
    document
      .getElementById('fondos')!
      .addEventListener('click', this.onClickObject.bind(this));

    // Dentro de la función loadGLB, después de agregar el modelo a la escena
    this.loadGLB('assets/img/torre.glb').then((gltf3) => {
      const torre: any = gltf3.scene;

      torre.position.set(-55, -30, 0);
      this.scene.add(torre);
      this.objects.push(torre);

    });

    this.loadGLB('assets/img/fiesta.glb').then((gltf5) => {
      const fiesta: any = gltf5.scene;

      fiesta.scale.set(8, 8, 8);
      fiesta.position.set(-105, -30, 0);
      this.scene.add(fiesta);
      this.objects.push(fiesta);
    });

    this.loadGLB('assets/img/calles.glb').then((gltf4) => {
      const calle: any = gltf4.scene;
      calle.position.set(90, -30, 0);
      this.scene.add(calle);
      this.objects.push(calle);
    });
    this.loadGLB('assets/img/castillo.glb').then((gltf) => {
      const castillo: any = gltf.scene;
      castillo.scale.set(5, 5, 5);
      castillo.position.set(380, -30, 0);
      this.scene.add(castillo);
      this.scene.add(castillo);
    });
    this.loadGLB('assets/img/estatua.glb').then((gltf2) => {
      const estatua: any = gltf2.scene;
      estatua.scale.set(20, 20, 20);
      estatua.position.set(-180, -30, 100);
      this.scene.add(estatua);
      this.scene.add(estatua);
    });

    this.loadSkyboxHDR();
  }



  private onPointerMove(event: MouseEvent) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.scene.children);
  }

  private onClickObject() {
    // Dentro de la función onClickObject
if (this.intersects.length > 0) {
  this.ngZone.runOutsideAngular(() => {
    const animateZoom = () => {
      const zoomFactor = Math.sin(Date.now() * 0.001) * 20; // Ajusta según tu preferencia

      // Itera sobre los objetos de la escena y aplica el zoom
      this.scene.children.forEach((object) => {
        if (object instanceof THREE.Object3D) {
          object.position.z = zoomFactor;
        }
      });

      requestAnimationFrame(animateZoom);
    };
    animateZoom();
  });
}
  }

  // ...
// ...

private animate() {
  this.ngZone.runOutsideAngular(() => {
    let moveDirection = 1; // Dirección inicial

    const animateFn = () => {
      requestAnimationFrame(animateFn);

      // Mueve la cámara horizontalmente en cada fotograma
      this.camera.position.x += 1 * moveDirection; // Ajusta la velocidad según tus necesidades

      // Verifica los límites y cambia la dirección si es necesario
      if (this.camera.position.x >= 600 || this.camera.position.x <= -300) {
        moveDirection *= -1;
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };

    animateFn();
  });
}

// ...


// ...


  private async loadGLB(url: string): Promise<GLTF> {
    const loader = new GLTFLoader();
    return await loader.loadAsync(url);
  }

  private async loadSkyboxHDR() {
    const loader = new THREE.TextureLoader();
    const texture = await loader.loadAsync('assets/img/oscuro.jpg');

    // Asigna la textura a la escena o al fondo según tus necesidades
    this.scene.background = texture;
    // O si quieres usarla para entorno:
    // this.scene.environment = texture;
  }


}
