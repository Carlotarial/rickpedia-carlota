import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../core/services/team.service';
import { TeamMember } from '../../../core/models/team-member.model';
import { MatDialog } from '@angular/material/dialog';
import {
  TeamFormDialogComponent,
  TeamMemberDialogData,
} from '../team-form-dialog/team-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

type PriorityFilter = 'all' | 'low' | 'medium' | 'high';

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

  /** Lista completa tal cual viene del backend */
  allTeam: TeamMember[] = [];

  /** Lista filtrada que se muestra en la tabla */
  team: TeamMember[] = [];

  isLoading = true;

  /** Estado de los filtros */
  filterText = '';
  filterPriority: PriorityFilter = 'all';

  /** Mostrar/ocultar menú de filtros */
  showFilters = false;

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
        this.allTeam = team ?? [];
        this.applyFilters();
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

  /** Mostrar/ocultar card de filtros */
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  /** Handler del input de texto */
  onFilterTextChange(value: string): void {
    this.filterText = value ?? '';
    this.applyFilters();
  }

  /** Handler de los botones de prioridad */
  onPriorityClick(priority: PriorityFilter): void {
    this.filterPriority = priority;
    this.applyFilters();
  }

  /** Limpiar todos los filtros */
  clearFilters(): void {
    this.filterText = '';
    this.filterPriority = 'all';
    this.applyFilters();
  }

  /** Aplica los filtros sobre allTeam y deja el resultado en team */
  private applyFilters(): void {
    const text = this.filterText.trim().toLowerCase();
    const priority = this.filterPriority;

    this.team = this.allTeam.filter((member) => {
      // Filtro texto: ID, nombre o alias
      const matchesText =
        !text ||
        member.alias?.toLowerCase().includes(text) ||
        member.characterName?.toLowerCase().includes(text) ||
        String(member.characterId).includes(text);

      // Filtro prioridad
      const matchesPriority =
        priority === 'all' || member.priority === priority;

      return matchesText && matchesPriority;
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
          this.snackBar.open('Miembro actualizado', 'Cerrar', {
            duration: 3000,
          });
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
          this.snackBar.open('Error al eliminar', 'Cerrar', {
            duration: 3000,
          });
        }
      },
      error: () => {
        this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
