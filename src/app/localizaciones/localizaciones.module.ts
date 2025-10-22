import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalizacionesRoutingModule } from './localizaciones-routing.module';
import { ListadoLocalizacionesComponent } from './listado-localizaciones/listado-localizaciones.component';
import { DetalleLocalizacionComponent } from './detalle-localizacion/detalle-localizacion.component';


@NgModule({
  declarations: [
    ListadoLocalizacionesComponent,
    DetalleLocalizacionComponent
  ],
  imports: [
    CommonModule,
    LocalizacionesRoutingModule
  ]
})
export class LocalizacionesModule { }
