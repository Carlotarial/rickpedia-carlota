import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodiosRoutingModule } from './episodios-routing.module';
import { ListadoEpisodiosComponent } from './listado-episodios/listado-episodios.component';
import { DetalleEpisodioComponent } from './detalle-episodio/detalle-episodio.component';


@NgModule({
  declarations: [
    ListadoEpisodiosComponent,
    DetalleEpisodioComponent
  ],
  imports: [
    CommonModule,
    EpisodiosRoutingModule
  ]
})
export class EpisodiosModule { }
