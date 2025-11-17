import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { HomeComponent } from './pages/home/home.component';
import { CharactersListComponent } from './pages/characters/characters-list/characters-list.component';
import { CharacterDetailComponent } from './pages/characters/character-detail/character-detail.component';
import { EpisodesListComponent } from './pages/episodes/episodes-list/episodes-list.component';
import { EpisodeDetailComponent } from './pages/episodes/episode-detail/episode-detail.component';
import { LocationsListComponent } from './pages/locations/locations-list/locations-list.component';
import { LocationDetailComponent } from './pages/locations/location-detail/location-detail.component';
import { TeamListComponent } from './pages/team/team-list/team-list.component';
import { TeamFormDialogComponent } from './pages/team/team-form-dialog/team-form-dialog.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharactersListComponent,
    CharacterDetailComponent,
    EpisodesListComponent,
    EpisodeDetailComponent,
    LocationsListComponent,
    LocationDetailComponent,
    TeamListComponent,
    TeamFormDialogComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
