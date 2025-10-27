// src/app/inicio/inicio.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [InicioComponent, PaginaNoEncontradaComponent],
  imports: [CommonModule, InicioRoutingModule, MaterialModule],
})
export class InicioModule {}
