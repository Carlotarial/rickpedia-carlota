import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

// Characters
import { CharactersListComponent } from './pages/characters/characters-list/characters-list.component';
import { CharacterDetailComponent } from './pages/characters/character-detail/character-detail.component';

// Episodes
import { EpisodesListComponent } from './pages/episodes/episodes-list/episodes-list.component';
import { EpisodeDetailComponent } from './pages/episodes/episode-detail/episode-detail.component';

// Locations
import { LocationsListComponent } from './pages/locations/locations-list/locations-list.component';
import { LocationDetailComponent } from './pages/locations/location-detail/location-detail.component';

// Team
import { TeamListComponent } from './pages/team/team-list/team-list.component';

// Not found
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  // Home
  { path: '', component: HomeComponent },

  // Characters "módulo"
  {
    path: 'characters',
    children: [
      { path: '', component: CharactersListComponent },      // /characters
      { path: ':id', component: CharacterDetailComponent }   // /characters/:id
    ]
  },

  // Episodes "módulo"
  {
    path: 'episodes',
    children: [
      { path: '', component: EpisodesListComponent },        // /episodes
      { path: ':id', component: EpisodeDetailComponent }     // /episodes/:id
    ]
  },

  // Locations "módulo"
  {
    path: 'locations',
    children: [
      { path: '', component: LocationsListComponent },       // /locations
      { path: ':id', component: LocationDetailComponent }    // /locations/:id
    ]
  },

  // Team
  { path: 'team', component: TeamListComponent },

  // Not found (siempre al final)
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
