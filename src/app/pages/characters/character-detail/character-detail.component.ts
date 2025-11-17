// src/app/pages/characters/character-detail/character-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../../../core/services/characters.service';
import { Character } from '../../../core/models/character.model';
import { TeamService } from '../../../core/services/team.service';
import { TeamMember } from '../../../core/models/team-member.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-character-detail',
  standalone: false,
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  character: Character | null = null;
  isLoading = false;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private charactersService: CharactersService,
    private teamService: TeamService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (!id || Number.isNaN(id)) {
      this.hasError = true;
      return;
    }

    this.isLoading = true;

    this.charactersService.getCharacter(id).subscribe({
      next: (char) => {
        this.character = char;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }

  addToTeam(): void {
    if (!this.character) return;

    const payload: Omit<TeamMember, 'id'> = {
      characterId: this.character.id,
      characterName: this.character.name,
      alias: this.character.name,    
      note: '',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    };

    this.teamService.addMember(payload).subscribe({
      next: () => {
        this.snackBar.open('Personaje añadido al equipo', 'Cerrar', {
          duration: 3000,
        });

        this.router.navigate(['/team']);
      },
      error: () => {
        this.snackBar.open('Error al añadir al equipo', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
