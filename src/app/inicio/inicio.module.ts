import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    InicioComponent,
    PaginaNoEncontradaComponent,
    
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class InicioModule { }
