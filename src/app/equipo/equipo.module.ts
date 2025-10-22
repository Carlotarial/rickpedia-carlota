import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { ListadoEquipoComponent } from './listado-equipo/listado-equipo.component';
import { FormularioEquipoComponent } from './formulario-equipo/formulario-equipo.component';


@NgModule({
  declarations: [
    ListadoEquipoComponent,
    FormularioEquipoComponent
  ],
  imports: [
    CommonModule,
    EquipoRoutingModule
  ]
})
export class EquipoModule { }
