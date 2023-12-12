import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
// RUTAS
import { APP_ROUTING } from './app.routes';

import { HeroesService } from './components/services/heroes.service';
import { TurismoComponent } from './components/turismo/turismo.component';
import { ThreeSceneComponent } from './three-scene/three-scene.component';
import { Modelo3DComponent } from './components/home/modelo3D.component';

// SERVICIOS

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    HeroesComponent,
    TurismoComponent,
    ThreeSceneComponent,
    Modelo3DComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
