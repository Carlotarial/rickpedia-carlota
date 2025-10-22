import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonajesRoutingModule } from './personajes-routing.module';
import { ListadoPersonajesComponent } from './listado-personajes/listado-personajes.component';
import { DetallePersonajeComponent } from './detalle-personaje/detalle-personaje.component';


@NgModule({
  declarations: [
    ListadoPersonajesComponent,
    DetallePersonajeComponent
  ],
  imports: [
    CommonModule,
    PersonajesRoutingModule
  ]
})
export class PersonajesModule { }
