import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../core/services/team.service';
import { TeamMember } from '../../../core/models/team-member.model';
import { MatDialog } from '@angular/material/dialog';
import {
  TeamFormDialogComponent,
  TeamMemberDialogData,
} from '../team-form-dialog/team-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-list',
  standalone: false,
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  displayedColumns = [
    'image',         
    'characterId',
    'characterName',
    'alias',
    'note',
    'priority',
    'createdAt',
    'actions',
  ];

  team: TeamMember[] = [];
  isLoading = true;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTeam();
  }

  getCharacterImageUrl(characterId: number | string): string {
    return `https://rickandmortyapi.com/api/character/avatar/${characterId}.jpeg`;
  }

  loadTeam(): void {
    this.isLoading = true;
    this.teamService.getTeam().subscribe({
      next: (team) => {
        this.team = team;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Error al cargar el equipo', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  openCreate(): void {
    const dialogRef = this.dialog.open<
      TeamFormDialogComponent,
      TeamMemberDialogData,
      TeamMember | undefined
    >(TeamFormDialogComponent, {
      width: '400px',
      data: { member: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const { id, ...payloadWithoutId } = result;

      this.teamService.addMember(payloadWithoutId).subscribe({
        next: (created) => {
          if (!created) {
            this.snackBar.open('Error al crear el miembro', 'Cerrar', {
              duration: 3000,
            });
            return;
          }
          this.snackBar.open('Miembro creado', 'Cerrar', { duration: 3000 });
          this.loadTeam();
        },
        error: () => {
          this.snackBar.open('Error al crear el miembro', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    });
  }

  openEdit(member: TeamMember): void {
    const dialogRef = this.dialog.open<
      TeamFormDialogComponent,
      TeamMemberDialogData,
      TeamMember | undefined
    >(TeamFormDialogComponent, {
      width: '400px',
      data: { member },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (!result.id) {
        console.error('El miembro editado no tiene id');
        return;
      }

      this.teamService.updateMember(result.id, result).subscribe({
        next: (updated) => {
          if (!updated) {
            this.snackBar.open('Error al actualizar el miembro', 'Cerrar', {
              duration: 3000,
            });
            return;
          }
          this.snackBar.open('Miembro actualizado', 'Cerrar', { duration: 3000 });
          this.loadTeam();
        },
        error: () => {
          this.snackBar.open('Error al actualizar el miembro', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    });
  }

  delete(member: TeamMember): void {
    const confirmed = confirm(`¿Eliminar a "${member.alias}" del equipo?`);
    if (!confirmed) return;

    if (!member.id) {
      console.warn('Intento de eliminar miembro sin id', member);
      this.snackBar.open('No se puede eliminar un miembro sin id', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    this.teamService.deleteMember(member.id).subscribe({
      next: (success) => {
        if (success) {
          this.snackBar.open('Miembro eliminado', 'Cerrar', { duration: 3000 });
          this.loadTeam();
        } else {
          this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 });
        }
      },
      error: () => {
        this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
