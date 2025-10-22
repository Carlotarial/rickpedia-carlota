import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./inicio/inicio.module').then(m=>m.InicioModule)},
  {path:'personajes',loadChildren:()=>import('./personajes/personajes.module').then(m=>m.PersonajesModule)},
  {path:'episodios',loadChildren:()=>import('./episodios/episodios.module').then(m=>m.EpisodiosModule)},
  {path:'localizaciones',loadChildren:()=>import('./localizaciones/localizaciones.module').then(m=>m.LocalizacionesModule)},
  {path: 'equipo', loadChildren: () => import('./equipo/equipo.module').then(m => m.EquipoModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
