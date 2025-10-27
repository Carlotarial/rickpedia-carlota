// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./personajes/personajes.module').then((m) => m.PersonajesModule),
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./episodios/episodios.module').then((m) => m.EpisodiosModule),
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('./localizaciones/localizaciones.module').then(
        (m) => m.LocalizacionesModule
      ),
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./equipo/equipo.module').then((m) => m.EquipoModule),
  },
  {
    path: '**',
    redirectTo: '/404', // redirige a la ruta de 404 del módulo Inicio
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
